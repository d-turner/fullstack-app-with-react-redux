import { EditorState, convertFromRaw } from 'draft-js';
import * as actions from '../../../constants/actionTypes';

const initialState = { segments: [] };

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
