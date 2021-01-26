import { ADD_USER_LIST, GET_USER_LIST_SUCCESS, INIT_USER_LIST } from './types';

export const initUser = () => {
  return { type: INIT_USER_LIST };
};

export const addUser = (data = {}, dispatch) => {
    return dispatch({
      type: ADD_USER_LIST,
      data: {
        ...data
      }
    });
  };

export const updateUser = (data = [], dispatch) => {
  return dispatch({
    type: GET_USER_LIST_SUCCESS,
    data: [
      ...data
    ]
  });
};

// const updateFail = (dispatch, error) => {
//   dispatch({
//     type: UPDATE_USER_LIST_FAIL,
//     error: error
//   });
// };

// const updateSuccess = dispatch => {
//   dispatch({
//     type: UPDATE_USER_LIST_SUCCESS
//   });
// };
