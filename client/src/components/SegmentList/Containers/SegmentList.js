import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.css';
import Segment from '../../../components/Segment/Containers/Segment';

class SegmentList extends React.Component {
  componentWillMount() {
    console.warn('Need to fix this so it wont null the first segment');
    this.props.updateSelectedSegment(this.props.documentId, 0);
  }

  selected(index) {
    this.props.updateSelectedSegment(this.props.documentId, index);
  }

  render() {
    const renderSegment = (segment, index) => {
      if (index === this.props.selectedSegment) {
        return (
          <div key={index} value={index} className={`${styles.block} ${styles.selected}`}>
            <div className={styles.segmentWrapper}> {/* another wrapper for row flex*/}
              <div className={styles.segmentId}>{index}</div>{/* segment number*/}
              <Segment documentId={this.props.documentId} segmentId={index} editorState={this.props.editorState} />
            </div>
          </div>
        );
      }

      return (
        <button
          onClick={() => this.selected(index)}
          key={index} value={index} className={styles.block}
          aria-label="Active the selected segment"
          role={'textbox'}>
          <div className={styles.segmentWrapper}> {/* another wrapper for row flex*/}
            <div className={styles.segmentId}>{index}</div>{/* segment number*/}
            <Segment documentId={this.props.documentId} segmentId={index} editorState={this.props.editorState} />
          </div>
        </button>
      );
    };

    return (
      <div className={styles.segmentList}>
        <div className={styles.wrapper}>
          {this.props.segments.map(renderSegment)}
        </div>
      </div>
    );
  }
}

SegmentList.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
  documentId: PropTypes.number.isRequired,
  updateSelectedSegment: PropTypes.func.isRequired,
  editorState: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedSegment: PropTypes.number.isRequired,
};

export default SegmentList;
