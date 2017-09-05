import store from '../../store';
import * as actions from './KeyLoggerActions';

class KeyLogger {
  constructor(segmentId, source, target) {
    this.buffer = [];
    this.segmentId = segmentId;
    this.source = source;
    this.target = target;
    this.translation = null;
    this.setTarget = this.setTarget.bind(this);
    this.record = this.record.bind(this);
    this.save = this.save.bind(this);
  }

  setTarget(translation) {
    this.translation = translation;
  }

  record(e) {
    const timestamp = Date.now() || 0;
    const stroke = {
      type: 'keystroke',
      k: e.key,
      t: timestamp,
    };
    this.buffer.push(stroke);
  }

  save() {
    store.dispatch(actions.addLogger(this));
  }

  build() {
    store.dispatch(actions.build());
  }

  tileDrag(e) {
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