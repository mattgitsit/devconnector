import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => async dispatch => {
  // axios
  //   .post('/api/users/register', userData)
  //   .then(() => history.push('/login'))
  //   .catch(err =>
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data
  //     })
  //   );

  try {
    await axios.post('/api/users/register', userData);
    history.push('/login');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const loginUser = (userData, history) => async dispatch => {
  try {
    const response = await axios.post('/api/users/login', userData);

    // save to local storage
    const { token } = response.data;

    // set token to local storage
    localStorage.setItem('jwtToken', token);

    // set token to auth header
    setAuthToken(token);

    // decode token to get user data
    const decoded = jwt_decode(token);

    // set current user
    dispatch(setCurrentUser(decoded));

    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logoutUser = history => dispatch => {
  // remove token from local storage
  localStorage.removeItem('jwtToken');

  // remove auth header for future requests
  setAuthToken(false);

  // set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));

  history.push('/login');
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
