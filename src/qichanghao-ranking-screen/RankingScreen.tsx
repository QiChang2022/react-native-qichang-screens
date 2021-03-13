/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';

import { Image, ThemeContext } from '@damoness/react-native-qichang-kit';

import { RecordType, RankingType } from './types';

import { RankingRowItem, Tab, TopThree } from './components';

import { DiscoveryAPI } from 'react-native-qichang-api';

import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

const { width: ScreenWidth } = Dimensions.get('window');

type Props = {
  index: number; //0,1,2 目前只有3个值
  recordType: RecordType;
  rankingType: RankingType;

  rankingId?: number; //排行榜ID,
  time?: string; //选择的时间, 与上面的是一对

  onTabChanged: (index: number) => void;

  navigation?: any;
};

const backgroundImages = [
  require('./assets/red.png'), //综合影响力
  require('./assets/blue.png'), //行业影响力
  require('./assets/cyan.png'), //用车影响力
];

const navigationBgs = [
  require('./assets/red_navigation.png'),
  require('./assets/blue_navigation.png'),
  require('./assets/cyan_navigation.png'),
];

const selectedTabColors = ['#EE5B53', '#458CF5', '#008CCF'];

type State = {
  data: any[];
  loading: boolean;
  error: boolean;
};
class RankingScreen extends PureComponent<Props, State> {
  static contextType = ThemeContext;
  context!: React.ContextType<typeof ThemeContext>;

  constructor(props: Props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      error: false,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData() {
    let { recordType, rankingType, rankingId } = this.props;
    //console.log('fetchData')
    this.setState({
      loading: true,
      error: false,
    });

    try {
      let data = await DiscoveryAPI.getQichanghaoRankingData(
        recordType,
        rankingType,
        rankingId
      );
      this.setState({
        data,
        loading: false,
        error: false,
      });
    } catch (error) {
      setTimeout(() => {
        this.setState({
          loading: false,
          error: true,
        });
        this.showAlert();
      }, 500);
    }
  }

  showAlert = () => {
    Alert.alert('异常提示', '您的网络状态异常，请重新加载', [
      {
        text: '重新加载',
        onPress: () => {
          this.fetchData();
        },
        style: 'default',
      },
      {
        text: '取消',
        style: 'cancel',
        onPress: () => {
          this.props.navigation?.pop();
        },
      },
    ]);
  };

  componentDidMount() {
    this.fetchData();
  }

  getSnapshotBeforeUpdate(preProps: Props) {
    console.log('getSnapshotBeforeUpdate-preProps1', preProps, this.props);

    const { recordType, rankingId } = this.props;

    const { recordType: preRecordType, rankingId: preRankingId } = preProps;

    if (
      recordType !== preRecordType ||
      (preRankingId !== undefined && rankingId !== preRankingId)
    ) {
      this.fetchData();
    }

    return null;
  }

  componentDidUpdate(preProps: Props) {
    console.log('preProps', preProps, this.props);
  }

  goToColumnDetail = (id: number) => {
    this.props.navigation?.push('ArticleColumnScreen', { articleColumnId: id });
  };

  render() {
    const { index, onTabChanged, recordType, time } = this.props;

    const { data, loading, error } = this.state;

    const { backgroundColorC20 } = this.context.colors;

    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => {
          const TOP = insets!.top + 44 + 38; // 缺口 + 导航栏 + TabBar高度

          return (
            <View style={{ flex: 1, backgroundColor: backgroundColorC20 }}>
              <Image
                style={StyleSheet.flatten([styles.topImage, { height: TOP }])}
                source={navigationBgs[index]}
              />

              <ScrollView
                scrollIndicatorInsets={{ right: 1 }}
                style={{ marginTop: TOP }}
                alwaysBounceVertical={true}
                bounces={false}
              >
                <ImageBackground
                  source={backgroundImages[index]}
                  style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 375 / 282,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Tab
                    selectedColor={selectedTabColors[index]}
                    currentIndex={recordType === RecordType.week ? 0 : 1}
                    data={
                      [
                        // {
                        //     value: 1,
                        //     label: '周榜',
                        // },
                        // {
                        //     value: 2,
                        //     label: '月榜',
                        // },
                      ]
                    }
                    onClick={(i) => {
                      console.log('TabOnClick', i);
                      onTabChanged(i);
                    }}
                  />

                  {error ? null : loading ? (
                    <Image
                      source={require('./assets/榜单头像加载.gif')}
                      style={{
                        width: ScreenWidth,
                        height: (252 / 750) * ScreenWidth,
                        marginBottom: 100,
                      }}
                    />
                  ) : (
                    //排名 2 , 1 , 3
                    <View style={{ flexDirection: 'row' }}>
                      {[1, 0, 2].map((ranking, i) => {
                        const {
                          user_name,
                          record_value,
                          user_cover,
                          user_id,
                        } = data[ranking];
                        return (
                          <TopThree
                            key={i}
                            ranking={ranking}
                            name={user_name}
                            hot={record_value}
                            cover={user_cover}
                            onPress={() => {
                              this.goToColumnDetail(user_id);
                            }}
                          />
                        );
                      })}
                    </View>
                  )}

                  <ImageBackground
                    source={require('./assets/black.png')}
                    style={{
                      width: '100%',
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      bottom: 0,
                    }}
                  >
                    {time && (
                      <Text style={{ color: 'white', fontSize: 10 }}>
                        榜单时间范围 {time}
                      </Text>
                    )}
                  </ImageBackground>
                </ImageBackground>

                {error ? null : loading ? (
                  <Image
                    source={require('./assets/榜单内容加载.gif')}
                    style={{
                      width: ScreenWidth,
                      height: (991 / 750) * ScreenWidth,
                      marginTop: 20,
                    }}
                  />
                ) : (
                  //列表
                  data.slice(3).map((item: any, i: number) => {
                    const { user_id } = item;
                    return (
                      <RankingRowItem
                        item={item}
                        onPress={() => {
                          this.goToColumnDetail(user_id);
                        }}
                        index={i}
                        key={i}
                      />
                    );
                  })
                )}
              </ScrollView>
            </View>
          );
        }}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  topImage: {
    width: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
});

export default RankingScreen;
