import React, { Component, PropTypes } from 'react';
import styles from './index.css';
import mic from './mic.gif';
import micAnimate from './mic-animate.gif';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.say = this.say.bind(this);
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
      // this.recognition.start();
      this.recognition.onresult = (event) => {
        this.interimTranscript = '';
        this.finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.finalTranscript += event.results[i][0].transcript;
            // console.log('Current Event Final: ', event.results[i][0].transcript);
            // console.log('Final: ', finalTranscript);
            this.setState({
              inputValue: this.finalTranscript,
            });
            // if (this.props.onEnd) this.props.onEnd(finalTranscript);
            // if (this.props.onChange) this.props.onChange(event.results[i][0].transcript);
          } else {
            this.interimTranscript += event.results[i][0].transcript;
            // console.log('Current Event Interim: ', event.results[i][0].transcript);
            // console.log('Total: ', interimTranscript);
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

  say() {
    if (this.state.supportVoice) {
      if (!this.state.speaking) {
        this.recognition.start();
      } else {
        this.recognition.stop();
      }
      this.setState({
        speaking: !this.state.speaking,
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
            onChange={this.changeValue.bind(this)}
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
          {this.state.speaking ? (
            <div style={{ padding: '0px' }}>
              <button className={`shyButton ${styles.button}`}
                onClick={(e) => {
                  e.preventDefault();
                  this.say();
                  this.finalTranscript = '';
                  this.interimTranscript = '';
                  this.props.onEnd(this.state.inputValue.trim());
                  this.setState({ inputValue: '', isFirst: false });
                  const x = window.scrollX;
                  const y = window.scrollY;
                  setTimeout(() => {
                    this.say();
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
                  this.say();
                  this.finalTranscript = '';
                  this.interimTranscript = '';
                  this.setState({ inputValue: '', isFirst: false });
                  const x = window.scrollX;
                  const y = window.scrollY;
                  setTimeout(() => {
                    this.say();
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
