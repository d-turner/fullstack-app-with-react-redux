import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import * as actions from '../../../constants/actionTypes';
import FindReplaceReducer from '../../FindReplace/Reducers/FindReplaceReducer';

const initialState = {
  documents: {},
  lexicon: '',
  selectedSegment: 0,
  editorState: EditorState.createEmpty(),
  findReplace: {
    isFinding: false,
    render: false,
    word: '',
  },
};

const blankDocument = {
  name: '',
  isFetching: false,
  didInvalidate: false,
  xliff: {},
};

const createNewDocumentEntry = (state = blankDocument, action) => {
  return Object.assign({}, state, {
    name: action.name,
    isFetching: true,
  });
};

const documentFetchResults = function(state = blankDocument, action) {
  switch (action.type) {
    case actions.FETCH_DOCUMENT_SUC:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        xliff: action.xliff,
        error: undefined,
      });
    case actions.FETCH_DOCUMENT_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true,
        xliff: undefined,
        error: action.error,
      });
    default:
      return state;
  }
};

const updateTarget = function(state = blankDocument, action) {
  return {
    ...state,
    xliff: {
      ...state.xliff,
      segments: state.xliff.segments.map((segment, index) => {
        if (index !== action.segmentId) { return segment; }
        return { ...segment,
          target: action.editorState.getCurrentContent().getPlainText(),
        };
      }),
    },
  };
};

const splitSegment = function(state, action) {
  if (state.id === action.documentId) {
    const oldSegment = state.xliff.segments[action.segmentId];
    const newSegment1 = Object.assign({}, oldSegment, {
      source: oldSegment.source.substring(0, action.cursorPosition),
      target: '',
    });
    const newSegment2 = Object.assign({}, oldSegment, {
      source: oldSegment.source.substring(action.cursorPosition),
      target: '',
    });
    const newSegments = [newSegment1, newSegment2];
    const before = state.xliff.segments.slice(0, action.segmentId);
    const after = state.xliff.segments.slice(action.segmentId + 1, state.xliff.segments.length);
    const newArr = before.concat(newSegments, after);
    return {
      ...state,
      xliff: {
        ...state.xliff,
        segments: newArr,
      },
    };
  }
  return state;
};

const DocumentReducer = function(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_DOCUMENT:
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.id]: createNewDocumentEntry(state.documents[action.id], action),
        },
      };
    case actions.FETCH_DOCUMENT_SUC:
    case actions.FETCH_DOCUMENT_FAIL:
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.id]: documentFetchResults(state.documents[action.id], action),
        },
      };
    case actions.UPDATE_TARGET:
      return Object.assign({}, state, {
        editorState: action.editorState,
        documents: {
          ...state.documents,
          [action.documentId]: updateTarget(state.documents[action.documentId], action),
        },
      });
    case actions.LOOKUP:
      return {
        ...state,
        lexicon: action.lexicon,
      };
    case actions.SPLIT:
      return Object.assign({}, state, {
        editorState: EditorState.createEmpty(),
        documents: {
          ...state.documents,
          [action.documentId]: splitSegment(state.documents[action.documentId], action),
        },
      });
    case actions.UPDATE_SELECTED:
      return {
        ...state,
        selectedSegment: action.segmentId,
        editorState: EditorState.createWithContent(ContentState.createFromText(
          state.documents[action.documentId].xliff.segments[action.segmentId].target.replace(/(<([^>]+)>)/ig, ''),
        )),
      };
    // extracting all FindReplace actions to separate file
    case actions.FIND:
    case actions.FIND_NEXT:
    case actions.FIND_PREV:
    case actions.REPLACE_TEXT:
    case actions.REPLACE_ALL:
      return FindReplaceReducer(state, action);
    default:
      return state;
  }
};

export default DocumentReducer;
