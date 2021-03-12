/* eslint-disable react-native/no-inline-styles */
import { Avatar, Button, Image } from '@damoness/react-native-qichang-kit';
import React from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  ViewStyle,
  StyleProp,
  ImageBackground,
  StyleSheet,
} from 'react-native';

const avatarBgs = [
  require('../assets/gold.png'),
  require('../assets/silver.png'),
  require('../assets/copper.png'),
];
const avatarRounds = [
  require('../assets/no1.png'),
  require('../assets/no2.png'),
  require('../assets/no3.png'),
];

type Props = {
  style?: StyleProp<ViewStyle>;
  ranking: number; //排名
  name: string; //名字
  hot: string; //热度
  cover: string; //头像地址
  onPress?: () => void;
};

const TopThree: React.FC<Props> = ({
  ranking,
  style,
  name,
  hot,
  cover,
  onPress,
}) => {
  const { width: ScreenWidth } = useWindowDimensions();

  const point = (p: number) => (ScreenWidth / 375) * p;

  const avatarBgSize = point(ranking === 0 ? 91 : 77);

  const avatarSize = point(ranking === 0 ? 64 : 47);

  const paddingBottom = point(ranking === 0 ? 103 : 84);

  return (
    <View
      style={[
        {
          marginHorizontal: point(11.75),
          paddingBottom: paddingBottom,
          alignItems: 'center',
          justifyContent: 'flex-end',
        },
        style,
      ]}
    >
      <Button onPress={onPress}>
        <ImageBackground
          source={avatarBgs[ranking]}
          style={{
            width: avatarBgSize,
            height: avatarBgSize,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar
            style={{
              marginBottom: ranking === 0 ? point(3) : 0,
              backgroundColor: 'white',
            }}
            size={avatarSize}
            url={cover}
          />
          <Image
            source={avatarRounds[ranking]}
            style={{ position: 'absolute', bottom: 0 }}
          />
        </ImageBackground>
      </Button>

      <Text
        style={[
          styles.nameText,
          {
            marginTop: ranking === 0 ? 6 : 10,
          },
        ]}
      >
        {name}
      </Text>
      <Text style={styles.hotText}>{hot}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nameText: {
    color: 'white',
    fontSize: 11,
  },
  hotText: {
    color: 'white',
    fontSize: 10,
    marginTop: 3,
  },
});

export default TopThree;
