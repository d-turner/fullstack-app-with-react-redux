/* eslint-env and, jest */
/* eslint max-len: off, no-use-before-define: off */
import expect from 'expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import httpAdapter from 'axios/lib/adapters/http';

import api from '../apiWrapper';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
const mock = new MockAdapter(axios);

jest.setTimeout(10000);

describe('API Wrapper has calls to the server using promises', () => {
  it('should have a call to login', () => {
    mock.onPost('http://localhost:8080/api/login')
      .reply(200, { user: 'test', key: 'abc' });
    return api.login({ user: 'test', pass: '123' }).then((response) => {
      expect(response.data.user).toBe('test');
      expect(response.data.key).toBe('abc');
    });
  });

  it('should have a call to register', () => {
    mock.onPost('http://localhost:8080/api/register')
      .reply(200, { message: 'Registration Successful' });
    return api.register({ user: 'test', pass: '123' }).then((response) => {
      expect(response.data.message).toBe('Registration Successful');
    });
  });

  it('should have a call to logout', () => {
    mock.onGet('http://localhost:8080/api/logout')
      .reply(200);
    return api.logout().then((response) => {
      expect(response.status).toBe(200);
    });
  });
});

function buildPromise(input, callback) {
  return new Promise((resolve, reject) => {
    callback(input, resolve, reject);
  });
}
