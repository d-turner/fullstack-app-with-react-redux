import { EditorState, ContentState } from 'draft-js';
import * as actions from '../../../constants/actionTypes';
import FindReplaceReducer from '../../FindReplace/Reducers/FindReplaceReducer';

const initialState = {
  documents: {},
  lexicon: '',
  selectedSegment: 0,
  editorState: '',
  find: {
    isFinding: false,
    render: false,
    word: '',
    index: 0,
    offset: 0,
  },
};

const blankDocument = {
  name: '',
  isFetching: false,
  didInvalidate: false,
  xliff: {},
};

const cleanText = (text, lowercaseBefore) => {
  let newText = (text === undefined || text === null) ? '' : text;
  if (lowercaseBefore) { newText = newText.toLowerCase(); }
  newText = newText.replace(/\./g, '. ');
  newText = newText.replace(/  +/g, ' ');
  newText = newText.replace(/(<([^>]+)>)/ig, '');
  newText = newText.split('.').map(data => data.trim()).join('. ');
  return newText.toString().replace(/(^|\. *)([a-z])/g, (match, separator, char) => {
    return separator + char.toUpperCase();
  });
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
  console.warn(
    'Need to fix comment structure after splitting',
    'Need to fix xliff document structure',
  );
  const oldSegment = state.xliff.segments[action.segmentId];
  const newSegment1 = Object.assign({}, oldSegment, {
    source: oldSegment.source.substring(0, action.cursorPosition),
    target: oldSegment.target,
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
};

const mergeSegment = function(state, action) {
  console.warn(
    'Need to fix comment structure after splitting',
    'Need to fix xliff document structure',
  );
  const currentSegment = state.xliff.segments[action.segmentId];
  const nextSegment = state.xliff.segments[action.segmentId + 1];
  const newSource = currentSegment.source.concat(' ', nextSegment.source);
  const newTarget = currentSegment.target.concat(' ', nextSegment.target);
  const before = state.xliff.segments.slice(0, action.segmentId);
  const after = state.xliff.segments.slice(action.segmentId + 2, state.xliff.segments.length);
  const newSegment = Object.assign({}, currentSegment, {
    source: newSource,
    target: newTarget,
  });
  const newArr = before.concat(newSegment, after);
  return {
    ...state,
    xliff: {
      ...state.xliff,
      segments: newArr,
    },
  };
};

const insertWord = function(state, action) {
  const segments = state.xliff.segments;
  const newTarget = segments[action.segmentId].target.split(' ');
  let word = action.word.toLowerCase();
  if ((action.index === 0 && action.isBefore) || (newTarget[action.index] === '.' && !action.isBefore)) {
    word = action.word.charAt(0).toUpperCase() + action.word.slice(1);
  }
  if (action.isBefore) {
    newTarget[action.index] = newTarget[action.index].toLowerCase();
    newTarget.splice(action.index, 0, word);
  } else {
    newTarget.splice(action.index + 1, 0, word);
  }
  segments[action.segmentId].target = newTarget.join(' ');
  return state;
  // return {
  //   ...state,
  //   xliff: {
  //     ...state.xliff,
  //     segments,
  //   },
  // };
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
        documents: {
          ...state.documents,
          [action.documentId]: splitSegment(state.documents[action.documentId], action),
        },
      });
    case actions.MERGE:
      if (action.segmentId >= state.documents[action.documentId].xliff.segments.length - 1) {
        return state;
      }
      return Object.assign({}, state, {
        editorState: action.segmentId === state.selectedSegment ?
        EditorState.createWithContent(ContentState.createFromText(
          state.documents[action.documentId].xliff.segments[action.segmentId].target
          + ' ' + state.documents[action.documentId].xliff.segments[action.segmentId + 1].target,
        )) : state.editorState,
        documents: {
          ...state.documents,
          [action.documentId]: mergeSegment(state.documents[action.documentId], action),
        },
      });
    case actions.UPDATE_SELECTED:
      const text = cleanText(state.documents[action.documentId].xliff.segments[action.segmentId].target);
      return {
        ...state,
        selectedSegment: action.segmentId,
        editorState: EditorState.createWithContent(ContentState.createFromText(text)),
      };
    case actions.INSERT_WORD:
      const updatedState = insertWord(state.documents['123457'], action);
      return Object.assign({}, state, {
        editorState: EditorState.createWithContent(ContentState.createFromText(updatedState.xliff.segments[action.segmentId].target)),
        documents: {
          ...state.documents,
          ['123457']: updatedState,
        },
      });
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
