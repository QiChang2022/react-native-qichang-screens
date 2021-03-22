import React, { Component } from 'react';
import { View } from 'react-native';

import {
  LoadingComponent,
  ThemeContext,
} from '@damoness/react-native-qichang-kit';

import { UserHeaderComponent } from '../components';

import { NewsAPI } from 'react-native-qichang-api';

import UserContentList from './UserContentList';
import TabBarView from './TabBarView';

type Props = {
  userId: number;
  onPressItem?: (itemType: 'news' | 'video', id: number) => void;
};

class UserDetailScreen extends Component<Props> {
  static contextType = ThemeContext;
  context!: React.ContextType<typeof ThemeContext>;

  render() {
    const { userId, onPressItem } = this.props;

    return (
      <LoadingComponent
        fetchData={() => NewsAPI.getUserDetail(userId)}
        render={(data) => {
          return (
            <View style={{ flex: 1 }}>
              <UserHeaderComponent data={data} />

              <TabBarView
                renderScene={({ route: { key } }) => {
                  let type = key as 'news' | 'video' | 'all';
                  return (
                    <UserContentList
                      userId={userId}
                      type={type}
                      onPressItem={onPressItem}
                    />
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  }
}

export default UserDetailScreen;
