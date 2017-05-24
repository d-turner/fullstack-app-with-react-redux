import * as actions from '../../../constants/actionTypes';

// update translation
export function updateSegment(documentId, segmentId, editorState, target) {
  return {
    type: actions.UPDATE_TARGET,
    segment: {
      documentId,
      segmentId,
      editorState,
      target,
    },
  };
}

// initialise segment reducer
export function populateSegments(segmentArray) {
  return {
    type: actions.POP_SEGMENTS,
    segments: segmentArray,
  };
}
