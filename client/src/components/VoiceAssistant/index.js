import React from 'react';
import PropTypes from 'prop-types';

import style from './VoiceAssistant.scss';

class VoiceAssistant extends React.Component {
  state = { };

  componentDidMount() {
    if (window.annyang && window.SpeechKITT) {
      const { annyang, SpeechKITT } = window;
      const commands = {
        'next word': this.nextWord,
        'previous word': this.previousWord,
        'select word': this.selectWord,
        'copy word': this.copyWord,
        'cut word': this.cutWord,
        'paste word': this.pasteWord,
        accept: this.acceptTranslation,
        reject: this.rejectTranslation,
        'next segment': this.nextSegment,
        'previous segment': this.prevSegment,
        undo: this.undo,
        redo: this.redo,
        'copy :source to :destination': this.copyText,
        'clear :number': this.clearText,
        'focus editor': this.focus,
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

  nextWord = () => {
    console.log('Moving to the next word');
    this.props.CustomEditor.nextWord();
  }

  previousWord = () => {
    console.log('Moving to the previous word');
    this.props.CustomEditor.previousWord();
  }

  selectWord = () => {
    console.log('Selecting the current word');
    this.props.CustomEditor.selectWord();
  }

  copyWord = () => {
    console.log('Copying the current word');
    this.props.CustomEditor.copyWord();
  }

  cutWord = () => {
    console.log('Cutting the current word');
    this.props.CustomEditor.cutWord();
  }

  pasteWord = () => {
    console.log('Pasting the current clipboard');
    this.props.CustomEditor.pasteWord();
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
  undo = () => {
    console.log('Undo not Ready Ye');
  }
  redo = () => {
    console.log('Redo not Ready Yet');
  }
  copyText = (source, destination) => {
    console.log(`Copying text from ${source} to ${destination}`);
    // need to copy text from the source to the target
  }
  clearText = (number) => {
    console.log('Clearing text', number);
    // need to clear the editor
  }
  focus = () => {
    console.log('Focusing editor');
    this.props.Editor.focus();
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

