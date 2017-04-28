import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import store from '../store';
import ProjectList from './ProjectList';
import * as actionCreators from '../actions/actionCreators';

class ProjectContainer extends React.Component {
  componentDidMount() {
    store.dispatch({
      type: 'POP_PROJECTS',
      projects: [
        { id: 0, title: 'first', description: 'description 1', author: 'author 1' },
        { id: 1, title: 'second', description: 'description 2', author: 'author 2' },
      ],
    });
  }
  render() {
    return <ProjectList projects={this.props.projects} addProject={this.props.addProject} />;
  }
}

ProjectContainer.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = function() {
  return {
    projects: store.getState().projectReducer.projects,
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);
