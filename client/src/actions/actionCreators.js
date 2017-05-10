// add project
export function addProject(id, title, description, author) {
  return {
    type: 'ADD_PROJECT',
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
    type: 'REMOVE_PROJECT',
    id,
  };
}
