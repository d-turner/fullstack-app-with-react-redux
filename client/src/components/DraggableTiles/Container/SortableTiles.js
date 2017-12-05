import React from 'react';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';

import store from '../../../store';
import * as actions from '../../DraggableTiles/TileActions';
import { splitTextIntoArray, cleanText } from '../../../utils/stringParser';
import SourceTile from '../Presentation/SourceTile';
import SortableList from '../Presentation/SortableList';
import Multiple from './Multiple';

class SortableTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { placeholder: false };
    this.onSortEnd = this.onSortEnd.bind(this);
    this.updateWord = this.updateWord.bind(this);
  }

  onSortEnd({ oldIndex, newIndex }) {
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

  updateWord(index, text) {
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
    return (<SortableList
      items={this.props.words}
      distance={3} axis="xy"
      updateWord={this.updateWord} onSortEnd={this.onSortEnd}
      disabled={!this.props.sortable} />);
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
