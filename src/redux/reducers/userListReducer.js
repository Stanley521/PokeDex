import { INIT_USER_LIST, GET_USER_LIST_SUCCESS, UPDATE_USER_LIST_SUCCESS, UPDATE_USER_LIST_FAIL, ADD_USER_LIST } from '../actions/types';

const INITIAL_STATE = {
    data: [],
    error: '',
    isSaved: false
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_USER_LIST:
            return { ...state, ...INITIAL_STATE };
        case ADD_USER_LIST:
            const array = state.data;
            array.push(action.data)
            return { ...state, data: array };
        case GET_USER_LIST_SUCCESS:
            return { ...state, data: action.data };
        case UPDATE_USER_LIST_SUCCESS:
            return { ...state, error: '', isSaved: true };
        case UPDATE_USER_LIST_FAIL:
            return { ...state, error: action.error, isSaved: false };
        default:
            return state;
    }
};
export default reducer;