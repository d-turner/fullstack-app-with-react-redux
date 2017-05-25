import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EditorState, ContentState, RichUtils, convertToRaw } from 'draft-js';

// import the actions from the document reducer,
// we do not need a seperate reducer of this component
import * as actionCreators from '../ActionCreators/SegmentActions';

import BabelApi from '../../../utils/babelnet';
import SegmentPresentation from '../Presentation/Segment';
import Lexicon from '../../Lexicon/Lexicon';

class Segment extends React.Component {
  constructor(props) {
    super(props);
    const documentId = parseInt(props.match.params.documentId, 10);
    const segmentId = parseInt(props.match.params.segmentId, 10);

    const documentIndex = props.documents.findIndex(doc => doc.id === documentId);
    const doc = props.documents[documentIndex];
    const segment = doc.xliff.segments[segmentId];
    let editorState;
    if (!segment.editorState) {
      editorState = EditorState.createWithContent(
        ContentState.createFromText(segment.target),
      );
    } else {
      editorState = segment.editorState;
    }

    this.state = {
      loading: false,
      editorState,
      segmentId,
      documentId,
      documentIndex,
      segment,
    };
    this.handleChange = this.handleChange.bind(this);

    this.focus = () => { this.SegmentPresentation.CustomEditor.Editor.focus(); };
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
    this.dictionaryLookup = state => this._dictionaryLookup(state);
  }

  handleChange(editorState) {
    // We need to continue updating the local state in order
    // to get the latest selection position
    this.setState({ editorState });

    this.props.updateSegment(
      this.state.documentId,
      this.state.segmentId,
      this.state.editorState,
      this.state.editorState.getCurrentContent().getPlainText(),
      convertToRaw(this.state.editorState.getCurrentContent()),
    );
  }
  _dictionaryLookup(state) {
    const selectionState = state.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = state.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);
    let loading = true;
    this.setState({ loading });
    if (selectedText) {
      const source = this.props.documents[this.state.documentIndex].xliff.sourceLang.toUpperCase();
      const target = this.props.documents[this.state.documentIndex].xliff.targetLang.toUpperCase();
      BabelApi.lookup(selectedText, 'EN', target).then((res) => {
        res.json().then((json) => {
          if (json.length === 0) {
            console.warn('need to implement this');
            console.warn('lookup failed');
            loading = false;
            this.setState({ loading });
          }
          BabelApi.find(json, 'EN', target).then((resp) => {
            resp.json().then((data) => {
              loading = false;
              this.setState({ data, loading });
            });
          });
        });
      });
    }
  }

  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _toggleBlockType(blockType) {
    if (blockType === 'LOOKUP') {
      this.dictionaryLookup(this.state.editorState);
    } else {
      this.handleChange(
        RichUtils.toggleBlockType(
          this.state.editorState,
          blockType,
        ),
      );
    }
  }

  _toggleInlineStyle(inlineStyle) {
    this.handleChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle,
      ),
    );
  }

  render() {
    return (
      <div>
        <SegmentPresentation
          segment={this.props.documents[this.state.documentIndex].xliff.segments[this.state.segmentId]}
          editorState={this.state.editorState}
          toggleBlockType={this.toggleBlockType}
          toggleInlineStyle={this.toggleInlineStyle}
          handleKeyCommand={this.handleKeyCommand}
          handleChange={this.handleChange}
          focus={this.focus}
          ref={(ref) => { this.SegmentPresentation = ref; }}
        />
        <Lexicon data={this.state.data} loading={this.state.loading} />
      </div>
    );
  }
}

Segment.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  updateSegment: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { documentReducer } = state;
  const { documents } = documentReducer;
  // return what we want available in the props
  return {
    documents,
  };
};

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Segment);
