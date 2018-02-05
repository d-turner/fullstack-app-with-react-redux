import React from 'react';
import Sortable from 'sortablejs';
import PropTypes from 'prop-types';

import SortableListItem from '../Presentation/SortableListItem';
import styles from '../tile.scss';

class SortableTiles extends React.Component {
  onEnd = (event) => {
    // need to move from oldIndex to new index
    if (event.from === event.to && event.from.id !== 'non-sortable-list') {
      this.props.onSortEnd({ oldIndex: event.oldIndex, newIndex: event.newIndex });
    }
    this.props.setDragging(false);
  };

  onAdd = (event) => {
    const itemEl = event.item; // dragged HTMLElement
    this.props.insertSourceWord(event.newIndex, itemEl.firstChild.childNodes[1].innerText);
    itemEl.parentNode.removeChild(itemEl);
  }

  onMove = (event) => {
    event.preventDefault();
    this.props.setDragging(true);
  }

  sortableGroupDecorator = (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      const options = {
        draggable: 'li', // Specifies which items inside the element should be sortable
        group: this.props.sortable ? // specifies how the sorting should work for that list
        { name: 'shared', pull: false, put: true }
          : { name: 'shared', pull: 'clone', put: false },
        sort: this.props.sortable,
        animation: 300,
        ghostClass: styles.sortableGhost || 'sortable-ghost', // Class name for the drop placeholder
        chosenClass: styles.sortableChosen || 'sortable-chosen', // Class name for the chosen item
        onEnd: this.onEnd,
        onAdd: this.onAdd,
        onStart: this.onMove,
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  renderTile = (word, index) => {
    return (
      <SortableListItem
        key={`${word}${index}${this.props.sortable}`}
        value={word}
        index={index}
        itemIndex={index}
        updateWord={this.props.updateWord}
        editable={this.props.sortable}
      />
    );
  }

  render() {
    let id = 'non-sortable-list';
    let backgroundClass = null;
    if (this.props.sortable) id = 'sortable-list';
    if (this.props.sortable && this.props.dragging) backgroundClass = styles.canDrag;
    if (!this.props.sortable && this.props.dragging) backgroundClass = styles.dragging;
    return (
      <div className="container" ref={this.sortableContainersDecorator}>
        <div className={styles.group}>
          <div className={`${styles['group-list']} ${backgroundClass}`} id={id} ref={this.sortableGroupDecorator}>
            {this.props.words.map((word, index) => this.renderTile(word, index))}
          </div>
        </div>
      </div>
    );
  }
}

SortableTiles.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortable: PropTypes.bool.isRequired,
  updateWord: PropTypes.func.isRequired,
  onSortEnd: PropTypes.func.isRequired,
  insertSourceWord: PropTypes.func.isRequired,
  dragging: PropTypes.bool.isRequired,
  setDragging: PropTypes.func.isRequired,
};

export default SortableTiles;
