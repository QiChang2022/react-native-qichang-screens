import { useTheme } from '@damoness/react-native-qichang-kit';
import React from 'react';
import { Dimensions } from 'react-native';
import { TabBar as RNTabBar } from 'react-native-tab-view';

type Props = any;

const { width } = Dimensions.get('window');

const tabWidth = 75;
const indicatorWidth = 16;

function TabBar(props: Props) {
  const {
    masterColorC13,
    fontColorC4,
    headerBackgroundColorC8,
  } = useTheme().colors;

  console.log('TabBar');

  return (
    <RNTabBar
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
      tabStyle={{ width: tabWidth }}
      style={{
        backgroundColor: headerBackgroundColorC8,
        width: width,
        borderBottomWidth: 0,
        elevation: 0,
        height: 36,
      }}
    />
  );
}

export default React.memo(TabBar);
