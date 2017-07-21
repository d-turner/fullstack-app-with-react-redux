import React from 'react';
import PropTypes from 'prop-types';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';

import store from '../../../store';
import * as actions from '../ActionCreators/SegmentActions';
import SourceTiles from './SourceTiles';
import TargetTiles from './TargetTiles';

import styles from '../segment.scss';

class SegmentTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { placeholder: false };
    this.moveTile = this.moveTile.bind(this);
    this.endDrag = this.endDrag.bind(this);
  }
  moveTile(dragIndex, hoverIndex, word, isBefore) {
    this.setState({
      placeholder: true,
      hoverIndex,
      word,
      isBefore,
    });
    // on drop only if inside -> store.dispatch(actions.insertWord(hoverIndex, word));
  }
  endDrag(word) {
    console.log('Firing...');
    store.dispatch(
      actions.insertWord(this.state.hoverIndex, this.state.word, this.state.isBefore, this.props.segmentId),
    );
    this.setState({ placeholder: false });
  }

  render() {
    const { segment } = this.props;
    return (
      <div>
        <div id="wordTiles" className={`${styles.wrapper} ${styles.selected}`}>
          <h6>#{this.props.segmentId} Source</h6>
          {segment.source.split(' ').map((word, index) => {
            if (word === '') return <div key={word + index} />;
            return <SourceTiles source={word} index={index} moveTile={this.moveTile} key={word + index} endDrag={this.endDrag} />;
          })}
        </div>
        <div className={`${styles.wrapper} ${styles.selected}`} style={{ marginTop: '4px' }}>
          <h6>Target</h6>
          {segment.target.split(' ').map((word, index) => {
            if (word === '') return <div key={word + index} />;
            if (this.state.placeholder && this.state.hoverIndex === index) {
              if (this.state.isBefore) {
                return (
                  <div className={styles.inlineBlock} key={word + index}>
                    <div className={`${styles.format} ${styles.inserted}`}>{this.state.word}</div>
                    <TargetTiles target={word} index={index} moveTile={this.moveTile} />
                  </div>
                );
              }
              return (
                <div className={styles.inlineBlock} key={word + index}>
                  <TargetTiles target={word} index={index} moveTile={this.moveTile} />
                  <div className={`${styles.format} ${styles.inserted}`}>{this.state.word}</div>
                </div>);
            }
            return <TargetTiles target={word} index={index} moveTile={this.moveTile} key={word + index} />;
          })}
        </div>
      </div>
    );
  }
}

SegmentTiles.propTypes = {
  segment: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentId: PropTypes.number.isRequired,
};

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(SegmentTiles);
