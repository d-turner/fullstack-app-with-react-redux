import { EditorState, ContentState } from 'draft-js';
import * as actions from '../../../constants/actionTypes';

const initialState = {
  documents: [],
  lexicon: '',
  selectedSegment: 0,
  editorState: EditorState.createEmpty(),
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
          return { ...segment,
            target: action.segment.editorState.getCurrentContent().getPlainText(),
            editorState: action.segment.editorState,
          };
        }),
      },
    };
  }
  return state;
};

const splitSegment = function(state, action) {
  if (state.id === action.documentId) {
    const oldSegment = state.xliff.segments[action.segmentId];
    const newSegment1 = Object.assign({}, oldSegment, {
      source: oldSegment.source.substring(0, action.cursorPosition),
      target: '',
      editorState: EditorState.createEmpty(),
    });
    const newSegment2 = Object.assign({}, oldSegment, {
      source: oldSegment.source.substring(action.cursorPosition),
      target: '',
      editorState: EditorState.createEmpty(),
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
        editorState: action.segment.editorState,
        documents: state.documents.map(doc => updateTarget(doc, action)),
      });
    case actions.LOOKUP:
      return {
        ...state,
        lexicon: action.lexicon,
      };
    case actions.SPLIT:
      return Object.assign({}, state, {
        documents: state.documents.map(doc => splitSegment(doc, action)),
      });
    case actions.UPDATE_SELECTED:
      if (state.selectedSegment === action.segmentId) {
        return state;
      }
      return {
        ...state,
        selectedSegment: action.segmentId,
        editorState: EditorState.createWithContent(ContentState.createFromText(
          state.documents[action.documentId].xliff.segments[action.segmentId].target,
        )),
      };
    default:
      return state;
  }
};

export default DocumentListReducer;
