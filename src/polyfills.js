import 'core-js/fn/object/assign';
import 'core-js/es6/promise';

// polyfills for IE11- & Android 4.4
import 'core-js/es6/map';
import 'core-js/es6/weak-map';
import 'core-js/es6/set';
import 'raf/polyfill';
import setprototypeof from 'setprototypeof';

Object.setPrototypeOf = setprototypeof;
