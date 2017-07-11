import axios from 'axios';

// api endpoints:
// must start with /api/
const LOGIN = '/api/login';
const REGISTER = '/api/register';
const LOGOUT = '/api/logout';
// prod: const API_HOSTNAME = 'http://kanjingo.adaptcentre.ie';
const API_HOSTNAME = 'http://localhost:8080';

export function loginUser(data, callback) {
  /*
  * Expects Data to be:
  * { email, password }
  * Responses:
  * { error: 'Email or password is invalid' }
  * { error: 'not a valid X' }
  * { success: 'Login successful!' }
  * { failed: 'something went wrong' }
  */
  axios({
    method: 'post',
    url: `${API_HOSTNAME}${LOGIN}`,
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
      console.log(error.request);
    } else {
      // config error
      console.log('Error', error.message);
    }
  })
  .then((response) => {
    callback(response);
  });
}

export function registerUser(data, callback) {
  /*
  * Expects Data to be:
  * { name, email, password }
  * Responses:
  * { error: 'email already exists' }
  * { error: 'not a valid X' }
  * { success: 'user registered' }
  * { failed: 'something went wrong' }
  */
  axios({
    method: 'post',
    url: `${API_HOSTNAME}${REGISTER}`,
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
      console.log(error.request);
    } else {
      // config error
      console.log('Error', error.message);
    }
  })
  .then((response) => {
    callback(response);
  });
}

export function logoutUser(callback) {
  /*
  * Responses:
  * { success: 'user logged out' }
  * { failed: 'something went wrong' }
  */
  axios({
    method: 'get',
    url: `${API_HOSTNAME}${LOGOUT}`,
    withCredentials: true,
  })
  .catch((error) => {
    if (error.response) {
      // status code outside 200
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // no response received
      console.log(error.request);
    } else {
      // config error
      console.log('Error', error.message);
    }
  })
  .then((response) => {
    callback(response);
  });
}

const api = {
  login: (data, callback) => {
    loginUser(data, callback);
  },
  register: (data, callback) => {
    registerUser(data, callback);
  },
  logout: (callback) => {
    logoutUser(callback);
  },
};

export default api;
