import {
    SET_SCREAMS,
    SET_SCREAM,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    POST_SCREAM,
    LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS,
    STOP_LOADING_UI
} from "../types";
import axios from 'axios';

// Get all screams
export const getScreams = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            });
        });
};

export const getScream = screamId => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`screams/${screamId}`)
        .then(res => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(err => console.log(err))
};

// Post a scream
export const postScream = scream => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/screams', scream)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
};

// Like a scream
export const likeScream = (screamId) => dispatch => {
    axios
        .get(`screams/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

// Unlike a scream
export const unlikeScream = (screamId) => dispatch => {
    axios
        .get(`screams/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
};

// Delete scream
export const deleteScream = screamId => dispatch => {
    axios
        .delete(`scream/${screamId}`)
        .then(() => {
            dispatch({ type: DELETE_SCREAM, payload: screamId })
        })
        .catch((err) => console.log(err));
};

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS });
};