import React from 'react';
import PropTypes from 'prop-types';

import { addEvent, removeEvent, touchDndCustomEvents, syntheticEvent } from '../../../utils/eventsHelper';

import styles from '../tile.scss';

const touchStart = (touchEvent) => {
  touchEvent.preventDefault();
  const { target } = touchEvent;
  const type = 'dragstart';
  const event = syntheticEvent(type, touchEvent, null, target);
  target.dispatchEvent(event);
};

const touchMove = (touchEvent) => {
  touchEvent.preventDefault();
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
  touchEvent.preventDefault();
  let { target } = touchEvent;
  const type = 'drop';
  const bin = document.getElementById('trash');
  bin.dispatchEvent(syntheticEvent('dragleave', touchEvent, null, bin));
  const event = syntheticEvent(type, touchEvent, null, target);
  if (touchDndCustomEvents.lastDraggedOver === document.getElementById('trash') ||
      touchDndCustomEvents.lastDraggedOver === document.querySelector('#trash > i')) {
    target = document.querySelector('#trash');
  }
  target.dispatchEvent(event);
};

class SortableListItem extends React.Component {
  state = { word: this.props.value, backup: this.props.value };

  componentDidMount() {
    if (this.props.focus) this.tile.focus();
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
    this.setState({ word: event.target.value });
  }

  removeWord = () => {
    this.props.updateWord(this.props.itemIndex, '');
  }

  handleFocus = (e) => {
    // this.execCommand('selectAll', false, null);
    const tempValue = e.target.value;
    e.target.value = '';
    e.target.value = tempValue;
  }

  handleBlur = (event) => {
    if (event !== undefined) {
      let text = this.state.word.trim();
      this.props.updateWord(this.props.itemIndex, text);
      if (text.split(' ')[0] === this.state.backup) text = this.state.backup;
      this.setState({ word: text });
    }
  }

  keyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleBlur(event);
    } else if (event.key === 'Escape') {
      // reset the word if Escape was pressed
      this.setState({ word: this.state.backup });
    }
  }

  render() {
    let plusButton = null;
    let before = null;
    if (!this.props.focus && this.props.insertTiles) {
      plusButton = (
        <button
          className={styles.add}
          onClick={() => this.props.addTile(this.props.itemIndex)}
          onTouchStart={() => this.props.addTile(this.props.itemIndex)}>
          <i className="material-icons">add</i>
        </button>
      );
    }
    if (this.props.itemIndex === 0 && !this.props.focus && this.props.insertTiles) {
      before = (
        <button
          className={styles.add}
          onClick={() => this.props.addTile(-1)}
          onTouchStart={() => this.props.addTile(-1)}>
          <i className="material-icons">add</i>
        </button>
      );
    }
    return (
      <li className={`${styles.format} ${styles.noselect} ${styles.maxWidth}`}
        data-list-item
        data-index={this.props.itemIndex}
        data-value={this.props.value}
        onTouchStart={(e) => {
          if (this.tile) {
            this.tile.focus();
          }
          this.props.setPosition(this.props.itemIndex);
          this.handleFocus(e);
        }}
        ref={(ref) => { this.listItem = ref; }}>
        {before}
        <div className={`${styles.tile} handle`}>
          <span className={styles.grippy} />
          <input className={styles.text}
            style={{ width: `${this.state.word.length * 10 + 17}px` }}
            type="text"
            spellCheck="false"
            cols="1"
            rows="1"
            data-index={this.props.itemIndex}
            onFocus={event => this.props.setTile(event)}
            onChange={event => this.onChange(event)}
            onKeyDown={event => this.keyDown(event)}
            onBlur={event => this.handleBlur(event)}
            value={this.state.word}
            ref={(tile) => { this.tile = tile; }} />
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
  focus: PropTypes.bool,
};

export default SortableListItem;
