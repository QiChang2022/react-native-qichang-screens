import React from 'react';

import { UserDetailScreen } from 'react-native-qichang-screens';

import { StackScreenProps } from '@react-navigation/stack';

import { HomeStackParamList } from '../navigation/HomeStackNavigator';

type Props = StackScreenProps<HomeStackParamList, 'UserDetail'>;

const UserDetailScreenContainer: React.FC<Props> = ({ route }) => {
  return (
    <UserDetailScreen
      userId={route.params.userId}
      //onPressItem={(itemType, id) => {}}
    />
  );
};

export default UserDetailScreenContainer;
