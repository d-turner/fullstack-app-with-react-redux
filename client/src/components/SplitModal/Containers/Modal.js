import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { Editor, EditorState, ContentState } from 'draft-js';

//  import * as actionCreators from '../ActionCreators/SegmentActions';
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
    this.splitSegment = () => this._splitSegment();
  }

  _splitSegment() {
    const selectionState = this.state.editorState.getSelection();
    const cursorEnd = selectionState.getEndOffset();
    this.props.splitSegment(this.props.segmentId, this.props.documentId, cursorEnd);
    this.props.removeModal();
  }

  render() {
    if (this.props.renderModal) {
      return (
        <ReactModal
          isOpen={this.props.renderModal}
          contentLabel="Split segment at cursor index on source"
          overlayClassName={styles.overlay}
          className={styles.content}>
          <div className={EditorStyles['RichEditor-root']}>
            <div>Split Segment {this.props.segmentId}</div>
            <div className={EditorStyles['RichEditor-editor']}>
              <Editor
                editorState={this.state.editorState}
                onChange={this.handleChange}
                ref={(ref) => { this.Editor = ref; }}
              />
            </div>
            <div className={styles.buttons}>
              <button onClick={() => this.splitSegment()}>Split</button>
              <button onClick={() => this.props.removeModal()}>Cancel</button>
            </div>
          </div>
        </ReactModal>
      );
    }
    return (<div />);
  }
}

Modal.defaultProps = {
  renderModal: false,
};

Modal.propTypes = {
  renderModal: PropTypes.bool,
  content: PropTypes.string.isRequired,
  segmentId: PropTypes.number.isRequired,
  documentId: PropTypes.number.isRequired,
  splitSegment: PropTypes.func.isRequired,
  removeModal: PropTypes.func.isRequired,
};

export default Modal;
