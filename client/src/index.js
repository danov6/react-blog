import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, Router } from 'react-router-dom';

import store from './store';
import App from './components/App';

const createBrowserHistory = require("history").createBrowserHistory;

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Provider store={store}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById('root'),
);