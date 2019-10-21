'use strict';

import bnXhr from './xhr'; // backend access

import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

// Function that query the whole phonebook from backend
export const initMainList = () => dispatch => {
  const cb = (err, res) => {
    if(err) {
      return alert("Initialization failed!");
    }
    dispatch({
      type: 'UPDATE_MAINLIST',
      payload: res['list']
    });
  };
  bnXhr({
    cb,
    req:'init'
  });
};

// Add a new contact into phonebook
export const addNewOne = payload => dispatch => {
  const cb = (err, res) => {
    if(err) {
      return alert("Add new contact to list failed!");
    }
    const oldList = store.getState().db.mainList;
    dispatch({
      type: 'UPDATE_MAINLIST',
      payload: [
        ...oldList,
        [
          res['index'],
          payload['name'],
          payload['number']
        ]
      ]
    })
  };
  bnXhr({
    cb,
    req:'addone',
    payload
  })
};

const initState = {
  db: {
    mainList:[], // The phonebook list stored (cached) in frontend
  }
};

const db = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_MAINLIST':
      return {
        ...state,
        mainList: action.payload
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
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // devtool, Comment out when do production compiling
  )
);