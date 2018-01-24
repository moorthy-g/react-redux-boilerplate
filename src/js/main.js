import '../style/main.less';
import './appModule.js';

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <App />,
  document.querySelector('.container')
)
