/* eslint-env and, jest */
import expect from 'expect';

import * as segmentActions from '../../actions/segmentActions';
import * as types from '../../constants/actionTypes';

describe('segmentActions', () => {
  it('should create an action to update the target of a segment', () => {
    const target = 'New target translation text';
    const id = 0;
    const expectedAction = {
      type: types.UPDATE_TARGET,
      segment: {
        id,
        target,
      },
    };

    expect(segmentActions.updateSegment(id, target)).toEqual(expectedAction);
  });
});
