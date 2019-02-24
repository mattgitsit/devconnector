import axios from 'axios';
import { logoutUser } from './authActions';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from './types';

export const getCurrentProfile = () => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

export const createProfile = (profileData, history) => async dispatch => {
  try {
    await axios.post('/api/profile', profileData);

    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const editProfile = (profileData, history) => async dispatch => {
  try {
    await axios.patch('/api/profile', profileData);

    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone.')) {
    try {
      await axios.delete('/api/profile');

      dispatch(logoutUser());
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
