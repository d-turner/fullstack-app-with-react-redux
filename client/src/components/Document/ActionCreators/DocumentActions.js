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

export const shouldFetchDocument = (state, documentId) => {
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
      return apiWrapper.getDocumentById(documentId)
        .catch((error) => {
          // the request fails
          dispatch(documentListFail(error));
        })
        .then((response) => {
          // insert the document into the list and then try fetch the actual document
          dispatch(documentListSuccess([response.data]));
          return apiWrapper.getDocument(documentId);
        })
        .then((response) => {
          // try parse the xliff document
          const reader = fileReader($q);
          const parser = xliffParser(reader, $q, console);
          const file = new File([response.data], { type: 'application/xml' });
          return parser.readFile(file);
        })
        .then((result) => {
          // insert the document into the store
          dispatch(fetchDocumentSuc(documentId, result));
        })
        .catch((error) => {
          // if the document parsing failed or fetching the actual document fails
          dispatch(fetchDocumentFail(documentId, error));
        });
    }
    return Promise.resolve();
  };
}

export function requestDocumentList() {
  return (dispatch) => {
    dispatch(fetchDocumentList());
    return apiWrapper.getDocuments()
      .then((response) => {
        dispatch(documentListSuccess(response.data));
      })
      .catch((error) => {
        dispatch(documentListFail(error));
      });
  };
}

export function documentDeleteSuccess(documentId) {
  return {
    type: actions.DELETE_DOCUMENT,
    documentId,
  };
}

export function documentDeleteFail() {
  return {
    type: actions.DELETE_FAIL,
  };
}

export function deleteDocument(documentId, documentKey) {
  return (dispatch) => {
    return apiWrapper.deleteDocument(documentId)
      .then((response) => {
        dispatch(documentDeleteSuccess(documentKey, response));
      })
      .catch((error) => {
        dispatch(documentDeleteFail(error));
      });
  };
}

export function documentOrderSuccess(doc, index, response) {
  return {
    type: actions.ORDER_SUCCESS,
    document: doc,
    index,
  };
}

export function documentOrderFail(doc, error) {
  return {
    type: actions.ORDER_FAIL,
    document: doc,
    error,
  };
}

// parameters: documentId1, newIndex1, documentId2, newIndex2
export function setDocumentOrder(doc, index) {
  return (dispatch) => {
    const meta = Object.assign({}, doc.meta);
    meta.listOrder = index;
    return apiWrapper.updateDocument(doc.id, meta)
      .then((response) => {
        dispatch(documentOrderSuccess(doc, index, response));
      })
      .catch((error) => {
        dispatch(documentOrderFail(doc, error));
      });
  };
}
