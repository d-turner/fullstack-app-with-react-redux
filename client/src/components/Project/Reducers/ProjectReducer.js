import * as actions from '../../../constants/actionTypes';

const initialState = {
  projects: [
  ],
};

const projectReducer = function(state = initialState, action) {
  switch (action.type) {

    case actions.POP_PROJECTS:
      return Object.assign({}, state, { projects: action.projects });

    case actions.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.project],
      };

    case actions.REMOVE_PROJECT:
      return {
        ...state, projects: state.projects.filter(({ id }) => id !== action.id),
      };

    default:
      return state;
  }
};

export default projectReducer;
