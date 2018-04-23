import React from 'react';
import PropTypes from 'prop-types';

import { addEvent, removeEvent, touchDndCustomEvents, syntheticEvent } from '../../../utils/eventsHelper';

import styles from '../tile.scss';

const leftQuote = '&#8220;';
const rightQuote = '&#8221;';

const touchStart = (touchEvent) => {
  const { target } = touchEvent;
  const type = 'dragstart';
  const event = syntheticEvent(type, touchEvent, null, target);
  target.dispatchEvent(event);
};

const touchMove = (touchEvent) => {
  const x = touchEvent.changedTouches[0].clientX;
  const y = touchEvent.changedTouches[0].clientY;

  const draggedOver = document.elementFromPoint(x, y);
  const { lastDraggedOver } = touchDndCustomEvents;

  if (lastDraggedOver !== draggedOver) {
    touchDndCustomEvents.lastDraggedOver = draggedOver;
  }
  const bin = document.getElementById('trash');
  if (draggedOver === bin || draggedOver === bin.firstChild) {
    // console.log('Over');
    // this.props.onEnter();
    bin.dispatchEvent(syntheticEvent('dragenter', touchEvent, null, bin));
  } else {
    // console.log('Not over');
    bin.dispatchEvent(syntheticEvent('dragleave', touchEvent, null, bin));
  }
  const { target } = touchEvent;
  const type = 'touchdrag';
  const event = syntheticEvent(type, touchEvent, null, target);
  target.dispatchEvent(event);
};

const touchEnd = (touchEvent) => {
  let { target } = touchEvent;
  const type = 'drop';
  const bin = document.getElementById('trash');
  bin.dispatchEvent(syntheticEvent('dragleave', touchEvent, null, bin));
  const event = syntheticEvent(type, touchEvent, null, target);
  if (touchDndCustomEvents.lastDraggedOver === document.getElementById('trash') ||
      touchDndCustomEvents.lastDraggedOver === document.querySelector('#trash > i')) {
    target = document.getElementById('trash');
  }
  touchDndCustomEvents.lastDraggedOver = null;
  target.dispatchEvent(event);
};

class SortableListItem extends React.Component {
  state = { word: this.props.value, backup: this.props.value, class: '' };

  componentWillMount() {
    if (this.props.value === '``') {
      this.setState({ word: leftQuote });
    } else if (this.props.value === "''") {
      this.setState({ word: rightQuote });
    }
  }

  componentDidMount() {
    const { listItem } = this;
    addEvent(listItem, 'touchstart', touchStart);
    addEvent(listItem, 'touchmove', touchMove);
    addEvent(listItem, 'touchend', touchEnd);
  }

  componentWillUnmount() {
    const { listItem } = this;
    removeEvent(listItem, 'touchstart', touchStart);
    removeEvent(listItem, 'touchmove', touchMove);
    removeEvent(listItem, 'touchend', touchEnd);
  }

  onChange = (event) => {
    this.setState({ word: event.target.value, class: 'edited' });
  }

  removeWord = () => {
    this.props.updateWord(this.props.itemIndex, '');
  }

  handleBlur = (event) => {
    if (event !== undefined) {
      let text = this.state.word.trim();
      this.props.updateWord(this.props.itemIndex, text);
      if (text.split(' ')[0] === this.state.backup) text = this.state.backup;
      this.setState({ word: text, class: '' });
    }
  }

  keyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleBlur(event);
    } else if (event.key === 'Escape') {
      // reset the word if Escape was pressed
      this.setState({ word: this.state.backup }, () => { this.tile.blur(); });
    }
  }

  render() {
    let plusButton = null;
    let before = null;
    if (this.props.insertTiles) {
      plusButton = (
        <button
          className={styles.add}
          onClick={() => this.props.addTile(this.props.itemIndex)}>
          <i className="material-icons">add</i>
        </button>
      );
    }
    if (this.props.itemIndex === 0 && this.props.insertTiles) {
      before = (
        <button
          className={styles.add}
          onClick={() => this.props.addTile(-1)}
          onTouchStart={(e) => { this.props.addTile(-1); }}>
          <i className="material-icons">add</i>
        </button>
      );
    }
    let input = (
      <input className={styles.text}
        style={{ width: `${this.state.word.length * 10 + 17}px` }}
        type="text"
        spellCheck="false"
        cols="1"
        rows="1"
        data-index={this.props.itemIndex}
        onFocus={event => this.props.setTile(this.props.itemIndex, this.tile)}
        onChange={event => this.onChange(event)}
        onKeyDown={event => this.keyDown(event)}
        onBlur={event => this.handleBlur(event)}
        value={this.state.word}
        ref={(tile) => { this.tile = tile; }} />
    );
    if (this.state.word === leftQuote) {
      input = (
        <span className={styles.comma}
          ref={(tile) => { this.tile = tile; }}>
          &#8220;
        </span>);
    } else if (this.state.word === rightQuote) {
      input = (
        <span className={styles.comma}
          ref={(tile) => { this.tile = tile; }}>
          &#8221;
        </span>);
    }
    return (
      <li className={`${styles.format} ${styles.noselect} ${styles.maxWidth} ${this.state.class}`}
        data-list-item
        data-index={this.props.itemIndex}
        data-value={this.props.value}
        onDragStart={() => { this.tile.blur(); }}
        onTouchStart={() => { this.tile.blur(); this.props.setPosition(this.props.itemIndex); }}
        ref={(ref) => { this.listItem = ref; }}>
        {before}
        <div className={`${styles.tile} handle`}>
          <span className={styles.grippy} />
          {input}
        </div>
        {plusButton}
      </li>
    );
  }
}

SortableListItem.propTypes = {
  insertTiles: PropTypes.bool,
  value: PropTypes.string.isRequired,
  itemIndex: PropTypes.number.isRequired,
  updateWord: PropTypes.func.isRequired,
  setPosition: PropTypes.func,
  addTile: PropTypes.func.isRequired,
};

export default SortableListItem;
