import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { apiMiddleware } from '@aftonbladet/redux-api-middleware';
import apiErrorHandlerMiddleware from './services/apiErrorHandler';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from './services/reducer';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(
  rootReducer, undefined, compose(
    applyMiddleware(thunkMiddleware, apiMiddleware, apiErrorHandlerMiddleware,),
    autoRehydrate()
  )
);
persistStore(store, { keyPrefix: 'pmkdata:', blacklist: ['form'] });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
