import { EditorState, ContentState } from 'draft-js';
import update from 'immutability-helper';

import * as actions from '../../../constants/actionTypes';
import FindReplaceReducer from '../../FindReplace/Reducers/FindReplaceReducer';
import DocumentList from './DocumentListReducer';
import { splitTextIntoArray, joinTextArray, cleanText } from '../../../utils/stringParser';

const initialState = {
  documents: {},
  selectedSegment: -1,
  editorState: '',
};

const blankDocument = {
  name: '',
  isFetching: false,
  didInvalidate: false,
  xliff: {},
};

const createNewDocumentEntry = (state = blankDocument) => {
  return Object.assign({}, state, {
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
  return update(state, {
    xliff: {
      segments: {
        [action.segmentId]: {
          target: {
            $set: action.editorState.getCurrentContent().getPlainText(),
          },
        },
      },
    },
  });
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

// TODO: Fix Comment Structure After Split
// TODO: Fix Document Structure After Split
const splitSegment = function(state, action) {
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

// TODO: Fix Comment Structure After Merge
// TODO: Fix Document Structure After Merge
const mergeSegment = function(state, action) {
  const currentSegment = state.xliff.segments[action.segmentId];
  const nextSegment = state.xliff.segments[action.segmentId + 1];
  const newSource = currentSegment.source.concat(' ', nextSegment.source);
  const newTarget = currentSegment.target.concat(' ', nextSegment.target);
  const before = state.xliff.segments.slice(0, action.segmentId);
  const after = state.xliff.segments.slice(action.segmentId + 2, state.xliff.segments.length);
  const newSegment = updateSegment(currentSegment, newSource, newTarget);
  const newArr = before.concat(newSegment, after);
  return update(state, {
    xliff: {
      segments: {
        $set: newArr,
      },
    },
  });
};

const updateFromVoiceInput = function(state, action) {
  const { documentId, segmentId, text } = action;
  let editorState = state.editorState;
  if (segmentId === state.selectedSegment) {
    editorState = EditorState.createWithContent(ContentState.createFromText(text));
  }
  return update(state, {
    editorState: {
      $set: editorState,
    },
    documents: {
      [documentId]: {
        xliff: {
          segments: {
            [segmentId]: {
              target: {
                $set: text,
              },
            },
          },
        },
      },
    },
  });
};

const insertWord = function(state, action) {
  const segments = state.xliff.segments;
  const newTarget = splitTextIntoArray(segments[action.segmentId].target);
  // need to remove other words
  for (let i = 0; i < action.indexArr.length; i++) {
    if (action.indexArr[i] !== action.dragIndex) {
      newTarget[action.indexArr[i]] = '';
    }
  }
  // if dragIndex == 0 have to set word to lower case and set the dragIndex + 1 word to upper case
  // if hoverIndex == 0 have to set word to upper case and set hoverIndex + 1 word to lower case
  // if neither above and hoverIndex - 1 == '.' need to set to upper case and set hover index to lower case
  // word has same case for all other scenarios
  const word = action.word;
  // TODO: Character Capital After Insert
  // if (action.hoverIndex === 0 || newTarget[action.hoverIndex - 1] === '.') {
  //   word = action.word.charAt(0).toUpperCase() + action.word.slice(1);
  // }
  const newData = update(newTarget, {
    $splice: [
      [action.dragIndex, 1],
      [action.hoverIndex, 0, word],
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
          target: joinTextArray(newData),
        };
      }),
    },
  };
};

const insertSourceWord = function(state, action) {
  const segments = state.xliff.segments;
  const newTarget = splitTextIntoArray(segments[action.segmentId].target);
  const word = action.word; // .toLowerCase();
  // TODO: Character Capital After Insert
  // if ((action.index === 0 && action.isBefore) || (newTarget[action.index] === '.' && !action.isBefore)) {
  //   word = action.word.charAt(0).toUpperCase() + action.word.slice(1);
  // }
  if (action.isBefore) {
    // newTarget[action.index] = newTarget[action.index].toLowerCase();
    newTarget.splice(action.index, 0, word);
  } else {
    newTarget.splice(action.index + 1, 0, word);
  }
  return {
    ...state,
    xliff: {
      ...state.xliff,
      segments: segments.map((item, index) => {
        if (index !== action.segmentId) return item;
        return {
          ...item,
          target: joinTextArray(newTarget),
        };
      }),
    },
  };
};

const updateWord = function(state, action) {
  const segments = state.xliff.segments;
  const newTarget = splitTextIntoArray(segments[action.segmentId].target);
  const text = action.text;
  newTarget[action.index] = text;
  return {
    ...state,
    xliff: {
      ...state.xliff,
      segments: segments.map((item, index) => {
        if (index !== action.segmentId) return item;
        return {
          ...item,
          target: joinTextArray(newTarget),
        };
      }),
    },
  };
};

const updateWordOrder = function(state, action) {
  const segments = state.xliff.segments;
  return {
    ...state,
    xliff: {
      ...state.xliff,
      segments: segments.map((item, index) => {
        if (index !== action.segmentId) return item;
        return {
          ...item,
          target: joinTextArray(action.wordArray),
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
      return update(state, {
        editorState: {
          $set: action.editorState,
        },
        documents: {
          [action.documentId]: {
            $set: updateTarget(state.documents[action.documentId], action),
          },
        },
      });
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
            `${state.documents[action.documentId].xliff.segments[action.segmentId].target} \
            ${state.documents[action.documentId].xliff.segments[action.segmentId + 1].target}`))
          : state.editorState,
        documents: {
          ...state.documents,
          [action.documentId]: mergeSegment(state.documents[action.documentId], action),
        },
      });
    case actions.UPDATE_SELECTED: {
      if (state.selectedSegment === action.segmentId ||
        action.segmentId >= state.documents[action.documentId].xliff.segments.length) return state;
      if (action.segmentId === -1) {
        return Object.assign({}, state, {
          selectedSegment: action.segmentId,
          editorState: '',
        });
      }
      const text = cleanText(state.documents[action.documentId].xliff.segments[action.segmentId].target);
      return Object.assign({}, state, {
        selectedSegment: action.segmentId,
        editorState: EditorState.createWithContent(ContentState.createFromText(text)),
      });
    }
    case actions.INSERT_WORD: {
      const updatedState = insertWord(state.documents[action.documentId], action);
      return Object.assign({}, state, {
        editorState:
          EditorState.createWithContent(
            ContentState.createFromText(updatedState.xliff.segments[action.segmentId].target)),
        documents: {
          ...state.documents,
          [action.documentId]: updatedState,
        },
      });
    }
    case actions.INSERT_SOURCE_WORD: {
      const updatedState1 = insertSourceWord(state.documents[action.documentId], action);
      return Object.assign({}, state, {
        editorState:
          EditorState.createWithContent(
            ContentState.createFromText(updatedState1.xliff.segments[action.segmentId].target)),
        documents: {
          ...state.documents,
          [action.documentId]: updatedState1,
        },
      });
    }
    case actions.UPDATE_WORD: {
      const updatedState2 = updateWord(state.documents[action.documentId], action);
      return Object.assign({}, state, {
        editorState:
          EditorState.createWithContent(
            ContentState.createFromText(updatedState2.xliff.segments[action.segmentId].target)),
        documents: {
          ...state.documents,
          [action.documentId]: updatedState2,
        },
      });
    }
    case actions.UPDATE_WORD_ORDER: {
      const updatedState3 = updateWordOrder(state.documents[action.documentId], action);
      return Object.assign({}, state, {
        editorState:
        EditorState.createWithContent(
          ContentState.createFromText(updatedState3.xliff.segments[action.segmentId].target)),
        documents: {
          ...state.documents,
          [action.documentId]: updatedState3,
        },
      });
    }
    case actions.VOICE_INPUT:
      return updateFromVoiceInput(state, action);
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
    default:
      return DocumentList(state, action);
  }
};

export default DocumentReducer;
