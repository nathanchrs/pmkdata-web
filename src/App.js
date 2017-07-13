import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute  from './components/ProtectedRoute';

import Login from './scenes/Login';
import Dashboard from './scenes/Dashboard';


class App extends React.Component {
  render() {
    return (
      <div>
        <ProtectedRoute exact path='/' component={Dashboard} />
        <Route path='/login' component={Login} />
      </div>
    );
  }
}

export default App;
