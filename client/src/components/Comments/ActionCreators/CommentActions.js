import * as actions from '../../../constants/actionTypes';

export function addComment(documentId, segmentId, comment, author, time) {
  return {
    type: actions.ADD_COMMENT,
    documentId,
    segmentId,
    comment,
    author,
    time,
  };
}

export function editComment(documentId, segmentId, comment, author, time) {
  return {
    type: actions.ADD_COMMENT,
    documentId,
    segmentId,
    comment,
    author,
    time,
  };
}

export function resolveComment(documentId, segmentId, commentId) {
  return {
    type: actions.RESOLVE_COMMENT,
    documentId,
    segmentId,
    commentId,
  };
}