import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "./layouts/Auth/Auth.jsx";
import AdminLayout from "./layouts/Admin/Admin.jsx";
import LoginPage from "./views/pages/Login.jsx";
import { Auth } from 'aws-amplify';

const hist = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(sessionStorage.getItem("userID") != null && sessionStorage.getItem("userID") != undefined) {
      return (
        <Router history={hist}>
          <Switch>
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <Route path="/project" component={props => <AdminLayout {...props} />} />
            <Redirect from="/" to="/project/docs" />
          </Switch>
        </Router>
      )
    }
    else {
      console.log("Get out")
      return (
        <Router history={hist}>
          <Switch>
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
        </Router>
      )
    }
  }
}

export default App;
