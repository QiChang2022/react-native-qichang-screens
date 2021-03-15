import { Avatar, useTheme } from '@damoness/react-native-qichang-kit';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Title } from '../../../components';

type Data = {
  avatarUrl: string;
  name: string;
  summary: string;
};

type Props = {
  keywords?: string; // 需要高亮的关键字
  data: Data;
  onPressItem?: (item: Data) => void;
};

export default function UserItem(props: Props) {
  const {
    keywords,
    data: { avatarUrl, name, summary },
    onPressItem,
  } = props;

  const {
    theme,
    colors: { fontColorC4, lineColorC5 },
  } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPressItem && onPressItem(props.data)}
      style={[styles.container, { borderBottomColor: lineColorC5 }]}
    >
      <Avatar url={avatarUrl} size={50} style={styles.avatar} />
      <View>
        <Title title={name} keywords={keywords} theme={theme} />
        <Text
          numberOfLines={1}
          style={[styles.summaryText, { color: fontColorC4 }]}
        >
          {summary}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    marginHorizontal: 15,
  },
  summaryText: {
    fontSize: 14,
  },
});
