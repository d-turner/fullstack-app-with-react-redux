import React from 'react';
import PropTypes from 'prop-types';
import DragLayer from 'react-dnd/lib/DragLayer';

function collect(monitor) {
  const item = monitor.getItem();
  return {
    index: item && item.index,
    word: item && item.source,
    currentSourceClientOffset: monitor.getSourceClientOffset(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

function getItemStyles(currentOffset, currentClient) {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
  const x = currentOffset.x - currentClient.x;
  const y = currentOffset.y - currentClient.y;
  console.log('CurrentOffset: ', currentOffset);
  console.log('CurrentSourceClientOffset: ', currentClient);
  const transform = `translate(${currentOffset.xx}px, ${currentOffset.y}px)`;

  return {
    pointerEvents: 'none',
    position: 'relative',
    top: y,
    left: x,
    transform,
    WebkitTransform: transform,
    width: '48px',
    height: '48px',
    backgroundColor: 'red',
    opacity: 0.5,
  };
}

class TilePreview extends React.Component {
  render() {
    if (!this.props.isDragging) {
      return <div />;
    }

    return (
      <div
        className="item preview"
        style={getItemStyles(this.props.currentOffset, this.props.currentSourceClientOffset)}
      >
        {this.props.index} {this.props.word}
      </div>
    );
  }
}

TilePreview.propTypes = {
  index: PropTypes.number,
  word: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  isDragging: PropTypes.bool.isRequired,
};

export default DragLayer(collect)(TilePreview);
