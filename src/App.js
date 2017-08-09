import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import moment from 'moment';
import ProtectedRoute from './common/components/ProtectedRoute';
import Login from './scenes/session/Login';
import Register from './scenes/users/Register';
import Dashboard from './scenes/Dashboard';
import Users from './scenes/users/Users';
import Students from './scenes/students/Students';
import Interactions from './scenes/interactions/Interactions';
import Mentors from './scenes/mentors/Mentors';
import Events from './scenes/events/Events';
import './App.css';
import 'moment/locale/id';

moment.locale('id');

class App extends React.Component {
  render () {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <ProtectedRoute exact path='/' component={Dashboard} />
          <ProtectedRoute path='/users' component={Users} />
          <ProtectedRoute path='/students' component={Students} />
          <ProtectedRoute path='/interactions' component={Interactions} />
          <ProtectedRoute path='/mentors' component={Mentors} />
          <ProtectedRoute path='/events' component={Events} />

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
