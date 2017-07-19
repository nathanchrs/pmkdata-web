import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute  from './components/ProtectedRoute';
import Login from './scenes/session/Login';
import Register from './scenes/users/Register';
import Dashboard from './scenes/Dashboard';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <ProtectedRoute exact path='/' component={Dashboard} />

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
