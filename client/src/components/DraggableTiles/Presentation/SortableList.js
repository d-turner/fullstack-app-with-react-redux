import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';

import styles from '../tile.scss';

class EditableListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { doubleClick: false, word: props.value };
  }

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

  handleDoubleClick = (event) => {
    if (this.state.doubleClick) return;
    if (event.nativeEvent.type === 'dblclick' || event.key === 'Enter' || event.key === 'Space') {
      this.setState({ doubleClick: true });
    }
  }

  handleFocus = () => {
    document.execCommand('selectAll', false, null);
  }

  removeWord = () => {
    this.props.updateWord(this.props.itemIndex, '');
  }

  handleBlur = (event) => {
    if (event !== undefined) {
      const text = event.target.innerHTML;
      this.props.updateWord(this.props.itemIndex, text);
      if (text.trim().split(' ')[0] === this.state.word) {
        event.target.innerText = text.trim().split(' ')[0];
      }
      this.setState({ doubleClick: false });
    }
  }

  keyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleBlur(event);
    } else if (event.key === 'Escape') {
      // reset the word if Escape was pressed
      event.preventDefault();
      event.target.innerText = this.state.word;
      this.setState({ doubleClick: false });
    }
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
      <li className={`${styles.format1} ${styles.noselect}`}
        onDoubleClick={this.handleDoubleClick}
        onKeyDown={this.handleDoubleClick}
        tabIndex={0}
        role="textbox"
        data-list-item={this.props.editable}
        style={{ cursor: 'move' }}>
        <div className={styles.tile}>
          <span className={styles.grippy} />
          <span className={styles.text}
            id={this.state.doubleClick ? 'editable' : null}
            contentEditable={this.props.editable}
            spellCheck="false"
            onKeyDown={this.keyDown}
            onBlur={this.handleBlur}
            ref={(tile) => { this.tile = tile; }}>
            {this.props.value}
          </span>
          {closeButton}
          &nbsp;
        </div>
      </li>
    );
  }
}

EditableListItem.propTypes = {
  value: PropTypes.string.isRequired,
  itemIndex: PropTypes.number.isRequired,
  updateWord: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
};

const SortableItem = SortableElement(props =>
  <EditableListItem {...props} />,
);

const SortableList = SortableContainer((props) => {
  const { items, distance, disabled } = props;
  return (
    <ul className={styles.container}>
      {items.map((value, index) => {
        const key = `item-${index}-${value}`;
        if (value === null || value === '') return null;
        return (
          <SortableItem key={key} index={index} value={value} distance={distance} editable={disabled}
            itemIndex={index}
            {...props} />
        );
      })}
    </ul>
  );
});

export { EditableListItem };
export default SortableList;
