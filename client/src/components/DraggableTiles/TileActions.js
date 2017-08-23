import * as actions from '../../constants/actionTypes';

export function insertWord(dragIndex, hoverIndex, word, isBefore, segmentId, documentId) {
  return {
    type: actions.INSERT_WORD,
    dragIndex,
    hoverIndex,
    word,
    isBefore,
    segmentId,
    documentId,
  };
}
