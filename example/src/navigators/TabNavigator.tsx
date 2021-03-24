import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QichanghaoRankingScreen } from 'react-native-qichang-screens';
import HomeStackNavigator from './HomeStackNavigator';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="搜索" component={HomeStackNavigator} />
      <Tab.Screen name="汽场号" component={QichanghaoRankingScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;
