/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleSheet,
} from 'react-native';

type Props = {
  onChangeText: (text: string) => void;
  onSubmitEditing?: (text: string) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value: string;
  placeholder?: string;
};

type State = {
  text: string;
};
class SearchInput extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      text: props.value,
    };
  }

  textInput: TextInput | null = null;

  focus = () => {
    this.textInput && this.textInput.focus();
  };

  setText = (text: string) => {
    this.setState({ text });
  };

  clear = () => {
    this.changeTextHandler('');
  };

  changeTextHandler = (t: string) => {
    const { onChangeText } = this.props;
    this.setState({ text: t });
    onChangeText(t);
  };

  render() {
    const { onSubmitEditing, onFocus, placeholder } = this.props;

    const { text } = this.state;

    console.log('SearchInput', text);

    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/stock_search.png')}
          style={{ marginHorizontal: 10 }}
        />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={'#888888'}
          selectionColor={'#EE5B53'}
          style={styles.textInput}
          value={text}
          returnKeyType={'search'}
          onFocus={onFocus}
          onSubmitEditing={({ nativeEvent }) => {
            onSubmitEditing && onSubmitEditing(nativeEvent.text);
          }}
          onChangeText={this.changeTextHandler}
          ref={(ref) => (this.textInput = ref)}
        />
        {text.length > 0 && (
          <TouchableOpacity activeOpacity={0.8} onPress={this.clear}>
            <Image
              source={require('./assets/search_delete.png')}
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  textInput: {
    height: 32,
    flex: 1,
    marginLeft: 5,
    padding: 0,
    margin: 0,
    color: 'black',
  },
});

export default SearchInput;
