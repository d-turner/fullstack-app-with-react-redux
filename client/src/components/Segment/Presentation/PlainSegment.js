import React from 'react';
import PropTypes from 'prop-types';

import styles from '../segment.scss';

function PlainSegment(props) {
  const className = styles.wrapper;
  let tick = null;
  if (props.segment.accepted) {
    tick = <i className={`material-icons ${styles.tick}`}>check_circle</i>;
  }
  return (
    <div className={styles.hide}>
      <div className={className}>
        <h6>#{props.segmentId} Source {tick}</h6>
        {props.segment.source}
      </div>
      <div className={styles.wrapper}>
        <h6>Target</h6>
        <span dangerouslySetInnerHTML={{ __html: props.segment.target }} />
      </div>
    </div>
  );
}

PlainSegment.propTypes = {
  segment: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentId: PropTypes.number.isRequired,
};

export default PlainSegment;
