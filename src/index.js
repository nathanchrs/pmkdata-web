import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './reducers/root';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage';
import registerServiceWorker from './registerServiceWorker';

const persistConfig = { key: 'pmkdata', storage, blacklist: [], debug: true };
let store = createStore(persistCombineReducers(persistConfig, rootReducer));
let persistor = persistStore(store);

ReactDOM.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>,
  document.getElementById('root')
);

registerServiceWorker();
