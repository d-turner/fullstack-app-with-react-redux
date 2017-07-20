import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';
import styles from '../segment.scss';

const Types = {
  TILE: 'tile',
};

const tileTarget = {

  hover(props, monitor, component) {
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
    props.moveTile(dragIndex, hoverIndex, item.word, isBefore);
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
}


class TargetTiles extends React.Component {
  render() {
    return this.props.connectDropTarget(
      <div className={styles.format} >
        {this.props.target}
      </div>,
    );
  }
}

TargetTiles.propTypes = {
  target: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  moveTile: PropTypes.func.isRequired,
};

export default DropTarget(Types.TILE, tileTarget, collect)(TargetTiles);
