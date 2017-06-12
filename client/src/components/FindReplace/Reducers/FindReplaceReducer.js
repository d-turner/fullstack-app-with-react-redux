import * as actions from '../../../constants/actionTypes';
import styles from '../../../constants/main.css';

const initialState = {
  isFinding: false,
  render: false,
  word: '',
};

function updateNext(state, action) {
  // TODO: remove current style if needed
  // Update current segment to next one found
  let notFound = true;
  let notLooped = true;
  let index = action.location.segmentId + 1;
  while (notFound && notLooped) {
    if (index >= state.length) index = 0;
    if (index === action.location.segmentId) {
      notLooped = false;
    }
    const targetIndex = state[index].target.indexOf(action.text);
    if (targetIndex !== -1) {
      notFound = false;
      const newTarget = state[index].target.replace(
        action.text,
        `<span id='findreplace' data-location=${index} class=${styles.highlight}>${action.text}</span>`,
      );
      const newIndex = Object.assign({}, state[index], {
        target: newTarget,
      });
      const oldTarget = state[action.location.segmentId].target.replace(/(<([^>]+)>)/ig, '');
      const oldIndex = Object.assign({}, state[action.location.segmentId], {
        target: oldTarget,
      });
      // remove styles from old find if the segments are different
      if (index !== action.location.segmentId) {

      }
      return [
        ...state.slice(0, index),
        newIndex,
        ...state.slice(index + 1),
      ];
    }
    index++;
  }
  return state;
}

export const FINDREPLACEREDUCER = (state, action) => {
  // state contains a document
  if (action.location.documentId === state.id) {
    switch (action.type) {
      case actions.FIND_NEXT:
        return {
          ...state,
          xliff: {
            ...state.xliff,
            segments: updateNext(state.xliff.segments, action),
          },
        };
      default: return state;
    }
  }
  return state;
};

const FindReplaceReducer = function(state = initialState, action) {
  switch (action.type) {
    case actions.FIND:
      return Object.assign({}, state, {
        render: true,
        word: action.word,
        currentSegment: action.currentSegment,
        cursorPosition: action.cursorPosition,
      });
    case actions.UPDATE_FIND_LOCATION:
      return Object.assign({}, state, {
        currentSegment: action.location,
      });
    default:
      return state;
  }
};

export default FindReplaceReducer;
