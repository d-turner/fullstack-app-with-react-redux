import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../store';
import ProjectList from './ProjectList';


export default class ProjectContainer extends React.Component {
  // called before it is mounted
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    store.dispatch({
      type: 'POP_PROJECTS',
      projects: [1, 2, 3],
    });
  }

  render() {
    return <ProjectList projects={this.props.projects} />;
  }
}

ProjectContainer.PropTypes = {
  projects: PropTypes.array.isRequired,
};
