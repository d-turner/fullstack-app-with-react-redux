import React from 'react';
import PropTypes from 'prop-types';

import styles from './sidebar.scss';

function Sidebar(props) {
  return (
    <aside className={`${styles.borderBox} ${styles.whiteBackground} fifth`}>
      <div className={`${styles.groupItem} ${styles.borderBottom}`}>
        <i className={`material-icons ${styles.fixTop}`}>keyboard_arrow_left</i>
        <span className={styles.textInline}>Back to Projects</span>
      </div>
      <section>
        <h3>Project Name</h3>
        <div className={styles.sideOptions}>
          <h4>Documents</h4>
          <h4>Memory</h4>
        </div>
      </section>
    </aside>
  );
}

Sidebar.defaultProps = {

};

Sidebar.propTypes = {

};

export default Sidebar;
