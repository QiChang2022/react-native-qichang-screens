//浏览数
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ViewNum: React.FC<{ num: number; theme?: 'light' | 'dark' }> = ({
  num,
  theme = 'light',
}) => {
  const numStr =
    num > 10000 ? (num / 10000).toFixed(num > 10000 * 100 ? 0 : 1) + '万' : num;

  return (
    <Text
      style={[
        styles.title,
        // eslint-disable-next-line react-native/no-inline-styles
        { color: theme === 'dark' ? '#A9AAAD' : '#888888' },
      ]}
    >
      浏览 {numStr}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    color: '#888888',
  },
});

export default ViewNum;
