'use strict';

import React from 'react';
import { connect } from 'react-redux';
import '../../css/style.css'

import '@babel/polyfill'; // For IE11, 'Promise'

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

  }

  render() {
    return <div>Hi</div>
  }
}