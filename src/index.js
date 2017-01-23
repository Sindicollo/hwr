import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory, hashHistory } from 'react-router';

import Detail from './pages/Detail';
import List from './pages/List';

//For old react router versions
//import { createHashHistory } from 'history/createHashHistory';
//const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
    <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
        <Route path="/" component={ List } />
        <Route path="/detail/:repo" component={ Detail } />
    </Router>,
    document.getElementById('app')
);