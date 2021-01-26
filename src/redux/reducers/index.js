import { combineReducers } from 'redux';
import user from './userReducer';
import myPokemon from './myPokemonReducer';
import userList from './userListReducer'

export default combineReducers({
    user,
    myPokemon,
    userList
});
