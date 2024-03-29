import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: {},
};

export default function authReduce(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
       let isAdminUser=false
       if(payload.user?.username==='admin')
       {
        isAdminUser=true
       }
       else{
        isAdminUser=false
       }
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: isAdminUser,
        loading: false,
        user: payload.user,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
