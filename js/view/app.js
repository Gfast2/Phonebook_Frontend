'use strict';

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import '../../css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhoneAlt, faArrowCircleDown, faPlusCircle, faArrowCircleUp,faHatWizard } from '@fortawesome/free-solid-svg-icons'
library.add(faPhoneAlt, faArrowCircleDown, faPlusCircle, faArrowCircleUp,faHatWizard);
import '@babel/polyfill'; // For IE11, 'Promise'
import {
  store,
  initMainList,
  addNewOne,
  deleteOne,
  updateOne,
  listDownload,
  listUpload,
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
          <li key={e[0]} className='list-group-item'>
            <h2>{e[1]}</h2>
            <div className='text-muted'><FontAwesomeIcon icon={faPhoneAlt}/> {e[2]}</div>
            <br></br>
            <button className='btn btn-sm btn-outline-danger'
              onClick={
                () => store.dispatch(deleteOne({ 'id': e[0].toString() }))
            }>Delete</button>{' '}
            <button className='btn btn-sm btn-outline-primary'
              onClick={ () => updateThis(e) }>Edit</button>
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

  uploadForm(){
    return <form
      action='onenewlist'
      method='POST'
      encType='multipart/form-data'
      id='fileuploadform'
      className='invisible'
      >
      <input type='file' name='filetoupload' id='fs_bro'
      onChange={() => store.dispatch(listUpload())} /><br />
    </form>;
  }

  render() {
    return <div className='container'>
      <div className='panel-collapse collapse show'>
        <ul className='list-group shadow bg-white rounded'>
          <li className='list-group-item text-center bg-secondary text-light font-italic'>
            <h3>
              <FontAwesomeIcon icon={faHatWizard} /> Su's Phonebook Demo
            </h3>
          </li>
          {this.generateAvailableContacts()}
          <li className='list-group-item'>
            <button onClick={this.addaNewContact} className='btn btn-success'>
              <FontAwesomeIcon icon={faPlusCircle} /> Add a new Contact
            </button>
          </li>
          <li className='list-group-item'>
            <button onClick={listDownload} className='btn btn-primary'>
              <FontAwesomeIcon icon={faArrowCircleDown} /> Download the whole Phonebook
            </button>
          </li>
          <li className='list-group-item'>
            <button onClick={
              () => document.getElementById("fs_bro").click()
            } className='btn btn-warning'>
              <FontAwesomeIcon icon={faArrowCircleUp} /> Upload a new Phonebook
            </button>
          </li>
        </ul>
      </div>
      <div className='divst-group-item'>{this.uploadForm()}</div>
    </div>
  }
}