/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {setURL, HttpUtils} from 'react-native-qichang-api';
import {StatusBar} from 'react-native';
import TextInput from './TextInput';

HttpUtils.setHeaders('getVersion()', 'getDeviceId()', 'getSystemVersion()');
setURL('http://api-app.qichangv.com', 'http://api-search.qichangv.com');

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar translucent={true} />
      {/* <SearchScreen /> */}
      <TextInput />
    </SafeAreaProvider>
  );
};

export default App;
