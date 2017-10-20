import $q from 'q';

import * as actions from '../../constants/actionTypes';
import apiWrapper from '../../utils/apiWrapper';
import fileReader from '../../utils/fileReader';
import xliffParser from '../../utils/xliffTwoParser';

const SyncReducer = function(state, action) {
  if (action.type === actions.SAVE_DOCUMENT) {
    return {
      ...state,
      savingResult: {
        ...state.savingResult,
        data: 'Saving...',
      },
    };
  }
  if (action.type === actions.SYNC) {
    return state;
  }
  if (!action.response || action.response.status !== 200) {
    return {
      ...state,
      savingResult: {
        ...state.savingResult,
        data: 'Failed',
      },
    };
  }
  return {
    ...state,
    savingResult: action.response,
  };
};

export default SyncReducer;
