import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RichUtils } from 'draft-js';

// import the actions from the document reducer,
// we do not need a separate reducer of this component
import * as actionCreators from '../ActionCreators/SegmentActions';

import Segment from '../Presentation/Segment';

import KeyLogger from '../../KeyLogger/KeyLogger';

class SelectedSegment extends React.Component {
  constructor(props) {
    super(props);
    const { segmentId, documentId, userId, email, segment } = props;
    this.keyLogger = new KeyLogger(documentId, segmentId, segment.source, segment.target, userId, email);
  }

  componentWillUnmount() {
    this.keyLogger.setTarget(this.props.editorState.getCurrentContent().getPlainText());
    this.keyLogger.save();
    this.keyLogger.build();
  }

  handleChange = (editorState) => {
    this.props.updateSegment(
      this.props.documentId,
      this.props.segmentId,
      editorState,
    );
  }

  // TODO: Implement more shortcut and provide better return values
  handleKeyCommand = (command) => {
    if (command === 'next-segment') {
      this.props.updateSelectedSegment(this.props.documentId, this.props.segmentId + 1);
      return 'handled';
    }
    const newState = RichUtils.handleKeyCommand(this.props.editorState, command);
    if (newState) {
      this.handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  toggleBlockType = (blockType) => {
    this.handleChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType,
      ),
    );
  }

  toggleInlineStyle = (inlineStyle) => {
    this.handleChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle,
      ),
    );
  }

  render() {
    return (
      <Segment
        segment={this.props.segment}
        mt={this.props.mt}
        documentId={this.props.documentId}
        editorState={this.props.editorState}
        toggleBlockType={this.toggleBlockType}
        toggleInlineStyle={this.toggleInlineStyle}
        handleKeyCommand={this.handleKeyCommand}
        handleChange={this.handleChange}
        segmentId={this.props.segmentId}
        keyLogger={this.keyLogger}
        xliff={this.props.xliff}
        renderTiles={this.props.renderTiles}
        insertTiles={this.props.insertTiles}
        ref={(ref) => { this.SegmentPresentation = ref; }}
        setRef={this.props.setRef}
      />
    );
  }
}

SelectedSegment.propTypes = {
  segment: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentId: PropTypes.number.isRequired,
  documentId: PropTypes.string.isRequired,
  updateSegment: PropTypes.func.isRequired,
  updateSelectedSegment: PropTypes.func.isRequired,
  editorState: PropTypes.objectOf(PropTypes.any).isRequired,
  xliff: PropTypes.objectOf(PropTypes.any).isRequired,
  email: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  renderTiles: PropTypes.bool.isRequired,
  setRef: PropTypes.func.isRequired,
  insertTiles: PropTypes.bool.isRequired,
  mt: PropTypes.string,
};

SelectedSegment.defaultProps = {
  mt: '',
};

const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { authenticationReducer } = state;
  const { email, userId } = authenticationReducer;
  // return what we want available in the props
  return {
    email, userId,
  };
};

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedSegment);
