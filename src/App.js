import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/id';
import './App.css';
import UsersList from './scenes/users/UsersList';

moment.locale('id');

class App extends Component {
  render() {
    return (
      <div className="App">
        <UsersList />
      </div>
    );
  }
}

export default App;
