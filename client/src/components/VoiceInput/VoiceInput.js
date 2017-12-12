import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './VoiceInput.scss';
import mic from './mic.gif';
import micAnimate from './mic-animate.gif';
import Button from '../ButtonList/Button';

export default class VoiceInput extends Component {
  constructor(props) {
    super(props);
    this.say = this.say.bind(this);
    this.stop = this.stop.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      inputValue: '',
      supportVoice: 'webkitSpeechRecognition' in window,
      speaking: false,
      isFirst: true,
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
      this.recognition.onresult = (event) => {
        this.interimTranscript = '';
        this.finalTranscript = '';
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
              inputValue: this.interimTranscript,
            });
          }
        }
      };
    }
  }

  changeValue(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  stop() {
    if (this.state.supportVoice) {
      this.recognition.stop();
      this.finalTranscript = '';
      this.interimTranscript = '';
      this.setState({
        speaking: false,
        isFirst: false,
        inputValue: '',
      });
    }
  }

  say() {
    if (this.state.supportVoice) {
      if (!this.state.speaking) {
        this.recognition.start();
      } else {
        this.recognition.stop();
      }
      this.setState({
        speaking: !this.state.speaking,
        isFirst: false,
      });
    }
  }

  renderEditor = () => {
    return (
      <textarea
        className={`${styles.editor} ${styles.chatMessageInput}`}
        value={this.state.inputValue}
        onChange={e => this.changeValue(e)}
        aria-label="Voice Recognition Input"
        placeholder="Voice Recognition Input"
        ref={(ref) => { this.textarea = ref; }} />
    );
  }

  renderButtons = () => {
    return (<div className={`flex one center ${styles.buttons}`}>
      <button
        className={`${styles.removeStyles} two-third ${styles.button}`}
        onClick={(e) => {
          e.preventDefault();
          this.say();
          this.props.editor.focus();
        }}>
        <img
          alt="Microphone for voice input"
          src={this.state.speaking ? micAnimate : mic}
          className={styles.micImg} />
      </button>
      <Button classNames={`shyButton success two-third ${styles.button}`}
        label="Accept Voice Input"
        icon="done"
        func={(e) => {
          e.preventDefault();
          this.stop();
          this.props.onEnd(this.state.inputValue.trim());
          this.props.editor.focus();
        }}
        id="Accept Voice Input"
        direction="right" />

      <Button classNames={`shyButton error two-third ${styles.button}`}
        label="Reject Voice Input"
        icon="clear"
        func={(e) => {
          e.preventDefault();
          this.stop();
          this.props.editor.focus();
        }}
        id="Reject Voice Input"
        direction="right" />

    </div>);
  }

  renderVoiceInput() {
    return (
      <div className={`flex one ${styles.chatInputWrapper} ${this.props.className}`} >
        {this.state.speaking || !this.state.isFirst ? this.renderEditor() :
        <div className={styles.hideEditor} />}
        <div className="full">
          {this.renderButtons()}
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
};

VoiceInput.propTypes = {
  lang: PropTypes.string,
  onEnd: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  editor: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
};
