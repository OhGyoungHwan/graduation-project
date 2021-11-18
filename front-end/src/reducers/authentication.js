// 리듀서는 dispatch 함수로 부터 전달받은 action 객체의 type 값에 따라 state 를 변경하는 함수입니다.
import * as types from '../actions/ActionTypes';
 
const initialState = {
    login: {
        status: 'INIT',
        error: -1
    },
    signup: {
        status: 'INIT',
        error: -1
    },
    status: {
        loaded: false,
        valid: false,
        isLoggedIn: false,
        currentId: undefined,
        currentEmail: undefined,
        currentUser: undefined,
    }
};
 
export default function authentication(state = initialState, action) {
  switch(action.type) {
     /* SIGNUP */
    case types.AUTH_SIGNUP:
      return {
        ...state,
        signup: {
          status: 'WAITING',
          error: -1
        }
      }
    case types.AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          status: 'SUCCESS'
        }
      }
    case types.AUTH_SIGNUP_FAILURE:
      return {
        ...state,
        signup:{
          status: 'FAILURE',
          error: action.error
        }
      }
      /* LOGIN */
    case types.AUTH_LOGIN:
      return {
        ...state,
        login : {
          status: 'WAITING',
          error: -1
        }
      }
    case types.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        login: {
            status: 'SUCCESS'
        },
        status: {
          ...state.status,
          isLoggedIn: true,
          currentId: action.id,
          currentEmail: action.email,
          currentUser: action.name
        }
      }
    case types.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        login:{
          status: 'FAILURE',
          error: action.error
        }
      }
    /* GET_STATUS */
    case types.AUTH_GET_STATUS:
      return {
        ...state,
        status: {
          ...state.status,
          isLoggedIn: true
        }
      }
    case types.AUTH_GET_STATUS_SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loaded: true,
          valid: true,
          currentId: action.id,
          currentEmail: action.email,
          currentUser: action.name,
        }
      }
    case types.AUTH_GET_STATUS_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          loaded: true,
          valid: false,
          isLoggedIn: false
        }
      }
    /* LOGOUT */
    case types.AUTH_LOGOUT:
      return {
        ...state,
        signup: {
          status: 'INIT',
          error: -1
        },
        status: {
          ...state.status,
          isLoggedIn: false,
          currentId: undefined,
          currentEmail: undefined,
          currentUser: undefined
        }
      }
    /* NAME_CHANGE */
    case types.NAME_CHANGE:
      return {
        ...state,
        status: {
          ...state.status,
          isLoggedIn: true
        }
      }
    case types.NAME_CHANGE_SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          valid: true,
          currentId: action.id,
          currentEmail: action.email,
          currentUser: action.name,
        }
      }
    case types.NAME_CHANGE_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          valid: false,
          isLoggedIn: false
        }
      }
    default:
      return state;
  }
};