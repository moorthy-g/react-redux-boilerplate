// State key
export const STATE_KEY = 'app';

// Action types
const SHOW_ASYNC = 'APP/SHOW_ASYNC';

// Rducer
const initialState = {
  asyncComponent: false
};
export function reducer (state = initialState, action) {
  switch(action.type) {
  case SHOW_ASYNC:
    return { ...state, asyncComponent: true };
  default:
    return state;
  }
}

// Action creators
function showAsyncComponent() {
  return { type: SHOW_ASYNC };
}


// Export required action creators
export const actions = {
  showAsyncComponent
};
