import React from 'react';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';
import update from 'immutability-helper';

import store from '../../../store';
import * as actions from '../TileActions';
import { upperFirstLetter, lowerFirstLetter, insertAndReplace, insertIntoArray, shouldUpperCase, removeIndex } from '../../../utils/stringParser';
import apiWrapper from '../../../utils/apiWrapper';
import SortableTiles from './SortableTiles';

// import apiWrapper from '../../../utils/apiWrapper';

class SortableTilesContainer extends React.Component {
  state = { words: [], loading: true, prev: [[]], next: [[]] }

  componentDidMount() {
    this.props.keyLogger.setTimer('tileStart');
    apiWrapper.getTokens({ data: this.props.text }).then((res) => {
      const newState = update(this.state, {
        loading: { $set: false },
        words: {
          $set: res.data.tokens,
        },
        prev: {
          $set: [res.data.tokens],
        },
        next: {
          $set: [],
        },
      });
      this.setState(newState);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text === '' && this.state.words.length !== 0) {
      const newState = update(this.state, {
        words: {
          $set: [],
        },
        prev: {
          $push: [this.state.words],
        },
        next: {
          $set: [],
        },
      });
      this.setState(newState);
    }
  }

  componentWillUnmount() {
    this.props.keyLogger.setTileTotal();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    oldIndex = parseInt(oldIndex, 10);
    newIndex = parseInt(newIndex, 10);
    if (newIndex === oldIndex) return;
    const targetWords = this.state.words;
    const newArray = arrayMove(targetWords, parseInt(oldIndex, 10), parseInt(newIndex, 10));
    // need to capitalize word at newIndex
    if (newIndex === 0) newArray[newIndex] = upperFirstLetter(newArray[newIndex]);
    // need to decapitalize word
    if (oldIndex === 0) {
      newArray[newIndex] = lowerFirstLetter(newArray[newIndex]);
      newArray[oldIndex] = upperFirstLetter(newArray[oldIndex]);
    }
    const event = {
      sourceIndex: oldIndex,
      targetIndex: newIndex,
      sourceWord: newArray[newIndex],
      targetWord: newArray[oldIndex],
    };
    this.props.keyLogger.tileDrag(event);
    this.updateWordArray(newArray);
  }

  insertAfter = (index, value) => {
    this.insertSourceWord(index + 1, value);
  }

  undo = () => {
    // gets called by ref from higher component
    const { prev, words } = this.state;
    if (prev.length === 0) return;
    const newState = update(this.state, {
      words: {
        $set: prev[prev.length - 1],
      },
      prev: {
        $splice: [[prev.length - 1, 1]],
      },
      next: {
        $push: [words],
      },
    });
    this.props.keyLogger.undo();
    this.setState(newState);
    store.dispatch(
      actions.updateWordOrder(
        this.props.documentId,
        this.props.segmentId,
        newState.words,
      ),
    );
  }

  redo = () => {
    // gets called by ref from higher component
    const { next, words } = this.state;
    if (next.length === 0) return;
    const newState = update(this.state, {
      words: {
        $set: next[next.length - 1],
      },
      prev: {
        $push: [words],
      },
      next: {
        $splice: [[next.length - 1, 1]],
      },
    });
    this.props.keyLogger.redo();
    this.setState(newState);
    store.dispatch(
      actions.updateWordOrder(
        this.props.documentId,
        this.props.segmentId,
        newState.words,
      ),
    );
  }

  updateWordArray = (wordArray) => {
    store.dispatch(
      actions.updateWordOrder(
        this.props.documentId,
        this.props.segmentId,
        wordArray,
      ),
    );
    const a1 = wordArray;
    const a2 = this.state.words;
    if (a1.length === a2.length && a1.every((v, i) => v === a2[i])) return; // don't update if the state is the same
    this.setState({ words: wordArray, prev: [...this.state.prev, this.state.words], next: [] });
  }

  insertSourceWord = (index, text) => {
    if (shouldUpperCase(text, index)) text = upperFirstLetter(text);
    const newArray = insertIntoArray(this.state.words, index, text.split(' '));
    this.props.keyLogger.addTile(index, text);
    this.updateWordArray(newArray);
  }

  removeIndex = (index) => {
    const newArray = removeIndex(this.state.words, index);
    this.props.keyLogger.removeTile(index);
    this.updateWordArray(newArray);
  }

  updateWord = (index, text) => {
    if (text === '') {
      this.removeIndex(index);
      return;
    }
    const newWords = insertAndReplace(this.state.words, index, text.split(' '));
    const event = { index, text };
    this.props.keyLogger.updateWord(event);
    this.updateWordArray(newWords);
  }

  render() {
    return (
      <SortableTiles
        words={this.state.words}
        insertSourceWord={this.insertSourceWord}
        updateWord={this.updateWord}
        removeIndex={this.removeIndex}
        onSortEnd={this.onSortEnd}
        setDragging={this.props.setDragging}
        dragging={this.props.dragging}
        loading={this.state.loading}
        insertTiles={this.props.insertTiles} />
    );
  }
}

SortableTilesContainer.propTypes = {
  text: PropTypes.string.isRequired,
  segmentId: PropTypes.number.isRequired,
  documentId: PropTypes.string.isRequired,
  keyLogger: PropTypes.objectOf(PropTypes.any).isRequired,
  dragging: PropTypes.bool.isRequired,
  insertTiles: PropTypes.bool.isRequired,
  setDragging: PropTypes.func.isRequired,
};

export default SortableTilesContainer;
