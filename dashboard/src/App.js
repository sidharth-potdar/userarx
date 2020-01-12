import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/Auth/Auth.jsx";
import AdminLayout from "layouts/Admin/Admin.jsx";
import LoginPage from "views/pages/Login.jsx";
import { Auth } from 'aws-amplify';

const hist = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: true,
    };
  }

  async authenticate() {
    try {
      await Auth.currentAuthenticatedUser({
          bypassCache: false
      })
      .then(console.log(this.state.isAuthenticated))
    } catch (error) {
      this.setState({
        isAuthenticated: false,
      })
      console.log(error.message);
    }
  }

  signOut() {
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
    this.setState({
      isAuthenticated: false,
    })
  }

  componentDidMount() {
    this.authenticate();
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.state.isAuthenticated
          ? <Component {...props} />
          : <Redirect to='/auth/login' />
      )} />
    )

    return (
      <Router history={hist}>
        <Switch>
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <PrivateRoute path="/project" component={props => <AdminLayout {...props} />} />
          <Redirect from="/" to="/project" />
        </Switch>
      </Router>
    )
  }
}

export default App;
