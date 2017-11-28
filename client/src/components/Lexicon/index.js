import { connect } from 'react-redux';

import LexiconContainer from './Containers/Lexicon';

const mapStateToProps = function(state) {
  // get the required reducer(s) from the state
  const { documentReducer } = state;
  // return what we want available in the props
  const { lexicon, documents } = documentReducer;
  return {
    lexicon,
    documents,
  };
};


export default connect(mapStateToProps)(LexiconContainer);
