import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../ActionCreators/ProjectActions';
import ProjectContainer from './ProjectContainer';

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