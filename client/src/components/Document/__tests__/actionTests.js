/* eslint-env and, jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// other mocking libraries
// import nock from 'nock';
// import fetchMock from 'fetch-mock';

import httpAdapter from 'axios/lib/adapters/http';

// code for attempting to test xliff document parsing (doesn't work)
// import { JSDOM } from 'jsdom';
// XMLSerializer
// DOMParser
// XMLSerializer().serializeToString(xmlObj);
// const dom = new JSDOM(`<!DOCTYPE html>hello`);
// dom.serialize()
// XMLSerializer = jsdom;
// global.DOMParser = require('xmldom').DOMParser;
// global.XMLSerializer = require('xmldom').XMLSerializer;

// global.DOMParser.prototype.querySelector = function () {
//   // the 'this' keyword refers to the object instance
//   // you can access only 'privileged' and 'public' members
//   console.log('HELLO THERE');
// };

import * as actions from '../ActionCreators/DocumentActions';
import * as types from '../../../constants/actionTypes';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
const mock = new MockAdapter(axios);

describe('Document Actions', () => {
  it('should have an action to fetch a document', () => {
    const documentId = 123456;
    const expectedAction = {
      type: types.FETCH_DOCUMENT,
      id: documentId,
    };

    expect(actions.fetchDocument(documentId)).toEqual(expectedAction);
  });

  it('should have a success action', () => {
    const documentId = 123456;
    const xliff = 'placeholder xliff';
    const expectedAction = {
      type: types.FETCH_DOCUMENT_SUC,
      id: documentId,
      xliff,
    };

    expect(actions.fetchDocumentSuc(documentId, xliff)).toEqual(expectedAction);
  });

  it('should have a failed action', () => {
    const documentId = 123456;
    const error = 'some error';
    const expectedAction = {
      type: types.FETCH_DOCUMENT_FAIL,
      id: documentId,
      error,
    };

    expect(actions.fetchDocumentFail(documentId, error)).toEqual(expectedAction);
  });

  it('should have an action to reset the editor state', () => {
    const expectedAction = {
      type: types.RESET_EDITOR,
    };

    expect(actions.resetEditorState()).toEqual(expectedAction);
  });

  it('should have an action to check if a document needs to be fetched', () => {
    const documentId = 12345;
    let state = { documentReducer: { documents: { } } };
    expect(actions.shouldFetchDocument(state, documentId)).toEqual(true);

    state = { documentReducer: { documents: { 12345: { didInvalidate: true } } } };
    expect(actions.shouldFetchDocument(state, documentId)).toEqual(true);

    state = { documentReducer: { documents: { 12345: { didInvalidate: false } } } };
    expect(actions.shouldFetchDocument(state, documentId)).toEqual(false);

    state = { documentReducer: { documents: { 12345: { isFetching: true } } } };
    expect(actions.shouldFetchDocument(state, documentId)).toEqual(false);

    state = { documentReducer: { documents: { 12345: { didInvalidate: false, isFetching: false } } } };
    expect(actions.shouldFetchDocument(state, documentId)).toEqual(false);

    state = { documentReducer: { documents: { 12345: { didInvalidate: true, isFetching: false } } } };
    expect(actions.shouldFetchDocument(state, documentId)).toEqual(true );
  });
});


describe('async document fetching', () => {
  afterEach(() => {
    // nock.cleanAll();
    // fetchMock.reset();
    // fetchMock.restore();
    mock.reset();
  });

  it(`it creates ${types.FETCH_DOCUMENT} and ${types.INSERT_DOCUMENTS} when fetching completed successfully`, () => {
    const exampleDocumentData = {
      completed_segments: '0',
      created_at: '2018-01-08 16:52:38',
      description: null,
      document_id: '145',
      list_order: '1',
      location: '/home/adapt/Documents/git/kanjingo-react-redux/client/src/data/3d13f2b322c6afd7c98f88b09b62951a',
      name: 'eng-ger.xliff',
      saved_name: '3d13f2b322c6afd7c98f88b09b62951a',
      segment_count: '25',
      total_word_count: '504',
      user_id: '2',
    };
    const exampleXLIFF = {
      xliff: `<?xml version="1.0" encoding="UTF-8"?>
        <xliff xmlns="" xmlns:its="http://www.w3.org/2005/11/its" xmlns:itsxlf="http://www.w3.org/ns/its-xliff/" version="1.2" its:version="2.0">
          <file original="http://en.wikipedia.org/wiki/Computer_science#History" source-language="en-us" target-language="de" datatype="html">
            <body>
              <trans-unit id="1">
                <source xml:lang="en-us" xmlns:xml="http://www.w3.org/XML/1998/namespace">History</source>
                <target xml:lang="de" xmlns:xml="http://www.w3.org/XML/1998/namespace">Geschichte</target>
                <alt-trans mid="0" its:mtConfidence="0.4112">
                  <source xml:lang="en-us" xmlns:xml="http://www.w3.org/XML/1998/namespace">Machines for calculating fixed numerical tasks such as the abacus have existed since antiquity but they only supported
                  the human mind, aiding in computations as complex as multiplication and division.</source>
                  <target xml:lang="de" xmlns:xml="http://www.w3.org/XML/1998/namespace" its:provenanceRecordsRef="#pr1">Maschinen fÃ¼r die Berechnung der Zahlenwerte Aufgaben wie die abacus haben seit der Antike existierte aber nur
                    unterstÃ¼tzt den Geist menschlichen, Beihilfe in Berechnungen so komplex wie Multiplikation und Division.</target>
                </alt-trans>
              </trans-unit>
            </body>
          </file>
        </xliff>`,
    };
    mock // request to get the document data
      .onGet('http://localhost:8080/api/documents/123457')
      .reply(200, exampleDocumentData);
    // this is never going to work becuase it uses browser based function that you cannot mock
    mock // request to get the actual document, should return xliff text
      .onGet('http://localhost:8080/api/document/123457')
      .reply(200, exampleXLIFF);
    // nock('http://127.0.0.1:8080')
    //   .log(console.log)
    //   .get('/api/documents/123457')
    //   .query(true)
    //   .reply(200, { body: { data: 'Hello there' } });
    // fetchMock
    //   .getOnce('/api/documents/123457', { body: { data: 'Hello there' }, headers: { 'content-type': 'application/json' } });


    const documentName = 123457;
    const store = mockStore({
      documentReducer: { documents: {} },
    });
    const expectedActions = [{
      type: types.FETCH_DOCUMENT,
      id: documentName,
    },
    {
      type: types.INSERT_DOCUMENTS,
      documents: [exampleDocumentData],
    },
    // its always going to fail because it uses functions that are only available in the browser environment
    {
      type: types.FETCH_DOCUMENT_FAIL,
      error: new ReferenceError('XMLSerializer is not defined'),
      id: 123457,
    },
    ];

    return store.dispatch(actions.requestDocument(documentName)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`it creates ${types.FETCH_DOCUMENT_LIST} and ${types.INSERT_DOCUMENTS} when fetching the document list succeeds`, () => {
    mock // request to get all the documents
      .onGet('http://localhost:8080/api/documents')
      .reply(200, []);

    const store = mockStore({
      documentReducer: { documents: {} },
    });
    const expectedActions = [{
      type: types.FETCH_DOCUMENT_LIST,
    },
    {
      type: types.INSERT_DOCUMENTS,
      documents: [],
    },
    ];

    return store.dispatch(actions.requestDocumentList()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`it creates ${types.FETCH_DOCUMENT_LIST} and ${types.DOCUMENT_LIST_FAIL} when fetching the document list fails`, () => {
    mock // request to get all the documents
      .onGet('http://localhost:8080/api/documents')
      .reply(500);

    const store = mockStore({
      documentReducer: { documents: {} },
    });
    const expectedActions = [{
      type: types.FETCH_DOCUMENT_LIST,
    },
    {
      type: types.DOCUMENT_LIST_FAIL,
    },
    ];

    return store.dispatch(actions.requestDocumentList()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
