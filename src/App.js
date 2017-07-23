import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute  from './common/components/ProtectedRoute';
import Login from './scenes/session/Login';
import Register from './scenes/users/Register';
import Dashboard from './scenes/Dashboard';
import Users from './scenes/users/Users';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <ProtectedRoute exact path='/' component={Dashboard} />
          <ProtectedRoute path='/users' component={Users} />

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
