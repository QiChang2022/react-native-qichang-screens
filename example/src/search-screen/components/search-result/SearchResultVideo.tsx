import React from 'react';
import { VideoType, VideoItem } from '../../../components';
import { ErrorComponent, useTheme } from '@damoness/react-native-qichang-kit';
import { Dimensions } from 'react-native';
import { PullDownRefreshAndPullUpLoadMoreListView } from '@damoness/react-native-refresh';

import { NewsAPI } from 'react-native-qichang-api';

import { Source_Cat } from '../../../types';

type Props = {
  keywords: string;
  onPressItem: (id: number) => void;
};

const { height } = Dimensions.get('window');

const SearchResultVideo: React.FC<Props> = ({ keywords, onPressItem }) => {
  const theme = useTheme().theme;
  return (
    <PullDownRefreshAndPullUpLoadMoreListView
      ListEmptyComponent={
        <ErrorComponent
          style={{ height: height * 0.78 }}
          onPress={() => {}}
          errorInfo={'当前页面暂无数据'}
        />
      }
      loadDataFunction={NewsAPI.Search.search}
      loadDataParams={[keywords, Source_Cat.video]}
      keyExtractor={(item, index) => item.id.toString() + index}
      renderItem={({ item }) => {
        const browse = (item.amount && item.amount.browse) || 0;
        const comment = (item.amount && item.amount.comment) || 0;

        return (
          <VideoItem
            theme={theme}
            isColumn={false}
            bottomLine={true}
            keywords={keywords}
            videoType={VideoType.Normal}
            data={{
              url: '',
              cover: item.cover,
              author: item.user ? item.user.name : '',
              title: item.title, //标题
              browse_amount: browse, //浏览数
              comment_amount: comment, //评论数
              duration: item.duration,
            }}
            onPress={() => {
              onPressItem(item.id);
            }}
          />
        );
      }}
    />
  );
};

export default SearchResultVideo;
