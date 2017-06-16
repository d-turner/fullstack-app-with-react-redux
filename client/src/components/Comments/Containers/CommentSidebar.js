import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../Sidebar/styles.css';
import Comments from './CommentList';

class CommentSidebar extends React.Component {
  render() {
    return (
      <div className={styles.parent}>
        <div className={`${styles.flexItem} ${styles.lexicon}`}>
          <h3>Comments</h3>
          <div className={`${styles.wrapper} ${styles.overflow}`}>
            <div className={styles.flexItem}>
              <Comments documentId={this.props.documentId} {...this.props} />
            </div>
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
