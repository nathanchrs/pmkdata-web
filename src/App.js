import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './scenes/dashboard/Dashboard';
import UsersList from './scenes/users/UsersList';
import Login from './scenes/session/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Dashboard} />
          <Route path='/users' component={UsersList} />

          <Route path='/login' component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
