import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { withTheme, ThemeProps } from '@damoness/react-native-qichang-kit';

type Props = {
  data: Array<{
    id: number;
    name: string;
    cover: string;
  }>;
  onPressItem: (index: number, id: number) => void;
} & ThemeProps;

const HotCarModal: React.FC<Props> = ({ data, onPressItem, theme }) => {
  const { fontColorC1, fontColorC21 } = theme.colors;
  console.log('HotCarModal');
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: fontColorC1 }]}>热门车型</Text>
      <FlatList
        numColumns={3}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onPressItem(index, item.id)}
              style={styles.itemContainer}
            >
              <Image source={{ uri: item.cover }} style={styles.image} />
              <Text style={[styles.text, { color: fontColorC21 }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 35,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    width: '33.3%',
    alignItems: 'center',
    marginTop: 10,
  },
  item: {
    height: 33,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F7F7F7',
    marginRight: 10,
    marginTop: 10,
  },

  text: {
    fontSize: 13,
    color: '#333333',
    marginTop: 10,
  },
  image: {
    height: 40,
    width: 90,
  },
});

export default React.memo(withTheme(HotCarModal));
