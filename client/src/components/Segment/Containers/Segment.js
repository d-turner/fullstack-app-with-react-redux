import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RichUtils } from 'draft-js';

// import the actions from the document reducer,
// we do not need a separate reducer of this component
import * as actionCreators from '../ActionCreators/SegmentActions';

import SegmentPresentation from '../Presentation/Segment';
import SegmentTiles from '../Presentation/SegmentTiles';

import KeyLogger from '../../KeyLogger/KeyLogger';

class Segment extends React.Component {
  constructor(props) {
    super(props);
    const { segmentId, documents, documentId, userId, email } = props;
    const segment = documents[documentId].xliff.segments[segmentId];
    this.keyLogger = new KeyLogger(documentId, segmentId, segment.source, segment.target, userId, email);

    this.handleChange = this.handleChange.bind(this);
    this.focus = () => this.SegmentPresentation.CustomEditor.Editor.focus();
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  componentWillUnmount() {
    this.keyLogger.setTarget(this.props.editorState.getCurrentContent().getPlainText());
    this.keyLogger.save();
    this.keyLogger.build();
  }

  handleChange(editorState) {
    this.props.updateSegment(
      this.props.documentId,
      this.props.segmentId,
      editorState,
    );
    this.props.updateSegmentState(this.props.segmentId);
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
    if (this.props.renderTiles) {
      return (
        <SegmentTiles
          segment={this.props.documents[this.props.documentId].xliff.segments[this.props.segmentId]}
          segmentId={this.props.segmentId}
          documentId={this.props.documentId}
          keyLogger={this.keyLogger}
        />
      );
    }
    return (
      <SegmentPresentation
        segment={this.props.documents[this.props.documentId].xliff.segments[this.props.segmentId]}
        documentId={this.props.documentId}
        editorState={this.props.editorState}
        toggleBlockType={this.toggleBlockType}
        toggleInlineStyle={this.toggleInlineStyle}
        handleKeyCommand={this.handleKeyCommand}
        handleChange={this.handleChange}
        focus={this.focus}
        segmentId={this.props.segmentId}
        keyLogger={this.keyLogger}
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
  editorState: PropTypes.objectOf(PropTypes.any).isRequired,
  renderTiles: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};


const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { documentReducer, authenticationReducer } = state;
  const { documents, selectedSegment } = documentReducer;
  const { email, userId } = authenticationReducer;
  // return what we want available in the props
  return {
    documents, selectedSegment, email, userId,
  };
};

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Segment);
