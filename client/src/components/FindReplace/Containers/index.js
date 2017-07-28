import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../ActionCreators/FindReplaceActions';
import DocumentContainer from './FindReplace';

const mapDispatchToProps = function(dispatch) {
  // get the available dispatch actions
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(null, mapDispatchToProps)(DocumentContainer);
