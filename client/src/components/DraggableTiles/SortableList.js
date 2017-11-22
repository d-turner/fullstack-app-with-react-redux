import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';

import styles from './tile.scss';

const Types = {
  SOURCE: 'source',
};

const tileTarget = {
  hover(props, monitor, component) {
    if (monitor.getItemType() === Types.SOURCE) {
      const item = monitor.getItem();
      const dragIndex = item.index;
      const hoverIndex = props.itemIndex;

      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

      // Get horizontal middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels from the left
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      // Should insert tile before when hoverClientX is less than the hoverMiddleX
      // Should insert tile after when hoverClientX is more than the hoverMiddleX
      let isBefore = false;
      // check if less than middle
      if (hoverClientX < hoverMiddleX) {
        isBefore = true;
      }

      // check if more than middle
      if (hoverClientX > hoverMiddleX) {
        isBefore = false;
      }
      // Time to actually perform the action
      props.tempMoveTile(dragIndex, hoverIndex, item.word, isBefore);
    }
  },

  drop(props, monitor, component) {
    if (monitor.getItemType() === Types.SOURCE) {
      const item = monitor.getItem();
      const dragIndex = item.index;
      const hoverIndex = props.itemIndex;

      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

      // Get horizontal middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels from the left
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      // Should insert tile before when hoverClientX is less than the hoverMiddleX
      // Should insert tile after when hoverClientX is more than the hoverMiddleX
      let isBefore = false;
      // check if less than middle
      if (hoverClientX < hoverMiddleX) {
        isBefore = true;
      }

      // check if more than middle
      if (hoverClientX > hoverMiddleX) {
        isBefore = false;
      }
      // Time to actually perform the action
      props.moveSourceTile(dragIndex, hoverIndex, item.word, isBefore);
    }
  },

};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
}

class EditableListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { doubleClick: false, word: props.value };
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  handleDoubleClick(event) {
    if (this.state.doubleClick) return;
    if (event.nativeEvent.type === 'dblclick') {
      this.setState({ doubleClick: true });
      setTimeout(() => {
        this.tile.focus();
        const range = document.createRange();
        const sel = window.getSelection();
        const el = document.getElementById('editable');
        range.setStart(el.childNodes[0], this.tile.innerText.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }, 100);
    } else if (event.key === 'Enter' || event.key === 'Space') {
      this.setState({ doubleClick: true });
      setTimeout(() => {
        this.tile.focus();
      }, 100);
    }
  }

  handleFocus(event) {
    document.execCommand('selectAll', false, null);
  }

  handleUpdate() {

  }

  handleBlur(event) {
    if (event !== undefined) {
      const text = event.target.innerText;
      this.props.updateWord(this.props.itemIndex, text);
      if (text.trim().split(' ')[0] === this.state.word) {
        event.target.innerText = text.trim().split(' ')[0];
      }
      this.setState({ doubleClick: false });
    }
  }

  keyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleBlur(event);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      event.target.innerText = this.state.word;
      this.setState({ doubleClick: false });
    }
  }

  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <li className={`${styles.format1} ${styles.noselect}`}
        onDoubleClick={this.handleDoubleClick}
        onKeyDown={this.handleDoubleClick}
        tabIndex={0}
        role="textbox"
        style={{ cursor: 'move' }}>
        <div className={styles.tile} style={{ display: 'inline', height: '60px' }}>
          <span className={styles.grippy} />
          <span style={{ display: 'inline' }}
            id={this.state.doubleClick ? 'editable' : null}
            contentEditable={this.state.doubleClick}
            onKeyDown={this.keyDown}
            onBlur={this.handleBlur}
            ref={(tile) => { this.tile = tile; }}>
            {this.props.value}
          </span>&nbsp;&nbsp;
        </div>
      </li>,
    );
  }
}

const Element = DropTarget(Types.SOURCE, tileTarget, collectTarget)(EditableListItem);

const SortableItem = SortableElement(props =>
  <Element {...props} />,
);

const SortableList = SortableContainer((props) => {
  const { items, distance, updateWord, placeholder, tempHoverIndex, tempWord, tempIsBefore } = props;
  return (
    <ul className={styles.container}>
      {items.map((value, index) => {
        const key = `item-${index}-${value}`;
        if (value === null || value === '') return null;
        if (placeholder && tempHoverIndex === index) {
          if (tempIsBefore) {
            return (
              <div className={styles.inlineBlock} key={key + 1}>
                <SortableItem key={key - 1} index={index} value={tempWord} distance={distance}
                  itemIndex={index}
                  updateWord={updateWord}
                  {...props} />
                <SortableItem key={key} index={index} value={value} distance={distance}
                  itemIndex={index}
                  updateWord={updateWord}
                  {...props} />
              </div>
            );
          }
          return (
            <div className={styles.inlineBlock} key={key + 1}>
              <SortableItem key={key} index={index} value={value} distance={distance}
                itemIndex={index}
                updateWord={updateWord}
                {...props} />
              <SortableItem key={key - 1} index={index} value={tempWord} distance={distance}
                itemIndex={index}
                updateWord={updateWord}
                {...props} />
            </div>
          );
        }
        return (
          <SortableItem key={key} index={index} value={value} distance={distance}
            itemIndex={index}
            updateWord={updateWord}
            {...props} />
        );
      })}
    </ul>
  );
});

export default SortableList;
