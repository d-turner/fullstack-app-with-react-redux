import React from 'react';
import PropTypes from 'prop-types';

import Lexicon from '../../Lexicon/Containers';
import Comments from '../../Comments/Containers';
import FindReplace from '../../FindReplace/Containers';
import styles from '../sidebar.scss';

function Sidebar(props) {
  if (props.renderComment) {
    return (
      <div className={styles.parent}>
        <div className={`${styles.fixedPosition}`}>
          <Comments documentId={props.documentId} />
        </div>
      </div>
    );
  } else if (props.renderLexicon) {
    return (
      <div className={styles.parent}>
        <div className={`${styles.fixedPosition}`}>
          <Lexicon documentId={props.documentId} />
        </div>
      </div>
    );
  } else if (props.renderSearch) {
    return (
      <div className={styles.parent}>
        <div className={`${styles.fixedPosition}`}>
          <FindReplace documentId={props.documentId} />
        </div>
      </div>
    );
  }
  return (
    <div />
  );
}

Sidebar.defaultProps = {
  renderComment: false,
  renderLexicon: false,
  renderSearch: true,
};

Sidebar.propTypes = {
  documentId: PropTypes.number.isRequired,
  renderComment: PropTypes.bool,
  renderLexicon: PropTypes.bool,
  renderSearch: PropTypes.bool,
};

export default Sidebar;
