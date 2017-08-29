import axios from 'axios';

// api endpoints:
// must start with /api/
const LOGIN = '/api/login';
const REGISTER = '/api/register';
const LOGOUT = '/api/logout';
const TEST = '/api/test';

// prod: const API_HOSTNAME = 'http://kanjingo.adaptcentre.ie';
let API_HOSTNAME = 'http://localhost:8080';
if (process.env.NODE_ENV === 'production') {
  API_HOSTNAME = 'http://kanjingo.adaptcentre.ie';
}

export function apiCall(data, endpoint, callback, method) {
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
  })
  .catch((error) => {
    if (error.response) {
      // status code outside 200
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // no response received
      return error.request;
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
};

export default api;
