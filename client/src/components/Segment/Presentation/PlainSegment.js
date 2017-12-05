import React from 'react';
import PropTypes from 'prop-types';

import styles from '../segment.scss';

class PlainSegment extends React.Component {
  render() {
    const className = styles.wrapper;
    let tick = null;
    if (this.props.segment.accepted) {
      tick = <i className={`material-icons ${styles.tick}`}>check_circle</i>;
    }
    return (
      <div>
        <div className={className}>
          <h6>#{this.props.segmentId} Source {tick}</h6>
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
  segment: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentId: PropTypes.number.isRequired,
};

export default PlainSegment;
