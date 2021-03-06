import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';

import routes from './routes';

// For old react router versions
// import { createHashHistory } from 'history/createHashHistory';
// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
  <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
    {routes}
  </Router>,
    document.getElementById('app'),
);
