import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SegmentList from './SegmentList';
import * as actionCreators from '../../actions/segmentActions';

function SegmentContainer(props) {
  return (
    <div>
      <SegmentList {...props} />
    </div>
  );
}

const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { segmentReducer } = state;
  const { segments } = segmentReducer;
  // return what we want available in the props
  return {
    segments,
  };
};

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentContainer);
