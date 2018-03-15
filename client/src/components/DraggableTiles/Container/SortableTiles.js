import React from 'react';
import Sortable from 'sortablejs';
import PropTypes from 'prop-types';

import SortableListItem from '../Presentation/SortableListItem';
import styles from '../tile.scss';
import Loader from '../../Loader/Loader';

import { addEvent, removeEvent } from '../../../utils/eventsHelper';
import { upperFirstLetter } from '../../../utils/stringParser';

class SortableTiles extends React.Component {
  state = { tempTile: null, overTrash: false, newPosition: undefined }

  componentDidMount() {
    const bin = document.querySelector('#trash');
    addEvent(bin, 'dragenter', (e) => {
      // need to set the style for the bin
      console.log('add style');
      e.preventDefault();
      e.stopPropagation(); // stop it here to prevent it bubble up
      this._onEnter(e);
    });
    addEvent(bin, 'dragover', (e) => {
      console.log('bin dragover');
      e.preventDefault(); // allows us to drop
      e.stopPropagation(); // stop it here to prevent it bubble up
    });
    addEvent(bin, 'dragexit', (e) => {
      console.log('bin dragexit');
      e.stopPropagation(); // stop it here to prevent it bubble up
      this._onLeave(e);
    });
    addEvent(bin, 'dragleave', (e) => {
      console.log('remove style');
      e.stopPropagation(); // stop it here to prevent it bubble up
    });
    addEvent(bin, 'drop', (e) => {
      e.preventDefault();
      e.stopPropagation(); // stop it here to prevent it bubble up
      console.log('New position: ', this.state.newPosition);
      if (this.state.newPosition) {
        e.index = this.state.newPosition;
      }
      this._drop(e);
      this.setState({ newPosition: undefined });
    });
  }

  componentWillUnmount() {
    const bin = document.querySelector('#trash');
    removeEvent(bin, 'dragenter');
    removeEvent(bin, 'dragover');
    removeEvent(bin, 'dragexit');
    removeEvent(bin, 'dragleave');
    removeEvent(bin, 'drop');
  }

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

  onStart = () => {
    this.props.setDragging(true);
  }

  setPosition = (newPosition) => {
    this.setState({ newPosition });
  }

  addTile = (index) => {
    this.setState({ tempTile: index });
  }

  _drop = (event) => {
    if (this.state.newPosition !== undefined) {
      this.props.removeIndex( this.state.newPosition);
      this.setState({ newPosition: undefined });
      return;
    }
    this.setState({ overTrash: false });
    let data = null;
    try {
      data = JSON.parse(event.dataTransfer.getData('text'));
      this.props.removeIndex(data);
    } catch (e) {
      // If the text data isn't parsable we'll just ignore it.
      console.log('failed', e);
    }
  }

  _onEnter = (event) => {
    if (!this.state.overTrash) this.setState({ overTrash: true });
  }

  _onLeave = (event) => {
    if (this.state.overTrash) this.setState({ overTrash: false });
  }

  sortableGroupDecorator = (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      const options = {
        draggable: 'li', // Specifies which items inside the element should be sortable
        group: { name: 'shared', pull: false, put: true },
        sort: true,
        touchStartThreshold: 20,
        animation: 300,
        ghostClass: styles.sortableGhost || 'sortable-ghost', // Class name for the drop placeholder
        chosenClass: styles.sortableChosen || 'sortable-chosen', // Class name for the chosen item
        setData: (dataTransfer, dragEl) => {
          dataTransfer.setData('text', dragEl.dataset.index);
        },
        onEnd: this.onEnd,
        onAdd: this.onAdd,
        onStart: this.onStart,
        onUpdate: (evt) => {
          this.setState({ newPosition: evt.newIndex });
        },
        scrollSensitivity: 100,
      };
      Sortable.create(componentBackingInstance, options);
    }
  }

  trashDecorator = (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      const options = {
        draggable: 'li', // Specifies which items inside the element should be sortable
        group: { name: 'shared', pull: false, put: false },
        sort: false,
        animation: 300,
        ghostClass: styles.sortableGhost || 'sortable-ghost', // Class name for the drop placeholder
        chosenClass: styles.sortableChosen || 'sortable-chosen', // Class name for the chosen item
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

  fakeEnter = (index, text) => {
    this.props.insertSourceWord(index + 1, text);
    this.setState({ tempTile: null });
  }
  fakeTile = (word, index) => {
    return (
      <SortableListItem
        key={`${word}${index}sortable`}
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
  firstFakeEnter = (_, text) => {
    this.props.insertSourceWord(0, upperFirstLetter(text));
    this.setState({ tempTile: null });
  }
  firstFakeTile = (word) => {
    return (
      <SortableListItem
        key={`${word}${0}sortable`}
        setPosition={this.setPosition}
        value={word}
        index={-1}
        itemIndex={-1}
        updateWord={this.firstFakeEnter}
        addTile={() => {}}
        insertTiles={this.props.insertTiles}
        focus
      />
    );
  }

  renderTile = (word, index) => {
    return (
      <SortableListItem
        key={`${word}${index}sortable`}
        setPosition={this.setPosition}
        value={word}
        index={index}
        itemIndex={index}
        updateWord={this.props.updateWord}
        addTile={this.addTile}
        insertTiles={this.props.insertTiles} />
    );
  }

  render() {
    if (this.props.loading) return this.loading();
    const id = 'sortable-list';
    let backgroundClass = null;
    if (this.props.dragging) backgroundClass = styles.canDrag;
    return (
      <div className="container">
        <div className={styles.group}>
          <ol className={`${styles['group-list']} ${backgroundClass}`} id={id} ref={(ref) => { this.Tiles = ref; this.sortableGroupDecorator(ref);}}>
            {this.props.words.map((word, index) => {
              if (this.state.tempTile !== null && index === this.state.tempTile) {
                return (
                  <div key={`${word}sortable123`} style={{ display: 'inline-block' }}>
                    {this.renderTile(word, index)}
                    {this.fakeTile('', index)}
                  </div>
                );
              } else if (this.state.tempTile !== null && this.state.tempTile === -1 && index === 0) {
                return (
                  <div key={`${word}sortable123`} style={{ display: 'inline-block' }}>
                    {this.firstFakeTile('')}
                    {this.renderTile(word, index)}
                  </div>
                );
              }
              return this.renderTile(word, index);
            })}
          </ol>
          <span
            className={this.state.overTrash ? styles.overTrash : styles.trash}
            id="trash"
            onDrop={this._drop}
            ref={this.trashDecorator}>
            <i className={`material-icons ${styles.bin}`}>delete</i>
          </span>
        </div>
      </div>
    );
  }
}

SortableTiles.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateWord: PropTypes.func.isRequired,
  onSortEnd: PropTypes.func.isRequired,
  insertSourceWord: PropTypes.func.isRequired,
  dragging: PropTypes.bool.isRequired,
  setDragging: PropTypes.func.isRequired,
};

export default SortableTiles;
