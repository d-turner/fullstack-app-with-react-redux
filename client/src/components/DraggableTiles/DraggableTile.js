import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
// import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import styles from './tile.scss';

const Types = {
  SOURCE: 'source',
  TILE: 'draggable',
};

const tileSource = {
  beginDrag(props) {
    const item = { word: props.word, index: props.index, isDragging: props.isDragging };
    const indexArr = [];
    let data = '';
    const wrapper = document.getElementById('targetTiles');
    const tiles = wrapper.childNodes;
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      const input = tile.getElementsByTagName('input')[0];
      const label = tile.getElementsByTagName('label')[0];
      if (input.checked || i === item.index) {
        data += label.innerText + ' ';
        indexArr.push(i);
      }
    }
    if (data !== '') {
      item.word = data;
    }
    item.indexArr = indexArr;
    // Return the data describing the dragged item
    return item;
  },
};

const tileTarget = {
  hover(props, monitor, component) {
    if (monitor.getItemType() === Types.SOURCE) {
      const item = monitor.getItem();
      const dragIndex = item.index;
      const hoverIndex = props.index;

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
      // props.moveSourceTile(dragIndex, hoverIndex, item.word, isBefore);
    }
  },

  drop(props, monitor, component) {
    if (monitor.getItemType() === Types.TILE) {
      const item = monitor.getItem();
      const dragIndex = item.index;
      const hoverIndex = props.index;

      // dont replace tiles with themselves
      if (dragIndex === hoverIndex) return;

      // determine the rect on the screen
      // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      const hoverBoundingRect = component.decoratedComponentInstance.card.getBoundingClientRect();
      // const hoverBoundingRect = component.tile.getBoundingClientRect();

      // Get horizontal middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels from the left
      const mouseX = clientOffset.x - hoverBoundingRect.left;

      // Should insert tile before when hoverClientX is less than the hoverMiddleX
      // Should insert tile after when hoverClientX is more than the hoverMiddleX
      // check if less than middle
      if (mouseX > hoverMiddleX && dragIndex > hoverIndex) {
        props.moveTile(dragIndex, hoverIndex + 1, item.word, props.word, item.indexArr);
        monitor.getItem().index = hoverIndex;
        return;
      }

      // check if more than middle
      if (mouseX < hoverMiddleX && dragIndex < hoverIndex) {
        props.moveTile(dragIndex, hoverIndex - 1, item.word, props.word, item.indexArr);
        monitor.getItem().index = hoverIndex;
        return;
      }
      props.moveTile(dragIndex, hoverIndex, item.word, props.word, item.indexArr);
      monitor.getItem().index = hoverIndex;
    } else if (monitor.getItemType() === Types.SOURCE) {
      const item = monitor.getItem();
      const dragIndex = item.index;
      const hoverIndex = props.index;

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

// this inject props into the component
function collectSource(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // preview of the dragging component
    connectDragPreview: connect.dragPreview(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
  };
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
}

class DraggableTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { doubleClick: false };
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  componentDidUpdate() {
    if (this.state.doubleClick) {
      this.tile.focus();
    }
  }

  handleDoubleClick(event) {
    event.preventDefault();
    this.setState({ doubleClick: true });
  }

  handleFocus(event) {
    document.execCommand('selectAll', false, null);
  }

  handleBlur(event) {
    const text = event.target.innerText;
    this.props.updateWord(this.props.index, text);
    this.setState({ doubleClick: false });
  }

  keyDown(event) {
    if (event.key === 'Enter') {
      console.log('Accepting...');
      event.preventDefault();
      const text = event.target.innerText;
      this.props.updateWord(this.props.index, text);
      this.handleBlur();
    }
  }

  render() {
    const { connectDragSource, connectDropTarget, isDragging, word, index, isOver } = this.props;
    return connectDragSource(connectDropTarget(
      <div
        className={`${styles.inlineBlock} ${styles.noselect}`}
        style={{
          backgroundColor: isOver && !isDragging ? '#85bc67' : '',
          opacity: isDragging ? 0.8 : 1,
          cursor: 'move' }}
        ref={(elm) => { this.card = elm; }}
      >
        <input aria-label="select word for dragging"
          id={`drag${word}${index}-target`}
          type="checkbox"
          className={styles.check}
        />
        <label className={styles.format} htmlFor={`drag${word}${index}-target`}
          onDoubleClick={this.handleDoubleClick}
          contentEditable={this.state.doubleClick}
          onKeyDown={this.keyDown}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          ref={(tile) => { this.tile = tile; }}
          style={{
            minWidth: '58px',
            textAlign: 'center',
            opacity: isDragging ? 0.8 : 1,
            backgroundColor: isDragging ? '#85bc67' : '',
            cursor: 'move' }}>
          {word}
        </label>
      </div>,
    ));
  }
}

DraggableTile.propTypes = {
  word: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  updateWord: PropTypes.func.isRequired,
};

export default flow(
  DragSource(Types.TILE, tileSource, collectSource),
  DropTarget([Types.TILE, Types.SOURCE], tileTarget, collectTarget),
)(DraggableTile);
