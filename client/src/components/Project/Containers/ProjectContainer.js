import React from 'react';

import ProjectList from './ProjectList';
import AddProject from './AddProject';
import SideContent from '../Presentation/SideContent';

import styles from '../projects.scss';

class ProjectContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addProject: false };
    this.addProject = this.addProject.bind(this);
    this.cancelAdd = this.cancelAdd.bind(this);
  }

  addProject() {
    this.setState({ addProject: true });
  }

  cancelAdd() {
    this.setState({ addProject: false });
  }

  render() {
    return (
      <div className={`flex five ${styles.wrapper}`} >
        <aside className={`fifth ${styles.sidebar}`} >
          <SideContent addProject={this.addProject} />
        </aside>
        <div className={`four-fifth flex four ${styles.projects}`}>
          {this.state.addProject ?
            <AddProject cancelAdd={this.cancelAdd} {...this.props} /> :
            ''
          }
          <article className="half">
            <ProjectList {...this.props} />
          </article>
        </div>
      </div>
    );
  }
}

export default ProjectContainer;
