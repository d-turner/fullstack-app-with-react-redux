import * as actions from '../../../constants/actionTypes';

const initialState = {
  documents: [],
  lexicon: '',
};

const blankDocument = {
  name: '',
  isFetching: false,
  didInvalidate: false,
  xliff: {},
};

const createNew = (id, name) => {
  return Object.assign({}, blankDocument, {
    id,
    name,
    isFetching: true,
  });
};

const Document = function(state = blankDocument, action) {
  if (state.name !== action.documentName) {
    return state;
  }
  switch (action.type) {
    case actions.FETCH_DOCUMENT_SUC:
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

const updateTarget = function(state = blankDocument, action) {
  if (state.id === action.segment.documentId) {
    return {
      ...state,
      xliff: {
        ...state.xliff,
        segments: state.xliff.segments.map((segment, index) => {
          if (index !== action.segment.segmentId) { return segment; }
          return { ...segment, target: action.segment.plainText, editorState: action.segment.editorState };
        }),
      },
    };
  }
  return state;
};

const DocumentListReducer = function(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_DOCUMENT:
      return Object.assign({}, state, {
        documents: [
          ...state.documents,
          createNew(action.id, action.documentName),
        ],
      });
    case actions.FETCH_DOCUMENT_SUC:
    case actions.FETCH_DOCUMENT_FAIL:
      return Object.assign({}, state, {
        documents: state.documents.map(doc => Document(doc, action)),
      });
    case actions.UPDATE_TARGET:
      return Object.assign({}, state, {
        documents: state.documents.map(doc => updateTarget(doc, action)),
      });
    case actions.LOOKUP:
      return {
        ...state,
        lexicon: action.lexicon,
      };
    default:
      return state;
  }
};

export default DocumentListReducer;
