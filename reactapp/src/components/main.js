import React from 'react';
import{Route, Switch} from 'react-router-dom';

import dashboard from './dashboard';
import alpro from './alpro';

const Utama = () => (
    <Switch>
        <Route exact path="/" component={dashboard} />
        <Route path="/alpro" component={alpro} />
    </Switch>
)

export default Utama;