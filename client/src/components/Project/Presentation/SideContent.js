import React from 'react';
import PropTypes from 'prop-types';

import styles from '../projects.scss';

class SideContent extends React.Component {
  render() {
    return (
      <div className={styles.sideContent}>
        <h2>Projects</h2>
        <h3>Active Projects</h3>
        <h3>Archived Projects</h3>
        <button
          className={styles.createNew}
          onClick={() => this.props.addProject()}>Create New Project
        </button>
      </div>
    );
  }
}

SideContent.propTypes = {
  addProject: PropTypes.func.isRequired,
};

export default SideContent;
