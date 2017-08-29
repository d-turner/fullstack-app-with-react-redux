import * as actions from '../../constants/actionTypes';

const initialState = {
  userId: null,
  email: null,
  name: null,
  isLoggedIn: false,
};

const AuthenticationReducer = function(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        userId: action.userId,
        email: action.email,
        name: action.name,
        isLoggedIn: true,
      };
    case actions.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default AuthenticationReducer;
