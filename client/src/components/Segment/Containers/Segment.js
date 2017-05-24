import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EditorState, ContentState, RichUtils, convertToRaw } from 'draft-js';

import * as actionCreators from '../ActionCreators/SegmentActions';

import CustomEditor from '../../Editor/CustomEditor';

class Segment extends React.Component {
  constructor(props) {
    super(props);

    const documentId = props.match.params.documentId;
    const segmentId = props.match.params.segmentId;

    let doc;
    const keys = Object.keys(props.documents);
    for (let i = 0; i < keys.length; i++) {
      if (props.documents[keys[i]].id === parseInt(documentId, 10)) {
        doc = props.documents[keys[i]];
        console.warn('This is not good code!');
        break;
      }
    }

    const segment = doc.xliff.segments[segmentId];

    // const id = this.props.match.params.segmentId;
    // const i = this.props.segments.findIndex(segment => segment.id === parseInt(id, 10));
    // const segment = this.props.segments[i];
    const editorState = EditorState.createWithContent(
      ContentState.createFromText(segment.target),
    );

    this.state = {
      editorState,
      segment,
    };
    this.handleChange = this.handleChange.bind(this);

    this.focus = () => { this.CustomEditor.Editor.focus(); };
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  handleChange(editorState) {
    // We need to continue updating the local state in order
    // to get the latest selection position
    this.setState({ editorState });

    this.props.updateSegment(
      parseInt(this.props.match.params.segmentId, 10),
      convertToRaw(editorState.getCurrentContent()),
    );
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
    this.handleChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType,
      ),
    );
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
    const wrapper = {
      backgroundColor: 'lightblue',
      marginRight: '0px',
      width: '520px',
      padding: '5px',
      marginTop: '5px',
    };
    const format = {
      fontSize: '18px',
    };

    return (
      <div className="data-list" style={format}>
        <div>Segment: {parseInt(this.props.match.params.segmentId, 10) + 1}</div>

        <div style={{ marginTop: '20px' }}>
          <span>Source:</span>
          <div style={wrapper}>{this.state.segment.source}</div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <span>Machine Translation:</span>
          <div style={wrapper} dangerouslySetInnerHTML={{__html: this.state.segment.target }} />
        </div>

        <div style={{ marginTop: '20px' }}>
          <span>Target:</span>
          <div style={wrapper} onClick={this.focus} tabIndex={0} role={'Form'} >
            <CustomEditor
              editorState={this.state.editorState}
              toggleBlockType={this.toggleBlockType}
              toggleInlineStyle={this.toggleInlineStyle}
              handleKeyCommand={this.handleKeyCommand}
              handleChange={this.handleChange}
              ref={(ref) => { this.CustomEditor = ref; }}
            />
          </div>
        </div>
      </div>
    );
  }
}

Segment.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  updateSegment: PropTypes.func.isRequired,
  documents: PropTypes.objectOf(PropTypes.object).isRequired,
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
