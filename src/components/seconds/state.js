// State key
export const STATE_KEY = 'seconds';

// Action types
const UPDATE = 'SECONDS/UPDATE';

// Reducer
export default function (state = 0, action) {
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
  }
}

export const actions = {
  updateSeconds
}
