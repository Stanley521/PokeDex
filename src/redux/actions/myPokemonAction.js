import { ADD_MY_POKEMON, GET_MY_POKEMON, INIT_MY_POKEMON, REMOVE_MY_POKEMON } from './types';

export const initUser = () => {
    return { type: INIT_MY_POKEMON };
};

export const addMyPokemon = (data = {}, myPokemon, dispatch) => {
    const array = myPokemon;
    const name = data?.name;
    const nickName = data?.nickName;
    const findIndex = array.findIndex((value) => {
        return value.name === name && value.nickName === nickName
    })
    if (findIndex !== -1) {
        return { data: array, error: true, message: `You already have ${name} named ${nickName}` };
    }
    dispatch({
        type: ADD_MY_POKEMON,
        data: {
            ...data
        }
    });
    return { data: array, message: `${name} successfully named ${nickName}` };
};

export const removeMyPokemon = (data = {}, myPokemon, dispatch) => {
    console.log(data)
    const array = myPokemon;
    const name = data?.name;
    const nickName = data?.nickName;
    const findIndex = array.findIndex((value) => {
        console.log(name)
        console.log(value)
        return value.name === name && value.nickName === nickName
    })
    if (findIndex === -1) {
        return { data: array, error: true, message: `There's no pokemon named ${nickName}` };
    }
    dispatch({
        type: REMOVE_MY_POKEMON,
        data: {
            ...data
        },
        index: findIndex
    });
    return { data: array, message: `Good bye ${nickName}!` };
};

export const updateMyPokemon = (data = [], dispatch) => {
    return dispatch({
        type: GET_MY_POKEMON,
        data: [
            ...data
        ]
    });
};

// const updateMyPokemonFail = (dispatch, error) => {
//     dispatch({
//         type: UPDATE_MY_POKEMON_FAIL,
//         error: error
//     });
// };

// const updateMyPokemonSuccess = dispatch => {
//     dispatch({
//         type: UPDATE_MY_POKEMON_SUCCESS
//     });
// };
