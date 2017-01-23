import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import List from './pages/List';
import Detail from './pages/Detail';

const routes = (
    <Route path="/" component={ App }>
         {/* "IndexRoute: if my parent route was matched but none of my siblings matched, render me." */ }
        <IndexRoute component={ List } />
        <Route path="detail/:repo" component={ Detail } />
    </Route>
);

export default routes;