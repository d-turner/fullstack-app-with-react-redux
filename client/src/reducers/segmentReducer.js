const intialState = {
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
    target: '',
  },
  {
    id: 2,
    title: 'Third',
    description: 'Sit exercitation sint ea ullamco est reprehenderit proident reprehenderit ipsum et.',
    source: 'Nisi deserunt consectetur cillum sunt deserunt dolor duis dolor labore sint excepteur do elit nostrud.',
    mt: 'Eiusmod est aliqua id fugiat laboris deserunt in cillum occaecat duis.',
    target: '',
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
