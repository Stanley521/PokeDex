import { INIT_USER, GET_USER_SUCCESS, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL } from '../actions/types';

const INITIAL_STATE = {
    data: {
    },
    error: '',
    isSaved: false
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_USER:
            return { ...state, ...INITIAL_STATE };
        case GET_USER_SUCCESS:
            return { ...state, data: { ...state.data, ...action.data } };
        case UPDATE_USER_SUCCESS:
            return { ...state, error: '', isSaved: true };
        case UPDATE_USER_FAIL:
            return { ...state, error: action.error, isSaved: false };
        default:
            return state;
    }
};
export default reducer;