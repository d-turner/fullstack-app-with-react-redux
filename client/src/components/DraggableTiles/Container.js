import React from 'react';
import PropTypes from 'prop-types';

import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';

import store from '../../store';
import * as actions from './TileActions';
import DraggableTile from './DraggableTile';

class SegmentTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { placeholder: false };
    this.moveTile = this.moveTile.bind(this);
  }

  moveTile(dragIndex, hoverIndex, word, isBefore) {
    store.dispatch(
      actions.insertWord(
        dragIndex,
        hoverIndex,
        word,
        isBefore,
        this.props.segmentId,
        this.props.documentId,
      ),
    );
    // on drop only if inside -> store.dispatch(actions.insertWord(hoverIndex, word));
  }

  render() {
    const { segment } = this.props;
    return (
      <div>
        {segment.target.split(' ').map((word, index) => {
          const key = `${word}${index}`;
          if (word === '') return null;
          return <DraggableTile word={word} index={index} moveTile={this.moveTile} key={key} />;
        })}
      </div>
    );
  }
}

SegmentTiles.propTypes = {
  segment: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentId: PropTypes.number.isRequired,
  documentId: PropTypes.number.isRequired,
};

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(SegmentTiles);
