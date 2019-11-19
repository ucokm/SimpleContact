import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';

import { styles } from './CellContact.style';

export default class CellContact extends Component {

  render() {
    const { contact, onPress } = this.props;
    return(
      // <View style={styles.container}>
        <TouchableOpacity
          onPress={() => onPress(contact)}
          style={styles.container}
        >
          {
            contact.photo === 'N/A' ?
            <Image style={styles.img} source={ require('../asset/image_not_available.png')} resizeMode='contain'/> :
            <Image style={styles.img} source={{ uri: contact.photo }} resizeMode='contain'/>
          }
          
          <Text style={styles.txt}>{`${contact.firstName} ${contact.lastName}`}</Text>
        </TouchableOpacity>
      // </View>
    )
  }
}