import { ErrorComponent } from '@damoness/react-native-qichang-kit';
import { PullDownRefreshAndPullUpLoadMoreListView } from '@damoness/react-native-refresh';
import React from 'react';
import { Dimensions } from 'react-native';
import { NewsAPI } from 'react-native-qichang-api';
import { Source_Cat } from '../../../types';
import UserItem from './UserItem';

type Props = {
  keywords: string;
  onPressItem: (id: number) => void;
};

const { height } = Dimensions.get('window');

export default function SearchResultUser(props: Props) {
  const { keywords, onPressItem } = props;

  return (
    <PullDownRefreshAndPullUpLoadMoreListView
      ListEmptyComponent={
        <ErrorComponent
          style={{ height: height * 0.78 }}
          onPress={() => {}}
          errorInfo={'当前页面暂无数据'}
        />
      }
      keyExtractor={(item, index) => item.id.toString() + index}
      loadDataFunction={NewsAPI.Search.search}
      loadDataParams={[keywords, Source_Cat.user]}
      renderItem={({ item }) => {
        return (
          <UserItem
            keywords={keywords}
            onPressItem={() => {
              onPressItem && onPressItem(item.id);
            }}
            data={{
              avatarUrl: item.face,
              name: item.name,
              summary: item.summary || '还没有签名',
            }}
          />
        );
      }}
    />
  );
}
