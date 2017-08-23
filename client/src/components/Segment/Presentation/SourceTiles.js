import React from 'react';
import PropTypes from 'prop-types';

import { DragSource } from 'react-dnd';
import styles from '../segment.scss';

const Types = {
  TILE: 'tile',
};

const tileSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { word: props.source, index: props.index };

    let data = '';
    const wrapper = document.getElementById('wordTiles');
    const tiles = wrapper.childNodes;
    for (let i = 1; i < tiles.length; i++) {
      const tile = tiles[i];
      const input = tile.getElementsByTagName('input')[0];
      const label = tile.getElementsByTagName('label')[0];
      const span = label.getElementsByTagName('span')[0];
      if (input.checked) {
        data += span.innerText + ' ';
      }
    }
    if (data !== '') {
      item.word = data;
    }

    return item;
  },

  endDrag(props, monitor, component) {
    console.log('End Dragging: ', props);
    console.log('Sending update....');
    props.endDrag(props.source);
  },

};

function collect(connect, monitor) {
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

class SourceTiles extends React.Component {
  render() {
    const { connectDragSource, isDragging, source, index } = this.props;
    return connectDragSource(
      <div className={`${styles.inlineBlock} ${styles.noselect}`}>
        <input aria-label="select word for dragging" type="checkbox" id={`drag${source}${index}`} className={styles.check} />
        <label className={styles.format} htmlFor={`drag${source}${index}`}
          style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'pointer' }}>
          <span>{source}</span>
        </label>
      </div>,
    );
  }
}

SourceTiles.propTypes = {
  source: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default DragSource(Types.TILE, tileSource, collect)(SourceTiles);
