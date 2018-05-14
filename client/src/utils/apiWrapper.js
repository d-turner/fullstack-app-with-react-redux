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
const LOG_FILE = '/api/log/';
const UPLOAD = '/api/uploadDocument';
const SYNC = '/api/syncDocument/';
const LOGGER = '/api/uploadLog/';
const META = '/api/documentMeta/';
const SEGMENT = '/api/segment/';
const TOKENIZER = '/api/tokenizer';

// prod: const API_HOSTNAME = 'http://kanjingo.adaptcentre.ie';
let API_HOSTNAME = 'http://localhost:8080';
// let API_HOSTNAME = 'http://192.168.1.17:8080';
// let API_HOSTNAME = 'http://10.42.0.1:8080';
// let API_HOSTNAME = 'http://192.168.43.93:8080';
if (process.env.NODE_ENV === 'production') {
  API_HOSTNAME = '';
}

// API DOCS
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

// api Promise based function
export function apiPromise({ data, endpoint, method, headers }) {
  return axios({
    method,
    url: `${API_HOSTNAME}${endpoint}`,
    withCredentials: true,
    data,
    headers,
  });
}

// api Callback based function
export function apiCall({ data, endpoint, method, headers }, callback) {
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
        // TODO: do some error handling
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
  // options = { data, endpoint, method, headers }
  login: (data, callback) => {
    return apiPromise({ data, endpoint: LOGIN, method: 'post' }, callback);
  },
  register: (data, callback) => {
    return apiPromise({ data, endpoint: REGISTER, method: 'post' }, callback);
  },
  logout: (callback) => {
    return apiPromise({ endpoint: LOGOUT, method: 'get' }, callback);
  },
  // check if a user is authenticated
  test: (callback) => {
    return apiPromise({ endpoint: TEST, method: 'get' }, callback);
  },
  // get document row from database
  getDocumentById: (documentId, callback) => {
    return apiPromise({ endpoint: `${DOCUMENT_ID}${documentId}`, method: 'get' }, callback);
  },
  // get the actual document (stored outside the database)
  getDocument: (savedName, callback) => {
    return apiPromise({ endpoint: `${DOCUMENT_FILE}${savedName}`, method: 'get' }, callback);
  },
  // get the list of documents owned by the user
  getDocuments: (callback) => {
    return apiPromise({ endpoint: DOCUMENTS, method: 'get' }, callback);
  },
  // upload a new document
  uploadDocument: (data, callback) => {
    const headers = { 'Content-Type': 'multipart/form-data' };
    return apiPromise({ data, endpoint: UPLOAD, method: 'post', headers }, callback);
  },
  // save changes to the server
  sync: (data, id, callback) => {
    const headers = { 'Content-Type': 'text/plain' };
    return apiPromise({ data, endpoint: `${SYNC}${id}`, method: 'post', headers }, callback);
  },
  // save logger data to the server
  uploadLog: (data, id, callback) => {
    const headers = { 'Content-Type': 'text/xml' };
    return apiPromise({ data, endpoint: `${LOGGER}${id}`, method: 'post', headers }, callback);
  },
  // get the actual log document (stored outside the database)
  getLog: (savedName, callback) => {
    return apiPromise({ endpoint: `${LOG_FILE}${savedName}`, method: 'get' }, callback);
  },
  // get the document meta from database
  getDocumentMeta: (docId, callback) => {
    return apiPromise({ endpoint: `${META}${docId}`, method: 'get' }, callback);
  },
  // create document meta
  setDocumentMeta: (docId, data, callback) => {
    return apiPromise({ data, endpoint: `${META}${docId}`, method: 'post' }, callback);
  },
  // delete a document from the database
  deleteDocument: (docId, callback) => {
    return apiPromise({ endpoint: `${DOCUMENT_ID}${docId}`, method: 'delete' }, callback);
  },
  // update document meta
  updateDocument: (docId, data, callback) => {
    return apiPromise({ data, endpoint: `${META}${docId}`, method: 'put' }, callback);
  },
  // get all segments for a document
  getSegments: (docId, callback) => {
    return apiPromise({ endpoint: `${SEGMENT}${docId}`, method: 'get' }, callback);
  },
  // get a single segment
  getSegment: (docId, index, callback) => {
    return apiPromise({ endpoint: `${SEGMENT}${docId}/${index}`, method: 'get' }, callback);
  },
  // create a segment
  setSegment: (docId, data, callback) => {
    return apiPromise({ data, endpoint: `${SEGMENT}${docId}`, method: 'post' }, callback);
  },
  // update a segment
  updateSegment: (docId, data, callback) => {
    return apiPromise({ data, endpoint: `${SEGMENT}${docId}`, method: 'put' }, callback);
  },

  /* Sample features for testing */
  setSeg: (docId, data) => {
    return apiPromise({ data, endpoint: `${SEGMENT}${docId}`, method: 'post' });
  },

  getTokens: (data) => {
    const headers = { 'Content-Type': 'application/json' };
    return apiPromise({ data, endpoint: TOKENIZER, method: 'post', headers });
  },
};

export default api;
