import * as actions from '../../../constants/actionTypes';
import apiWrapper from '../../../utils/apiWrapper';

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

export function setSegments(documentId, segmentArray) {
  return {
    type: actions.SET_SEGMENTS,
    documentId,
    segmentArray,
  };
}

export function segmentsFailed(response) {
  return {
    type: actions.SET_SEGMENTS_FAILED,
    response,
  };
}

// // update the completed segment count
// // dont want to update the same one twice
// // need to get all segment data
// export function getSegmentData(doc) {
//   return (dispatch) => {
//     apiWrapper.getSegment(doc.id, (response) => {
//       if (response && response.status === 200) {
//         console.log(response);
//         dispatch(setSegments(doc.saved_name, response.data));
//       } else {
//         dispatch(segmentsFailed(response));
//       }
//     });
//   };
// }
