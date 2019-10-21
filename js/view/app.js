'use strict';

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import '../../css/style.css'
import '@babel/polyfill'; // For IE11, 'Promise'
import {
  store,
  initMainList,
  addNewOne,
 } from '../logic/rStore';

@connect(store =>
  ({
    mainList: store.db.mainList,
  })
)
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addaNewContact = this.addaNewContact.bind(this);
  }

  componentDidMount() {
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

  addaNewContact() {
    const { mainList } = this.props;
    let unique=true;
    let name = prompt("Enter a new name");
    let number = prompt("Enter a new number");
    if (name === '' || number === '') {
      return alert(`Name or number can't empty, please try again.`);
    }
    if (mainList.length === 1 && mainList[0][0] === '') {
      store.dispatch(addNewOne({ name, number }));
      return;
    }
    mainList.map(e => {
      if(e[1] === name || e[2] === number) {
        unique = false;
      }
    });
    if(unique) {
      store.dispatch(addNewOne({ name,number }));
      return;
    }
    alert(`Name ${name} and number ${number} are not unique, please try again.`);
  }

  render() {
    return <ul>
      {this.generateAvailableContacts()}
      <li><button onClick={this.addaNewContact}>Add New One</button></li>
      <li><button>Download All</button></li>
      <li><button>Upload new phonebook</button></li>
    </ul>
  }
}