import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Input from './react-speech-recognition-input';
import styles from '../SplitModal/split.scss';
import { updateFromVoice } from './actions';
import store from '../../store';

class VoiceInput extends React.Component {
  constructor(props) {
    super(props);
    this.finished = this.finished.bind(this);
    this.result = this.result.bind(this);
  }

  finished() {
    const { documentId, segmentId, removeModal } = this.props;
    const text = this.Input.textarea.value;
    console.log('Submitting...');
    console.log(this.Input.textarea.value);
    store.dispatch(updateFromVoice(documentId, segmentId, text));
    removeModal();
  }

  result(result) {
    console.log(result);
    console.log('On change updating...');
    this.Input.textarea.value = result;
  }

  end(result) {
    console.log(result);
    console.log('On end does not do what we want');
    // this.Input.textarea.value = result;
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
          className={styles.content1}>
          <div className={styles.wrapper} >
            <h5>#{segmentId} Voice Input</h5>
            <div className={styles.innerText}>
              {content}
              <Input onChange={value => this.result(value)}
                onEnd={value => this.end(value)}
                lang={this.props.lang}
                ref={(ref) => { this.Input = ref; }} />
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
  lang: 'en-US',
};

VoiceInput.propTypes = {
  renderModal: PropTypes.bool,
  content: PropTypes.string.isRequired,
  segmentId: PropTypes.number.isRequired,
  documentId: PropTypes.string.isRequired,
  removeModal: PropTypes.func.isRequired,
  lang: PropTypes.string,
};

export default VoiceInput;
