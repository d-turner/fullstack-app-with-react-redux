import axios from 'axios';

// api endpoints:
// must start with /api/
const LOGIN = '/api/login';
const REGISTER = '/api/register';
const LOGOUT = '/api/logout';
// prod: const API_HOSTNAME = 'http://kanjingo.adaptcentre.ie';
const API_HOSTNAME = 'http://localhost:8080';

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
    url: `${API_HOSTNAME}${LOGIN}`,
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

const api = {
  register: (data, callback) => {
    registerUser(data, callback);
  },
};

export default api;
