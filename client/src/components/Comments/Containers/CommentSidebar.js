import React from 'react';
import PropTypes from 'prop-types';

import styles from '../comment.scss';
import CommentList from './CommentList';

class CommentSidebar extends React.Component {
  render() {
    return (
      <div className="flex one">
        <h3 className={styles.clearPaddingLeft}>Comments</h3>
        <div className={`${styles.overflow} ${styles.groupItem}`}>
          <div className={styles.flexItem}>
            <CommentList documentId={this.props.documentId} {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}


CommentSidebar.propTypes = {
  documentId: PropTypes.number.isRequired,
};

export default CommentSidebar;
