import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import { toUpper } from 'lodash';

import CellContact from '../component/CellContact';

export default class Dashboard extends Component {

  _onPress = (contact) => {
    Alert.alert(
      'Detail Contact',
      `Contact ID: ${contact.id}`,
      [
        { text: toUpper('ok'), },
      ],
      { cancelable: false }
    )
  }

  _renderItem = ({ item }) => {
    return(
      <CellContact contact={item} onPress={this._onPress}/>
    )
  }

  render() {
    const { dataSource } = this.props;
    return(
      <View>
        <FlatList
          data={dataSource}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}