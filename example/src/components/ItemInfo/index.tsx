import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ViewNum from './ViewNum';
import CommentNum from './CommentNum';
import { ThemeConstants } from '@damoness/react-native-qichang-kit';

type Props = {
  theme?: 'light' | 'dark';
  data: {
    isColumn: boolean; //是否是专栏 (显示专栏标识)
    isSubject?: boolean; //是否是专题 (显示专题标识)
    author: string; //作者
    viewNum: number; //阅读数
    showCommentNum?: boolean; //显示评论
    commentNum: number; //评论数
  };
};

const ItemInfo: React.FC<Props> = ({
  data: {
    isColumn,
    viewNum,
    author,
    commentNum,
    isSubject = false,
    showCommentNum = true,
  },
  theme = 'light',
}) => {
  const { fontColorC4, backgroundColorC14 } = ThemeConstants[theme];

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.bottomContainerLeft}>
        {isSubject && (
          <Text
            style={[
              styles.subjectTitle,
              { backgroundColor: backgroundColorC14 },
            ]}
          >
            专题
          </Text>
        )}
        {isColumn && <Text style={styles.columnTitle}>专栏</Text>}
        {author !== '' && (
          <Text style={[styles.name, { color: fontColorC4 }]}>{author}</Text>
        )}
        <ViewNum num={viewNum} theme={theme} />
      </View>
      {showCommentNum && <CommentNum num={commentNum} theme={theme} />}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor:'yellow',
  },
  bottomContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor:'red',
  },
  subjectTitle: {
    color: 'white',
    fontSize: 10,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginRight: 8,
  },
  columnTitle: {
    color: 'white',
    fontSize: 10,
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: ThemeConstants.light.masterColorC13,
    borderRadius: 2,
    overflow: 'hidden',
    marginRight: 8,
  },
  name: {
    fontSize: 12,
    paddingRight: 10,
  },
  bottomContainerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { CommentNum, ViewNum };

export default ItemInfo;
