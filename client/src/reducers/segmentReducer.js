const intialState = {
  segments: [{
    id: 0,
    title: 'First',
    description: 'Consequat voluptate consectetur fugiat veniam consequat nulla ipsum eu sunt.',
  },
  {
    id: 1,
    title: 'Second',
    description: 'Tempor laboris cillum dolor cillum esse officia nulla non elit.',
  },
  {
    id: 2,
    title: 'Third',
    description: 'Sit exercitation sint ea ullamco est reprehenderit proident reprehenderit ipsum et.',
  },
  ],
};

const segmentReducer = function(state = intialState, action) {
  switch (action.type) {
    default:
      return state;
  }
};

export default segmentReducer;
