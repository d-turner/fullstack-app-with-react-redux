const intialState = {
  projects: [
  ],
};

const projectReducer = function(state = intialState, action) {
  switch (action.type) {
    case 'POP_PROJECTS':
      return Object.assign({}, state, { projects: state.projects.concat(action.projects) });
    case 'ADD_PROJECT':
      console.log(action);
      console.log(state);
      return {
        ...state,
        projects: [...state.projects, action.project],
      };
    case 'REMOVE_PROJECT':
      return Object.assign({}, state, { projects: [
        ...state.projects.slice(0, action.index),
        ...state.projects.slice(action.index + 1),
      ] });
    default:
      return state;
  }
};

export default projectReducer;
