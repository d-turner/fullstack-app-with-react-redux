import * as actions from '../../../constants/actionTypes';

export function findNext(documentId, text) {
  return {
    type: actions.FIND_NEXT,
    documentId,
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

export function replace(documentId, text, newText) {
  return {
    type: actions.REPLACE_TEXT,
    documentId,
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
