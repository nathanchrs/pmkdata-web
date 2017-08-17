import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import moment from 'moment';
import ProtectedRoute from './common/components/ProtectedRoute';
import Login from './scenes/session/Login';
import Register from './scenes/users/Register';
import Users from './scenes/users/Users';
import Students from './scenes/students/Students';
import Interactions from './scenes/interactions/Interactions';
import Mentees from './scenes/mentees/Mentees';
import './App.css';
import 'moment/locale/id';

moment.locale('id');

class App extends React.Component {
  render () {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <ProtectedRoute exact path='/' component={ () => <Redirect to='/interactions'/>} />
          <ProtectedRoute path='/interactions' component={Interactions} />
          <ProtectedRoute path='/mentees' component={Mentees} />
          <ProtectedRoute path='/students' component={Students} />
          <ProtectedRoute path='/users' component={Users} />

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
