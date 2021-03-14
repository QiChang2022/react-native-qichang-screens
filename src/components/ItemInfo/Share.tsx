import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Share: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}
    >
      <Image
        source={require('../../video-list-screen/assets/Video_sharing.png')}
      />
      <Text style={styles.title}>分享</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  title: {
    fontSize: 12,
    color: '#888888',
    marginLeft: 5,
  },
});

export default Share;
