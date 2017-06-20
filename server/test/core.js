import request from 'supertest';
import app from '../src/app';

export default (test) => {
  test('GET /', (t) => {
    request(app)
    .get('/')
    .expect(200)
    .expect('content-type', /text\/html/)
    .end((err, res) => {
      const expectedBody = 'Hello World!';
      const actualBody = res.text;

      t.error(err, 'No error');
      t.equal(actualBody, expectedBody, 'Retrieve body');
      t.end();
    });
  });
};
