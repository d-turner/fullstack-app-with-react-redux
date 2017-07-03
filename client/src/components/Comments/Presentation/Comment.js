import React from 'react';
import PropTypes from 'prop-types';

import styles from '../comment.scss';

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={`${styles.format}`}>
        <div className={styles.groupItem}>
          <h4 className={styles.clearPaddingBottom}>{this.props.comment.author}</h4>
          <h5 className={styles.clearPadding}>{this.props.comment.time}</h5>
        </div>
        <div className={styles.groupItem}>
          <p>{this.props.comment.text}</p>
        </div>
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
