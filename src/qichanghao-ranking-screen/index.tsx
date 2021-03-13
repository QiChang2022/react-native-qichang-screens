/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Dimensions,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { RecordType, RankingType } from './types';

import { TabView, TabBar } from 'react-native-tab-view';

import RankingScreen from './RankingScreen';

import { TimeRangeView, HeaderRight } from './components';

import { ShareUtil, Platform } from '@damoness/react-native-umeng';

import { NavigationBar, BottomModal } from '@damoness/react-native-qichang-kit';

import { Toast } from '@ant-design/react-native';

import { DiscoveryAPI } from 'react-native-qichang-api';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const initialLayout = { width: Dimensions.get('window').width };

type Props = {
  navigation?: any;
};

//汽场号榜单
export default function QichanghaoRankingScreen({ navigation }: Props) {
  const [index, setIndex] = React.useState(0);
  const [recordType, setRecordType] = React.useState(RecordType.month);

  const [timeIndex, setTimeIndex] = React.useState(-1); //周榜时间索引
  const [monthTimeIndex, setMonthTimeIndex] = React.useState(-1); //月榜时间索引

  const [routes] = React.useState<
    Array<{ key: string; title: string; data: any[]; rankingType: RankingType }>
  >([
    {
      key: 'first',
      title: '综合影响力',
      data: [],
      rankingType: RankingType.all,
    },
    {
      key: 'second',
      title: '行业影响力',
      data: [],
      rankingType: RankingType.industry,
    },
    {
      key: 'third',
      title: '用车影响力',
      data: [],
      rankingType: RankingType.car,
    },
  ]);

  const [data, setData] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    Promise.all([
      DiscoveryAPI.getQichanghaoRankingList(RecordType.week, RankingType.all),
      DiscoveryAPI.getQichanghaoRankingList(RecordType.month, RankingType.all),
      DiscoveryAPI.getQichanghaoRankingList(
        RecordType.week,
        RankingType.industry
      ),
      DiscoveryAPI.getQichanghaoRankingList(
        RecordType.month,
        RankingType.industry
      ),
      DiscoveryAPI.getQichanghaoRankingList(RecordType.week, RankingType.car),
      DiscoveryAPI.getQichanghaoRankingList(RecordType.month, RankingType.car),
    ]).then((d) => {
      console.log('1.data:-', d);
      setData(d);

      setTimeIndex(0);
      setMonthTimeIndex(0);
    });

    return () => {};
  }, []);

  //let timeRangeModal: typeof BottomModal | null = null;
  let timeRangeModal: any = null;

  const onTabChanged = React.useCallback(
    (tabIndex: number) => {
      console.log('onTabChanged', tabIndex);
      setRecordType(tabIndex === 0 ? RecordType.week : RecordType.month);
    },
    [] // Tells React to memoize regardless of arguments.
  );

  const renderScene = ({ route }: { route: any }) => {
    console.table(route);

    const { rankingType } = route;

    let i = 0;

    if (route.key === 'first') {
      i = 0;
    } else if (route.key === 'second') {
      i = 1;
    } else {
      i = 2;
    }

    let rankingId, time;

    if (RecordType.week === recordType) {
      if (timeIndex !== -1) {
        let firstIndex = i * 2 + (recordType - 1);

        if (data.length > firstIndex) {
          if (data[firstIndex] && data[firstIndex].length > timeIndex) {
            rankingId = data[firstIndex][timeIndex].id;
            time = data[firstIndex][timeIndex].date;
          }
        }
      }
    } else if (RecordType.month === recordType) {
      if (monthTimeIndex !== -1) {
        let firstIndex = i * 2 + (recordType - 1);

        if (data.length > firstIndex) {
          if (data[firstIndex] && data[firstIndex].length > monthTimeIndex) {
            rankingId = data[firstIndex][monthTimeIndex].id;
            time = data[firstIndex][monthTimeIndex].date;
          }
        }
      }
    }

    // const rankingId  = timeIndex == -1 ? undefined : data[(i * 2)+(recordType-1)][timeIndex].id;
    // const time = timeIndex == -1 ? undefined : data[(i * 2)+(recordType-1)][timeIndex].date;

    console.log('1---:', rankingId, time, recordType);

    return (
      <RankingScreen
        navigation={navigation}
        recordType={recordType}
        rankingType={rankingType}
        rankingId={rankingId}
        time={time}
        index={i}
        onTabChanged={onTabChanged}
      />
    );
  };

  const indicatorWidth = 6;
  const { width: ScreenWidth } = useWindowDimensions();
  const tabWidth = ScreenWidth / 3;

  const currentTimeIndex =
    recordType === RecordType.week ? timeIndex : monthTimeIndex;

  const insets = useSafeAreaInsets();

  const TOP = insets.top + 44;

  return (
    <View style={{ flex: 1 }}>
      <NavigationBar
        onPressBack={() => {
          navigation?.goBack();
        }}
        title={'汽场号榜单'}
        style={styles.navigationBar}
        headerRight={
          <HeaderRight
            recordType={recordType}
            onPressDate={() => {
              timeRangeModal && timeRangeModal.open();
            }}
            onPressShare={async () => {
              const rankingId =
                data[index * 2 + (recordType - 1)][
                  timeIndex === -1 ? 0 : timeIndex
                ].id;
              try {
                let d = await DiscoveryAPI.getQichanghaoRankingDetail(
                  rankingId
                );

                const { ranking_img_url } = d;

                console.debug('ranking_img_url', ranking_img_url);

                if (ranking_img_url) {
                  ShareUtil.share(
                    '图片',
                    ranking_img_url,
                    '',
                    '标题',
                    Platform.Wechat
                  );
                } else {
                  Toast.info('图片地址有误');
                }
              } catch (error) {
                Toast.info(JSON.stringify(error));
              }
            }}
          />
        }
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        lazy
        renderTabBar={(props) => {
          return (
            <TabBar
              {...props}
              activeColor={'white'}
              inactiveColor={'rgba(255,255,255,0.8)'}
              labelStyle={{ fontSize: 15, fontWeight: 'bold' }}
              indicatorStyle={{
                marginLeft: (tabWidth - 2 * indicatorWidth) / 2,
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: indicatorWidth,
                backgroundColor: 'transparent',

                borderTopColor: 'transparent', //下箭头颜色
                borderLeftColor: 'transparent', //右箭头颜色
                borderBottomColor: 'rgba(255,255,255,0.2)', //上箭头颜色
                borderRightColor: 'transparent', //左箭头颜色
              }}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              tabStyle={{ width: tabWidth, paddingHorizontal: 0 }}
              style={{
                borderBottomWidth: 0,
                elevation: 0,
                position: 'absolute',
                width: ScreenWidth,
                top: TOP,
                height: 38,
                backgroundColor: 'rgba(0,0,0,0.05)',
              }}
            />
          );
        }}
      />

      <BottomModal
        fullScreen={false}
        ref={(c) => {
          timeRangeModal = c;
        }}
      >
        <TimeRangeView
          currentIndex={currentTimeIndex === -1 ? 0 : currentTimeIndex}
          recordType={recordType}
          data={data[index * 2 + (recordType - 1)]}
          onPress={(i) => {
            console.log('timeIndex:', i);
            timeRangeModal && timeRangeModal.close();

            if (recordType === RecordType.week) {
              setTimeIndex(i);
            } else if (recordType === RecordType.month) {
              setMonthTimeIndex(i);
            }
          }}
        />
      </BottomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 100,
  },
});
