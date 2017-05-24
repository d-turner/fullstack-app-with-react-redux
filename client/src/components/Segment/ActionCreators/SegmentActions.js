import * as actions from '../../../constants/actionTypes';

// update translation
export function updateSegment(id, target) {
  return {
    type: actions.UPDATE_TARGET,
    segment: {
      id,
      target,
    },
  };
}
