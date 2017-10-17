import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SegmentContainer from './SegmentContainer';
import * as actionCreators from '../ActionCreators/SegmentListActions';

const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { documentReducer, authenticationReducer } = state;
  // return what we want available in the props
  const { documents, editorState, selectedSegment } = documentReducer;
  const { email, userId } = authenticationReducer;
  return {
    documents, editorState, selectedSegment, email, userId,
  };
};

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentContainer);

