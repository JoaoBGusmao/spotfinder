import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App';
import Login from './Login';

// ReactDOM.render(
// <BrowserRouter>
//   <Switch>
//     <Route path="/" exact={true} component={Login} />
//     <Route path="/find" component={App} />
//   </Switch>
// </ BrowserRouter>, document.getElementById('app'));

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
