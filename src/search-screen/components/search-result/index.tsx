/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import {
  LoadingComponent,
  ThemeContext,
} from '@damoness/react-native-qichang-kit';
import { ItemType } from '../../types';
import SearchResultAll from './SearchResultAll';
import SearchResultCarSeries from './SearchResultCarSeries';
import SearchResultNews from './SearchResultNews';
import SearchResultVideo from './SearchResultVideo';

import { NewsAPI } from 'react-native-qichang-api';
import SearchResultUser from './SearchResultUser';

const tabWidth = 56;
const indicatorWidth = 16;

const { width } = Dimensions.get('window');

type Props = {
  keywords: string;
  onPressItem?: (type: ItemType, id: number) => void;
};

export default class SearchResult extends Component<Props> {
  static contextType = ThemeContext;
  context!: React.ContextType<typeof ThemeContext>;

  state = {
    index: 0,
    routes: [
      { key: 'all', title: '全部' },
      //{ key: 'article', title: '文章' },
      //{ key: 'video', title: '视频' },
      //{ key: 'carSeries',title:'车系'},
      //{ key: 'user',title:'用户'},
    ],
    hasLoadedRoutes: true,
  };

  fetchData = async () => {
    const { keywords } = this.props;
    //console.log(keywords)
    let data = await NewsAPI.Search.searchAll(keywords);

    const { news_list, video_list, series_list, user_list } = data;

    let routes = this.state.routes;

    series_list.length > 0 && routes.push({ key: 'carSeries', title: '车系' });
    news_list.length > 0 && routes.push({ key: 'article', title: '文章' });
    video_list.length > 0 && routes.push({ key: 'video', title: '视频' });
    user_list.length > 0 && routes.push({ key: 'user', title: '用户' });

    this.setState({
      routes,
      hasLoadedRoutes: true,
    });

    return data;
  };

  render() {
    const { keywords, onPressItem } = this.props;

    const { hasLoadedRoutes, routes } = this.state;

    const {
      backgroundColorC20,
      headerBackgroundColorC8,
      masterColorC13,
      fontColorC4,
    } = this.context.colors;

    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: backgroundColorC20 },
        ]}
      >
        <LoadingComponent
          fetchData={this.fetchData}
          render={(data) => {
            return hasLoadedRoutes ? (
              <TabView
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: backgroundColorC20 },
                ]}
                navigationState={this.state}
                onIndexChange={(index) => this.setState({ index })}
                renderScene={({ route }) => {
                  console.log('keywords' + keywords, routes);

                  if (route.key === 'all') {
                    return (
                      <SearchResultAll
                        data={data}
                        keywords={keywords}
                        onPressMore={(type) => {
                          let index = this.state.routes.findIndex(
                            (value) =>
                              value.key.toLocaleLowerCase() ===
                              type.toLocaleLowerCase()
                          );
                          if (index !== -1) {
                            this.setState({ index: index });
                          }
                        }}
                        onPressItem={(type, id) => {
                          onPressItem && onPressItem(type, id);
                        }}
                      />
                    );
                  } else if (route.key === 'article') {
                    return (
                      <SearchResultNews
                        keywords={keywords}
                        onPressItem={(id) => {
                          onPressItem && onPressItem(ItemType.Article, id);
                        }}
                      />
                    );
                  } else if (route.key === 'video') {
                    return (
                      <SearchResultVideo
                        keywords={keywords}
                        onPressItem={(id) => {
                          onPressItem && onPressItem(ItemType.Video, id);
                        }}
                      />
                    );
                  } else if (route.key === 'carSeries') {
                    return (
                      <SearchResultCarSeries
                        keywords={keywords}
                        onPressItem={(id) => {
                          onPressItem && onPressItem(ItemType.CarSeries, id);
                        }}
                        onPressConsult={(id) => {
                          onPressItem && onPressItem(ItemType.ConsultPrice, id);
                        }}
                      />
                    );
                  } else if (route.key === 'user') {
                    return (
                      <SearchResultUser
                        keywords={keywords}
                        onPressItem={(id) => {
                          onPressItem && onPressItem(ItemType.User, id);
                        }}
                      />
                    );
                  } else {
                    return null;
                  }
                }}
                lazy
                renderTabBar={(props) => (
                  <TabBar
                    {...props}
                    scrollEnabled
                    activeColor={masterColorC13}
                    inactiveColor={fontColorC4}
                    labelStyle={{ fontSize: 14, fontWeight: 'bold' }}
                    indicatorStyle={{
                      backgroundColor: masterColorC13,
                      height: 2,
                      marginLeft: (tabWidth - indicatorWidth) / 2,
                      width: indicatorWidth,
                    }}
                    indicatorContainerStyle={{ marginBottom: 2 }}
                    contentContainerStyle={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    tabStyle={{ width: tabWidth, paddingHorizontal: 0 }}
                    style={{
                      backgroundColor: headerBackgroundColorC8,
                      borderBottomWidth: 0,
                      elevation: 0,
                      width: width,
                      height: 36,
                    }}
                  />
                )}
              />
            ) : null;
          }}
        />
      </View>
    );
  }
}
