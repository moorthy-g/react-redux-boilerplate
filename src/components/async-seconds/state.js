// State key
export const STATE_KEY = 'asyncSeconds';

// Action types
const UPDATE = 'ASYNC_SECONDS/UPDATE';

// Reducer
const initialState = new Date().getSeconds();
export function reducer (state = initialState, action) {
  switch(action.type) {
  case UPDATE:
    return action.payload;
  default:
    return state;
  }
}

// Action creators
function updateSeconds() {
  return {
    type: UPDATE,
    payload: new Date().getSeconds()
  };
}

export const actions = {
  updateSeconds
};
