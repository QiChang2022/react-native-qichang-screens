import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackNavigator from './HomeStackNavigator';
import QichanghaoStackNavigator from './QichanghaoStackNavigator';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="搜索" component={HomeStackNavigator} />
      <Tab.Screen name="汽场号" component={QichanghaoStackNavigator} />
    </Tab.Navigator>
  );
}

export default MyTabs;
