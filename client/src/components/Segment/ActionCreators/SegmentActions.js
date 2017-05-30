import * as actions from '../../../constants/actionTypes';

// update translation
export function updateSegment(documentId, segmentId, editorState, plainText, target) {
  return {
    type: actions.UPDATE_TARGET,
    segment: {
      documentId,
      segmentId,
      editorState,
      plainText,
      target,
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
