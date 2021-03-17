/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  UIManager,
  Dimensions,
} from 'react-native';

import {
  ArticleType,
  ArticleItem,
  VideoItem,
  VideoType,
} from '../../../components';

import HotCarModal from '../HotCarModal';
import CarSeriesItem from './CarSeriesItem';

import {
  LoadingComponent,
  ThemedLineView,
  ThemedText,
  ThemedTextType,
  ThemeConstants,
  ThemeContext,
} from '@damoness/react-native-qichang-kit';

import { NewsAPI } from 'react-native-qichang-api';

import { ItemType } from '../../types';
import UserItem from './UserItem';

const { width } = Dimensions.get('window');

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ResultType = 'Article' | 'Video' | 'CarSeries' | 'User';

type Props = {
  keywords: string;
  data: {
    news_list: Array<any>; //新闻
    video_list: Array<any>; //视频
    live_list: Array<any>; //直播
    user_list: Array<any>; //用户
    series_list: Array<any>; //车系
  };
  onPressMore: (type: ResultType) => void;
  onPressItem: (type: ItemType, id: number) => void;
};

const Header = ({
  title,
  onPressMore,
}: {
  title: string;
  onPressMore: () => void;
}) => (
  <View
    style={{
      height: 55,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
    }}
  >
    <ThemedText
      style={{ fontSize: 16, fontWeight: 'bold' }}
      type={ThemedTextType.big}
    >
      {title}
    </ThemedText>

    <TouchableOpacity activeOpacity={0.8} onPress={onPressMore}>
      <Text
        style={{ fontSize: 14, color: ThemeConstants.light.masterColorC13 }}
      >
        更多
      </Text>
    </TouchableOpacity>

    <ThemedLineView
      style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}
    />
  </View>
);

const NoSearchResultView: React.FC<{
  onPressItem: (id: number) => void;
}> = ({ onPressItem }) => (
  <View style={{ flex: 1 }}>
    <Image
      style={{
        marginTop: 50,
        width: width,
        marginBottom: 35,
      }}
      source={require('./assets/Thecontentyousearchedforwasnotfound.png')}
      resizeMode="contain"
    />
    <LoadingComponent
      showLoading={false}
      fetchData={async () => {
        let carModals = await NewsAPI.Search.getHotCarModals();
        return carModals;
      }}
      render={(data) => {
        return (
          <HotCarModal
            data={data}
            onPressItem={(index) => {
              const id = data[index].id;
              onPressItem(id);
            }}
          />
        );
      }}
    />
  </View>
);

class SearchResultAll extends Component<Props> {
  // shouldComponentUpdate(){
  //   return false;
  // }

  static contextType = ThemeContext;
  context!: React.ContextType<typeof ThemeContext>;

  state = {
    showCarSeriesAll: false,
  };

  render() {
    console.log('SearchResultAll');

    const { keywords, onPressMore, data, onPressItem } = this.props;

    const { showCarSeriesAll } = this.state;

    const { news_list, video_list, series_list, user_list } = data;
    const {
      theme,
      colors: { fontColorC4, backgroundColorC7 },
    } = this.context;

    const sections: Array<{
      title: string;
      key: ResultType;
      data: Array<any>;
    }> = [
      { title: '车系', key: 'CarSeries', data: series_list },
      { title: '文章', key: 'Article', data: news_list },
      { title: '视频', key: 'Video', data: video_list },
      { title: '用户', key: 'User', data: user_list },
    ];

    if (Object.entries(data).every((value) => value[1].length === 0)) {
      return (
        <NoSearchResultView
          onPressItem={(id) => {
            onPressItem(ItemType.CarSeries, id);
          }}
        />
      );
    }

    return (
      <FlatList
        data={sections}
        ItemSeparatorComponent={() => (
          <View style={{ height: 6, backgroundColor: backgroundColorC7 }} />
        )}
        renderItem={({ item }) => {
          const { title, key, data } = item;

          let renderData;

          if (key === 'CarSeries' && showCarSeriesAll) {
            renderData = data;
          } else {
            renderData = data.slice(0, 3);
          }

          return data.length > 0 ? (
            <View>
              {key !== 'CarSeries' && (
                <Header title={title} onPressMore={() => onPressMore(key)} />
              )}
              {renderData.map((item: any, index: number) => {
                const browse_amount = (item.amount && item.amount.browse) || 0; //浏览数
                const comment_amount =
                  (item.amount && item.amount.comment) || 0; //评论数
                const author = (item.user && item.user.name) || ''; //作者
                const {
                  cover,
                  title,
                  duration,
                  id,
                  name,
                  face,
                  summary,
                } = item;

                switch (key) {
                  case 'Article': {
                    return (
                      <ArticleItem
                        theme={theme}
                        key={index}
                        bottomLine={true}
                        isColumn={false}
                        articleType={ArticleType.Normal}
                        keywords={keywords}
                        data={{
                          author, //作者
                          cover, //图片
                          title, //文章标题
                          browse_amount, //浏览数
                          comment_amount, //评论数
                        }}
                        onPress={() => {
                          onPressItem(ItemType.Article, id);
                        }}
                      />
                    );
                  }
                  case 'Video': {
                    return (
                      <VideoItem
                        theme={theme}
                        key={index}
                        bottomLine={true}
                        isColumn={false}
                        keywords={keywords}
                        videoType={VideoType.Normal}
                        data={{
                          url: '',
                          author, //作者
                          cover, //图片
                          title, //文章标题
                          browse_amount, //浏览数
                          comment_amount, //评论数
                          duration, //视频时长
                        }}
                        onPress={() => {
                          onPressItem(ItemType.Video, id);
                        }}
                      />
                    );
                  }
                  case 'CarSeries': {
                    const { price_min, price_max, id } = item;

                    const priceRange =
                      price_min === 0 && price_max === 0
                        ? '暂无报价'
                        : `${price_min}-${price_max}万`;

                    return (
                      <CarSeriesItem
                        theme={theme}
                        key={index}
                        data={{
                          imageUrl: cover,
                          brandName: name,
                          priceRange: priceRange,
                        }}
                        onPressItem={() => {
                          onPressItem(ItemType.CarSeries, id);
                        }}
                        onPressConsult={() => {
                          onPressItem(ItemType.ConsultPrice, id);
                        }}
                      />
                    );
                  }
                  case 'User': {
                    return (
                      <UserItem
                        onPressItem={() => {
                          onPressItem(ItemType.User, id);
                        }}
                        key={index}
                        data={{
                          avatarUrl: face,
                          name: name,
                          summary: summary || '这小子还没有任何签名',
                        }}
                      />
                    );
                  }
                  default: {
                    return null;
                  }
                }
              })}
              {key === 'CarSeries' && data.length > 3 && (
                <TouchableOpacity
                  style={{
                    height: 44,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}
                  onPress={() => {
                    onPressMore(key);
                    // console.log('showCarSeriesAll '+showCarSeriesAll)
                    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    // this.setState({
                    //   showCarSeriesAll:!showCarSeriesAll
                    // })
                  }}
                >
                  <Text style={{ fontSize: 14, color: fontColorC4 }}>
                    {showCarSeriesAll ? '收起列表' : '查看全部'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : null;
        }}
      />
    );
  }
}

export default SearchResultAll;
