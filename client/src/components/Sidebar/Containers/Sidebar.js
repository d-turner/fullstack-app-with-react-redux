import React from 'react';
import PropTypes from 'prop-types';

import Lexicon from '../../Lexicon/Containers';
import Comments from '../../Comments/Containers';
import styles from '../styles.css';

function Sidebar(props) {
  if (props.renderComments) {
    return (
      <div className={styles.parent}>
        <div className={`${styles.flexItem} ${styles.fixedPosition}`}>
          <Comments documentId={props.documentId} />
        </div>
      </div>
    );
  } else if (props.renderLexicon) {
    return (
      <div className={styles.parent}>
        <div className={`${styles.flexItem} ${styles.fixedPosition}`}>
          <Lexicon documentId={props.documentId} />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.parent}>
      <div className={`${styles.flexItem} ${styles.fixedPosition}`}>
        Temp
      </div>
    </div>
  );
}

Sidebar.defaultProps = {
  renderComments: true,
  renderLexicon: false,
};

Sidebar.propTypes = {
  documentId: PropTypes.number.isRequired,
  renderComments: PropTypes.bool,
  renderLexicon: PropTypes.bool,
}
export default Sidebar;
