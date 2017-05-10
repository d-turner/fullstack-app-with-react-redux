import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import store from '../store';
import ProjectList from './ProjectList';
import * as actionCreators from '../actions/actionCreators';

function ProjectContainer(props) {
  return (
    <div>
      <ProjectList {...props} />
      <AddProject {...props} />
    </div>
  );
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
