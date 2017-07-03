import React from 'react';
import PropTypes from 'prop-types';

import Comment from '../Presentation/Comment';
import styles from '../comment.scss';

class CommentList extends React.Component {
  renderComment(comment, segmentId, index) {
    return (
      <div className={styles.commentBorder} key={comment.time + comment.id} value={comment.time + comment.id}>
        <Comment comment={comment} segmentId={segmentId} index={index} />
      </div>
    );
  }

  render() {
    return (
      <div>
        {Object.keys(this.props.comments[this.props.documentId]).map((segmentId) => {
          return (
            <div className={`flex five ${styles.commentGroup}`} key={segmentId}>
              <div className={styles.fixWidth}>
                <h3>#{segmentId}</h3>
              </div>
              <div className="four-fifth">
                {(this.props.comments[this.props.documentId][segmentId]).map((comment, index) => {
                  return this.renderComment(
                    this.props.comments[this.props.documentId][segmentId][index], segmentId, index,
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
  documentId: PropTypes.number.isRequired,
  comments: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default CommentList;
