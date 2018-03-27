import React from 'react';
import Sortable from 'sortablejs';
import PropTypes from 'prop-types';

import styles from '../tile.scss';
import Loader from '../../Loader/Loader';

class Tiles extends React.Component {
  onStart = () => {
    this.props.setDragging(true);
  }
  onEnd = () => {
    this.props.setDragging(false);
  }

  sortableGroupDecorator = (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      const options = {
        draggable: 'li', // Specifies which items inside the element should be sortable
        group: { name: 'shared', pull: 'clone', put: false },
        sort: false,
        touchStartThreshold: 10,
        animation: 300,
        ghostClass: styles.sortableGhost || 'sortable-ghost', // Class name for the drop placeholder
        chosenClass: styles.sortableChosen || 'sortable-chosen', // Class name for the chosen item
        setData: (dataTransfer, dragEl) => {
          dataTransfer.setData('text', dragEl.dataset.index);
        },
        onStart: this.onStart,
        onEnd: this.onEnd,
      };
      Sortable.create(componentBackingInstance, options);
    }
  }

  loading = () => {
    return (
      <div className="container">
        <div className={styles.group}>
          <Loader />
        </div>
      </div>
    );
  }

  renderTile = (word, index) => {
    return (
      <li className={`${styles.format} ${styles.noselect} ${styles.maxWidth}`}
        key={`${word}${index}unsortable`}
        data-list-item={false}
        data-index={index}
        data-value={word}>
        <div className={styles.tile1}>
          <span />
          <span>{word}</span>
        </div>
      </li>
    );
  }

  render() {
    if (this.props.loading) return this.loading();
    const id = 'non-sortable-list';
    let backgroundClass = null;
    if (this.props.dragging) backgroundClass = styles.dragging;
    return (
      <div className="container">
        <div className={styles.group}>
          <ol className={`${styles['group-list']} ${backgroundClass}`} id={id} ref={(ref) => { this.Tiles = ref; this.sortableGroupDecorator(ref);}}>
            {this.props.words.map((word, index) => {
              return this.renderTile(word, index);
            })}
          </ol>
        </div>
      </div>
    );
  }
}

Tiles.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  dragging: PropTypes.bool.isRequired,
  setDragging: PropTypes.func.isRequired,
};

export default Tiles;
