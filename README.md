# React Redux Boilerplate
A react redux starter kit with opinions

## Features out of the box
- React & Redux
- Runtime reducer update
- Component code splitting
- Webpack dev server ( HMR enabled )
- CSS modules & less
- Webpack bundle analyzer
- Babel transpiler
- Required polyfill for IE9+

## Mission
- Encapsulated components - Everything about a component should be under its directory (except shared/common components)
- Scalability
- Ease of code splitting on component level

## Structure
- All component related code must be kept in its component directory.
It includes reducer, actions, action creators & stylesheets
- Module level components should go into `src/screens`
- Common components should go into `src/components`

## Component directory
- `{component}/index.js` acts as an api for component. Export things here, if you need to access something outside component directory
- `{component}/state.js` redux logic should be written here. This file has **reducer**, **action type constants**, **action creators** & **redux store's state key**. If you wish to keep them in individual file, please feel free to destructure this file into multiple files. But, make sure they're all in component directory
- All sub components of a component go into `{component}/components` directory


## Naming components & directories
- Use lowercase alphanumeric characters and - (dash)


## Reducer attachment to store
- Store exports (`store/index.js`) `addReducer` & `removeReducer` method which add/remove reducer in store anytime.
- **Note** `addReducer` can be called in component's index file.
- **Note** If you need a temporary reducer, call `addReducer` in `componentWillMount`. Then, remove it using `removeReducer` in `componentWillUnmount`.
- **Warning:** When removing a reducer, You will lose the attached data in store & Redux time travelling
- **Warning:** Make sure the reducer state keys are unique. Else, one might replace other.


## Commands
- `yarn start` Starts the webpack dev server in port specified in .env ( default port is 8000 )
- `yarn build` Runs webpack production build.
- `yarn build:server` Runs webpack production build & Serves it using a simple http server in port specified .env
