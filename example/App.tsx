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
import {NavigationBar} from '@damoness/react-native-qichang-kit';
import {SafeAreaProvider} from 'react-native-safe-area-context';
declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationBar />
      <QichanghaoRankingScreen />
    </SafeAreaProvider>
  );
};

export default App;
