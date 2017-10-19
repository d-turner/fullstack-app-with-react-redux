import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../ActionCreators/CommentActions';
import CommentContainer from './CommentSidebar';

const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { commentReducer, authenticationReducer } = state;
  // return what we want available in the props
  const { comments } = commentReducer;
  const { name } = authenticationReducer;
  return {
    comments, name,
  };
};

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
