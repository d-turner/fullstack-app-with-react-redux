import React from 'react';
import PropTypes from 'prop-types';

import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';

import store from '../../../store';
import * as actions from '../../DraggableTiles/TileActions';
import { splitTextIntoArray } from '../../../utils/stringParser';
import SourceTile from '../../DraggableTiles/SourceTile';
import DraggableTile from '../../DraggableTiles/DraggableTile';

import styles from '../segment.scss';

class SegmentTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { placeholder: false };
    this.moveTile = this.moveTile.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.moveSourceTile = this.moveSourceTile.bind(this);
    this.updateWord = this.updateWord.bind(this);
  }

  componentDidMount() {
    const node = document.getElementById('selectedSegment');
    node.scrollIntoView({ behavior: 'auto', block: 'center' });
  }

  moveTile(dragIndex, hoverIndex, word, targetWord, indexArr) {
    store.dispatch(
      actions.insertWord(
        dragIndex,
        hoverIndex,
        word,
        targetWord,
        this.props.segmentId,
        this.props.documentId,
        indexArr,
      ),
    );
    const event = { dragIndex, hoverIndex, word, targetWord };
    this.props.keyLogger.tileDrag(event);
  }

  moveSourceTile(dragIndex, hoverIndex, word, isBefore) {
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
    // on drop only if inside -> store.dispatch(actions.insertWord(hoverIndex, word));
  }

  endDrag() {
    const { hoverIndex, word, isBefore } = this.state;
    if (hoverIndex && word && isBefore !== undefined) {
      store.dispatch(
        actions.insertSourceWord(
          this.state.hoverIndex,
          this.state.word,
          this.state.isBefore,
          this.props.segmentId,
          this.props.documentId,
        ),
      );
      this.setState({ placeholder: false, hoverIndex: undefined, word: undefined, isBefore: undefined });
      const event = { dragIndex: 'FROM SOURCE', hoverIndex, word, targetWord: isBefore };
      this.props.keyLogger.tileDrag(event);
    }
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
    const sourceWords = splitTextIntoArray(segment.source);
    const targetWords = splitTextIntoArray(segment.target);
    return (
      <div>
        <div id="wordTiles" className={`${styles.wrapper} ${styles.selected}`}>
          <h6>#{this.props.segmentId} Source</h6>
          {sourceWords.map((word, index) => {
            const key = `${word}${index}-source`;
            if (word === '') return null;
            return (
              <SourceTile source={word} index={index} key={key} endDrag={this.endDrag} />
            );
          })}
        </div>
        <div className={`${styles.wrapper} ${styles.selected}`} style={{ marginTop: '4px' }}>
          <h6>Target</h6>
          <div id="targetTiles">
            {targetWords.map((word, index) => {
              const key = `${word}${index}-target`;
              if (word === '') return null;
              return (
                <DraggableTile
                  word={word}
                  index={index}
                  moveTile={this.moveTile}
                  moveSourceTile={this.moveSourceTile}
                  key={key}
                  updateWord={this.updateWord}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

SegmentTiles.propTypes = {
  segment: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentId: PropTypes.number.isRequired,
  documentId: PropTypes.string.isRequired,
  keyLogger: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(SegmentTiles);
