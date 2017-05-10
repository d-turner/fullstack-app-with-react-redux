import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SegmentList = (props) => {
  const link = {
    color: 'black',
    textDecoration: 'none',
    padding: '8',
  };

  const renderSegment = (segment, index) =>
    (
      <div key={segment.id.toString()} value={index} className="data-list-item">
        <Link to="/" style={link}>
          <div><span>Segment: {segment.id + 1}</span></div>
          <div><span>{segment.description}</span></div>
        </Link>
      </div>
    );

  return (
    <div className="data-list">
      {props.segments.map(renderSegment)}
    </div>
  );
};

SegmentList.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SegmentList;
