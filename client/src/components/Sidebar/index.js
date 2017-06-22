import { connect } from 'react-redux';

import Sidebar from './Containers/Sidebar';

const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { documentReducer, commentReducer } = state;
  // return what we want available in the props
  const { lexicon } = documentReducer;
  const { renderComments } = commentReducer;
  return {
    lexicon,
    renderComments,
  };
};

export default connect(mapStateToProps)(Sidebar);
