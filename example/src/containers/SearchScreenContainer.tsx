import React from 'react';
import {
  SearchScreen,
  SearchScreenItemType,
} from 'react-native-qichang-screens';

import { StackScreenProps } from '@react-navigation/stack';

import { HomeStackParamList } from '../navigation/HomeStackNavigator';

type Props = StackScreenProps<HomeStackParamList, 'Search'>;

const SearchScreenContainer: React.FC<Props> = ({ route, navigation }) => {
  const { searchKeywords } = route.params;
  return (
    <SearchScreen
      searchKeywords={searchKeywords}
      onPressItem={(type, id) => {
        if (type === SearchScreenItemType.User) {
          navigation.push('UserDetail', { userId: id });
        }
      }}
    />
  );
};

export default SearchScreenContainer;
