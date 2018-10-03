import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from 'screens/app';

if (module.hot) {
  module.hot.accept();
  //clear console on hot reload
  window.addEventListener('message', console.clear());
}

ReactDOM.render(
  <Provider store={store.get()}>
    <App />
  </Provider>,
  document.querySelector('.container')
)
