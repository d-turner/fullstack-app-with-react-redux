import React from 'react';

import styles from '../comment.scss';
import main from '../../../constants/main.scss';
import CommentList from './CommentList';

function CommentSidebar(props) {
  return (
    <div style={{ height: '100%' }}>
      <h3 className={main.clearPaddingLeft}>Comments</h3>
      <div className={`${styles.overflow} ${main.groupItem}`}>
        <CommentList {...props} />
      </div>
    </div>
  );
}

export default CommentSidebar;
