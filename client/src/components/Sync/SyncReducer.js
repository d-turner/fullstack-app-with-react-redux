import update from 'immutability-helper';

import * as actions from '../../constants/actionTypes';

const initialState = {
  data: 'Saved',
  response: null,
};

const SyncReducer = function(state = initialState, action) {
  switch (action.type) {
    case actions.SYNC:
      return state;
    case actions.SAVE_DOCUMENT:
      return update(state, {
        data: {
          $set: 'Saving...',
        },
      });
    case actions.SAVE_SUCCESS:
      return update(state, {
        data: {
          $set: 'All changes saved',
        },
        response: {
          $set: action.response,
        },
      });
    case actions.SAVE_FAIL:
      return update(state, {
        data: {
          $set: 'Failed to save',
        },
        response: {
          $set: action.response,
        },
      });
    default:
      return state;
  }
};

export default SyncReducer;
