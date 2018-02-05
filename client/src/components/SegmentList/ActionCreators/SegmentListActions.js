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

export function requestSegmentsSuccess(id, response) {
  return {
    type: actions.SEGMENTS_SUCCESS,
    documentId: id,
    segments: response.data,
  };
}

export function requestSegmentsFail(id, response) {
  return {
    type: actions.SEGMENTS_FAILED,
    error: response.error,
  };
}

function buildSegments(id, doc, dispatch) {
  const { segments } = doc.xliff;
  const promiseArray = [];
  for (let i = 0; i < segments.length; i++) {
    const resultObj = {
      segmentIndex: i,
      machineTranslation: segments[i].target,
      editTime: 0,
      tileTime: 0,
      voiceTime: 0,
      totalTime: 0,
      charactersEntered: 0,
      wordsEntered: 0,
      mode: 'none',
    };
    promiseArray.push(apiWrapper.setSeg(id, resultObj));
    // apiWrapper.setSegment(id, resultObj, (response) => {
    //   console.log('Segments response: ', response);
    // });
  }
  Promise.all(promiseArray)
    .then(() => requestSegments(doc))
    .catch(error => console.log('Error', error));
}

/* eslint no-lonely-if: 0 */
export function requestSegments(doc) {
  return (dispatch) => {
    return apiWrapper.getSegments(doc.id, (response) => {
      if (response && response.data.length < doc.xliff.segments.length) {
        // need to build the segment data
        buildSegments(doc.id, doc, dispatch);
      } else {
        if (response && response.status === 200) {
          dispatch(requestSegmentsSuccess(doc.saved_name, response));
        } else {
          dispatch(requestSegmentsFail(doc.saved_name, response));
        }
      }
    });
  };
}

export function updateSegmentSuccess(id, data) {
  return {
    type: actions.UPDATE_SEGMENT,
    documentId: id,
    data,
  };
}

export function updateSegment(doc, data) {
  return (dispatch) => {
    return apiWrapper.updateSegment(doc.id, data, (response) => {
      dispatch(updateSegmentSuccess(doc.saved_name, data));
    });
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

export function undoTileAction(documentId, segmentId) {
  return {
    type: actions.UNDO_TILE,
    documentId,
    segmentId,
  };
}

export function redoTileAction(documentId, segmentId) {
  return {
    type: actions.REDO_TILE,
    documentId,
    segmentId,
  };
}
