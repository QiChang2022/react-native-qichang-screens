import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemeConstants } from '@damoness/react-native-qichang-kit';

type Props = {
  num: number;
  theme?: 'light' | 'dark';
};

//评论数
const CommentNum: React.FC<Props> = ({ num, theme = 'light' }) => {
  const { fontColorC4 } = ThemeConstants[theme];
  return (
    <View style={styles.container}>
      <Image
        source={
          theme === 'dark'
            ? require('./assets/Information_message_night_icon.png')
            : require('./assets/Information_message_icon.png')
        }
      />
      <Text style={[styles.title, { color: fontColorC4 }]}>{num}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    marginLeft: 5,
  },
});

export default CommentNum;
