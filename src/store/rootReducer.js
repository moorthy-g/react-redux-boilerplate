import { combineReducers } from 'redux';
import { STATE_KEY as secondsState, reducer as secondsReducer } from 'components/seconds';

export default combineReducers({
  [secondsState]: secondsReducer
})
