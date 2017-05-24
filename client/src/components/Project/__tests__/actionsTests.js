/* eslint-env and, jest */
import expect from 'expect';

import * as projectActions from '../ActionCreators/ProjectActions';
import * as types from '../../../constants/actionTypes';

describe('projectActions', () => {
  it('should have an action to add a new project', () => {
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

    expect(projectActions.addProject(id, title, description, author)).toEqual(expectedAction);
  });

  it('should have an action to remove a project', () => {
    const id = 0;
    const expectedAction = {
      type: types.REMOVE_PROJECT,
      id,
    };

    expect(projectActions.removeProject(id)).toEqual(expectedAction);
  });
});
