import fetch from 'isomorphic-fetch';
import $q from 'q';

import * as actions from '../../../constants/actionTypes';
import fileReader from '../../../utils/fileReader';
import xliffParser from '../../../utils/xliffParser';

let documentId = 0;

// fetch xliff document actions
export function fetchDocument(documentName) {
  return {
    type: actions.FETCH_DOCUMENT,
    documentName,
    id: documentId++,
  };
}

export function fetchDocumentFail(documentName, error) {
  return {
    type: actions.FETCH_DOCUMENT_FAIL,
    error,
    documentName,
  };
}

export function fetchDocumentSuc(documentName, xliff) {
  return {
    type: actions.FETCH_DOCUMENT_SUC,
    xliff,
    documentName,
  };
}

const shouldFetchDocument = (state, documentName) => {
  const doc = state.documentReducer.documents.find(x => x.name === documentName);
  if (!doc) {
    return true;
  } else if (doc.isFetching) {
    return false;
  }
  return doc.didInvalidate;
};

export function requestDocument(documentName) {
  return (dispatch, getState) => {
    if (shouldFetchDocument(getState(), documentName)) {
      dispatch(fetchDocument(documentName));
      return fetch(`/src/data/${documentName}`)
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
            dispatch(fetchDocumentSuc(documentName, result));
          })
          .catch((error) => {
            dispatch(fetchDocumentFail(documentName, error));
          })
          .done(() => {
            //  console.log('done dispatching...');
          });
      });
    }
    return Promise.resolve();
  };
}
