import {
  Avatar,
  Button,
  Image,
  ThemedLineView,
  ThemedText,
  ThemedTextType,
} from '@damoness/react-native-qichang-kit';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  index: number;
  item: any;
  onPress?: () => void;
};

export default function RankingRowItem({ item, index, onPress }: Props) {
  const { trend_type, user_cover, record_value, user_name } = item;
  return (
    <Button onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        <ThemedText style={styles.indexText} type={ThemedTextType.big}>
          {index + 4}
        </ThemedText>
        <Avatar url={user_cover} size={36} style={styles.avatar} />
        <ThemedText type={ThemedTextType.normal}>{user_name}</ThemedText>
      </View>

      <View style={styles.rightContainer}>
        <Image
          source={
            trend_type > 0
              ? require('../assets/rising.png')
              : trend_type === 0
              ? require('../assets/Did_not_change_icon.png')
              : require('../assets/falling.png')
          }
        />
        <ThemedText style={styles.hotText} type={ThemedTextType.big}>
          {record_value}
        </ThemedText>
      </View>

      <ThemedLineView style={styles.line} />
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 76,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 21,
  },
  leftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  indexText: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 25,
    textAlign: 'center',
  },
  avatar: {
    marginLeft: 25,
    marginRight: 20,
    backgroundColor: 'white',
  },
  rightContainer: { flexDirection: 'row', alignItems: 'center' },
  hotText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
