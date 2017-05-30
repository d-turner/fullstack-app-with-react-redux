/* eslint-env and, jest */
import expect from 'expect';
import deepFreeze from 'deep-freeze';

import reducer from '../Reducers/SegmentReducer';
import * as types from '../../../constants/actionTypes';


// currently hardcoded intialstate
const initialState = {
  segments: [{
    id: 0,
    title: 'First',
    description: 'Consequat voluptate consectetur fugiat veniam consequat nulla ipsum eu sunt.',
    source: 'Reprehenderit qui minim consequat minim occaecat.',
    mt: 'Nostrud occaecat aliqua eiusmod qui laboris eu dolore veniam sit reprehenderit.',
    target: 'Nostrud occaecat aliqua eiusmod qui laboris eu dolore veniam sit reprehenderit.',
  },
  {
    id: 1,
    title: 'Second',
    description: 'Tempor laboris cillum dolor cillum esse officia nulla non elit.',
    source: 'Officia laborum esse nisi laboris.',
    mt: 'Sunt laboris mollit nisi sit.',
    target: 'Sunt laboris mollit nisi sit.',
  },
  {
    id: 2,
    title: 'Third',
    description: 'Sit exercitation sint ea ullamco est reprehenderit proident reprehenderit ipsum et.',
    source: 'Nisi deserunt consectetur cillum sunt deserunt dolor duis dolor labore sint excepteur do elit nostrud.',
    mt: 'Eiusmod est aliqua id fugiat laboris deserunt in cillum occaecat duis.',
    target: 'Eiusmod est aliqua id fugiat laboris deserunt in cillum occaecat duis.',
  },
  ],
};
deepFreeze(initialState);
deepFreeze(initialState.segments);

describe('segment reducer', () => {
  /*
   * undefined state and undefined action
   */
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ segments: [] });
  });




  /*
   * UPDATE_TARGET with different states
   */
  it(`it should handle ${types.UPDATE_TARGET} for undefined initial state`, () => {
    const id = 0;
    const newTarget = 'Testing UPDATE_TARGET field';
    const action = {
      type: types.UPDATE_TARGET,
      segment: {
        id,
        target: newTarget,
      },
    };
    const expectedState = { segments: [] };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });



  it(`it should handle ${types.UPDATE_TARGET} for a set initial state`, () => {
    const id = 0;
    const newTarget = 'Testing UPDATE_TARGET field';
    const action = {
      type: types.UPDATE_TARGET,
      segment: {
        id,
        target: newTarget,
      },
    };

    const expectedSegments = initialState.segments.map((segment) => {
      if (segment.id !== id) {
        return segment;
      }
      return { ...segment, target: newTarget };
    });
    const expectedState = { segments: expectedSegments };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
