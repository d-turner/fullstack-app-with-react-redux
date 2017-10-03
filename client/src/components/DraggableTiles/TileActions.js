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
