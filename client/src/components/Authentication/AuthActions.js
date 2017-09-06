import * as actions from '../../constants/actionTypes';
import api from '../../utils/apiWrapper';

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

export function fetchUser() {
  return {
    type: actions.LOAD_USER,
  };
}

export function loadUser() {
  return (dispatch) => {
    dispatch(fetchUser());
    api.test((response) => {
      if (!response) {
        return dispatch(logout());
      }
      if (response.data.status && response.data.status === 'Authenticated') {
        const { user_id: userId, email, name } = response.data.data;
        return dispatch(login(userId, email, name));
      }
      return dispatch(logout());
    });
  };
}
