import React from 'react';
import PropTypes from 'prop-types';

import style from './VoiceAssistant.scss';

class VoiceAssistant extends React.Component {
  state = { };

  componentDidMount() {
    if (window.annyang && window.SpeechKITT) {
      const { annyang, SpeechKITT } = window;
      const commands = {
        accept: this.acceptTranslation,
        reject: this.rejectTranslation,
        next: this.nextSegment,
        previous: this.prevSegment,
        undo: this.undo,
        redo: this.redo,
        'copy :source to :destination': this.copyText,
        'clear :number': this.clearText,
        'move :number': this.focus,
        'hello world': () => alert('Hello world!'),
      };

      // Add our commands to annyang
      annyang.addCommands(commands);

      annyang.addCallback('error', (error) => {
        console.log('There was an error!', error);
      });

      annyang.addCallback('result', (whatWasHeardArray) => {
        console.log(whatWasHeardArray);
      });

      // Tell KITT to use annyang
      SpeechKITT.annyang();

      // Define a stylesheet for KITT to use
      SpeechKITT.setStylesheet('/assets/flat.css');

      // Render KITT's interface
      SpeechKITT.vroom({ debug: true });
    }
  }
  componentWillUnmount() {
  }

  acceptTranslation = () => {
    console.log('Accepting translation');
    this.props.acceptTranslation(this.props.selectedSegment);
    // need to move to the next segment and send action UPDATE_SEGMENT_STATE
  }
  rejectTranslation = () => {
    console.log('Reject Translation');
    this.props.rejectTranslation(this.props.selectedSegment);
    // need to clear the editor and send action UPDATE_SEGMENT_STATE
  }
  nextSegment = () => {
    console.log('Moving to next segment');
    this.props.updateSelected(this.props.selectedSegment + 1);
    // need to move to the next segment
  }
  prevSegment = () => {
    console.log('Moving to previous segment');
    if (this.props.selectedSegment > 0) {
      this.props.updateSelected(this.props.selectedSegment - 1);
    }
    // need to move to the previous segment
  }
  copyText = (source, destination) => {
    console.log(`Copying text from ${source} to ${destination}`);
    // need to copy text from the source to the target
  }
  clearText = (number) => {
    console.log('Clearing text', number);
    // need to clear the editor
  }
  focus = (number) => {
    console.log(`Focusing ${number}`);
    // if in tile mode need to focus to that tile
  }

  render() {
    return (
      <div />
    );
  }
}

VoiceAssistant.propTypes = {

};

export default VoiceAssistant;

