import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RichUtils } from 'draft-js';

// import the actions from the document reducer,
// we do not need a separate reducer of this component
import * as actionCreators from '../ActionCreators/SegmentActions';

import styles from '../styles.css';
import SegmentPresentation from '../Presentation/Segment';

class Segment extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.focus = () => this.SegmentPresentation.CustomEditor.Editor.focus();
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
    this.dictionaryLookup = state => this._dictionaryLookup(state);
    this.splitSegment = state => this._splitSegment(state);
    this.findReplace = state => this._findReplace(state);
  }

  handleChange(editorState) {
    this.props.updateSegment(
      this.props.documentId,
      this.props.segmentId,
      editorState,
    );
  }

  _findReplace() {
    const selectionState = this.props.editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = this.props.editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);
    this.props.renderFindReplace(selectedText, this.props.segmentId, start);
  }

  _splitSegment() {
    const selectionState = this.props.editorState.getSelection();
    const cursorEnd = selectionState.getEndOffset();
    this.props.splitSegment(this.props.segmentId, this.props.documentId, cursorEnd);
  }

  _dictionaryLookup() {
    const selectionState = this.props.editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = this.props.editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);
    this.props.lookupLexicon(selectedText);
  }

  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.props.editorState, command);
    if (newState) {
      console.log('handled');
      this.handleChange(newState);
    } else {
      console.log('not-handled');
    }
  }

  _toggleBlockType(blockType) {
    if (blockType === 'LOOKUP') {
      this.dictionaryLookup(this.props.editorState);
    } else if (blockType === 'SPLIT') {
      this.splitSegment(this.props.editorState);
    } else if (blockType === 'FIND-REPLACE') {
      this.findReplace(this.props.editorState);
    } else {
      this.handleChange(
        RichUtils.toggleBlockType(
          this.props.editorState,
          blockType,
        ),
      );
    }
  }

  _toggleInlineStyle(inlineStyle) {
    this.handleChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle,
      ),
    );
  }

  render() {
    return (
      <div className={styles.segmentWrapper}>
        <SegmentPresentation
          segment={this.props.documents[this.props.documentId].xliff.segments[this.props.segmentId]}
          editorState={this.props.editorState}
          toggleBlockType={this.toggleBlockType}
          toggleInlineStyle={this.toggleInlineStyle}
          handleKeyCommand={this.handleKeyCommand}
          handleChange={this.handleChange}
          focus={this.focus}
          segmentId={this.props.segmentId}
          selectedSegment={this.props.selectedSegment}
          ref={(ref) => { this.SegmentPresentation = ref; }}
        />
      </div>
    );
  }
}

Segment.propTypes = {
  documentId: PropTypes.number.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateSegment: PropTypes.func.isRequired,
  lookupLexicon: PropTypes.func.isRequired,
  splitSegment: PropTypes.func.isRequired,
  renderFindReplace: PropTypes.func.isRequired,
  segmentId: PropTypes.number.isRequired,
  selectedSegment: PropTypes.number.isRequired,
  editorState: PropTypes.objectOf(PropTypes.any).isRequired,
};


const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { documentReducer } = state;
  const { documents, selectedSegment } = documentReducer;
  // return what we want available in the props
  return {
    documents, selectedSegment,
  };
};

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Segment);
