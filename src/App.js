import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/id';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './scenes/dashboard/Dashboard';
import UsersList from './scenes/users/UsersList';
import Login from './scenes/session/Login';

moment.locale('id');

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
