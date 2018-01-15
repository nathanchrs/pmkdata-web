import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment/locale/id';
import App from './App';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import registerServiceWorker from './registerServiceWorker';
import { apiMiddleware } from 'redux-api-middleware';
import logoutOnUnauthorizedError from './middleware/logoutOnUnauthorizedError';

moment.locale('id');

const store = createStore(rootReducer, applyMiddleware(
  apiMiddleware, logoutOnUnauthorizedError
));
const persistor = persistStore(store);

ReactDOM.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>,
  document.getElementById('root')
);

registerServiceWorker();
