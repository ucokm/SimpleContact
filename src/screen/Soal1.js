import React, { PureComponent } from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Alert,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import { forEach } from 'lodash';

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    paddingRight: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default class Soal1 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stringText: '',
      a: [],
    };
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Soal 1</Text>
        <Text>Input string text:</Text>
        <TextInput
          autoCorrect={false}
          onChangeText={(stringText) => this.setState({ stringText })}
          underlineColorAndroid={'#0000006b'}
        />
        <Button title={'Load'} onPress={this.loadTextToArray}/>
      </View>
    )
  };

  loadTextToArray = () => {
    const lines = this.state.stringText.split('/n');
    lines.forEach((itemI, i) => {
      var pairs = itemI.split(';');
      pairs.forEach((itemJ, j) => {
        var data = itemJ.split('=');
        var tmp = this.state.a;
        tmp = tmp.push({ idx:i, key:data[0], value:data[1] });
        this.setState({ a:tmp });
      });
    });
    console.log('array', this.state.a);
    ToastAndroid.showWithGravity(
      `Array a : ${JSON.stringify(this.state.a)}`,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
    this.setState({ a:[] })
  }
}