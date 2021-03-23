/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type Props = {
  time: string;
  type: 'small' | 'big';
};

const VideoTime: React.FC<Props> = ({ time, type }) => {
  return (
    <View style={type === 'small' ? styles.containerSmall : styles.container}>
      <Image
        source={
          type === 'small'
            ? require('./assets/playicon_small.png')
            : require('./assets/playicon_big.png')
        }
      />
      <Text
        style={[styles.timeString, { fontSize: type === 'small' ? 10 : 12 }]}
      >
        {time}
      </Text>
    </View>
  );
};

export default React.memo(VideoTime);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 12,
    bottom: 12,

    height: 20,
    width: 60,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },

  containerSmall: {
    position: 'absolute',
    right: 5,
    bottom: 5,

    height: 20,
    width: 52,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },

  timeString: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
