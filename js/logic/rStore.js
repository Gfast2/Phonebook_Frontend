'use strict';

import ioDigest from './xhr';

import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

const initState = {
  db: {
    outputStat: 0, // 7 digital output state, only being used in 'status' view.
    freqStat: 0,
    filelist: []   // on server side available file list
  }
};

const db = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_OUTPUT':
      return {
        ...state,
        outputStat: action.payload
      };
    default:
      return state;
  }
};

const reduxReducer = combineReducers({ db });

export let store = createStore(
  reduxReducer,
  initState,
  compose(
    applyMiddleware(ReduxThunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // devtool, Comment out when do production compiling
  )
);