import { EditorState, ContentState } from 'draft-js';
import * as actions from '../../../constants/actionTypes';
import styles from '../../../constants/main.scss';

function replaceUsingRegex(target, text, newText, offset) {
  const re = new RegExp(text, 'g');
  const newTarget = target.replace(re, (match, i) => {
    return (i === offset) ? newText : match;
  });
  return newTarget;
}

function removeHighlight(segment) {
  const highlightRemoved = segment.target.replace(/(<([^>]+)>)/ig, '');
  const newSegment = Object.assign({}, segment, {
    target: highlightRemoved,
  });
  return newSegment;
}

function replaceText(state, action) {
  // first remove the old style if present (if not present text does not exist)
  const segments = state.documents[action.documentId].xliff.segments;
  const oldSegment = removeHighlight(segments[state.find.index]);

  if (state.selectedSegment === state.find.index) {
    // the current target is selected / in editor mode
    // TODO: NEED to FIX WHAT IT DOES HERE
    return state;
  } else {
    // the current target is plain text / not editor mode
    // replace the text with the new text
    let firstWord = false;
    if (state.find.offset === 0) {
      firstWord = true;
    }
    const newTarget = replaceUsingRegex(oldSegment.target, action.text, action.newText, firstWord ? 0 : state.find.offset - 1);
    const newSeg = Object.assign({}, oldSegment, {
      target: newTarget,
    });
    return {
      ...state,
      documents: {
        ...state.documents,
        [action.documentId]: {
          ...state.documents[action.documentId],
          xliff: {
            ...state.documents[action.documentId].xliff,
            segments: [
              ...state.documents[action.documentId].xliff.segments.slice(0, state.find.index),
              newSeg,
              ...state.documents[action.documentId].xliff.segments.slice(state.find.index + 1),
            ],
          },
        },
      },
    };
  }
}

const findNext = (state, action) => {
  // first remove the old style if present
  const segments = state.documents[action.documentId].xliff.segments;
  const oldSegment = removeHighlight(segments[state.find.index]);

  const currentSegment = segments[state.find.index];
  const currentTarget = segments[state.find.index].target;

  const textPresent = oldSegment.target.indexOf(action.text, state.find.offset);

  if (textPresent !== -1) {
    // text is found in the current target
    if (state.selectedSegment === state.find.index) {
      // the current target is selected / in editor mode
      // TODO: NEED to FIX WHAT IT DOES HERE
      return state;
    } else {
      // the current target is plain text / not editor mode
      // update the offset (textPresent)
      // set the index (state.find.index)
      // add style to the plain text
      const newText = `<span id='find' class=${styles.highlight}>${action.text}</span>`;
      const newTarget = replaceUsingRegex(oldSegment.target, action.text, newText, textPresent);
      console.log(newTarget);
      const newSeg = Object.assign({}, currentSegment, {
        target: newTarget,
      });
      console.log(newSeg);
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.documentId]: {
            ...state.documents[action.documentId],
            xliff: {
              ...state.documents[action.documentId].xliff,
              segments: [
                ...state.documents[action.documentId].xliff.segments.slice(0, state.find.index),
                newSeg,
                ...state.documents[action.documentId].xliff.segments.slice(state.find.index + 1),
              ],
            },
          },
        },
        find: {
          ...state.find,
          offset: textPresent + 1,
        },
      };
    }
  } else {
    // text was not found in this segment and need to update index and search again
    const newState = Object.assign({}, state, {
      documents: {
        ...state.documents,
        [action.documentId]: {
          ...state.documents[action.documentId],
          xliff: {
            ...state.documents[action.documentId].xliff,
            segments: [
              ...state.documents[action.documentId].xliff.segments.slice(0, state.find.index),
              oldSegment,
              ...state.documents[action.documentId].xliff.segments.slice(state.find.index + 1),
            ],
          },
        },
      },
      find: {
        ...state.find,
        index: state.find.index + 1,
        offset: 0,
      },
    });
    return findNext(newState, action);
  }
};

const FindReplaceReducer = function(state, action) {
  switch (action.type) {
    case actions.FIND_NEXT:
      return findNext(state, action);
    case actions.FIND_PREV:
    case actions.REPLACE_TEXT:
      return replaceText(state, action);
    case actions.REPLACE_ALL:
      // return Object.assign({}, state, {
      //   render: true,
      //   word: action.word,
      //   currentSegment: action.currentSegment,
      //   wordIndex: action.index,
      // });
      return state;
    case actions.UPDATE_FIND_LOCATION:
      return Object.assign({}, state, {
        currentSegment: action.location,
      });
    default:
      return state;
  }
};

export default FindReplaceReducer;
