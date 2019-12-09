import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { isEmpty } from 'lodash';

import Soal2 from './src/screen/Soal2';

const API_GET_CONTACT = 'https://simple-contact-crud.herokuapp.com/contact';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    }
  }

  _getListContact = () => {
    fetch(API_GET_CONTACT)
    .then(response => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson.data,
      });
    })
    .catch(error => console.log(error));
  }

  componentDidMount() {
    this._getListContact();
  }

  render() {
    return(
      <View>
        <Soal2/>
      </View>
    )
  }
}

export default App;
