import { connect } from 'react-redux';

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

export default connect(mapStateToProps)(SegmentContainer);
