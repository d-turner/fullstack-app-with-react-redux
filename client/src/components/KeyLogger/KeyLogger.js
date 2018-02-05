import store from '../../store';
import * as actions from './KeyLoggerActions';

class KeyLogger {
  constructor(documentId, segmentId, source, target, userId, email) {
  /*
   * segment_index, document_id, machine_translation,
   * edit_mode_time, tile_mode_time, voice_mode_time, total_edit_time,
   * characters_entered, words_entered, mode
   */
    this.buffer = [];
    this.userId = userId;
    this.email = email;
    this.documentId = documentId;
    this.segmentId = segmentId;
    this.source = source;
    this.target = target;
    this.translation = null;

    /* Need to find out what mode its in */
    // create a stopwatch for each mode
    // expose a start and stop function for each
    // call start on that mode when it is rendered
    // call stop when that mode is unmounted
    this.editStart = 0;
    this.editEnd = 0;
    this.editTotal = 0;
    this.tileStart = 0;
    this.tileEnd = 0;
    this.tileTotal = 0;
    this.voiceStart = 0;
    this.voiceEnd = 0;
    this.voiceTotal = 0;
    this.startTime = Date.now();
    this.endTime = 0;
    // this.words = 0;
    // this.characters; => already recorded just need to count the keystrokes in buffer
    // this.mode = 'None';
    // all the indivdual times should add up to the total time
    // need to save all the translation attempts ?? or just the final
    // on selected segment unmount need to update the values and send to the server
  }

  setTimer = (timer) => {
    this[timer] = Date.now();
  }

  getDifference = (startTimer, endTimer) => {
    return endTimer - startTimer;
  }

  setEditTotal = () => {
    this.editEnd = Date.now();
    this.editTotal += this.editEnd - this.editStart;
  }

  setTileTotal = () => {
    this.tileEnd = Date.now();
    this.tileTotal += this.tileEnd - this.tileStart;
  }

  setVoiceTotal = () => {
    this.voiceEnd = Date.now();
    this.voiceTotal += this.voiceEnd - this.voiceStart;
  }

  setTarget = (translation) => {
    this.translation = translation;
  }

  record = (e) => {
    const timestamp = Date.now() || 0;
    const stroke = {
      type: 'keystroke',
      k: e.key,
      t: timestamp,
    };
    this.buffer.push(stroke);
  }

  voiceInput = (value) => {
    const timestamp = Date.now() || 0;
    const stroke = {
      type: 'voiceInput',
      word: value,
      t: timestamp,
    };
    this.buffer.push(stroke);
  }

  updateWord = (event) => {
    const timestamp = Date.now() || 0;
    const stroke = {
      type: 'TileEdit',
      index: event.index,
      word: event.text,
      t: timestamp,
    };
    this.buffer.push(stroke);
  }

  save = () => {
    this.endTime = Date.now();
    store.dispatch(actions.addLogger(this));
  }

  build = () => {
    store.dispatch(actions.build(this.documentId, this.userId, this.email));
  }

  tileDrag = (e) => {
    const timestamp = Date.now() || 0;
    const stroke = {
      type: 'drag',
      sourceIndex: e.dragIndex,
      targetIndex: e.hoverIndex,
      sourceWord: e.word,
      targetWord: e.targetWord,
      t: timestamp,
    };
    this.buffer.push(stroke);
  }
}

export const interval = (buffer) => {
  window.setInterval(() => {
    console.log(buffer);
  }, 2000);
};

export default KeyLogger;
