import React from 'react';
import PropTypes from 'prop-types';

import styles from '../tile.scss';

class SortableListItem extends React.Component {
  state = { doubleClick: false, word: this.props.value, backup: this.props.value };

  componentDidUpdate() {
    if (this.state.doubleClick) {
      this.tile.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      const el = document.getElementById('editable');
      range.setStart(el.childNodes[0], this.tile.innerHTML.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  // handleDoubleClick = (event) => {
  //   // if (this.state.doubleClick) return;
  //   // if (event.nativeEvent.type === 'dblclick' || event.key === 'Enter' || event.key === 'Space') {
  //   //   this.setState({ doubleClick: true });
  //   // }
  // }

  handleFocus = () => {
    document.execCommand('selectAll', false, null);
  }

  removeWord = () => {
    this.props.updateWord(this.props.itemIndex, '');
  }

  handleBlur = (event) => {
    if (event !== undefined) {
      let text = this.state.word.trim();
      this.props.updateWord(this.props.itemIndex, text);
      if (text.split(' ')[0] === this.state.backup) text = this.state.backup;
      this.setState({ doubleClick: false, word: text });
    }
  }

  keyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleBlur(event);
    } else if (event.key === 'Escape') {
      // reset the word if Escape was pressed
      this.setState({ word: this.state.backup, doubleClick: false });
    }
  }

  onChange = (event) => {
    this.setState({ word: event.target.value });
  }

  render() {
    let closeButton = null;
    if (this.props.editable) {
      closeButton = (
        <button className={styles.closeButton} onClick={this.removeWord}>
          <i className="material-icons">highlight_off</i>
        </button>
      );
    }
    return (
      <li className={`${styles.format1} ${styles.noselect} ${styles.maxWidth}`}
        data-list-item={this.props.editable}
        style={{ cursor: 'move' }}>
        <div className={styles.tile}>
          <span className={styles.grippy} />
          {this.props.editable ?
            <input className={styles.text}
              style={{ width: `${this.state.word.length * 10 + 10}px` }}
              type="text"
              spellCheck="false"
              cols="1"
              rows="1"
              onChange={event => this.onChange(event)}
              onKeyDown={event => this.keyDown(event)}
              onBlur={event => this.handleBlur(event)}
              value={this.state.word}
              ref={(tile) => { this.tile = tile; }} /> :
            <span>{this.props.value}</span>
          }
          {closeButton}
          &nbsp;
        </div>
      </li>
    );
  }
}

SortableListItem.propTypes = {
  value: PropTypes.string.isRequired,
  itemIndex: PropTypes.number.isRequired,
  updateWord: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
};

export default SortableListItem;
