import React from 'react';
import PropTypes from 'prop-types';

import { DragSource } from 'react-dnd';
import styles from '../tile.scss';

const Types = {
  SOURCE: 'source',
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
      if (input.checked || i - 1 === item.index) {
        data += label.innerText + ' ';
      }
    }
    if (data !== '') {
      item.word = data;
    }
    // props.moveTile(item.index, hoverIndex, item.word , isBefore);
    return item;
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

class SourceTile extends React.Component {
  render() {
    const { connectDragSource, isDragging, source, index } = this.props;
    return connectDragSource(
      <div className={`${styles.inlineBlock} ${styles.noselect}`}>
        <input aria-label="select word for dragging" type="checkbox" id={`drag${source}${index}-source`} className={styles.check} />
        <label className={styles.format} htmlFor={`drag${source}${index}-source`}
          style={{
            textAlign: 'center',
            opacity: isDragging ? 0.8 : 1,
            backgroundColor: isDragging ? '#85bc67' : '',
            cursor: 'move' }}>
          <div style={{ padding: '6px 12px 6px 0px' }}>
            <span className={styles.grippy} />
            {source}
          </div>
        </label>
      </div>,
    );
  }
}

SourceTile.propTypes = {
  source: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default DragSource(Types.SOURCE, tileSource, collect)(SourceTile);
