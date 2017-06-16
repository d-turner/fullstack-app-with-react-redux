import React from 'react';
import PropTypes from 'prop-types';

import Comment from '../Presentation/Comment';
import styles from '../styles.css';

class CommentList extends React.Component {
  render() {
    const renderComment = (comment, index) => {
      return (
        <div key={comment.id} value={comment.id}>
          <Comment comment={comment} index={index} />
        </div>
      );
    };

    return (
      <div className={styles.commentWrapper}>
        {Object.keys(this.props.comments[this.props.documentId]).map((segmentId) => {
          return (this.props.comments[this.props.documentId][segmentId]).map((comment, index) => {
            return renderComment(this.props.comments[this.props.documentId][segmentId][index], index);
          });
        })}
      </div>
    );
  }
}

CommentList.propTypes = {
  documentId: PropTypes.number.isRequired,
  comments: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default CommentList;
