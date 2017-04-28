/* eslint arrow-body-style: 0 */  // --> OFF
/* eslint react/prop-types: 0 */  // --> OFF

import React from 'react';

export default function(props) {
  return (
    <div className="data-list">
      {props.projects.map((project, index) => {
        return (
          <div>
            <div key={project.id.toString()} value={index} className="data-list-item">
              {project.title}
            </div>
            <button onClick={props.addProject.bind(null, 3, 'third', 'des', 'dt')}>Add New Project</button>
          </div>
        );
      })}
    </div>
  );
}
