import { UPDATE_SELECTED } from '../../../constants/actionTypes';

export function updateSelectedSegment(documentId, segmentId) {
  return {
    type: UPDATE_SELECTED,
    documentId,
    segmentId,
  };
}
