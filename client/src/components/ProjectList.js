import React from 'react';
import PropTypes from 'prop-types';

export default class ProjectList extends React.Component {
  createListItem(project) {
    return (
      <li key={this.project}>
        <div>{project}</div>
      </li>
    );
  }
  render() {
    return (
      <ul className="project-list">
        {this.props.projects.map(this.createListItem)}
      </ul>
    );
  }

}

ProjectList.PropTypes = {
  projects: PropTypes.array.isRequired,
};
