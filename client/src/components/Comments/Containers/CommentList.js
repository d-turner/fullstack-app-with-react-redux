import React from 'react';
import PropTypes from 'prop-types';

import Comment from '../Presentation/Comment';
import styles from '../comment.scss';

class CommentList extends React.Component {
  static renderComment(comment, segmentId, index) {
    return (
      <div className={styles.commentBorder} key={comment.time + comment.id} value={comment.time + comment.id}>
        <Comment comment={comment} segmentId={segmentId} index={index} />
      </div>
    );
  }

  render() {
    const { comments, documentId } = this.props;
    if (Object.keys(comments[documentId]).length === 0) {
      return (
        <div>
          <h4>No Comments available</h4>
        </div>
      );
    }
    return (
      <div>
        {Object.keys(comments[documentId]).map((segmentId) => {
          return (
            <div className={`flex five ${styles.commentGroup}`} key={segmentId}>
              <div className={styles.fixWidth}>
                <h3>#{segmentId}</h3>
              </div>
              <div className="four-fifth">
                {(comments[documentId][segmentId]).map((comment, index) => {
                  return CommentList.renderComment(
                    comments[documentId][segmentId][index],
                    segmentId,
                    index,
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

CommentList.propTypes = {
  documentId: PropTypes.string.isRequired,
  comments: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default CommentList;
