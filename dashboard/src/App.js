import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/Auth/Auth.jsx";
import AdminLayout from "layouts/Admin/Admin.jsx";
import LoginPage from "views/pages/Login.jsx";
import { Auth } from 'aws-amplify';

const hist = createBrowserHistory();

const App = () => (
  <Router history={hist}>
    <Switch>
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Route path="/project" render={props => <AdminLayout {...props} />} />
      <Redirect from="/" to="/project/docs" />
    </Switch>
  </Router>
)

export default App;
