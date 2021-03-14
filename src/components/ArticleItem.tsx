import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image, ThemeConstants } from '@damoness/react-native-qichang-kit';

import ItemInfo from './ItemInfo';
import Title from './Title';

export enum ArticleType {
  Normal = 0, //普通模式
  BigImage = 1, //大图模式
}

type Props = {
  theme?: 'light' | 'dark';
  articleType: ArticleType;
  bottomLine?: boolean; // 显示底部线
  isColumn: boolean;
  onPress?: () => void;
  data: {
    author: string;
    cover: string; //图片
    title: string; //文章标题
    browse_amount: number; //浏览数
    comment_amount: number; //评论数
  };

  keywords?: string; // 需要高亮的关键字
};

const ArticleItem: React.FC<Props> = ({
  articleType,
  isColumn,
  data,
  onPress,
  keywords,
  bottomLine = false,
  theme = 'light',
}) => {
  const { cover, title, author, browse_amount = 0, comment_amount = 0 } = data;
  const { lineColorC5 } = ThemeConstants[theme];
  const borderStyle = bottomLine
    ? {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: lineColorC5,
      }
    : {};

  return articleType == ArticleType.Normal ? (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.containerRow, borderStyle]}
      onPress={onPress}
    >
      <Image source={{ uri: cover }} style={styles.smallImage} />

      <View
        style={{ justifyContent: 'space-between', flex: 1, marginLeft: 12 }}
      >
        <Title title={title} keywords={keywords} theme={theme} />
        <ItemInfo
          data={{
            isColumn: isColumn,
            viewNum: browse_amount,
            commentNum: comment_amount,
            author: author,
          }}
          theme={theme}
        />
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.containerColumn, borderStyle]}
      onPress={onPress}
    >
      <Title title={title} keywords={keywords} theme={theme} />

      <Image source={{ uri: cover }} style={styles.bigImage} />

      <ItemInfo
        data={{
          isColumn: isColumn,
          viewNum: data.browse_amount,
          commentNum: data.comment_amount,
          author: author,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingVertical: 20,
  },

  bottomLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  containerColumn: {
    flexDirection: 'column',
    marginHorizontal: 15,
    paddingVertical: 20,
  },
  smallImage: {
    height: 69,
    aspectRatio: 16 / 9,
  },
  bigImage: {
    marginTop: 8,
    marginBottom: 20,
    aspectRatio: 16 / 9,
    width: '100%',
  },
});

export default ArticleItem;
