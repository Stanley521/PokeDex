import { INIT_MY_POKEMON, GET_MY_POKEMON, UPDATE_MY_POKEMON_SUCCESS, UPDATE_MY_POKEMON_FAIL, ADD_MY_POKEMON, REMOVE_MY_POKEMON } from '../actions/types';

const INITIAL_STATE = {
    data: [],
    error: '',
    isSaved: false
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_MY_POKEMON:
            return { ...state, ...INITIAL_STATE };
        case ADD_MY_POKEMON:
            let array = [...state.data];
            array.push(action.data)
            return { ...state, data: array };
        case REMOVE_MY_POKEMON:
            const newarray = [...state.data];
            newarray.splice(action.index, 1);
            return { ...state, data: [...newarray] };
        case GET_MY_POKEMON:
            return { ...state, data: action.data };
        case UPDATE_MY_POKEMON_SUCCESS:
            return { ...state, error: '', isSaved: true };
        case UPDATE_MY_POKEMON_FAIL:
            return { ...state, error: action.error, isSaved: false };
        default:
            return state;
    }
};
export default reducer;