import { GET_USER_SUCCESS, INIT_USER, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS } from './types';

export const initUser = () => {
  return { type: INIT_USER };
};

export const updateUser = (data = {}, dispatch) => {
  return dispatch({
    type: GET_USER_SUCCESS,
    data: {
      ...data
    }
  });
};

const updateFail = (dispatch, error) => {
  dispatch({
    type: UPDATE_USER_FAIL,
    error: error
  });
};

const updateSuccess = dispatch => {
  dispatch({
    type: UPDATE_USER_SUCCESS
  });
};
