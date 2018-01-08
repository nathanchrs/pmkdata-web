import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './reducers/root';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(rootReducer);
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
