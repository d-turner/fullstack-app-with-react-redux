import fetch from 'isomorphic-fetch';
import $q from 'q';

import * as actions from '../../../constants/actionTypes';
import fileReader from '../../../utils/fileReader';
import xliffParser from '../../../utils/xliffParser';

let documentNumber = 0;

export function resetEditorState() {
  return {
    type: actions.RESET_EDITOR,
  };
}

// fetch xliff document actions
export function fetchDocument(documentId) {
  return {
    type: actions.FETCH_DOCUMENT,
    id: documentId,
    name: `Testing ${documentNumber++}`,
  };
}

export function fetchDocumentFail(documentId, error) {
  return {
    type: actions.FETCH_DOCUMENT_FAIL,
    error,
    id: documentId,
  };
}

export function fetchDocumentSuc(documentId, xliff) {
  return {
    type: actions.FETCH_DOCUMENT_SUC,
    xliff,
    id: documentId,
  };
}

const shouldFetchDocument = (state, documentId) => {
  const doc = state.documentReducer.documents[documentId];
  if (!doc) {
    return true;
  } else if (doc.isFetching) {
    return false;
  }
  return doc.didInvalidate;
};

export function requestDocument(documentId) {
  return (dispatch, getState) => {
    if (shouldFetchDocument(getState(), documentId)) {
      dispatch(fetchDocument(documentId));
      return fetch(`/src/data/${documentId}`)
      .then((res) => {
        const blob = res.blob();
        return blob;
      })
      .then((blob) => {
        const reader = fileReader($q);
        const parser = xliffParser(reader, $q, console);
        const file = new File([blob], { type: 'application/xml' });
        const func = parser.readFile(file);
        func
          .then((result) => {
            dispatch(fetchDocumentSuc(documentId, result));
          })
          .catch((error) => {
            dispatch(fetchDocumentFail(documentId, error));
          })
          .done(() => {
            //  console.log('done dispatching...');
          });
      });
    }
    return Promise.resolve();
  };
}
