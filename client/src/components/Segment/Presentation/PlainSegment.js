import React from 'react';
import PropTypes from 'prop-types';

import styles from '../segment.scss';

class PlainSegment extends React.Component {
  render() {
    let className = styles.wrapper;
    if (this.props.edited) {
      className = `${styles.wrapper} ${styles.edited}`;
    }
    return (
      <div>
        <div className={className}>
          <h6>#{this.props.segmentId} Source</h6>
          {this.props.segment.source}
        </div>
        <div className={styles.wrapper}>
          <h6>Target</h6>
          <span dangerouslySetInnerHTML={{ __html: this.props.segment.target }} />
        </div>
      </div>
    );
  }
}

PlainSegment.propTypes = {
  edited: PropTypes.bool.isRequired,
  segment: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentId: PropTypes.number.isRequired,
};

export default PlainSegment;
