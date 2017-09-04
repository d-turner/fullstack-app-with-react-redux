import * as actions from '../../../constants/actionTypes';

// update translation
export function updateSegment(documentId, segmentId, editorState) {
  return {
    type: actions.UPDATE_TARGET,
    documentId,
    segmentId,
    editorState,
  };
}

// lexicon lookup
export function lookupLexicon(lexicon) {
  return {
    type: actions.LOOKUP,
    lexicon,
  };
}

// check for double spaces
export function checkSpaces() {
  return {
    type: actions.SPACES,
  };
}

export function updateSelectedSegment(documentId, segmentId) {
  return {
    type: actions.UPDATE_SELECTED,
    documentId,
    segmentId,
  };
}