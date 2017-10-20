import * as actions from '../../constants/actionTypes';

export function insertWord(dragIndex, hoverIndex, word, targetWord, segmentId, documentId, indexArr) {
  return {
    type: actions.INSERT_WORD,
    dragIndex,
    hoverIndex,
    word,
    targetWord,
    segmentId,
    documentId,
    indexArr,
  };
}

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
