/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Keyboard } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  LoadingComponent,
  ThemeConstants,
  withTheme,
  ThemeProps,
} from '@damoness/react-native-qichang-kit';
import {
  SearchInput,
  SearchKeywordsList,
  HotCarModal,
  SearchResult,
  HotSearchList,
} from './components';

import { NewsAPI } from 'react-native-qichang-api';
import { ItemType } from './types';

export { ItemType };

type Props = {
  defaultSearch?: string;
  searchKeywords?: string; //搜索的关键字
  onPressItem?: (type: ItemType, id: number) => void;
  onPressCancel?: () => void;
  onChangeText?: (text: string) => void;
} & ThemeProps;

type State = {
  keywords: string;
  searchKeys: string[];
  isFocused: boolean;
};

class SearchScreen extends Component<Props, State> {
  searchInput: SearchInput | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      isFocused: true,
      keywords: '',
      searchKeys: [],
    };
  }

  componentDidMount() {
    if (this.props.searchKeywords) {
      this.searchKeywords(this.props.searchKeywords);
    } else {
      setTimeout(() => {
        this.searchInput && this.searchInput.focus();
      }, 500);
    }
  }

  searchKeywords = (text: string) => {
    if (text) {
      this.searchInput && this.searchInput.setText(text);
      this.setState({ keywords: text });
      Keyboard.dismiss();
      this.setState({ isFocused: false });
    }
  };

  debounce(func: Function, wait: number) {
    let timeout: any;
    console.log('timeout', timeout, arguments);
    return () => {
      // eslint-disable-next-line consistent-this
      let context = this;
      console.log(arguments, timeout);
      let args = arguments;

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }

  onChangeText = async (text: string) => {
    let searchKeys: string[] = [];

    if (text) {
      this.props.onChangeText && this.props.onChangeText(text);
      searchKeys = await NewsAPI.Search.getSearchKeyList(text);
    }

    this.setState({ searchKeys, keywords: text });
  };

  render() {
    const { isFocused, searchKeys, keywords } = this.state;

    const { defaultSearch, theme, onPressCancel, onPressItem } = this.props;
    const { backgroundColorC20 } = theme.colors;

    const headerBackgroundColor = {
      light: ThemeConstants.light.masterColorC13,
      dark: ThemeConstants.dark.headerBackgroundColorC8,
    }[theme.theme];

    return (
      <SafeAreaView
        style={{ backgroundColor: headerBackgroundColor, flex: 1 }}
        edges={['top']}
      >
        <View
          style={{
            height: 44,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: headerBackgroundColor,
          }}
        >
          <SearchInput
            placeholder={defaultSearch || '请输入您要搜索的关键词'}
            ref={(ref) => (this.searchInput = ref)}
            value={keywords}
            onFocus={() => {
              this.setState({ isFocused: true });
            }}
            onSubmitEditing={(text) => {
              if (text) {
                this.searchKeywords(text);
              } else if (defaultSearch) {
                this.searchKeywords(defaultSearch);
              }
            }}
            onChangeText={this.debounce(this.onChangeText, 200)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onPressCancel && onPressCancel();
            }}
            style={{ paddingHorizontal: 15, justifyContent: 'center' }}
          >
            <Text style={{ fontSize: 16, color: 'white' }}>取消</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, backgroundColor: backgroundColorC20 }}>
          <LoadingComponent
            fetchData={async () => {
              let [carModals, hotWords] = await Promise.all([
                NewsAPI.Search.getHotCarModals(),
                NewsAPI.Search.getSearchHotWords(),
              ]);
              return {
                carModals,
                hotWords,
              };
            }}
            render={(data) => {
              const { carModals, hotWords } = data;

              return (
                <View style={{ flex: 1 }}>
                  <HotSearchList
                    data={hotWords.map((item: any) => item.title)}
                    onPressItem={(text) => {
                      this.searchKeywords(text);
                    }}
                  />
                  <HotCarModal
                    data={carModals}
                    onPressItem={(index) => {
                      const id = carModals[index].id;
                      onPressItem && onPressItem(ItemType.CarSeries, id);
                    }}
                  />

                  {isFocused && searchKeys.length > 0 && (
                    <SearchKeywordsList
                      data={searchKeys}
                      keywords={keywords}
                      onPressItem={(text) => {
                        if (text) {
                          this.searchKeywords(text);
                        }
                      }}
                    />
                  )}

                  {!isFocused && keywords !== '' && (
                    <SearchResult
                      keywords={keywords}
                      onPressItem={onPressItem}
                    />
                  )}
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(SearchScreen);
