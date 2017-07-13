import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from './services/reducer';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';


let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
