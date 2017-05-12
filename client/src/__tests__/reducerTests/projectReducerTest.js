/* eslint-env and, jest */
import expect from 'expect';

import reducer from '../../reducers/projectReducer';
import * as types from '../../constants/actionTypes';

describe('project reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual(
      {
        projects: [
        ],
      },
    );
  });

  it(`it should handle ${types.ADD_PROJECT}`, () => {
    const state = { projects: [] };
    const action = {
      type: types.ADD_PROJECT,
      project: {
        id: 0,
        title: 'Testing title field',
        description: 'Description field',
        author: 'Project author',
      },
    };

    expect(
      // reducer(state, action)
      reducer(state, action),
    ).toEqual(
      {
        projects: [action.project],
      },
    );

    state.projects.push({
      id: 1,
      title: 'First Project',
      description: 'Description field',
      author: 'Daniel',
    });
    expect(
      // reducer(state, action)
      reducer(state, action),
    ).toEqual(
      {
        projects: [
          state.projects[0],
          action.project,
        ],
      },
    );
  });
});
