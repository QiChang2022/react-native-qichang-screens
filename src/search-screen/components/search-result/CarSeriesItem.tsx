/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image, ThemeConstants } from '@damoness/react-native-qichang-kit';
import { Title } from '../../../components/';

type Data = {
  imageUrl: string;
  brandName: string;
  priceRange: string;
};

type Props = {
  theme?: 'light' | 'dark';
  keywords?: string; // 需要高亮的关键字
  data: Data;
  onPressConsult: (item: Data) => void;
  onPressItem: (item: Data) => void;
};

const CarSeriesItem: React.FC<Props> = ({
  data,
  onPressItem,
  onPressConsult,
  theme = 'light',
  keywords,
}) => {
  const { lineColorC5 } = ThemeConstants[theme];
  const { imageUrl, brandName, priceRange } = data;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        ...styles.container,
        borderBottomColor: lineColorC5,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
      onPress={() => onPressItem(data)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={{ marginLeft: 20 }}>
          <Title title={brandName} keywords={keywords} theme={theme} />
          <Text
            style={{
              color: ThemeConstants.light.masterColorC13,
              fontSize: 16,
              fontWeight: '400',
            }}
          >
            {priceRange}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => onPressConsult(data)}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>咨询底价</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    //height: 84,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  image: {
    // width: 96,
    // height:64,
    height: 69,
    aspectRatio: 16 / 9,
    borderWidth: 0,
  },

  buttonContainer: {
    width: 84,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: ThemeConstants.light.masterColorC13,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default CarSeriesItem;
