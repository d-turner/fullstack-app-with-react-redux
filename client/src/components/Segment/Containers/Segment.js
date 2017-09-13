import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RichUtils } from 'draft-js';

// import the actions from the document reducer,
// we do not need a separate reducer of this component
import * as actionCreators from '../ActionCreators/SegmentActions';

import SegmentPresentation from '../Presentation/Segment';

class Segment extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.focus = () => this.SegmentPresentation.CustomEditor.Editor.focus();
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  handleChange(editorState) {
    this.props.updateSegment(
      this.props.documentId,
      this.props.segmentId,
      editorState,
    );
  }

  _handleKeyCommand(command) {
    if (command === 'next-segment') {
      this.props.updateSelectedSegment(this.props.documentId, this.props.segmentId + 1);
      return 'handled';
    }
    const newState = RichUtils.handleKeyCommand(this.props.editorState, command);
    console.log(command);
    if (newState) {
      console.log('handled');
      this.handleChange(newState);
    } else {
      console.log('not-handled');
    }
  }

  _toggleBlockType(blockType) {
    this.handleChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType,
      ),
    );
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
      <SegmentPresentation
        renderTiles={this.props.renderTiles}
        segment={this.props.documents[this.props.documentId].xliff.segments[this.props.segmentId]}
        documentId={this.props.documentId}
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
    );
  }
}

Segment.propTypes = {
  documentId: PropTypes.string.isRequired,
  documents: PropTypes.objectOf(PropTypes.object).isRequired,
  updateSegment: PropTypes.func.isRequired,
  updateSelectedSegment: PropTypes.func.isRequired,
  segmentId: PropTypes.number.isRequired,
  selectedSegment: PropTypes.number.isRequired,
  editorState: PropTypes.objectOf(PropTypes.any).isRequired,
  renderTiles: PropTypes.bool.isRequired,
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
