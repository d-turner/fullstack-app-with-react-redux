import React from 'react';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';

import store from '../../../store';
import * as actions from '../TileActions';
import { splitTextIntoArray, cleanText, upperFirstLetter, lowerFirstLetter } from '../../../utils/stringParser';
import SortableTiles from './SortableTiles';

class SortableTilesContainer extends React.Component {
  componentDidMount() {
    this.props.keyLogger.setTimer('tileStart');
  }

  componentWillUnmount() {
    this.props.keyLogger.setTileTotal();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    console.log('old index', oldIndex);
    console.log('new index', newIndex);
    const targetWords = splitTextIntoArray(cleanText(this.props.segment.target));
    const newArray = arrayMove(targetWords, oldIndex, newIndex);
    // need to capitalize word at newIndex
    if (newIndex === 0) newArray[newIndex] = upperFirstLetter(newArray[newIndex]);
    // need to decapitalize word
    if (oldIndex === 0) {
      newArray[newIndex] = lowerFirstLetter(newArray[newIndex]);
      newArray[oldIndex] = upperFirstLetter(newArray[oldIndex]);
    }
    store.dispatch(
      actions.updateWordOrder(
        this.props.documentId,
        this.props.segmentId,
        newArray,
      ),
    );
  }

  insertSourceWord = (index, text) => {
    store.dispatch(
      actions.insertSourceWord(
        index,
        text,
        true,
        this.props.segmentId,
        this.props.documentId,
      ),
    );
  }

  updateWord = (index, text) => {
    store.dispatch(
      actions.updateWord(
        this.props.documentId,
        this.props.segmentId,
        index,
        text,
      ),
    );
    const event = { index, text };
    this.props.keyLogger.updateWord(event);
  }

  render() {
    return (
      <SortableTiles
        words={this.props.words}
        sortable={this.props.sortable}
        insertSourceWord={this.insertSourceWord}
        updateWord={this.updateWord}
        onSortEnd={this.onSortEnd}
        setDragging={this.props.setDragging}
        dragging={this.props.dragging} />
    );
  }
}

SortableTilesContainer.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortable: PropTypes.bool.isRequired,
  segment: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentId: PropTypes.number.isRequired,
  documentId: PropTypes.string.isRequired,
  keyLogger: PropTypes.objectOf(PropTypes.any).isRequired,
  dragging: PropTypes.bool.isRequired,
  setDragging: PropTypes.func.isRequired,
};

export default SortableTilesContainer;
