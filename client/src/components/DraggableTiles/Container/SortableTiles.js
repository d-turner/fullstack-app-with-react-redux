import React from 'react';
import Sortable from 'sortablejs';
import PropTypes from 'prop-types';

import SortableListItem from '../Presentation/SortableListItem';
import styles from '../tile.scss';

class SortableTiles extends React.Component {
  state = { tempTile: null, overTrash: false }

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
    this.setState({ dragWord: event.item.children[0].children[1].value });
    this.props.setDragging(true);
  }

  removeWord = (index) => {
    this.props.updateWord(index, '');
  }

  addTile = (index) => {
    this.setState({ tempTile: index });
  }

  _drop = (event) => {
    event.preventDefault();
    this.setState({ overTrash: false });
    let data = null;
    try {
      data = JSON.parse(event.dataTransfer.getData('text'));
      this.removeWord(data.index);
    } catch (e) {
      // If the text data isn't parsable we'll just ignore it.
      return;
    }
  }

  _preventDefault = (event) => {
    event.preventDefault();
    console.log(event);
    this.setState({ overTrash: true });
  }

  _onLeave = (event) => {
    event.preventDefault();
    this.setState({ overTrash: false });
  }

  sortableGroupDecorator = (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      const options = {
        draggable: 'li', // Specifies which items inside the element should be sortable
        group: this.props.sortable ? // specifies how the sorting should work for that list
          { name: 'shared', pull: 'clone', put: true }
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
  }

  fakeEnter = (index, text) => {
    this.props.insertSourceWord(index + 1, text);
    this.setState({ tempTile: null });
  }
  fakeTile = (word, index) => {
    return (
      <SortableListItem
        key={`${word}${index}${this.props.sortable}`}
        value={word}
        index={index}
        itemIndex={index}
        updateWord={this.fakeEnter}
        editable
        addTile={this.addTile}
        focus
      />
    );
  }

  renderTile = (word, index) => {
    return (
      <SortableListItem
        key={`${word}${index}${this.props.sortable}`}
        value={word}
        index={index}
        itemIndex={index}
        updateWord={this.props.updateWord}
        editable={this.props.sortable}
        addTile={this.addTile}
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
          <ol className={`${styles['group-list']} ${backgroundClass}`} id={id} ref={this.sortableGroupDecorator}>
            {this.props.words.map((word, index) => {
              if (this.state.tempTile !== null && index === this.state.tempTile) {
                return (
                  <div key={`${word}${index}${this.props.sortable}123`} style={{ display: 'inline-block' }}>
                    {this.renderTile(word, index)}
                    {this.fakeTile('', index)}
                  </div>
                );
              }
              return this.renderTile(word, index);
            })}
          </ol>
          {this.props.sortable ? (
            <span
              className={this.state.overTrash ? styles.overTrash : styles.trash}
              id="trash"
              onDragOver={this._preventDefault}
              onDragLeave={this._onLeave}
              onDrop={this._drop}>
              <i className={`material-icons ${styles.bin}`}>delete</i>
              {this.state.overTrash ? fakeTilePresentation(this.state.dragWord) : null}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

function fakeTilePresentation(word) {
  // if (word === undefined || word === null) return null;
  // return (
  //   <li className={`${styles.format} ${styles.noselect} ${styles.maxWidth}`}>
  //     <div className={styles.tile}>
  //       <span className={styles.grippy} />
  //       <input className={styles.text}
  //         style={{ width: `${word.length * 10 + 10}px`, minWidth: '40px' }}
  //         type="text"
  //         spellCheck="false"
  //         cols="1"
  //         rows="1"
  //         defaultValue={word} />
  //     </div>
  //   </li>
  // );
  return null;
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
