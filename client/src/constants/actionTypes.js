/*
 * Action Constants
 */
// Document Actions
export const FETCH_DOCUMENT = 'FETCH_DOCUMENT_REQUEST';
export const FETCH_DOCUMENT_FAIL = 'FETCH_DOCUMENT_FAIL';
export const FETCH_DOCUMENT_SUC = 'FETCH_DOCUMENT_SUCCESS';

// Segment Actions
export const UPDATE_TARGET = 'UPDATE_TARGET';
export const POP_SEGMENTS = 'POPULATE_SEGMENTS';
export const LOOKUP = 'LOOKUP_LEXICON';
export const SPLIT = 'SPLIT';
export const MERGE = 'MERGE';
export const FIND = 'FIND_REPLACE';

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


/*
 * Another Example
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};
