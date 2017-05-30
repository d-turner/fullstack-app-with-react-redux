import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from '../styles.css';

class SegmentList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderSegment = (segment, index) =>
    (
      <div key={index} value={index} className={styles.linkBlock}>
        <div className={styles.wrapper}>
          <Link to={`/documents/${this.props.id}/segments/${index}`} className={styles.link}>
            <div><span>Segment: {index}</span></div>
            <div><span>{segment.source}</span></div>
          </Link>
        </div>
      </div>
    );

    return (
      <div className="data-list">
        {this.props.segments.map(renderSegment)}
      </div>
    );
  }
}

SegmentList.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};

export default SegmentList;
