import * as actions from '../../constants/actionTypes';

export function login(userId, email, name) {
  return {
    type: actions.LOGIN,
    userId,
    email,
    name,
  };
}

export function logout() {
  return {
    type: actions.LOGOUT,
  };
}
