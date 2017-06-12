import * as actions from '../../../constants/actionTypes';

// update translation
export function updateSegment(documentId, segmentId, editorState) {
  return {
    type: actions.UPDATE_TARGET,
    segment: {
      documentId,
      segmentId,
      editorState,
    },
  };
}

// lexicon lookup
export function lookupLexicon(lexicon) {
  return {
    type: actions.LOOKUP,
    lexicon,
  };
}

// split a segment a the current cursor position
export function splitSegment(segmentId, documentId, cursorPosition) {
  return {
    type: actions.SPLIT,
    segmentId,
    documentId,
    cursorPosition,
  };
}

// initiate the render of the find and replace box
export function renderFindReplace(word, currentSegment, index) {
  return {
    type: actions.FIND,
    word,
    currentSegment,
    index,
  };
}
