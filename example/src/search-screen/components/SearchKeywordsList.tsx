import React from 'react';
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  withTheme,
  ThemeProps,
  ThemeConstants,
} from '@damoness/react-native-qichang-kit';

type Props = {
  keywords: string;
  data: string[];
  onPressItem: (item: string, index: number) => void;
} & ThemeProps;

const SearchKeywordsList: React.FC<Props> = ({
  keywords,
  data,
  onPressItem,
  theme,
}) => {
  const { backgroundColorC20, fontColorC1, lineColorC5 } = theme.colors;

  return (
    <FlatList
      style={[StyleSheet.absoluteFill, { backgroundColor: backgroundColorC20 }]}
      extraData={keywords}
      data={data}
      keyExtractor={(_, index) => index + ''}
      renderItem={({ item, index }) => {
        const array = item.split(keywords);

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
            <Text style={[styles.title, { color: fontColorC1 }]}>
              {array.map((x, i) => {
                if (i > 0) {
                  return (
                    <Text key={i}>
                      <Text
                        style={{ color: ThemeConstants.light.masterColorC13 }}
                      >
                        {keywords}
                      </Text>
                      {x}
                    </Text>
                  );
                } else {
                  return <Text key={i}>{x}</Text>;
                }
              })}
              {/* {" --- " + item }     */}
            </Text>
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
});

export default withTheme(SearchKeywordsList);
