import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Site from './Site';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


ReactDOM.render(
  <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/site" component={Site} />
        </Switch>
  </ BrowserRouter>,
  document.getElementById('root')
);
