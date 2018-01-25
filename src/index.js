import React from 'react';
import ReactDOM from 'react-dom';
import App from 'modules/App';
import './polyfills';

if (module.hot) {
  module.hot.accept();
  //clear console on hot reload
  window.addEventListener('message', console.clear());
}

ReactDOM.render(
  <App />,
  document.querySelector('.container')
)
