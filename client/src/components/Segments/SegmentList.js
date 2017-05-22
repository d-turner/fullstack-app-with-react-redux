import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const linkBlock = {
  padding: '10px',
  width: '520px',
  backgroundColor: 'lightcoral',
};
const link = {
  color: 'black',
  textDecoration: 'none',
  fontSize: '18px',
  backgroundColor: 'blue',
};
const wrapper = {
  backgroundColor: 'lightblue',
  marginRight: '0px',
  width: '520px',
};

class SegmentList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderSegment = (segment, index) =>
    (
      <div key={segment.id.toString()} value={index} className="data-list-item" style={linkBlock}>
        <div style={wrapper}>
          <Link to={`/segments/${segment.id}`} style={link}>
            <div><span>Segment: {segment.id + 1}</span></div>
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
};

export default SegmentList;
