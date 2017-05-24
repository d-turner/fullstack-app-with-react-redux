import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../ActionCreators/SegmentActions';
import SegmentContainer from './SegmentContainer';

const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { documentReducer } = state;
  // return what we want available in the props
  const { documents } = documentReducer;
  return {
    documents,
  };
};

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentContainer);
