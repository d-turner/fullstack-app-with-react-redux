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
      <div key={index} value={index} className="data-list-item" style={linkBlock}>
        <div style={wrapper}>
          <Link to={`/documents/${this.props.id}/segments/${index}`} style={link}>
            <div><span>Segment: {index + 1}</span></div>
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
