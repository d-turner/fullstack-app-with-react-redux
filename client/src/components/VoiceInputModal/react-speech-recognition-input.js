import React, { Component, PropTypes } from 'react';
import styles from './index.css';
import mic from './mic.gif';
import micAnimate from './mic-animate.gif';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      supportVoice: 'webkitSpeechRecognition' in window,
      speaking: false,
    };
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
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
            console.log('Current Event Final: ', event.results[i][0].transcript);
            console.log('Final: ', finalTranscript);
            this.setState({
              inputValue: finalTranscript,
            });
            // if (this.props.onEnd) this.props.onEnd(finalTranscript);
            if (this.props.onChange) this.props.onChange(event.results[i][0].transcript);
          } else {
            interimTranscript += event.results[i][0].transcript;
            console.log('Current Event Interim: ', event.results[i][0].transcript);
            console.log('Total: ', interimTranscript);
            this.setState({
              inputValue: interimTranscript,
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
        <textarea
          className={`${styles.editor} ${styles.chatMessageInput}`}
          value={this.state.inputValue}
          onChange={this.changeValue.bind(this)}
          placeholder="Voice Recognition will insert at cursor point or replace selected text"
          ref={(ref) => { this.textarea = ref; }} />
        <div className={`flex sixth ${styles.buttons}`}>
          <img
            alt="Microphone for voice input"
            tabIndex="-10"
            role="button"
            src={this.state.speaking ? micAnimate : mic}
            className={styles.micImg}
            onClick={this.say.bind(this)} />
          <button className={`shyButton success ${styles.button}`}
            onClick={() => {
              this.props.onEnd(this.state.inputValue);
              this.setState({ inputValue: '' });
            }}
          >
            <i className={`material-icons ${styles.icon}`}>done</i>
          </button>
          <button className={`shyButton error ${styles.button}`}
            onClick={() => this.setState({ inputValue: '' })}
          >
            <i className={`material-icons ${styles.icon}`}>clear</i>
          </button>
        </div>
      </div>
    );
  }

  render() {
    return this.state.supportVoice ? this.renderVoiceInput() : null;
  }
}

// <textarea
// value={this.state.inputValue}
// onChange={this.changeValue.bind(this)}
// className={styles.chatMessageInput}
// placeholder="Enter Translation"
// ref={(ref) => { this.textarea = ref; }} />