import React, { useEffect } from 'react';
import Route from './route';
import { Redirect, Switch } from 'react-router-dom';
import history from './browserHistory';
import HomePage from '../screens/mainscreen/HomePage';
import PokemonPage from '../screens/pokemon/PokemonPage';
import MainHeader from '../components/headers/MainHeader';
import MyPokemonPage from '../screens/pokemon/MyPokemonPage';

export const defaultHome = '/';
function MainNavigation(props) {
    const [mount, setMount] = React.useState(false);
    useEffect(() => {
        setMount(true);
    }, [])
    return mount ?
        <>
            <MainHeader />
            <Switch history={history}>
                <Route path='/pokemon/:name' component={PokemonPage} />
                <Route path='/mypokemon' component={MyPokemonPage} />
                
                <Route path='/' component={HomePage} />
                <Redirect to={defaultHome} />
            </Switch>
        </>
        : null
}

export default MainNavigation;