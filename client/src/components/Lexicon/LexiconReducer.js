import * as actions from '../../constants/actionTypes';

const initialState = {
  lexicon: '',
  sourceLanguage: '',
  targetLanguage: '',
};

const LexiconReducer = function(state = initialState, action) {
  switch (action.type) {
    case actions.LOOKUP:
      return {
        ...state,
        lexicon: action.lexicon,
      };
    default:
      return state;
  }
};

export default LexiconReducer;
