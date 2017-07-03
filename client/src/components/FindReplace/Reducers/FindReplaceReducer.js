import { EditorState, ContentState } from 'draft-js';
import * as actions from '../../../constants/actionTypes';
import styles from '../../../constants/main.scss';

function replaceUsingRegex(segment, text, newText, wordIndex) {
  const re = new RegExp(text, 'g');
  const newTarget = segment.target.replace(re, (match, i) => {
    console.log(i);
    console.log(wordIndex);
    return (i === wordIndex) ? newText : match;
  });
  return newTarget;
}

function replaceSegmentTarget(state, action) {
  const segments = state.documents[action.location.documentId].xliff.segments;
  const segment = segments[state.findReplace.currentSegment];
  const newTarget = replaceUsingRegex(segment, action.text, action.newText, state.findReplace.wordIndex);
  const newSegment = Object.assign({}, segment, {
    target: newTarget,
  });

  return [
    ...segments.slice(0, state.findReplace.currentSegment),
    newSegment,
    ...segments.slice(state.findReplace.currentSegment + 1),
  ];
}

function replaceText(state, action) {
  console.log(state);
  console.log(action);
  if (state.findReplace.currentSegment === state.selectedSegment) {
    const newTarget = replaceUsingRegex(
      state.documents[action.location.documentId].xliff.segments[state.findReplace.currentSegment],
      action.text,
      action.newText,
      state.findReplace.wordIndex,
    );
    return {
      ...state,
      editorState: EditorState.createWithContent(ContentState.createFromText(newTarget)),
    };
  }
  return {
    ...state,
    documents: {
      ...state.documents,
      [action.location.documentId]: {
        ...state.documents[action.location.documentId],
        xliff: {
          ...state.documents[action.location.documentId].xliff,
          segments: replaceSegmentTarget(state, action),
        },
      },
    },
  };
}

function removeHighlight(segment) {
  const highlightRemoved = segment.target.replace(/(<([^>]+)>)/ig, '');
  const newSegment = Object.assign({}, segment, {
    target: highlightRemoved,
  });
  return newSegment;
}

function addHighlight(segment, text, index) {
  const highlightAdded = segment.target.replace(
    text,
    `<span id='findreplace' data-location=${index} class=${styles.highlight}>${text}</span>`,
  );
  const newSegment = Object.assign({}, segment, {
    target: highlightAdded,
  });
  return newSegment;
}

function updateNext(state, action) {
  const segments = state.documents[action.location.documentId].xliff.segments;
  // TODO: remove current style if needed
  // TODO: Update current segment to next one found
  // 1. remove current style on the current location
  // 2. enter find next loop
  // 3. Add style if found
  // 4. update the position of the current segment/cursor
  const oldIndex = removeHighlight(segments[state.findReplace.currentSegment]);

  let notFound = true;  // while another occurrence
  let notLooped = true; // and not looped back around
  let index = state.findReplace.currentSegment + 1; // starting point is the next segment
  while (notFound && notLooped) {
    if (index >= segments.length) index = 0;
    if (index === state.findReplace.currentSegment) {
      notLooped = false;
    }
    if (segments[index].target.includes(action.text)) {
      const newIndex = addHighlight(segments[index], action.text, index);
      const wordIndex = newIndex.target.indexOf(action.text);
      notFound = false;
      // this does not take into account if the text appears twice in the same segment
      if (index < state.findReplace.currentSegment) {
        // return order newIndex, oldIndex
        return {
          ...state,
          documents: {
            ...state.documents,
            [action.location.documentId]: {
              ...state.documents[action.location.documentId],
              xliff: {
                ...state.documents[action.location.documentId].xliff,
                segments: [
                  ...segments.slice(0, index),
                  newIndex,
                  ...segments.slice(index + 1, action.location.segmentId),
                  oldIndex,
                  ...segments.slice(action.location.segmentId + 1),
                ],
              },
            },
          },
          findReplace: {
            ...state.findReplace,
            currentSegment: index,
            wordIndex,
          },
        };
      }
      if (index > state.findReplace.currentSegment) {
        // return order oldIndex, newIndex
        return {
          ...state,
          documents: {
            ...state.documents,
            [action.location.documentId]: {
              ...state.documents[action.location.documentId],
              xliff: {
                ...state.documents[action.location.documentId].xliff,
                segments: [
                  ...segments.slice(0, action.location.segmentId),
                  oldIndex,
                  ...segments.slice(action.location.segmentId + 1, index),
                  newIndex,
                  ...segments.slice(index + 1),
                ],
              },
            },
          },
          findReplace: {
            ...state.findReplace,
            currentSegment: index,
            wordIndex,
          },
        };
      }
      // otherwise they are the same and you can just return a single
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.location.documentId]: {
            ...state.documents[action.location.documentId],
            xliff: {
              ...state.documents[action.location.documentId].xliff,
              segments: [
                ...segments.slice(0, index),
                newIndex,
                ...segments.slice(index + 1),
              ],
            },
          },
        },
        findReplace: {
          ...state.findReplace,
          currentSegment: index,
          wordIndex,
        },
      };
    }
    index++;
  }
  return state;
}

const findNext = (state, action) => {
  const newIndex = state.documents[action.location.documentId].xliff.segments[state.findReplace.currentSegment].target
  .indexOf(action.text, state.findReplace.wordIndex + 1);
  if (newIndex !== -1) {
    // next occurrence is in the same segment
    const newText = `<span id='findreplace' data-location=${state.findReplace.currentSegment} class=${styles.highlight}>${action.text}</span>`;
    const segment = state.documents[action.location.documentId].xliff.segments[state.findReplace.currentSegment];
    const newTarget = replaceUsingRegex(segment, action.text, newText, newIndex);
    const newSeg = Object.assign({}, segment, {
      target: newTarget.replace(newText, action.text),
    });
    const updatedIndex = newSeg.target.indexOf(action.text, state.findReplace.wordIndex);
    return {
      ...state,
      documents: {
        ...state.documents,
        [action.location.documentId]: {
          ...state.documents[action.location.documentId],
          xliff: {
            ...state.documents[action.location.documentId].xliff,
            segments: [
              ...state.documents[action.location.documentId].xliff.segments.slice(0, state.findReplace.currentSegment),
              newSeg,
              ...state.documents[action.location.documentId].xliff.segments.slice(state.findReplace.currentSegment + 1),
            ],
          },
        },
      },
      findReplace: {
        ...state.findReplace,
        wordIndex: updatedIndex,
      },
    };
  }
  // find the occurrence in the next segment
  // TODO: send the correct state
  return updateNext(state, action);
};

const FindReplaceReducer = function(state, action) {
  switch (action.type) {
    case actions.FIND:
      return Object.assign({}, state, {
        findReplace: {
          ...state.findReplace,
          render: true,
          word: action.word,
          currentSegment: state.selectedSegment,
          wordIndex: action.index,
        },
      });
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
