import * as actions from '../../../constants/actionTypes';
import styles from '../../../constants/main.css';

const initialState = {
  isFinding: false,
  render: false,
  word: '',
};

function updateNext(state, action) {
  // TODO: remove current style if needed
  // TODO: Update current segment to next one found
  // 1. remove current style on the current location
  // 2. enter find next loop
  // 3. Add style if found
  // 4. update the position of the current segment/cursor
  const oldTarget = state[action.location.segmentId].target.replace(/(<([^>]+)>)/ig, '');
  const oldIndex = Object.assign({}, state[action.location.segmentId], {
    target: oldTarget,
  });

  let notFound = true;  // while another occurrence
  let notLooped = true; // and not looped back around
  let index = action.location.segmentId + 1; // starting point is the next segment
  while (notFound && notLooped) {
    if (index >= state.length) index = 0;
    if (index === action.location.segmentId) {
      notLooped = false;
    }
    if (state[index].target.includes(action.text)) {
      notFound = false;
      const newTarget = state[index].target.replace(
        action.text,
        `<span id='findreplace' data-location=${index} class=${styles.highlight}>${action.text}</span>`,
      );
      const newIndex = Object.assign({}, state[index], {
        target: newTarget,
      });
      // this does not take into account if the text appears twice in the same segment
      if (index < action.location.segmentId) {
        // return order newIndex, oldIndex
      }
      if (index > action.location.segmentId) {
        // return order oldIndex, newIndex
      }
      // otherwise they are the same and you can just return a single
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
        wordIndex: action.index,
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
