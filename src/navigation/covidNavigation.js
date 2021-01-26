import React, { useEffect } from 'react';
import Route from './route';
// import HomeHeader from '../pages/components/homeHeader/homeHeader';
import Dashboard from '../pages/dashboard/dashboard';
import CovidDashboard from '../pages/covidDashboard/covidDashboard';
import Profile from '../pages/profile/ProfilePage'
import Transaction from '../pages/transaction/TransactionPage'
import { rest } from '../services/rest';
import DataInitiator from '../services/DataInitiator';
import MedicalRecord from '../pages/medical-record/medicalrecord';

import HistoryRecord from '../pages/history-record/history-record';
import MainHeader from '../components/MainHeader';
import { Redirect, Switch } from 'react-router-dom';
import history from './browserHistory';
import VCBasic from '../pages/video-call/basic/VCBasic';

export const covidDashboard = '/covid/dashboard';
function CovidNavigation(props) {
    const [mount, setMount] = React.useState(false);
    useEffect(() => {
        let token = localStorage.getItem('token');
        rest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setMount(true);
    }, [])

    return (
        <>
            <DataInitiator />
            {
                mount &&
                <Switch>
                    <>
                        <MainHeader covid={true}/>
                        <Switch history={history}>
                            <Route path='/covid/dashboard' component={CovidDashboard} covid/>
                            <Redirect to={covidDashboard} />
                        </Switch>

                    </>
                </Switch>
            }
        </>
    )
}

export default CovidNavigation;