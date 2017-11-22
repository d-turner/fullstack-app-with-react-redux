import React from 'react';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';

import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';

import store from '../../../store';
import * as actions from '../../DraggableTiles/TileActions';
import { splitTextIntoArray, cleanText } from '../../../utils/stringParser';
import SourceTile from '../../DraggableTiles/SourceTile';
import SortableList from '../../DraggableTiles/SortableList';
import styles from '../segment.scss';

class SortableTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { placeholder: false };
    this.onSortEnd = this.onSortEnd.bind(this);
    this.updateWord = this.updateWord.bind(this);
    this.moveSourceTile = this.moveSourceTile.bind(this);
    this.tempMoveTile = this.tempMoveTile.bind(this);
  }

  componentDidMount() {
    window.onkeydown = (e) => {
      if (e.ctrlKey && e.keyCode === 13) {
        return this.props.updateSelectedSegment(this.props.documentId, this.props.segmentId + 1);
      }
    };
    if (this.props.segmentId !== 0) {
      const node = document.getElementById('selectedSegment');
      node.scrollIntoView({ behavior: 'auto', block: 'center' });
    }
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

  moveSourceTile(dragIndex, hoverIndex, word, isBefore) {
    this.setState({
      placeholder: false,
      tempDragIndex: dragIndex,
      tempHoverIndex: hoverIndex,
      tempWord: word,
      tempIsBefore: isBefore,
    });
    store.dispatch(
      actions.insertSourceWord(
        hoverIndex,
        word,
        isBefore,
        this.props.segmentId,
        this.props.documentId,
      ),
    );
    const event = { dragIndex: 'FROM SOURCE', hoverIndex, word, targetWord: isBefore };
    this.props.keyLogger.tileDrag(event);
  }

  tempMoveTile(dragIndex, hoverIndex, word, isBefore) {
    this.setState({
      placeholder: true,
      tempDragIndex: dragIndex,
      tempHoverIndex: hoverIndex,
      tempWord: word,
      tempIsBefore: isBefore,
    });
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
    const { segment } = this.props;
    const sourceWords = splitTextIntoArray(cleanText(segment.source));
    const targetWords = splitTextIntoArray(cleanText(segment.target));
    return (
      <div>
        <div id="wordTiles" className={`${styles.wrapper} ${styles.selected}`}>
          <h6>#{this.props.segmentId} Source</h6>
          {sourceWords.map((word, index) => {
            const key = `${word}${index}-source`;
            if (word === '' || word === undefined || word === null) return null;
            return (
              <SourceTile source={word} index={index} key={key} endDrag={this.endDrag} />
            );
          })}
        </div>
        <div className={`${styles.wrapper} ${styles.selected}`} style={{ marginTop: '4px' }}>
          <h6>Target</h6>
          <div id="targetTiles">
            <SortableList
              items={targetWords}
              onSortEnd={this.onSortEnd}
              axis="xy" distance={4}
              updateWord={this.updateWord}
              tempMoveTile={this.tempMoveTile}
              moveSourceTile={this.moveSourceTile}
              {...this.state} />
          </div>
        </div>
      </div>
    );
  }
}

SortableTiles.propTypes = {
  segment: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentId: PropTypes.number.isRequired,
  documentId: PropTypes.string.isRequired,
  keyLogger: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(SortableTiles);
