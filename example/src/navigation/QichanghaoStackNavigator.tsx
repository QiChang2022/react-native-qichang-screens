import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserDetailScreenContainer from '../containers/UserDetailScreenContainer';
import QichanghaoRankingScreenContainer from '../containers/QichanghaoRankingScreenContainer';

export type QichanghaoStackParamList = {
  QichanghaoRanking: undefined;
  UserDetail: {
    userId: number;
  };
};

const Stack = createStackNavigator();

const QichanghaoStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="QichanghaoRanking"
        component={QichanghaoRankingScreenContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreenContainer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default QichanghaoStackNavigator;
