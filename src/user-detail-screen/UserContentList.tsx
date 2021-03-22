/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { ArticleType, ArticleItem, VideoItem, VideoType } from '../components';
import { PullDownRefreshAndPullUpLoadMoreListView } from '@damoness/react-native-refresh';
import { ErrorComponent, useTheme } from '@damoness/react-native-qichang-kit';
import { NewsAPI } from 'react-native-qichang-api';
import { Source_Cat } from '../types';

const { height } = Dimensions.get('window');

type Props = {
  userId: number;
  type: 'all' | 'news' | 'video';
  onPressItem?: (itemType: 'news' | 'video', id: number) => void;
};

function UserContentList({ userId, type, onPressItem }: Props) {
  const {
    colors: { backgroundColorC20, lineColorC5 },
    theme,
  } = useTheme();
  return (
    <PullDownRefreshAndPullUpLoadMoreListView
      style={{ flex: 1, backgroundColor: backgroundColorC20 }}
      ListEmptyComponent={
        <ErrorComponent
          style={{ height: height * 0.65 }}
          onPress={() => {}}
          errorInfo={'当前页面暂无数据'}
        />
      }
      loadDataFunction={NewsAPI.getUserDetailListData}
      enableRefreshing={false}
      loadDataParams={[userId, type]}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            marginHorizontal: 15,
            backgroundColor: lineColorC5,
          }}
        />
      )}
      renderItem={({ item }) => {
        const browse_amount = (item.amount && item.amount.browse) || 0; //浏览数
        const comment_amount = (item.amount && item.amount.comment) || 0; //评论数
        const author = (item.user && item.user.name) || ''; //作者

        if (item.record_type === Source_Cat.news) {
          return (
            <ArticleItem
              theme={theme}
              bottomLine={true}
              isColumn={false}
              articleType={ArticleType.Normal}
              data={{
                author,
                cover: item.cover, //图片
                title: item.title, //文章标题
                browse_amount, //浏览数
                comment_amount, //评论数
              }}
              onPress={() => onPressItem && onPressItem('news', item.id)}
            />
          );
        } else if (item.record_type === Source_Cat.video) {
          return (
            <VideoItem
              theme={theme}
              isColumn={false}
              canPlay={false}
              videoType={VideoType.Normal}
              data={{
                url: '',
                cover: item.cover,
                author, //作者
                title: item.title, //标题
                browse_amount, //浏览数
                comment_amount, //评论数
                duration: item.duration,
              }}
              onPressPlay={() => {}}
              onPress={() => onPressItem && onPressItem('video', item.id)}
            />
          );
        } else {
          return null;
        }
      }}
    />
  );
}

export default React.memo(UserContentList);
