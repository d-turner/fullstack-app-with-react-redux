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

// apiCall(options, callback)
export function apiCall({ data, endpoint, method, headers }, callback) {
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
    apiCall({ data, endpoint: LOGIN, method: 'post' }, callback);
  },
  register: (data, callback) => {
    apiCall({ data, endpoint: REGISTER, method: 'post' }, callback);
  },
  logout: (callback) => {
    apiCall({ endpoint: LOGOUT, method: 'get' }, callback);
  },
  // check if a user is authenticated
  test: (callback) => {
    apiCall({ endpoint: TEST, method: 'get' }, callback);
  },
  // get document row from database
  getDocumentById: (documentId, callback) => {
    apiCall({ endpoint: `${DOCUMENT_ID}${documentId}`, method: 'get' }, callback);
  },
  // get the actual document (stored outside the database)
  getDocument: (savedName, callback) => {
    apiCall({ endpoint: `${DOCUMENT_FILE}${savedName}`, method: 'get' }, callback);
  },
  // get the list of documents owned by the user
  getDocuments: (callback) => {
    apiCall({ endpoint: DOCUMENTS, method: 'get' }, callback);
  },
  // upload a new document
  uploadDocument: (data, callback) => {
    const headers = { 'Content-Type': 'multipart/form-data' };
    apiCall({ data, endpoint: UPLOAD, method: 'post', headers }, callback);
  },
  // save changes to the server
  sync: (data, id, callback) => {
    const headers = { 'Content-Type': 'text/plain' };
    apiCall({ data, endpoint: `${SYNC}${id}`, method: 'post', headers }, callback);
  },
  // save logger data to the server
  uploadLog: (data, id, callback) => {
    const headers = { 'Content-Type': 'text/xml' };
    apiCall({ data, endpoint: `${LOGGER}${id}`, method: 'post', headers }, callback);
  },
  // get the document meta from database
  getDocumentMeta: (docId, callback) => {
    apiCall({ endpoint: `${META}${docId}`, method: 'get' }, callback);
  },
  // create document meta
  setDocumentMeta: (docId, data, callback) => {
    apiCall({ data, endpoint: `${META}${docId}`, method: 'post' }, callback);
  },
  // delete a document from the database
  deleteDocument: (docId, callback) => {
    apiCall({ endpoint: `${DOCUMENT_ID}${docId}`, method: 'delete' }, callback);
  },
  // update document meta
  updateDocument: (docId, data, callback) => {
    apiCall({ data, endpoint: `${META}${docId}`, method: 'put' }, callback);
  },
  // get all segments for a document
  getSegments: (docId, callback) => {
    apiCall({ endpoint: `${SEGMENT}${docId}`, method: 'get' }, callback);
  },
  // get a single segment
  getSegment: (docId, index, callback) => {
    apiCall({ endpoint: `${SEGMENT}${docId}/${index}`, method: 'get' }, callback);
  },
  // create a segment
  setSegment: (docId, data, callback) => {
    apiCall({ data, endpoint: `${SEGMENT}${docId}`, method: 'post' }, callback);
  },
  // update a segment
  updateSegment: (docId, data, callback) => {
    apiCall({ data, endpoint: `${SEGMENT}${docId}`, method: 'put' }, callback);
  },

  /* Sample features for testing */
  setSeg: (docId, data) => {
    return apiPromise({ data, endpoint: `${SEGMENT}${docId}`, method: 'post' });
  },
};

export default api;

// apiCall(options, callback)
export function apiPromise({ data, endpoint, method, headers }) {
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
  return axios({
    method,
    url: `${API_HOSTNAME}${endpoint}`,
    withCredentials: true,
    data,
    headers,
  });
}
