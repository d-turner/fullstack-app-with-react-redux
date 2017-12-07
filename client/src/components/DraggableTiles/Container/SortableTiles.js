import React from 'react';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';

import store from '../../../store';
import * as actions from '../TileActions';
import { splitTextIntoArray, cleanText } from '../../../utils/stringParser';
// import SourceTile from '../Presentation/SourceTile';
// import SortableList from '../Presentation/SortableList';
import Multiple from './Multiple';

class SortableTiles extends React.Component {

  onSortEnd = ({ oldIndex, newIndex }) => {
    const targetWords = splitTextIntoArray(cleanText(this.props.segment.target));
    const newArray = arrayMove(targetWords, oldIndex, newIndex);
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
      <Multiple
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

SortableTiles.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortable: PropTypes.bool.isRequired,
  segment: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentId: PropTypes.number.isRequired,
  documentId: PropTypes.string.isRequired,
  keyLogger: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SortableTiles;
