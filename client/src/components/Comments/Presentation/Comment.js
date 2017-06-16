import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.css';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div className={`${styles.format}`}>
        <div>{this.props.comment.text}</div>
        <div>{this.props.comment.author}</div>
        <div>{this.props.comment.time}</div>
        <div>{this.props.index}</div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default Comment;
