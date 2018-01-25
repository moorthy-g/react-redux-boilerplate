import 'js/polyfills';
import '../style/main.less';
import 'js/app-module.js';

if (module.hot) {
  module.hot.accept();
  //clear console on hot reload
  window.addEventListener('message', console.clear());
}
