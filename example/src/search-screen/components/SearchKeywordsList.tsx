import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { withTheme, ThemeProps } from '@damoness/react-native-qichang-kit';

import KeyTitle from './KeyTitle';

type Props = {
  data: string[];
  onPressItem: (item: string, index: number) => void;
} & ThemeProps;

const SearchKeywordsList: React.FC<Props> = ({ data, onPressItem, theme }) => {
  const {
    colors: { backgroundColorC20, lineColorC5 },
  } = theme;

  return (
    <FlatList
      style={[StyleSheet.absoluteFill, { backgroundColor: backgroundColorC20 }]}
      data={data}
      keyExtractor={(_, index) => index + ''}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPressItem(item, index)}
            key={index}
            style={[
              styles.itemContainer,
              {
                borderBottomColor: lineColorC5,
              },
            ]}
          >
            <Image
              source={require('./search-input/assets/stock_search_gray.png')}
            />
            <KeyTitle
              title={item}
              style={styles.titleText}
              theme={theme.theme}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 44,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    marginLeft: 18,
    fontSize: 16,
  },
  titleText: {
    marginLeft: 18,
    fontSize: 16,
    paddingBottom: 0,
    marginTop: 0,
  },
});

export default withTheme(SearchKeywordsList);
