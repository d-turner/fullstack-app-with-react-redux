import { EditorState, ContentState } from 'draft-js';
import update from 'immutability-helper';

import * as actions from '../../../constants/actionTypes';
import FindReplaceReducer from '../../FindReplace/Reducers/FindReplaceReducer';
import DocumentList from './DocumentListReducer';

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
        return {
          ...segment,
          target: action.editorState.getCurrentContent().getPlainText(),
        };
      }),
    },
  };
};

function updateSegment(segment, newSource, newTarget) {
  return Object.assign({}, segment, {
    source: newSource,
    target: newTarget,
  });
}

function insertItem(array, index, item) {
  return [
    ...array.slice(0, index),
    ...item,
    ...array.slice(index + 1),
  ];
}

const splitSegment = function(state, action) {
  console.warn(
    'Need to fix comment structure after splitting',
    'Need to fix xliff document structure',
  );
  const oldSegment = state.xliff.segments[action.segmentId];
  const seg1 = updateSegment(oldSegment, oldSegment.source.substring(0, action.cursorPosition), oldSegment.target);
  const seg2 = updateSegment(oldSegment, oldSegment.source.substring(action.cursorPosition), '');
  const newSegments = [seg1, seg2];
  return {
    ...state,
    xliff: {
      ...state.xliff,
      segments: insertItem(state.xliff.segments, action.segmentId, newSegments),
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
  const newSegment = updateSegment(currentSegment, newSource, newTarget);
  const newArr = before.concat(newSegment, after);
  return {
    ...state,
    xliff: {
      ...state.xliff,
      segments: newArr,
    },
  };
};

// const insertWord = function(state, action) {
//   const segments = state.xliff.segments;
//   const newTarget = segments[action.segmentId].target.split(' ');
//   let word = action.word.toLowerCase();
//   if ((action.index === 0 && action.isBefore) || (newTarget[action.index] === '.' && !action.isBefore)) {
//     word = action.word.charAt(0).toUpperCase() + action.word.slice(1);
//   }
//   if (action.isBefore) {
//     newTarget[action.index] = newTarget[action.index].toLowerCase();
//     newTarget.splice(action.index, 0, word);
//   } else {
//     newTarget.splice(action.index + 1, 0, word);
//   }
//   return {
//     ...state,
//     xliff: {
//       ...state.xliff,
//       segments: segments.map((item, index) => {
//         if (index !== action.segmentId) return item;
//         return {
//           ...item,
//           target: newTarget.join(' '),
//         };
//       }),
//     },
//   };
// };

const insertWord = function(state, action) {
  const segments = state.xliff.segments;
  const newTarget = segments[action.segmentId].target.split(' ');
  // if dragIndex == 0 have to set word to lower case and set the dragIndex + 1 word to upper case
  // if hoverIndex == 0 have to set word to upper case and set hoverIndex + 1 word to lower case
  // if neither above and hoverIndex - 1 == '.' need to set to upper case and set hover index to lower case
  // 
  // word has same case for all other scenarios
  const newData = update(newTarget, {
    $splice: [
      [action.dragIndex, 1],
      [action.hoverIndex, 0, action.word],
    ],
  });
  // if (action.dragIndex === 0) {
  //   newData[action.hoverIndex].charAt(0).toLowerCase();
  // }
  return {
    ...state,
    xliff: {
      ...state.xliff,
      segments: segments.map((item, index) => {
        if (index !== action.segmentId) return item;
        return {
          ...item,
          target: newData.join(' '),
        };
      }),
    },
  };
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
      const updatedState = insertWord(state.documents[action.documentId], action);
      return Object.assign({}, state, {
        editorState: EditorState.createWithContent(ContentState.createFromText(updatedState.xliff.segments[action.segmentId].target)),
        documents: {
          ...state.documents,
          [action.documentId]: updatedState,
        },
      });
    case actions.RESET_EDITOR:
      return Object.assign({}, state, {
        editorState: '',
      });
    // extracting all FindReplace actions to separate file
    case actions.FIND:
    case actions.FIND_NEXT:
    case actions.FIND_PREV:
    case actions.REPLACE_TEXT:
    case actions.REPLACE_ALL:
      return FindReplaceReducer(state, action);
    case actions.FETCH_DOCUMENT_LIST:
    case actions.INSERT_DOCUMENTS:
    case actions.DOCUMENT_LIST_FAIL:
      return DocumentList(state, action);
    default:
      return state;
  }
};

export default DocumentReducer;
