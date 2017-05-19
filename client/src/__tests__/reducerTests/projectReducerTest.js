/* eslint-env and, jest */
import expect from 'expect';
import deepFreeze from 'deep-freeze';

import reducer from '../../reducers/projectReducer';
import * as types from '../../constants/actionTypes';

describe('project reducer', () => {
  /*
   * undefined state and undefined action
   */
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




  /*
   * ADD_PROOJECT with different states
   */
  it(`it should handle ${types.ADD_PROJECT}`, () => {
    let action = {
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
      reducer(undefined, action),
    ).toEqual(
      {
        projects: [action.project],
      },
    );

    const state = { projects: [] };

    // make sure no mutations are performed
    deepFreeze(state);
    deepFreeze(state.projects);

    expect(
      // reducer(state, action)
      reducer(state, action),
    ).toEqual(
      {
        projects: [action.project],
      },
    );

    const stateBefore = {
      projects: [{
        id: 0,
        title: 'Title 0',
        description: 'Description 0',
        author: 'Author 0',
      }, {
        id: 1,
        title: 'Title 1',
        description: 'Description 1',
        author: 'Author 1',
      }],
    };

    const stateAfter = {
      projects: [{
        id: 0,
        title: 'Title 0',
        description: 'Description 0',
        author: 'Author 0',
      }, {
        id: 1,
        title: 'Title 1',
        description: 'Description 1',
        author: 'Author 1',
      }, {
        id: 2,
        title: 'Testing title field',
        description: 'Description field',
        author: 'Project author',
      }],
    };
    // make sure no mutations are performed
    deepFreeze(stateBefore);
    deepFreeze(stateBefore.projects);

    action = {
      type: types.ADD_PROJECT,
      project: {
        id: 2,
        title: 'Testing title field',
        description: 'Description field',
        author: 'Project author',
      },
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });



  /*
   * REMOVE_PROOJECT with different states
   */
  it(`it should handle ${types.REMOVE_PROJECT}`, () => {
    const state = { projects: [] };

    // make sure no mutations are performed
    deepFreeze(state);
    deepFreeze(state.projects);

    let action = {
      type: types.REMOVE_PROJECT,
      id: 0,
    };

    expect(reducer(state, action)).toEqual(state);

    const stateBefore = {
      projects: [{
        id: 0,
        title: 'Title 0',
        description: 'Description 0',
        author: 'Author 0',
      }, {
        id: 1,
        title: 'Title 1',
        description: 'Description 1',
        author: 'Author 1',
      }],
    };

    const stateAfter = {
      projects: [{
        id: 1,
        title: 'Title 1',
        description: 'Description 1',
        author: 'Author 1',
      }],
    };
    // make sure no mutations are performed
    deepFreeze(stateBefore);
    deepFreeze(stateBefore.projects);

    action = {
      type: types.REMOVE_PROJECT,
      id: 0,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
