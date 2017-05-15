/* eslint-env and, jest */
import expect from 'expect';

import * as segmentActions from '../../actions/segmentActions';
import * as projectActions from '../../actions/actionCreators';
import * as types from '../../constants/actionTypes';

describe('segmentActions', () => {
  it('should have an action to update the target of a translation segment', () => {
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

describe('projectActions', () => {
  it('shoud have an action to add a new project', () => {
    const id = 0;
    const title = 'sample title';
    const description = 'sample description';
    const author = 'daniel turner';
    const expectedAction = {
      type: types.ADD_PROJECT,
      project: {
        id,
        title,
        description,
        author,
      },
    };

    expect(projectActions.addProject(id, title, description, author).toEqual(expectedAction));
  });

  it('shoud have an action to remove a project', () => {
    const id = 0;
    const expectedAction = {
      type: types.REMOVE_PROJECT,
      id,
    };

    expect(projectActions.removeProject(id).toEqual(expectedAction));
  });
});
