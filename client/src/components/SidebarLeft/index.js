import React from 'react';
import PropTypes from 'prop-types';

import styles from './sidebar.scss';
import main from '../../constants/main.scss';

function Sidebar(props) {
  return (
    <aside className={`${main.borderBox} ${main.whiteBackground} fifth`}>
      <div className={`${main.groupItem} ${main.borderBottom}`}>
        <i className={`material-icons ${main.fixTop}`}>keyboard_arrow_left</i>
        <span className={main.textInline}>Back to Projects</span>
      </div>
      <section className={styles.sectionPadding}>
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
