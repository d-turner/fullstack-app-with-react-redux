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
import SplitModal from '../../../components/SplitModal/Containers/Modal';

class Segment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { renderModal: false };
    this.handleChange = this.handleChange.bind(this);
    this.focus = () => this.SegmentPresentation.CustomEditor.Editor.focus();
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
    this.splitSegment = () => this._splitSegment();
    this.mergeSegment = () => this._mergeSegment();
    this.removeModal = () => this._removeModal();
  }

  handleChange(editorState) {
    this.props.updateSegment(
      this.props.documentId,
      this.props.segmentId,
      editorState,
    );
  }

  _splitSegment() {
    this.setState({ renderModal: true });
  }
  _removeModal() {
    this.setState({ renderModal: false });
  }

  _mergeSegment() {
    console.log('Merging segments');
    this.props.mergeSegment(this.props.segmentId, this.props.documentId);
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
    if (blockType === 'SPLIT') {
      this.splitSegment();
    } else if (blockType === 'MERGE') {
      this.mergeSegment();
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
        {this.state.renderModal ?
          <SplitModal {...this.props}
            content={this.props.documents[this.props.documentId].xliff.segments[this.props.segmentId].source}
            renderModal={this.state.renderModal}
            removeModal={this.removeModal} /> :
          <div />
        }
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
  documents: PropTypes.objectOf(PropTypes.object).isRequired,
  updateSegment: PropTypes.func.isRequired,
  mergeSegment: PropTypes.func.isRequired,
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
