import { EditorState, ContentState, convertFromRaw } from 'draft-js';
import * as actions from '../../../constants/actionTypes';

const initialState = {
  segments: [{
    id: 0,
    title: 'First',
    description: 'Consequat voluptate consectetur fugiat veniam consequat nulla ipsum eu sunt.',
    source: '<i>Reprehenderit qui minim</i> consequat minim occaecat.',
    mt: '<b>Nostrud occaecat</b> aliqua eiusmod qui laboris eu dolore veniam sit reprehenderit.',
    target: 'Nostrud occaecat aliqua eiusmod qui laboris eu dolore veniam sit reprehenderit.',
    editorState: EditorState.createWithContent(
      ContentState.createFromText('Nostrud occaecat aliqua eiusmod qui laboris eu dolore veniam sit reprehenderit.'),
    ),
  },
  {
    id: 1,
    title: 'Second',
    description: 'Tempor laboris cillum dolor cillum esse officia nulla non elit.',
    source: 'Officia laborum esse nisi laboris.',
    mt: 'Sunt laboris mollit nisi sit.',
    target: 'Sunt laboris mollit nisi sit.',
    editorState: EditorState.createWithContent(
      ContentState.createFromText('Sunt laboris mollit nisi sit.'),
    ),
  },
  {
    id: 2,
    title: 'Third',
    description: 'Sit exercitation sint ea ullamco est reprehenderit proident reprehenderit ipsum et.',
    source: 'Nisi deserunt consectetur cillum sunt deserunt dolor duis dolor labore sint excepteur do elit nostrud.',
    mt: 'Eiusmod est aliqua id fugiat laboris deserunt in cillum occaecat duis.',
    target: 'Eiusmod est aliqua id fugiat laboris deserunt in cillum occaecat duis.',
    editorState: EditorState.createWithContent(
      ContentState.createFromText('Eiusmod est aliqua id fugiat laboris deserunt in cillum occaecat duis.'),
    ),
  },
  ],
};

const updateSegmentTarget = (segment, action) => {
  if (segment.id !== action.segment.id) {
    return segment;
  }
  return Object.assign({}, segment, {
    target: action.segment.target,
    editorState: EditorState.createWithContent(convertFromRaw(action.segment.target)),
  });
};

const segmentReducer = function(state = initialState, action) {
  switch (action.type) {

    case actions.UPDATE_TARGET:
      return {
        ...state,
        segments: state.segments.map(segment => updateSegmentTarget(segment, action)),
      };

    default:
      return state;
  }
};

export default segmentReducer;
