import * as actions from '../../../constants/actionTypes';

// add project
export function addProject(id, title, description, author) {
  return {
    type: actions.ADD_PROJECT,
    project: {
      id,
      title,
      description,
      author,
    },
  };
}
// remove project
export function removeProject(id) {
  return {
    type: actions.REMOVE_PROJECT,
    id,
  };
}
