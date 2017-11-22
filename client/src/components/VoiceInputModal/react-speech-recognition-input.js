import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import mic from './mic.gif';
import micAnimate from './mic-animate.gif';

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
      this.recognition.lang = this.props.lang || 'en-US';
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

  renderVoiceInput() {
    return (
      <div className={`${styles.chatInputWrapper} ${this.props.className}`} >
        {this.state.speaking || !this.state.isFirst ? (
          <textarea
            className={`${styles.editor} ${styles.chatMessageInput}`}
            value={this.state.inputValue}
            onChange={e => this.changeValue(e)}
            aria-label="Voice Recognition Input"
            placeholder="Voice Recognition Input"
            ref={(ref) => { this.textarea = ref; }} />
        ) : <div className={styles.hideEditor} />}
        <div className={`flex sixth ${styles.buttons}`}>
          <button
            className={styles.removeStyles}
            onClick={(e) => {
              e.preventDefault();
              this.say();
              const x = window.scrollX;
              const y = window.scrollY;
              this.props.editor.focus();
              window.scrollTo(x, y);
            }}>
            <img
              alt="Microphone for voice input"
              src={this.state.speaking ? micAnimate : mic}
              className={styles.micImg} />
          </button>
          {this.state.speaking || !this.state.isFirst ? (
            <div style={{ padding: '0px' }}>
              <button className={`shyButton ${styles.button}`}
                onClick={(e) => {
                  e.preventDefault();
                  this.stop();
                  this.props.onEnd(this.state.inputValue.trim());
                  const x = window.scrollX;
                  const y = window.scrollY;
                  setTimeout(() => {
                    this.props.editor.focus();
                    window.scrollTo(x, y);
                  }, 200);
                }}
              >
                <i className={`material-icons ${styles.icon}`}>done</i>
              </button>
              <button className={`shyButton error ${styles.button}`}
                onClick={(e) => {
                  e.preventDefault();
                  this.stop();
                  const x = window.scrollX;
                  const y = window.scrollY;
                  setTimeout(() => {
                    this.props.editor.focus();
                    window.scrollTo(x, y);
                  }, 200);
                }}
              >
                <i className={`material-icons ${styles.icon}`}>clear</i>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  render() {
    return this.state.supportVoice ? this.renderVoiceInput() : null;
  }
}

VoiceInput.propTypes = {
  lang: PropTypes.string,
  onEnd: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  editor: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
};
