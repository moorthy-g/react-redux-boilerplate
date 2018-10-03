import store from 'store';
import Seconds from './components/seconds';
import { reducer, actions, STATE_KEY } from './state';

store.addReducer(STATE_KEY, reducer);

export default Seconds;
export { actions, STATE_KEY };
