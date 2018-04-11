import React from 'react';
import Sortable from 'sortablejs';
import PropTypes from 'prop-types';

import SortableListItem from '../Presentation/SortableListItem';
import styles from '../tile.scss';
import main from '../../../constants/main.scss';
import Loader from '../../Loader/Loader';

import { addEvent, removeEvent } from '../../../utils/eventsHelper';
import { upperFirstLetter, lowerFirstLetter } from '../../../utils/stringParser';
import Button from '../../ButtonList/Button';

class SortableTiles extends React.Component {
  state = { tempTile: null, overTrash: false, newPosition: undefined, currentIndex: 0 }

  componentDidUpdate(prevProps) {
    if (prevProps.loading && !this.props.loading) {
      const bin = this.trash;
      addEvent(bin, 'dragenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this._onEnter();
      });
      addEvent(bin, 'dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this._onEnter();
      });
      addEvent(bin, 'dragexit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this._onLeave();
      });
      addEvent(bin, 'dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this._onLeave();
      });
    }
  }

  componentWillUnmount() {
    const bin = this.trash;
    removeEvent(bin, 'dragenter');
    removeEvent(bin, 'dragover');
    removeEvent(bin, 'dragexit');
    removeEvent(bin, 'dragleave');
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
      this.props.removeIndex(this.state.newPosition);
      this.setState({ newPosition: undefined, overTrash: false });
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

  _onEnter = () => {
    if (!this.state.overTrash) this.setState({ overTrash: true });
  }

  _onLeave = () => {
    if (this.state.overTrash) this.setState({ overTrash: false });
  }

  sortableGroupDecorator = (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      const options = {
        draggable: 'li', // Specifies which items inside the element should be sortable
        group: { name: 'shared', pull: false, put: true },
	delay: 50,
        sort: true,
        animation: 300,
        handle: '.handle',
        ghostClass: styles.sortableGhost || 'sortable-ghost', // Class name for the drop placeholder
        chosenClass: styles.sortableChosen || 'sortable-chosen', // Class name for the chosen item
        setData: (dataTransfer, dragEl) => {
          dataTransfer.setData('text', dragEl.dataset.index);
        },
        onEnd: this.onEnd,
        onAdd: this.onAdd,
        onChoose: (evt) => {
          if (this.tile) {
            this.tile.blur();
            this.tile.focus();
          }
        },
        onStart: this.onStart,
        onUpdate: (evt) => {
          this.setState({ newPosition: evt.newIndex });
        },
        scrollSensitivity: 100,
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
    if (text === '') {
      this.setState({ tempTile: null });
      return;
    }
    this.props.insertSourceWord(index + 1, text);
    this.setState({ tempTile: null });
  }
  fakeTile = (word, index) => {
    return (
      <SortableListItem
        setTile={e => this.setState({ currentIndex: e.target.dataset.index})}
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
    if (text === '') {
      this.setState({ tempTile: null });
      return;
    }
    this.props.insertSourceWord(0, upperFirstLetter(text));
    this.setState({ tempTile: null });
  }
  firstFakeTile = (word) => {
    return (
      <SortableListItem
        setTile={e => this.setState({ currentIndex: e.target.dataset.index})}
        key={`${word}${0}sortable`}
        setPosition={this.setPosition}
        value={word}
        index={-1}
        itemIndex={-1}
        updateWord={this.firstFakeEnter}
        addTile={() => {}}
        insertTiles={this.props.insertTiles}
        onEnter={this._onEnter}
        onLeave={this._onLeave}
        focus
      />
    );
  }

  renderTile = (word, index) => {
    return (
      <SortableListItem
        setTile={e => this.setState({ currentIndex: e.target.dataset.index})}
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

  renderCapitalizeButtons = () => {
    const classNames = `${main.clearButtonLeft} ${main.button} ${main.noBorder}`;
    return (
      <div className="flex one" style={{ width: '60px', height: '0px'}}>
        <div className="flex one" style={{ position: 'relative', padding: '7px', marginTop: '1em', left: '-50px' }}>
          <Button
            classNames={classNames}
            label="Uppercase"
            icon="format_size"
            func={() => this.props.updateWord(this.state.currentIndex, upperFirstLetter(this.props.words[this.state.currentIndex]))}
            id="Uppercase"
            direction="left" />
          <Button
            classNames={classNames}
            label="Lowercase"
            icon="text_fields"
            func={() => this.props.updateWord(this.state.currentIndex, lowerFirstLetter(this.props.words[this.state.currentIndex]))}
            id="Lowercase"
            direction="left" />
        </div>
      </div>
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
          {this.renderCapitalizeButtons()}
          <ol className={`${styles['group-list']} ${backgroundClass}`}
            id={id}
            ref={(ref) => { this.Tiles = ref; this.sortableGroupDecorator(ref); }}>
            { this.props.words.length === 0 ?
            (
              <button
                className={styles.add}
                onClick={() => {
                  this.addTile(0);
                }}>
                <i className="material-icons">add</i>
              </button>
            ) : null}
            { (this.props.words.length === 0 && this.state.tempTile !== null) ?
              (this.fakeTile('', 0)) : null}
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
            ref={(trash) => { this.trash = trash; }}>
            <i className={`material-icons ${styles.bin}`}>delete</i>
          </span>
        </div>
      </div>
    );
  }
}

SortableTiles.propTypes = {
  loading: PropTypes.bool.isRequired,
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateWord: PropTypes.func.isRequired,
  onSortEnd: PropTypes.func.isRequired,
  insertSourceWord: PropTypes.func.isRequired,
  dragging: PropTypes.bool.isRequired,
  setDragging: PropTypes.func.isRequired,
  removeIndex: PropTypes.func.isRequired,
  insertTiles: PropTypes.bool.isRequired,
};

export default SortableTiles;
