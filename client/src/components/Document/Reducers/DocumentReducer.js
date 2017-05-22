import * as actions from '../../../constants/actionTypes';

const initialState = {
  documents: {},
};

const blankDocument = {
  isFetching: false,
  didInvalidate: false,
  xliff: {},
};

const Document = function(state = blankDocument, action) {
  switch (action.type) {
    case actions.FETCH_DOCUMENT:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        id: action.id,
      });
    case actions.FETCH_DOCUMENT_SUC:
      console.log('State: ', state);
      return Object.assign({}, state, {
        isFetching: false,
        xliff: action.xliff,
      });
    case actions.FETCH_DOCUMENT_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true,
        error: action.error,
      });
    default:
      return state;
  }
};

const DocumentListReducer = function(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_DOCUMENT:
    case actions.FETCH_DOCUMENT_SUC:
    case actions.FETCH_DOCUMENT_FAIL:
      return Object.assign({}, state, {
        documents: {
          ...state.documents,
          [action.documentName]: Document(state.documents[action.documentName], action),
        },
      });
    default:
      return state;
  }
};

export default DocumentListReducer;
