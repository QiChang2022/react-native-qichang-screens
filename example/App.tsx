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
import {QichanghaoRankingScreen} from 'react-native-qichang-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {setURL, HttpUtils} from 'react-native-qichang-api';
import {StatusBar} from 'react-native';

HttpUtils.setHeaders('getVersion()', 'getDeviceId()', 'getSystemVersion()');
setURL('http://api-app.qichangv.com', 'http://api-search.qichangv.com');

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        //hidden={true}
        //animated={true}
        backgroundColor="red"
        translucent={true}
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <QichanghaoRankingScreen />
    </SafeAreaProvider>
  );
};

export default App;
