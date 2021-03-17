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
import { SearchScreen } from './src';
import { setURL, HttpUtils } from 'react-native-qichang-api';
//import TextInput from './TextInput';

HttpUtils.setHeaders('getVersion()', 'getDeviceId()', 'getSystemVersion()');
//setURL('http://api-app.qichangv.com', 'http://api-search.qichangv.com');
setURL('http://app-api.bxmauto.com', 'http://search.bxmauto.com'); //测试

const App = () => {
  // const keywords = '1';
  // const data = '福布斯“2019年全球100位最具影响力女性';
  // const array = data.split(keywords);

  return <SearchScreen />;
};

export default App;
