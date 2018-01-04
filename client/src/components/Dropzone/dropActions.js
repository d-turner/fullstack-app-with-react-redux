import * as actions from '../../constants/actionTypes';
import apiWrapper from '../../utils/apiWrapper';

export function setDocumentMeta() {
  return {
    type: actions.SET_DOCUMENT_META,
  };
}

export function setSuccess(result) {
  return {
    type: actions.SET_SUCCESS,
    result,
  };
}

export function setFail(response) {
  return {
    type: actions.SET_FAIL,
    response,
  };
}


// build meta data from a document object
export function buildMeta(doc, xliff, index = 0) {
  console.log(doc);
  const documentId = doc.document_id;
  const segmentCount = xliff.segments.length;
  const listOrder = index;
  const completedSegments = 0;
  let totalWords = 0;

  const segmentState = new Array(segmentCount);
  for (let i = 0; i < segmentCount; i++) {
    const segmentIndex = i;
    const machineTranslation = xliff.segments[i].target;
    const editTime = 0;
    const tileTime = 0;
    const voiceTime = 0;
    const totalTime = 0;
    const charactersEntered = 0;
    const wordsEntered = 0;
    const mode = 'None';
    totalWords += machineTranslation.split(' ').length;
    segmentState[i] = {
      segmentIndex,
      documentId,
      machineTranslation,
      editTime,
      tileTime,
      voiceTime,
      totalTime,
      charactersEntered,
      wordsEntered,
      mode,
    };
  }
  const documentMeta = {
    segmentCount,
    listOrder,
    completedSegments,
    totalWords,
  };

  // dispatch this to the api
  return (dispatch) => {
    dispatch(setDocumentMeta());
    apiWrapper.setDocumentMeta(documentId, documentMeta, (res) => {
      console.log('Document META Response: ', res);
      dispatch({
        type: actions.INSERT_DOCUMENTS,
        documents: [{
          completed_segments: completedSegments,
          created_at: doc.created_at,
          description: doc.description,
          document_id: documentId,
          list_order: listOrder,
          name: doc.name,
          saved_name: doc.saved_name,
          segment_count: segmentCount,
          total_word_count: totalWords,
          xliff,
          didInvalidate: false,
          isFetching: false,
        }],
      });
    });
    for (let i = 0; i < segmentCount; i++) {
      // apiWrapper.setSegment(documentId, segmentState[i], (response) => {
      //   console.log('Segment ', i, ' Response: ', response);
      //   // if (response && response.status === 200) {
      //   //   dispatch(setSuccess(response.data));
      //   // } else {
      //   //   dispatch(setFail(response));
      //   // }
      //   return {
      //     type: 'UPDATED_SEGMENT_META',
      //   };
      // });
    }
  };
}
