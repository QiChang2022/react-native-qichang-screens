import React, { Component } from 'react';
import { View, TextInput as Input, StyleSheet } from 'react-native';
import { debounce } from 'lodash';

// function debounce(func: Function, wait: number) {
//   let timeout: any;
//   //console.log('timeout', timeout, arguments);
//   return function () {
//     let args = arguments;
//     if (timeout) clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func(...args);
//     }, wait);
//   };
// }

export default class TextInput extends Component {
  onChangeText = (text: String) => {
    console.log(text);
  };

  render() {
    return (
      <View style={styles.container}>
        <Input1
          placeholder="11"
          style={styles.input}
          onChangeText={debounce(this.onChangeText, 1200)}
        />
      </View>
    );
  }
}

function Input1(props: any) {
  console.log('Input1');
  return <Input {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    backgroundColor: 'red',
  },
});
