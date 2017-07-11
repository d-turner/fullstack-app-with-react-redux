import React from 'react';
import PropTypes from 'prop-types';

import styles from '../comment.scss';
import CommentList from './CommentList';

class CommentSidebar extends React.Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <h3 className={styles.clearPaddingLeft}>Comments</h3>
        <div className={`${styles.overflow} ${styles.groupItem}`}>
          <CommentList documentId={this.props.documentId} {...this.props} />
        </div>
      </div>
    );
  }
}


CommentSidebar.propTypes = {
  documentId: PropTypes.number.isRequired,
};

export default CommentSidebar;
