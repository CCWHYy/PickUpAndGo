import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { MainScreen } from './screens/Main';

export const Routes = () => (
    <Switch>
        <Route path='/'>
            <MainScreen />
        </Route>
    </Switch>
);

export default Routes;
