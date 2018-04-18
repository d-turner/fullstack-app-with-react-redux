import React from 'react';
import PropTypes from 'prop-types';

import styles from '../tile.scss';

class FakeTile extends React.Component {
  state = { word: this.props.value };

  componentDidMount() {
    this.tile.focus();
  }

  onChange = (event) => {
    this.setState({ word: event.target.value });
  }

  handleBlur = (event) => {
    if (event !== undefined) {
      let text = this.state.word.trim();
      this.props.updateWord(this.props.itemIndex, text);
    }
  }

  keyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleBlur(event);
    } else if (event.key === 'Escape') {
      // reset the word if Escape was pressed
      this.tile.blur();
    }
  }

  render() {
    return (
      <li className={`${styles.format} ${styles.noselect} ${styles.maxWidth}`}
        data-list-item
        data-index={this.props.itemIndex}
        data-value={this.props.value}
        ref={(ref) => { this.listItem = ref; }}>
        <div className={`${styles.tile} handle`}>
          <span className={styles.grippy} />
          <input className={styles.text}
            style={{ width: `${this.state.word.length * 10 + 17}px` }}
            type="text"
            spellCheck="false"
            cols="1"
            rows="1"
            data-index={this.props.itemIndex}
            onChange={event => this.onChange(event)}
            onKeyDown={event => this.keyDown(event)}
            onBlur={event => this.handleBlur(event)}
            value={this.state.word}
            ref={(tile) => { this.tile = tile; }} />
        </div>
      </li>
    );
  }
}

FakeTile.propTypes = {
  value: PropTypes.string.isRequired,
  itemIndex: PropTypes.number.isRequired,
  updateWord: PropTypes.func.isRequired,
};

export default FakeTile;
