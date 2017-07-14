import * as actions from '../../../constants/actionTypes';

export function updateSelectedSegment(documentId, segmentId) {
  return {
    type: actions.UPDATE_SELECTED,
    documentId,
    segmentId,
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

// split a segment a the current cursor position
export function mergeSegment(segmentId, documentId) {
  return {
    type: actions.MERGE,
    segmentId,
    documentId,
  };
}