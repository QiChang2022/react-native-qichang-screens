import React from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneRendererProps } from 'react-native-tab-view';
const initialLayout = { width: Dimensions.get('window').width };
import { TabBar } from '../components';

type Props = {
  renderScene: (
    props: SceneRendererProps & { route: { key: string } }
  ) => React.ReactNode;
};

export default function TabBarView(props: Props) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'all', title: '全部' },
    { key: 'news', title: '文章' },
    { key: 'video', title: '视频' },
  ]);

  return (
    <TabView
      {...props}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      lazy
      renderTabBar={(p) => <TabBar {...p} />}
    />
  );
}
