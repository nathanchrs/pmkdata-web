import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute  from './components/ProtectedRoute';
import Login from './scenes/Login';
import Register from './scenes/Register';
import Dashboard from './scenes/Dashboard';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ProtectedRoute exact path='/' component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
