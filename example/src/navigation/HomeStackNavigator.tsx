import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import SearchScreenContainer from '../containers/SearchScreenContainer';
import UserDetailScreenContainer from '../containers/UserDetailScreenContainer';

export type HomeStackParamList = {
  Search: { searchKeywords?: string };
  UserDetail: { userId: number };
};

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreenContainer}
        options={{ headerShown: false }}
        initialParams={{ searchKeywords: '刘' }}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreenContainer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
