import React from 'react';
import { ArticleType, ArticleItem } from '../../../components';

import { Dimensions } from 'react-native';
import { PullDownRefreshAndPullUpLoadMoreListView } from '@damoness/react-native-refresh';
import { ErrorComponent, useTheme } from '@damoness/react-native-qichang-kit';

import { NewsAPI } from 'react-native-qichang-api';

import { Source_Cat } from '../../../types';

type Props = {
  keywords: string;
  onPressItem: (id: number) => void;
};

const { height } = Dimensions.get('window');

const SearchResultNews: React.FC<Props> = ({ keywords, onPressItem }) => {
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
      loadDataParams={[keywords, Source_Cat.news]}
      keyExtractor={(item, index) => item.id.toString() + index}
      renderItem={({ item }) => {
        const browse = (item.amount && item.amount.browse) || 0;
        const comment = (item.amount && item.amount.comment) || 0;

        return (
          <ArticleItem
            theme={theme}
            bottomLine={true}
            isColumn={false}
            keywords={keywords}
            articleType={ArticleType.Normal}
            data={{
              author: item.user ? item.user.name : '',
              cover: item.cover, //图片
              title: item.title, //文章标题
              browse_amount: browse, //浏览数
              comment_amount: comment, //评论数
            }}
            onPress={() => onPressItem(item.id)}
          />
        );
      }}
    />
  );
};

export default SearchResultNews;
