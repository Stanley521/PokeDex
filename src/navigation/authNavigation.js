import React from 'react';
import { Switch, Router } from 'react-router-dom';
import Signin from '../screens/authentication/signin';
import history from './browserHistory';
import MainNavigation from './mainNavigation';
import Route from './route';
function AuthNavigation(props) {
    return (
        <Router history={history}>
            {/* <Routes /> */}
            <Switch>
                <Route path="/login" exact component={Signin} notPrivate />
                <Route path="/" component={MainNavigation} />
                {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
                <Route component={Signin} notPrivate />
            </Switch>
        </Router>
    )
}

export default AuthNavigation;