import store from 'store';
import AsyncSeconds from './components/async-seconds';
import { reducer, actions, STATE_KEY } from './state';

store.addReducer(STATE_KEY, reducer);

export default AsyncSeconds;
export { actions, STATE_KEY };
