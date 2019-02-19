import axios from 'axios';
import { GET_ERRORS } from './types';

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
