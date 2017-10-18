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
      speaking: true,
    };
  }

  componentDidMount() {
    if (this.state.supportVoice) {
      const WebkitSpeechRecognition = window.webkitSpeechRecognition;
      this.recognition = new WebkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.props.lang || 'en-US';
      this.recognition.start();
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
            if (this.props.onEnd) this.props.onEnd(finalTranscript);
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
        // start listening
        this.recognition.start();
      } else {
        this.recognition.stop();
        const question = this.state.inputValue;
        this.props.onEnd(question);
      }
      this.setState({
        speaking: !this.state.speaking,
      });
    }
  }

  render() {
    return (
      <div style={{ display: 'inline', float: 'right' }} className={`${styles.chatInputWrapper} ${this.props.className}`} >
        {
          this.state.supportVoice ?
            <img
              alt="Microphone for voice input"
              tabIndex="-10"
              role="button"
              src={this.state.speaking ? micAnimate : mic}
              className={styles.micImg}
              onClick={this.say.bind(this)} /> : null
        }
        <textarea
          value={this.state.inputValue}
          onChange={this.changeValue.bind(this)}
          className={styles.chatMessageInput}
          placeholder="Voice Recognition"
          ref={(ref) => { this.textarea = ref; }} />
      </div>
    );
  }
}

// <textarea
// value={this.state.inputValue}
// onChange={this.changeValue.bind(this)}
// className={styles.chatMessageInput}
// placeholder="Enter Translation"
// ref={(ref) => { this.textarea = ref; }} />