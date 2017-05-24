import React from 'react';
import PropTypes from 'prop-types';

export default function ProjectList(props) {
  const removeProject = (event) => {
    const id = event.target.value;
    props.removeProject(id);
  };

  const renderProject = (project, index) =>
    (
      <div key={project.id.toString()} value={index} className="data-list-item">
        <span>{project.title}, </span>
        <span>{project.description}, </span>
        <span>{project.author}</span>
        <button onClick={removeProject} aria-label="Remove project" value={project.id}>
        Remove project
        </button>
      </div>
    );

  return (
    <div className="data-list">
      {props.projects.map(renderProject)}
    </div>
  );
}

ProjectList.propTypes = {
  removeProject: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};
