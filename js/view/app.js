'use strict';

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import '../../css/style.css'
import '@babel/polyfill'; // For IE11, 'Promise'
import {
  store,
  initMainList,
  addNewOne,
  deleteOne,
  updateOne,
  listDownload,
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
    const updateThis = e => {
      const oName = e[1];
      const oNumber = e[2];
      const index = e[0].toString();
      const nName = prompt('Enter new name', oName);
      const nNumber = prompt('Enter new number', oNumber);
      if (nName === null || nName === '' || nNumber === null || nName === ''){
        return alert('Name or number can not be empty, please try again.');
      }
      const { mainList } = this.props;
      let existName = false;
      let existNumber = false;
      mainList.map(ele => {
        if(ele[0].toString() !== index) {
          if (ele[1] === nName) {
            existName = true;
          }
          if (ele[2] === nNumber) {
            existNumber = true;
          }
        }
      });
      if(existName || existNumber) {
        return alert("New name or number is already exist, and it belonges to \
        others, please try again.");
      }
      store.dispatch(updateOne({
        'id':index,
        'name':nName,
        'number':nNumber
      }))
    };
    return <Fragment>{
      mainList.map(
        e =>
        <li key={e[0]}>
            <span onClick={() => updateThis(e)}>{e[1]} : {e[2]}</span>
            <button
              onClick={
                () => store.dispatch(deleteOne({ 'id': e[0].toString() }))
            }>X</button>
        </li>
      )
    }</Fragment>
  }

  addaNewContact() {
    const { mainList } = this.props;
    let unique=true;
    let name = prompt('Enter a new name');
    let number = prompt('Enter a new number');
    if (name === '' || name === null || number === '' ||number === '') {
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
      <li><button onClick={listDownload}>Download All</button></li>
      <li><button>Upload new phonebook</button></li>
    </ul>
  }
}