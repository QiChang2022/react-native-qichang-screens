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
import { UserDetailScreen } from 'react-native-qichang-screens';
import { setURL, HttpUtils } from 'react-native-qichang-api';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//import TextInput from './TextInput';

HttpUtils.setHeaders('getVersion()', 'getDeviceId()', 'getSystemVersion()');
//setURL('http://api-app.qichangv.com', 'http://api-search.qichangv.com');
setURL('http://app-api.bxmauto.com', 'http://search.bxmauto.com'); //测试

const App = () => {
  return (
    <SafeAreaProvider>
      {/* <SearchScreen searchKeywords="奥迪" /> */}
      <UserDetailScreen userId={85} />
    </SafeAreaProvider>
  );
};

export default App;
