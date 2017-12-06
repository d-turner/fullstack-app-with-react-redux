import React from 'react';
import Sortable from 'sortablejs';
import PropTypes from 'prop-types';

import { EditableListItem } from '../Presentation/SortableList';
import styles from '../tile.scss';

class SortableWordList extends React.Component {

  sortableContainersDecorator = (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      const options = {
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  sortableGroupDecorator = (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      const options = {
        draggable: 'li', // Specifies which items inside the element should be sortable
        group: this.props.sortable ? // specifies how the sorting should work for that list
        { name: 'shared', pull: false, put: true } :
        { name: 'shared', pull: 'clone', put: false },
        sort: this.props.sortable,
        animation: 300,
        ghostClass: styles.sortableGhost || 'sortable-ghost',  // Class name for the drop placeholder
        chosenClass: styles.sortableChosen || 'sortable-chosen',  // Class name for the chosen item
        onEnd: this.onEnd,
        onAdd: this.onAdd,
        onMove: this.onMove,
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  onEnd = (event) => {
    // need to move from oldIndex to new index
    if (event.from === event.to) {
      this.props.onSortEnd({ oldIndex: event.oldIndex, newIndex: event.newIndex });
    }
  };

  onAdd = (event) => {
    const itemEl = event.item;  // dragged HTMLElement
    this.props.insertSourceWord(event.newIndex, itemEl.firstChild.childNodes[1].innerText);
    itemEl.parentNode.removeChild(itemEl);
  }

  renderTiles = (word, index) => {
    return (
      <EditableListItem
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
    return (
      <div className="container" ref={this.sortableContainersDecorator}>
        <div className="group">
          <div className="group-list" ref={this.sortableGroupDecorator}>
            {this.props.words.map((word, index) => this.renderTiles(word, index))}
          </div>
        </div>
      </div>
    );
  }
}

SortableWordList.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortable: PropTypes.bool.isRequired,
  updateWord: PropTypes.func.isRequired,
  onSortEnd: PropTypes.func.isRequired,
  insertSourceWord: PropTypes.func.isRequired,
};

export default SortableWordList;
