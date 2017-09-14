import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { Editor, EditorState, ContentState } from 'draft-js';

import styles from '../split.scss';
import EditorStyles from '../../Editor/Editor.scss';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    const editorState = EditorState.createWithContent(ContentState.createFromText(props.content));
    this.state = {
      editorState,
    };
    this.handleChange = state => this.setState({ editorState: state });
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.splitSegment = () => this._splitSegment();
  }

  _handleKeyCommand(command) {
    // split the segment if the user hits enter while in the split editor
    if (command === 'split-block') {
      this._splitSegment();
    }
  }

  _splitSegment() {
    const { segmentId, documentId } = this.props;
    const selectionState = this.state.editorState.getSelection();
    const cursorEnd = selectionState.getEndOffset();
    this.props.splitSegment(segmentId, documentId, cursorEnd);
    this.props.removeModal();
  }

  render() {
    if (this.props.renderModal) {
      const { renderModal, removeModal, segmentId } = this.props;
      return (
        <ReactModal
          role="Dialog"
          tabIndex={0}
          isOpen={renderModal}
          contentLabel="Split segment at cursor index on source"
          overlayClassName={styles.overlay}
          className={styles.content}>
          <div className={EditorStyles['RichEditor-root']}>
            <h5>#{segmentId} Split Segment</h5>
            <div className={EditorStyles['RichEditor-editor']}>
              <Editor
                role="Dialog"
                tabIndex={0}
                editorState={this.state.editorState}
                onChange={this.handleChange}
                handleKeyCommand={this.handleKeyCommand}
                ref={(ref) => { this.Editor = ref; }}
              />
            </div>
            <div className={styles.buttons}>
              <button onClick={() => this.splitSegment()}>Split</button>
              <button onClick={() => removeModal()}>Cancel</button>
            </div>
          </div>
        </ReactModal>
      );
    }
    return null;
  }
}

Modal.defaultProps = {
  renderModal: false,
};

Modal.propTypes = {
  renderModal: PropTypes.bool,
  content: PropTypes.string.isRequired,
  segmentId: PropTypes.number.isRequired,
  documentId: PropTypes.string.isRequired,
  splitSegment: PropTypes.func.isRequired,
  removeModal: PropTypes.func.isRequired,
};

export default Modal;
