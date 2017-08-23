import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import styles from './tile.scss';

const Types = {
  TILE: 'draggable',
};

const tileSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    return { word: props.word, index: props.index };
  },
};

const tileTarget = {
  hover(props, monitor, component) {
    const item = monitor.getItem();
    const dragIndex = item.index;
    const hoverIndex = props.index;

    // dont replace tiles with themselves
    if (dragIndex === hoverIndex) return;

    // determine the rect on the screen
    // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverBoundingRect = component.tile.getBoundingClientRect();
    // const hoverBoundingRect = component.tile.getBoundingClientRect();

    // Get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels from the left
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    // Should insert tile before when hoverClientX is less than the hoverMiddleX
    // Should insert tile after when hoverClientX is more than the hoverMiddleX
    // check if less than middle
    if (hoverClientX > hoverMiddleX + 20 && dragIndex > hoverIndex) {
      return;
    }

    // check if more than middle
    if (hoverClientX < hoverMiddleX - 20 && dragIndex < hoverIndex) {
      return;
    }
    // Time to actually perform the action
    props.moveTile(dragIndex, hoverIndex, item.word);
    monitor.getItem().index = hoverIndex;
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
  render() {
    const { connectDragSource, connectDropTarget, isDragging, word } = this.props;
    return connectDragSource(connectDropTarget(
      <div
        className={`${styles.format} ${styles.inlineBlock} ${styles.noselect}`}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'pointer' }}
        ref={(elm) => { this.tile = elm; }}
      >
        {word}
      </div>,
    ));
  }
}

DraggableTile.propTypes = {
  word: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default flow(
  DragSource(Types.TILE, tileSource, collectSource), DropTarget(Types.TILE, tileTarget, collectTarget),
)(DraggableTile);
