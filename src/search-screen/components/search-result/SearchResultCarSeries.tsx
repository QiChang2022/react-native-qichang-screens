import React from 'react';

import { Dimensions } from 'react-native';

import { PullDownRefreshAndPullUpLoadMoreListView } from '@damoness/react-native-refresh';
import { ErrorComponent, useTheme } from '@damoness/react-native-qichang-kit';
import CarSeriesItem from './CarSeriesItem';
import { NewsAPI } from 'react-native-qichang-api';
import { Source_Cat } from '../../../types';

type Props = {
  keywords: string;
  onPressItem: (id: number) => void;
  onPressConsult: (id: number) => void;
};

const { height } = Dimensions.get('window');

const SearchResultCarSeries: React.FC<Props> = ({
  keywords,
  onPressItem,
  onPressConsult,
}) => {
  const theme = useTheme().theme;

  return (
    <PullDownRefreshAndPullUpLoadMoreListView
      ListEmptyComponent={
        <ErrorComponent
          style={{ height: height * 0.78 }}
          onPress={() => {}}
          errorInfo={'当前页面暂无数据'}
        />
      }
      loadDataFunction={NewsAPI.Search.search}
      loadDataParams={[keywords, Source_Cat.series]}
      keyExtractor={(item: any, index: number) => item.id.toString() + index}
      renderItem={({ item, index }) => {
        const { cover, id, name } = item;
        const { price_min, price_max } = item;

        const priceRange =
          price_min === 0 && price_max === 0
            ? '暂无报价'
            : `${price_min}-${price_max}万`;

        return (
          <CarSeriesItem
            theme={theme}
            key={index}
            keywords={keywords}
            data={{
              imageUrl: cover,
              brandName: name,
              priceRange: priceRange,
            }}
            onPressItem={() => {
              onPressItem(id);
            }}
            onPressConsult={() => {
              onPressConsult(id);
            }}
          />
        );
      }}
    />
  );
};

export default SearchResultCarSeries;
