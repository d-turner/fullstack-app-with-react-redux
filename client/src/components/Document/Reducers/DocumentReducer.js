import { EditorState, ContentState } from 'draft-js';
import update from 'immutability-helper';

import * as actions from '../../../constants/actionTypes';
import FindReplaceReducer from '../../FindReplace/Reducers/FindReplaceReducer';
import DocumentList from './DocumentListReducer';
import { splitTextIntoArray, joinTextArray, cleanText } from '../../../utils/stringParser';

/* eslint function-paren-newline: 0 */
const initialState = {
  documents: {},
  selectedSegment: -1,
  editorState: '',
};

const blankDocument = {
  id: '',
  name: '',
  saved_name: '',
  description: '',
  created_at: '',
  isFetching: false,
  didInvalidate: true,
  xliff: {},
  history: { prev: [], next: [] },
  meta: null,
  segments: null,
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
  let { editorState } = state;
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

const insertSourceWord = function(state, action) {
  const { segments } = state.xliff;
  const { word, segmentId } = action; // .toLowerCase();
  const newTarget = splitTextIntoArray(cleanText(segments[segmentId].target));
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
  return update(state, {
    xliff: {
      segments: {
        [segmentId]: {
          target: {
            $set: joinTextArray(newTarget),
          },
        },
      },
    },
    history: {
      prev: {
        $push: [segments[segmentId].target],
      },
      next: {
        $set: [],
      },
    },
  });
};

const updateWord = function(state, action) {
  const { segments } = state.xliff;
  const { text, segmentId } = action;
  const newTarget = splitTextIntoArray(cleanText(segments[segmentId].target));
  newTarget[action.index] = text;
  return update(state, {
    xliff: {
      segments: {
        [segmentId]: {
          target: {
            $set: joinTextArray(newTarget),
          },
        },
      },
    },
    history: {
      prev: {
        $push: (segments[segmentId].target === state.history.prev[state.history.prev.length - 1] ? [] : [segments[segmentId].target]),
      },
      next: {
        $set: [],
      },
    },
  });
};

const updateWordOrder = function(state, action) {
  const { segments } = state.xliff;
  const { wordArray, segmentId } = action;
  return update(state, {
    xliff: {
      segments: {
        [segmentId]: {
          target: {
            $set: joinTextArray(wordArray),
          },
        },
      },
    },
    history: {
      prev: {
        $push: [segments[segmentId].target],
      },
      next: {
        $set: [],
      },
    },
  });
};

const undoTileAction = (state, action) => {
  const { history, xliff } = state;
  const { segmentId } = action;
  if (history.prev.length === 0) return state;
  return update(state, {
    xliff: {
      segments: {
        [segmentId]: {
          target: {
            $set: history.prev[history.prev.length - 1],
          },
        },
      },
    },
    history: {
      prev: {
        $splice: [[history.prev.length - 1, 1]],
      },
      next: {
        $push: [xliff.segments[segmentId].target],
      },
    },
  });
};

const redoTileAction = (state, action) => {
  const { history, xliff } = state;
  const { segmentId } = action;
  if (history.next.length === 0) return state;
  return update(state, {
    xliff: {
      segments: {
        [segmentId]: {
          target: {
            $set: history.next[history.next.length - 1],
          },
        },
      },
    },
    history: {
      prev: {
        $push: [xliff.segments[segmentId].target],
      },
      next: {
        $splice: [[history.next.length - 1, 1]],
      },
    },
  });
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
      return update(state, {
        selectedSegment: { $set: action.segmentId },
        editorState: { $set: EditorState.createWithContent(ContentState.createFromText(text)) },
        documents: {
          [action.documentId]: {
            history: {
              prev: {
                $set: [],
              },
              next: {
                $set: [],
              },
            },
          },
        },
      });
    }
    case actions.INSERT_SOURCE_WORD: {
      const updatedState = insertSourceWord(state.documents[action.documentId], action);
      const { target } = updatedState.xliff.segments[action.segmentId];
      return update(state, {
        editorState: {
          $set: EditorState.createWithContent(ContentState.createFromText(target)),
        },
        documents: {
          [action.documentId]: {
            $set: updatedState,
          },
        },
      });
    }
    case actions.UPDATE_WORD: {
      const updatedState = updateWord(state.documents[action.documentId], action);
      const { target } = updatedState.xliff.segments[action.segmentId];
      return update(state, {
        editorState: {
          $set: EditorState.createWithContent(ContentState.createFromText(target)),
        },
        documents: {
          [action.documentId]: {
            $set: updatedState,
          },
        },
      });
    }
    case actions.UPDATE_WORD_ORDER: {
      const updatedState = updateWordOrder(state.documents[action.documentId], action);
      const { target } = updatedState.xliff.segments[action.segmentId];
      return update(state, {
        editorState: {
          $set: EditorState.createWithContent(ContentState.createFromText(target)),
        },
        documents: {
          [action.documentId]: {
            $set: updatedState,
          },
        },
      });
    }
    case actions.UNDO_TILE:
      return update(state, {
        documents: {
          [action.documentId]: {
            $set: undoTileAction(state.documents[action.documentId], action),
          },
        },
      });
    case actions.REDO_TILE:
      return update(state, {
        documents: {
          [action.documentId]: {
            $set: redoTileAction(state.documents[action.documentId], action),
          },
        },
      });
    case actions.VOICE_INPUT:
      return updateFromVoiceInput(state, action);
    case actions.RESET_EDITOR:
      return Object.assign({}, state, {
        editorState: '',
      });
    case actions.SEGMENTS_SUCCESS:
      return update(state, {
        documents: {
          [action.documentId]: {
            segments: {
              $set: action.segments,
            },
          },
        },
      });
    case actions.UPDATE_SEGMENT:
      return update(state, {
        documents: {
          [action.documentId]: {
            segments: {
              [action.data.segmentIndex]: {
                $set: action.data,
              },
            },
          },
        },
      });
    case actions.CLEAR_TARGET: {
      const oldTarget = state.documents[action.documentId].xliff.segments[action.segmentId].target;
      return update(state, {
        documents: {
          [action.documentId]: {
            xliff: {
              segments: {
                [action.segmentId]: {
                  target: {
                    $set: '',
                  },
                },
              },
            },
            history: {
              prev: {
                $push: [oldTarget],
              },
              next: {
                $set: [],
              },
            },
          },
        },
        editorState: {
          $set: EditorState.createWithContent(ContentState.createFromText('')),
        },
      });
    }
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
