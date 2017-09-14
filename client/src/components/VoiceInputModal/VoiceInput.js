import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import VoiceRecognition from './VoiceRecognition';
import styles from '../SplitModal/split.scss';

class VoiceInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stop: false };
    this.finished = this.finished.bind(this);
    this.result = this.result.bind(this);
  }

  finished() {
    this.setState({ stop: true });
  }

  result(result) {
    console.log(result);
  }

  render() {
    const { renderModal, removeModal, segmentId, content } = this.props;
    if (renderModal) {
      return (
        <ReactModal
          role="Dialog"
          tabIndex={0}
          isOpen={renderModal}
          contentLabel="Voice input for translation"
          overlayClassName={styles.overlay}
          className={styles.content}>
          <div className={styles.wrapper} >
            <h5>#{segmentId} Voice Input</h5>
            <div className={styles.innerText}>
              {content}
              <VoiceRecognition stop={this.state.stop} onResult={result => this.result(result)} onEnd={result => this.result(result)} onError={result => this.result(result)} />
              <textarea ref={(ref) => { this.textarea = ref; }} />
            </div>

            <div className={styles.buttons}>
              <button onClick={() => removeModal()}>Cancel</button>
              <button onClick={() => this.finished()}>Done</button>
            </div>
          </div>
        </ReactModal>
      );
    }
    return null;
  }
}

VoiceInput.defaultProps = {
  renderModal: false,
};

VoiceInput.propTypes = {
  renderModal: PropTypes.bool,
  content: PropTypes.string.isRequired,
  segmentId: PropTypes.number.isRequired,
  documentId: PropTypes.string.isRequired,
  removeModal: PropTypes.func.isRequired,
};

export default VoiceInput;
