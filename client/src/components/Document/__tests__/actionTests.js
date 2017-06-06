/* eslint-env and, jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import fs from 'fs';

import * as actions from '../ActionCreators/DocumentActions';
import * as types from '../../../constants/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Document Actions', () => {
  it('should have an action to fetch a document', () => {
    const documentName = 'testDoc.txt';
    const expectedAction = {
      type: types.FETCH_DOCUMENT,
      documentName,
      id: 0,
    };

    expect(actions.fetchDocument(documentName)).toEqual(expectedAction);
  });

  it('should have a success action', () => {
    const documentName = 'testDoc.txt';
    const xliff = 'placeholder xliff';
    const expectedAction = {
      type: types.FETCH_DOCUMENT_SUC,
      documentName,
      xliff,
    };

    expect(actions.fetchDocumentSuc(documentName, xliff)).toEqual(expectedAction);
  });

  it('should have a failed action', () => {
    const documentName = 'testDoc.txt';
    const error = 'some error';
    const expectedAction = {
      type: types.FETCH_DOCUMENT_FAIL,
      documentName,
      error,
    };

    expect(actions.fetchDocumentFail(documentName, error)).toEqual(expectedAction);
  });
});


describe('async document fetching', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it(`it creates ${types.FETCH_DOCUMENT_SUC} when fetching completed successfully`, () => {
    const documentName = 'machines.xlf';
    const response = new Response();
    response.type = 'basic';
    response.ok = true;
    response.body = fs.createReadStream(`${__dirname}/../../../data/${documentName}`);
    response.blob = () => { return 'this'; };
    console.log(response.blob());

    nock('http://localhost/')
      .defaultReplyHeaders({ 'Content-Type': 'application/json' })
      .get(`/src/data/${documentName}`)
      .reply(200, response);
    const expectedActions = [
      { type: types.FETCH_DOCUMENT },
      { type: types.FETCH_DOCUMENT_SUC, body: { res: 'blob' } },
    ];
    const store = mockStore({ documentReducer: { documents: [] } });

    return store.dispatch(actions.requestDocument(documentName)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
