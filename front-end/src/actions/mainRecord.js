import axios from 'axios';
import * as types from './ActionTypes';

/* LASTEST */
export function lastestRequest(id, idx) {
    return (dispatch) => {
        // Inform signup API is starting
        dispatch(lastest());
 
        return axios.post('/api/record/lastest', { id, idx })
        .then((response) => {
            dispatch(lastestSuccess(response.data));
        }).catch((error) => {
            dispatch(lastestFailure(error.response.data || -1));
        });
    };
}
 
export function lastest() {
    return {
        type: types.MAIN_LASTEST
    };
}
 
export function lastestSuccess(data) {
    return {
        type: types.MAIN_LASTEST_SUCCESS,
        data: data
    };
}
 
export function lastestFailure(error) {
    return {
        type: types.MAIN_LASTEST_FAILURE,
        error: error
    };
}

/* RECOMMEND */
export function recommendRequest(id) {
    return (dispatch) => {
        // Inform signup API is starting
        dispatch(recommend());
 
        return axios.post('/api/record/recommend', { id })
        .then((response) => {
            dispatch(recommendSuccess(response.data));
        }).catch((error) => {
            dispatch(recommendFailure(error.response.data || -1));
        });
    };
}
 
export function recommend() {
    return {
        type: types.MAIN_RECOMMEND
    };
}
 
export function recommendSuccess(data) {
    return {
        type: types.MAIN_RECOMMEND_SUCCESS,
        data: data
    };
}
 
export function recommendFailure(error) {
    return {
        type: types.MAIN_RECOMMEND_FAILURE,
        error: error
    };
}

/* LIKE */
export function likeRequest(id, sign, idx) {
    return (dispatch) => {
        // Inform signup API is starting
        dispatch(like());
 
        return axios.post('/api/record/like', { id, sign, idx })
        .then((response) => {
            dispatch(likeSuccess());
        }).catch((error) => {
            dispatch(likeFailure(error.response.data || -1));
        });
    };
}
 
export function like() {
    return {
        type: types.MAIN_LIKE
    };
}
 
export function likeSuccess() {
    return {
        type: types.MAIN_LIKE_SUCCESS,
    };
}
 
export function likeFailure(error) {
    return {
        type: types.MAIN_LIKE_FAILURE,
        error: error
    };
}