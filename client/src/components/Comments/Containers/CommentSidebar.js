import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles.css';
import CommentList from './CommentList';

class CommentSidebar extends React.Component {
  render() {
    return (
      <div>
        <h3>Comments</h3>
        <div className={`${styles.wrapper} ${styles.overflow}`}>
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
