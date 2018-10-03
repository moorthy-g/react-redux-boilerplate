import store from 'store';
import App from './components/app';
import { reducer, actions, STATE_KEY } from './state';

store.addReducer(STATE_KEY, reducer);

export default App;
export { actions, STATE_KEY };
