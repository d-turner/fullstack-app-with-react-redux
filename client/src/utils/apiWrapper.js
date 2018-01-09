import axios from 'axios';

// api endpoints:
// must start with /api/
const LOGIN = '/api/login';
const REGISTER = '/api/register';
const LOGOUT = '/api/logout';
const TEST = '/api/test';
const DOCUMENT_ID = '/api/documents/';
const DOCUMENTS = '/api/documents';
const DOCUMENT_FILE = '/api/document/';
const UPLOAD = '/api/uploadDocument';
const SYNC = '/api/syncDocument/';
const LOGGER = '/api/uploadLog/';
const META = '/api/documentMeta/';
const SEGMENT = '/api/segment/';

// prod: const API_HOSTNAME = 'http://kanjingo.adaptcentre.ie';
let API_HOSTNAME = 'http://localhost:8080';
if (process.env.NODE_ENV === 'production') {
  API_HOSTNAME = '';
}

export function apiCall(data, endpoint, callback, method, headers) {
  /*
  * Expects Data to be:
  * { name, email, password } - register
  * { email, password} - login
  * null - logout
  * Responses:
  * { error: 'Email or password is invalid' }
  * { error: 'not a valid X' }
  * { success: 'Login successful!' }
  * { failed: 'something went wrong' }
  */
  axios({
    method,
    url: `${API_HOSTNAME}${endpoint}`,
    withCredentials: true,
    data,
    headers,
  })
  .catch((error) => {
    if (error.response) {
      // status code outside 200
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // no response received
      // returns undefined
      console.log(error.request);
    } else {
      // config error
      console.log('Configuration Error: ', error.message);
    }
    return error.response;
  })
  .then((response) => {
    callback(response);
  });
}

const api = {
  login: (data, callback) => {
    apiCall(data, LOGIN, callback, 'post');
  },
  register: (data, callback) => {
    apiCall(data, REGISTER, callback, 'post');
  },
  logout: (callback) => {
    apiCall(null, LOGOUT, callback, 'get');
  },
  test: (callback) => {
    apiCall(null, TEST, callback, 'get');
  },
  getDocumentById: (data, callback) => {
    apiCall(null, `${DOCUMENT_ID}${data}`, callback, 'get');
  },
  getDocument: (data, callback) => {
    apiCall(null, `${DOCUMENT_FILE}${data}`, callback, 'get');
  },
  getDocuments: (callback) => {
    apiCall(null, DOCUMENTS, callback, 'get');
  },
  uploadDocument: (data, callback) => {
    const headers = { 'Content-Type': 'multipart/form-data' };
    apiCall(data, UPLOAD, callback, 'post', headers);
  },
  sync: (data, id, callback) => {
    const headers = { 'Content-Type': 'text/plain' };
    apiCall(data, `${SYNC}${id}`, callback, 'post', headers);
  },
  uploadLog: (data, id, callback) => {
    const headers = { 'Content-Type': 'text/xml' };
    apiCall(data, `${LOGGER}${id}`, callback, 'post', headers);
  },
  getDocumentMeta: (docId, callback) => {
    apiCall(null, `${META}${docId}`, callback, 'get');
  },
  setDocumentMeta: (docId, data, callback) => {
    apiCall(data, `${META}${docId}`, callback, 'post');
  },
  getSegment: (docId, callback) => {
    apiCall(null, `${SEGMENT}${docId}`, callback, 'get');
  },
  setSegment: (docId, data, callback) => {
    apiCall(data, `${SEGMENT}${docId}`, callback, 'post');
  },
  deleteDocument: (docId, callback) => {
    apiCall(null, `${DOCUMENT_ID}${docId}`, callback, 'delete');
  },
  updateDocument: (docId, meta, callback) => {
    apiCall(meta, `${META}${docId}`, callback, 'put');
  },
};

export default api;
