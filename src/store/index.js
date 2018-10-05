import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

const store = {
  _store: null,
  _reducers: {},
  _updateQueued: false,
  _updateReducers() {
    if(this._updateQueued) {
      return false;
    }
    this._updateQueued = true;
    setTimeout(() => {
      if(this._store !== null) {
        const rootReducer = combineReducers(this._reducers);
        this._store.replaceReducer(rootReducer);
        this._updateQueued = false;
      }
    });
  },
  get() {
    if(this._store === null) {
      this.configure();
    }
    return this._store;
  },
  configure() {
    const rootReducer = combineReducers(this._reducers);
    let enhancers;
    /*eslint-env node*/
    if (process.env.NODE_ENV !== 'production') {
      const logger = require('redux-logger').createLogger({
        collapsed: true
      });
      const composeEnhancers =
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
          ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
          : compose;
      enhancers = composeEnhancers(applyMiddleware(thunk, logger));
    } else {
      //prod only middlewares
      enhancers = compose(applyMiddleware(thunk));
    }

    this._store = createStore(rootReducer, enhancers);
  },
  addReducer(key, reducer) {
    this._reducers[key] = reducer;
    this._updateReducers();
  },
  removeReducer(key) {
    if(this._reducers[key]) {
      this._reducers[key] = null;
    }
    this._updateReducers();
  }
};

export default store;
