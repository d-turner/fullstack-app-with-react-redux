import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProjectList from './ProjectList';
import AddProject from './AddProject';
import * as actionCreators from '../actions/actionCreators';

function ProjectContainer(props) {
  return (
    <div>
      <ProjectList {...props} />
      <AddProject {...props} />
    </div>
  );
}

const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { projectReducer } = state;
  const { projects } = projectReducer;
  // return what we want available in the props
  return {
    projects,
  };
};

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);
