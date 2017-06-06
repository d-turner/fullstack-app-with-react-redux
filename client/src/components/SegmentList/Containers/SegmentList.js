import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.css';
import Segment from '../../../components/Segment/Containers/Segment';

class SegmentList extends React.Component {
  render() {
    const renderSegment = (segment, index) =>
    (
      <div key={index} value={index} className={styles.block}>
        <div className={styles.segmentWrapper}> {/* another wrapper for row flex*/}
          <div className={styles.segmentId}>{index}</div>{/* segment number*/}
          <Segment match={this.props.match} segmentId={index} />
        </div>
      </div>
    );

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
  id: PropTypes.string.isRequired,
};

export default SegmentList;
