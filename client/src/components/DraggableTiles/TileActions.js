import * as actions from '../../constants/actionTypes';

export function insertSourceWord(index, word, isBefore, segmentId, documentId) {
  return {
    type: actions.INSERT_SOURCE_WORD,
    index,
    word,
    isBefore,
    segmentId,
    documentId,
  };
}

export function updateWord(documentId, segmentId, index, text) {
  return {
    type: actions.UPDATE_WORD,
    documentId,
    segmentId,
    index,
    text,
  };
}

export function updateWordOrder(documentId, segmentId, wordArray) {
  return {
    type: actions.UPDATE_WORD_ORDER,
    documentId,
    segmentId,
    wordArray,
  };
}
