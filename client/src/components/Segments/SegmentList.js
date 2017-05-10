import React from 'react';
import PropTypes from 'prop-types';

const SegmentList = (props) => {
  const renderSegment = (project, index) =>
    (
      <div key={project.id.toString()} value={index} className="data-list-item">
        <span>{project.title}, </span>
        <span>{project.description}, </span>
        <span>{project.author}</span>
      </div>
    );

  return (
    <div className="data-list">
      {props.segments.map(renderSegment)}
    </div>
  );
};

SegmentList.propTypes = {
  // removeProject: PropTypes.func.isRequired,
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SegmentList;
