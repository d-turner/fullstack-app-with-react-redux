import * as actions from '../../../constants/actionTypes';

export function findNext(documentId, segmentId, index, text) {
  return {
    type: actions.FIND_NEXT,
    location: {
      documentId,
      segmentId,
      index,
    },
    text,
  };
}

export function findPrev(documentId, segmentId, index, text) {
  return {
    type: actions.FIND_PREV,
    location: {
      documentId,
      segmentId,
      index,
    },
    text,
  };
}

export function replaceText(documentId, segmentId, segmentOffset, text, newText) {
  return {
    type: actions.REPLACE_TEXT,
    location: {
      documentId,
      segmentId,
      segmentOffset,
    },
    text,
    newText,
  };
}

export function replaceAll(documentId, text, newText) {
  return {
    type: actions.REPLACE_ALL,
    documentId,
    text,
    newText,
  };
}

export function updateCurrentLocation(location) {
  return {
    type: actions.UPDATE_FIND_LOCATION,
    location,
  };
}

// function should be called when it gets unmounted
export function resetToInitial() {}
