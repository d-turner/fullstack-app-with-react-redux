/*
 * Action Constants
 */
// Document Actions
export const RESET_EDITOR = 'RESET_EDITOR';
export const FETCH_DOCUMENT = 'FETCH_DOCUMENT_REQUEST';
export const FETCH_DOCUMENT_FAIL = 'FETCH_DOCUMENT_FAIL';
export const FETCH_DOCUMENT_SUC = 'FETCH_DOCUMENT_SUCCESS';
export const FETCH_DOCUMENT_LIST = 'FETCH_DOCUMENT_LIST';
export const INSERT_DOCUMENTS = 'INSERT_DOCUMENTS';
export const DOCUMENT_LIST_FAIL = 'DOCUMENT_LIST_FAIL';

// Segment Actions
export const UPDATE_TARGET = 'UPDATE_TARGET';
export const POP_SEGMENTS = 'POPULATE_SEGMENTS';
export const LOOKUP = 'LOOKUP_LEXICON';
export const SPLIT = 'SPLIT';
export const MERGE = 'MERGE';
export const FIND = 'FIND_REPLACE';
export const SPACES = 'CHECK_DOUBLE_SPACES';
export const INSERT_WORD = 'INSERT_WORD';
export const VOICE_INPUT = 'VOICE_INPUT';

// SegmentList Actions
export const UPDATE_SELECTED = 'UPDATE_SELECTED_SEGMENT';

// Project Actions
export const ADD_PROJECT = 'ADD_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const POP_PROJECTS = 'POPULATE_PROJECTS';

// Find-Replace Actions
export const FIND_NEXT = 'FIND_NEXT';
export const FIND_PREV = 'FIND_PREV';
export const REPLACE_TEXT = 'REPLACE_TEXT';
export const REPLACE_ALL = 'REPLACE_ALL';
export const UPDATE_FIND_LOCATION = 'UPDATE_CURRENT_FIND_REPLACE_SEGMENT';

// Comment Actions
export const ADD_COMMENT = 'ADD_COMMENT';
export const RESOLVE_COMMENT = 'RESOLVE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

// Authentication Actions
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const LOAD_USER = 'LOAD_USER';

// KeyLogger Actions
export const ADD_LOGGER = 'ADD_LOGGER';
export const BUILD = 'BUILD_LOGGER';

export const API_HOSTNAME = 'http://localhost:8080';
export const APP_HOSTNAME = 'http://localhost:3000';
// export const API_HOSTNAME = 'http://kanjingo.adaptcentre.ie';
// export const APP_HOSTNAME = 'http://kanjingo.adaptcentre.ie/api';

/*
 * Another Example
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};
