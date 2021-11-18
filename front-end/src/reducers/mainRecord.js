import * as types from '../actions/ActionTypes';

const initialState = {
    lastest: {
        status: 'INIT',
        data: '',
        error: -1
    },
    recommend: {
        status: 'INIT',
        data: '',
        error: -1
    },
    like: {
        status: 'INIT',
        error: -1
    },
    status: {
        isLoading: true,
    }
};
 
export default function mainRecord(state = initialState, action) {
  switch(action.type) {
     /* LASTEST */
    case types.MAIN_LASTEST:
      return {
        ...state,
        lastest: {
          status: 'WAITING',
          error: -1
        }
      }
    case types.MAIN_LASTEST_SUCCESS:
      return {
        ...state,
        lastest: {
          status: 'SUCCESS',
          data: action.data
        }
      }
    case types.MAIN_LASTEST_FAILURE:
      return {
        ...state,
        lastest:{
          status: 'FAILURE',
          error: action.error
        }
      }
      /* RECOMMEND */
    case types.MAIN_RECOMMEND:
      return {
        ...state,
        recommend : {
          status: 'WAITING',
          error: -1
        }
      }
    case types.MAIN_RECOMMEND_SUCCESS:
      return {
        ...state,
        recommend: {
            status: 'SUCCESS',
            data: action.data
        }
      }
    case types.MAIN_RECOMMEND_FAILURE:
      return {
        ...state,
        recommend:{
          status: 'FAILURE',
          error: action.error
        }
      }
    /* LIKE */
    case types.MAIN_LIKE:
      return {
        ...state,
        like : {
        status: 'WAITING',
        error: -1
        }
      }
    case types.MAIN_LIKE_SUCCESS:
      return {
        ...state,
        like: {
            status: 'SUCCESS'
        }
      }
    case types.MAIN_LIKE_FAILURE:
      return {
        ...state,
        like:{
        status: 'FAILURE',
        error: action.error
        }
      }
    default:
      return state;
  }
};