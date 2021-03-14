import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  ThemedText,
  ThemedTextType,
  withTheme,
  ThemeProps,
} from '@damoness/react-native-qichang-kit';

type Props = {
  data: string[];
  onPressItem: (item: string, index: number) => void;
} & ThemeProps;

const HotSearchList: React.FC<Props> = ({ data, onPressItem, theme }) => {
  const { backgroundColorC6 } = theme.colors;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type={ThemedTextType.headline}>
        热门搜索
      </ThemedText>
      <View style={styles.itemContainer}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.item, { backgroundColor: backgroundColorC6 }]}
              key={index}
              onPress={() => onPressItem(item, index)}
            >
              <ThemedText style={styles.text} type={ThemedTextType.headline}>
                {item}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: -10,
    marginTop: 10,
  },
  item: {
    height: 33,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 13,
  },
});

export default withTheme(HotSearchList);
