import * as actions from '../constants/actionTypes';

const intialState = {
  projects: [
  ],
};

const projectReducer = function(state = intialState, action) {
  switch (action.type) {

    case actions.POP_PROJECTS:
      return Object.assign({}, state, { projects: action.projects });

    case actions.ADD_PROJECT:
      if (action.project.title === '') {
        return state;
      }
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
