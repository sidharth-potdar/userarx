import React, { Component } from 'react';
import logo from './logo.svg';
import Main from './pages/Main';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return(
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Main}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
