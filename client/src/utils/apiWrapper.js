import axios from 'axios';

// api endpoints:
// must start with /api/
const LOGIN = '/api/login';
const REGISTER = '/api/register';
const LOGOUT = '/api/logout';

// prod: const API_HOSTNAME = 'http://kanjingo.adaptcentre.ie';
let API_HOSTNAME = 'http://localhost:8080';
if (process.env.NODE_ENV === 'production') {
  API_HOSTNAME = 'http://kanjingo.adaptcentre.ie';
}

export function apiCall(data, method, callback) {
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
    method: 'post',
    url: `${API_HOSTNAME}${method}`,
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
    apiCall(data, LOGIN, callback);
  },
  register: (data, callback) => {
    apiCall(data, REGISTER, callback);
  },
  logout: (callback) => {
    apiCall(null, LOGOUT, callback);
  },
};

export default api;
