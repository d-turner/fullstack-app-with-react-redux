import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.css';

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={`${styles.format}`}>
        <div>Comment: {this.props.comment.text}</div>
        <div>Author: {this.props.comment.author}</div>
        <div>Timestamp: {this.props.comment.time}</div>
        <div>Segment: {this.props.segmentId}</div>
        <div>Index: {this.props.index}</div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  segmentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  index: PropTypes.number.isRequired,
};

export default Comment;
