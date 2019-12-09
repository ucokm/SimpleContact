import React, { PureComponent } from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Alert,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
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
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  inputLabel: {
    paddingTop: 20,
    paddingLeft: 3,
    width: 260,
  }
});

export default class Soal2 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stringText: '',
      Vertex: 0,
      isVertexShown: false,
      Weights: [],
      isEdgeShown: false,
      isConnEdgeShown: false,
      isResultShown: false,
      e: 0,
      Edges: [],
      optimalPath: undefined,
    };
  }

  render() {
    return(
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Soal 2</Text>
        <Text>Input Jumlah Node/Vertex:</Text>
        <TextInput
          keyboardType={"numeric"}
          onChangeText={(value) => this.setState({ Vertex : this._stringToNumber(value) })}
          underlineColorAndroid={'#0000006b'}
        />
        <Button title={'Set [Vertex]'} onPress={this._initWeight}/>

        {
          this.state.isVertexShown ?
          <View>
            {
              this.state.Weights.map(( item, key ) =>
              (
                <View key={key} style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>
                    {
                      key == 0 ?
                      'Weight Node/Vertex Awal/Mulai/ke # 0' :
                      key == this.state.Weights.length-1 ?
                      `Weight Node/Vertex Akhir/Tujuan/ke # ${this.state.Weights.length-1}` :
                      `Weight Node/Vertex ke # ${key}`
                    }
                  </Text>
                  <Text style={{ alignSelf: 'center'}}>:</Text>
                  <TextInput
                    style={{ width: 80}}
                    keyboardType={"numeric"}
                    onChangeText={(value) => this._setWeight(key, value)}
                    underlineColorAndroid={'#0000006b'}
                  />
                </View>
              ))
            }
            <Button title={'Set [Weight of Vertex]'} onPress={() => this.setState({ isEdgeShown: true})}/>
          </View>
          :
          null
        }

        {
          this.state.isEdgeShown ?
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Input Edge:</Text>
              <Text style={{ alignSelf: 'center'}}>:</Text>
              <TextInput
                style={{ width: 80}}
                keyboardType={"numeric"}
                onChangeText={(value) => this.setState({ e:this._stringToNumber(value) })}
                underlineColorAndroid={'#0000006b'}
              />
            </View>
            <Button title={'Set [Edge]'} onPress={this._initEdge}/>
          </View> :
          null
        }

        {
          this.state.isConnEdgeShown ?
          <View style={{ marginBottom: 16}}>
          {
            this.state.Edges.map(( item, key ) =>
            (
              <View key={key} style={styles.inputContainer}>
                <Text style={{ paddingLeft: 8, paddingTop: 20, width: 200 }}>{`Index Node/Vertex yang terhubung:`}</Text>
                <TextInput
                  style={{ width: 80}}
                  keyboardType={"numeric"}
                  onChangeText={(value) => this._setEdgeConnected(key, 'src', value)}
                  underlineColorAndroid={'#0000006b'}
                />
                <Text style={{ alignSelf: 'center'}}>--></Text>
                <TextInput
                  style={{ width: 80}}
                  keyboardType={"numeric"}
                  onChangeText={(value) => this._setEdgeConnected(key, 'dst', value)}
                  underlineColorAndroid={'#0000006b'}
                />
              </View>
            ))
          }
          <Button title={'Calculate Optimal Path'} onPress={this._calculateOptimalPath}/>
          </View>
          :
          null
        }
      </ScrollView>
    )
  };

  _setWeight = (idx, val) => {
    var intVal = parseInt(val);
    var arr = [...this.state.Weights];
    arr[idx] = intVal;
    this.setState({ Weights: arr });
  }

  _stringToNumber = val => {
    return val && val.toString().replace(/\D/g, '');
  }

  _initWeight = () => {
    this.setState({ isVertexShown: true });
    var arr=[]
    for(i=0; i<this.state.Vertex; i++) {
      arr.push(0); // init value
    }
    this.setState({ Weights: arr });
  }

  _initEdge = () => {
    var arr=[]
    const dt = { src: 0, dst: 0};
    for(i=0; i<this.state.e; i++) {
      arr.push(dt);
    }
    this.setState({ Edges: arr, isConnEdgeShown: true });
  }

  _setEdgeConnected = (idx, type, val) => {
    var arr = [...this.state.Edges];
    const obj = arr[idx];
    const intVal = parseInt(val);
    var dt = {};
    if(type==='src') {
      dt = { src: intVal, dst: obj.dst};
    } else {
      dt = { src: obj.src, dst: intVal};
    }
    arr[idx] = dt;
    this.setState({ Edges: arr });
  }

  _getWeight = idx => {
    return this.state.Weights[idx];
  }

  _calculateOptimalPath = () => {
    var result = 99999999;
    const { Edges } = this.state;
    var Stack = [];

    // init the Stack (Edges with srch == 0)
    Edges.forEach((item, idx) => {
      if(item.src == 0) {
        var obj = {...item};
        obj.totWeight = this._getWeight(item.src) + this._getWeight(item.dst);
        Stack.push(obj);
      }
    });

    while (Stack.length > 0) {
      var pop = Stack.pop();
      if(pop.dst == this.state.Vertex - 1) { // last Vertex (destination path)
        result = pop.totWeight < result ? pop.totWeight : result;
      } else { // add alternatife path to Stack
        for(i=0; i<Edges.length; i++) {
          if(Edges[i].src == pop.dst) {
            var obj = {...Edges[i]};
            obj.totWeight = pop.totWeight + this._getWeight(obj.dst);
            Stack.push(obj);
          }
        }
      }
    }

    this.setState({ isResultShown: true, optimalPath: result });

    Alert.alert(
      null,
      `Optimal Path = ${result}`,
      [
        { text: 'OK' },
      ],
      { cancelable: false }
    )
  }
}