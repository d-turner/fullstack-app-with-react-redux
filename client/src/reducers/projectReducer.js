const intialState = {
  projects: [
  ],
};

const projectReducer = function(state = intialState, action) {
  switch (action.type) {
    case 'POP_PROJECTS':
      return Object.assign({}, state, { projects: action.projects });
    case 'ADD_PROJECT':
      const project = action.project;
      if (project.title === '') {
        return state;
      }
      return {
        ...state,
        projects: [...state.projects, action.project],
      };
    case 'REMOVE_PROJECT':
      return {
        ...state, projects: state.projects.filter(({ id }) => id.toString() !== action.id),
      };
    default:
      return state;
  }
};

export default projectReducer;
