/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import VideoTime from './VideoTime';
import CommentNum from '../ItemInfo/CommentNum';
import ViewNum from '../ItemInfo/ViewNum';
import ItemInfo from '../ItemInfo';
import { Image, ThemeConstants } from '@damoness/react-native-qichang-kit';
import Title from '../Title';

export enum VideoType {
  Normal = 0, //普通模式
  BigImage = 1, //大图模式
}

type Props = {
  theme?: 'light' | 'dark';
  isColumn: boolean; //是否是专栏
  canPlay?: boolean; //是否可以播放
  videoType: VideoType;
  bottomLine?: boolean; // 显示底部线
  onPress?: () => void;
  onPressPlay?: () => void;
  data: {
    cover: string; //图片
    title: string; //标题
    author: string; //作者
    url: string; //视频地址
    browse_amount: number; //浏览数
    comment_amount: number; //评论数
    duration: string;
  };
  keywords?: string; // 需要高亮的关键字
};

type State = {
  playing: boolean;
};

class VideoItem extends Component<Props, State> {
  isFullScreen = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      playing: false,
    };
  }

  get FullScreen() {
    return this.isFullScreen;
  }

  render() {
    const {
      isColumn,
      theme = 'light',
      videoType,
      onPress,
      data: {
        cover,
        title,
        author,
        browse_amount = 0,
        comment_amount = 0,
        duration,
      },
      keywords,
      bottomLine = false,
    } = this.props;

    const { lineColorC5 } = ThemeConstants[theme];
    const borderStyle = bottomLine
      ? {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: lineColorC5,
        }
      : {};

    return videoType === VideoType.BigImage ? (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.container, borderStyle]}
        onPress={onPress}
      >
        <Title title={title} keywords={keywords} theme={theme} />

        <Image source={{ uri: cover }} style={styles.image}>
          <Image source={require('./assets/Playbutton.png')} />
          <VideoTime time={duration} type={'big'} />
        </Image>

        <View style={styles.bottomContainer}>
          <View style={styles.bottomContainerLeft}>
            {isColumn && <Text style={styles.columnTitle}>专栏</Text>}
            <Text
              style={[
                styles.name,
                { color: ThemeConstants[theme].fontColorC4 },
              ]}
            >
              {author}
            </Text>
            <ViewNum num={browse_amount} theme={theme} />
          </View>
          <View style={styles.bottomContainerRight}>
            <CommentNum num={comment_amount} theme={theme} />
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.containerRow, borderStyle]}
        onPress={onPress}
      >
        <Image source={{ uri: cover }} style={styles.smallImage}>
          <VideoTime time={duration} type={'small'} />
        </Image>

        <View
          style={{ justifyContent: 'space-between', flex: 1, marginLeft: 12 }}
        >
          <Title title={title} keywords={keywords} theme={theme} />

          <ItemInfo
            data={{
              isColumn: isColumn,
              viewNum: browse_amount,
              commentNum: comment_amount,
              author,
            }}
            theme={theme}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    paddingTop: 25,
  },

  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    height: undefined,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnTitle: {
    color: 'white',
    fontSize: 10,
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: ThemeConstants.light.masterColorC13,
    marginRight: 10,
  },
  name: {
    fontSize: 12,
    marginRight: 10,
  },
  bottomContainerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingVertical: 20,
  },
  smallImage: {
    height: 69,
    aspectRatio: 16 / 9,
  },
});

export default VideoItem;
