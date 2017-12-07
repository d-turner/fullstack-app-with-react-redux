import $q from 'q';

import * as actions from '../../../constants/actionTypes';
import fileReader from '../../../utils/fileReader';
import xliffParser from '../../../utils/xliffTwoParser';
import apiWrapper from '../../../utils/apiWrapper';

export function resetEditorState() {
  return {
    type: actions.RESET_EDITOR,
  };
}

export function fetchDocument(documentId) {
  return {
    type: actions.FETCH_DOCUMENT,
    id: documentId,
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
  if (!doc || doc.didInvalidate) {
    return true;
  } else if (doc.isFetching) {
    return false;
  }
  return doc.didInvalidate;
};

export function fetchDocumentList() {
  return {
    type: actions.FETCH_DOCUMENT_LIST,
  };
}

export function documentListSuccess(documents) {
  return {
    type: actions.INSERT_DOCUMENTS,
    documents,
  };
}

export function documentListFail() {
  return {
    type: actions.DOCUMENT_LIST_FAIL,
  };
}

export function requestDocument(documentId) {
  return (dispatch, getState) => {
    if (shouldFetchDocument(getState(), documentId)) {
      dispatch(fetchDocument(documentId));
      apiWrapper.getDocumentById(documentId, (response) => {
        dispatch(documentListSuccess([response.data]));
        apiWrapper.getDocument(documentId, (res) => {
          const reader = fileReader($q);
          const parser = xliffParser(reader, $q, console);
          const file = new File([res.data], { type: 'application/xml' });
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
      });
    }
    return Promise.resolve();
  };
}

export function requestDocumentList() {
  return (dispatch) => {
    dispatch(fetchDocumentList());
    return apiWrapper.getDocuments((response) => {
      if (response && response.status === 200) {
        dispatch(documentListSuccess(response.data));
      } else {
        dispatch(documentListFail());
      }
    });
  };
}
