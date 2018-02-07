import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactToolTip from 'react-tooltip';

import styles from './VoiceInput.scss';
import mic from './mic.gif';
import micAnimate from './mic-animate.gif';
import Button from '../ButtonList/Button';
import TextError from '../Error/TextError';

export default class VoiceInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      interimValue: '',
      supportVoice: 'webkitSpeechRecognition' in window,
      speaking: false,
      isFirst: true,
      error: false,
    };
    this.finalTranscript = '';
    this.interimTranscript = '';
  }

  componentDidMount() {
    if (this.state.supportVoice) {
      const WebkitSpeechRecognition = window.webkitSpeechRecognition;
      this.recognition = new WebkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.props.lang;
      this.finalTranscript = '';
      this.recognition.onresult = (event) => {
        this.interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.finalTranscript += event.results[i][0].transcript;
            this.setState({
              inputValue: this.finalTranscript,
            });
            // if (this.props.onEnd) this.props.onEnd(finalTranscript);
            // if (this.props.onChange) this.props.onChange(event.results[i][0].transcript);
          } else {
            this.interimTranscript += event.results[i][0].transcript;
            this.setState({
              interimValue: this.interimTranscript,
            });
          }
        }
      };
      this.recognition.onerror = (event) => {
        console.log('Speech recognition error detected: ' + event.error);
      };
      this.recognition.onend = (event) => {
        if (this.state.speaking) {
          // need to show stop and show an error that it did not detect anything
          this.setState({ error: true });
          this.stop();
        }
      };
    }
  }

  changeValue = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  stop = () => {
    if (this.state.supportVoice) {
      this.recognition.stop();
      this.finalTranscript = '';
      this.interimTranscript = '';
      this.setState({
        speaking: false,
        isFirst: false,
      });
    }
  }

  say = () => {
    if (this.state.supportVoice) {
      if (!this.state.speaking) {
        this.recognition.start();
      } else {
        this.recognition.stop();
      }
      this.setState({
        speaking: !this.state.speaking,
        isFirst: false,
        error: false,
      });
    }
  }

  renderEditor = () => {
    let hide = '';
    if (!this.state.speaking && this.state.isFirst) hide = styles.hideEditor;
    return (
      <textarea
        className={`${styles.editor} ${hide}`}
        value={this.state.inputValue}
        onChange={e => this.changeValue(e)}
        aria-label="Voice Recognition Input"
        placeholder="Voice Recognition Input"
        ref={(ref) => { this.textarea = ref; }} />
    );
  }

  renderButtons = () => {
    return (
      <div className={`flex one center ${styles.buttons} ${this.props.className}`}>
        <button
          data-tip
          data-for="Toggle Recording"
          aria-label="Start Recoding"
          className={`${styles.removeStyles} two-third ${styles.button}`}
          onClick={(e) => {
            e.preventDefault();
            this.say();
            setTimeout(() => {
              this.textarea.focus();
            }, 100);
          }}>
          <img
            alt="Microphone for voice input"
            src={this.state.speaking ? micAnimate : mic}
            className={styles.micImg} />
          <ReactToolTip place="right" id="Toggle Recording" effect="solid">
            <span>Toggle Recording</span>
          </ReactToolTip>
        </button>
        <Button classNames={`shyButton success two-third ${styles.button}`}
          label="Accept Voice Input"
          icon="done"
          func={(e) => {
            e.preventDefault();
            this.props.editor.focus();
            this.props.onEnd(this.state.inputValue.trim());
            this.stop();
          }}
          id="Accept Voice Input"
          direction="right" />

        <Button classNames={`shyButton error two-third ${styles.button}`}
          label="Reject Voice Input"
          icon="clear"
          func={(e) => {
            e.preventDefault();
            const event = { target: { value: '' }};
            this.changeValue(event);
            this.props.editor.focus();
            this.stop();
          }}
          id="Reject Voice Input"
          direction="right" />
      </div>
    );
  }

  renderVoiceInput() {
    return (
      <div className="full half-500 three-fifth-700 off-fifth-700 two-fifth-800 fifth-1200 off-none-1200">
        <div className={`flex one ${styles.chatInputWrapper} ${this.props.className}`}>
          {this.renderEditor()}
          {this.state.error ? <TextError error="No speech recognised, please try again..." /> : null}
          <div className="full">
            {this.renderButtons()}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.state.supportVoice ? this.renderVoiceInput() : null;
  }
}

VoiceInput.defaultProps = {
  lang: 'en-us',
  className: '',
};

VoiceInput.propTypes = {
  lang: PropTypes.string,
  onEnd: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  editor: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
};
