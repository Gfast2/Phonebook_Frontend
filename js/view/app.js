'use strict';

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import '../../css/style.css'
import '@babel/polyfill'; // For IE11, 'Promise'
import {
  store,
  initMainList
 } from '../logic/rStore';

@connect(store =>
  ({
    mainList: store.db.mainList,
  })
)
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // TODO: call a redux function that fetch the whole phonebook from backend
    store.dispatch(initMainList());
  }

  generateAvailableContacts() {
    const {mainList} = this.props;
    if(mainList.length === 1 && mainList[0][0] === '') {
      return null;
    }
    return <Fragment>
      {mainList.map(e => <li key={e[0]}>{e[1]} : {e[2]}</li>)}
    </Fragment>
  }

  render() {
    return <ul>
      {this.generateAvailableContacts()}
      <li><button>Add New One</button></li>
      <li><button>Download All</button></li>
      <li><button>Upload new phonebook</button></li>
    </ul>
  }
}