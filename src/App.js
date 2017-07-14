import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute  from './components/ProtectedRoute';
import Login from './scenes/Login';
import Dashboard from './scenes/Dashboard';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ProtectedRoute exact path='/' component={Dashboard} />
          <Route path='/login' component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
