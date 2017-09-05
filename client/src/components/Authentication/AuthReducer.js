import * as actions from '../../constants/actionTypes';

const initialState = {
  userId: null,
  email: null,
  name: null,
  isLoggedIn: false,
  loading: false,
};

const loadUser = (state) => {
  return {
    ...state,
    loading: true,
  };
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
        loading: false,
      };
    case actions.LOGOUT:
      return initialState;
    case actions.LOAD_USER:
      return loadUser(state);
    default:
      return state;
  }
};

export default AuthenticationReducer;
