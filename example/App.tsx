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
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {SearchScreen} from 'react-native-qichang-screens';
import {setURL, HttpUtils} from 'react-native-qichang-api';
import {StatusBar} from 'react-native';
//import TextInput from './TextInput';

HttpUtils.setHeaders('getVersion()', 'getDeviceId()', 'getSystemVersion()');
setURL('http://api-app.qichangv.com', 'http://api-search.qichangv.com');

const App = () => {
  // const keywords = '1';
  // const data = '福布斯“2019年全球100位最具影响力女性';
  // const array = data.split(keywords);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar translucent={true} />
        <SearchScreen />
        {/* <Text>{data}</Text>
        <Text style={{color: 'blue'}}>
          {array.map((x, i) => {
            if (i > 0) {
              return (
                <Text key={i}>
                  <Text style={{color: 'red'}}>{keywords}</Text>
                  {x}
                </Text>
              );
            } else {
              return <Text key={i}>{x}</Text>;
            }
          })}
        </Text> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
