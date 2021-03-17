/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from 'react-native';

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
import KeywordsContext from './components/KeywordsContext';

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

function debounce(func: Function, wait: number) {
  let timeout: any;
  //console.log('timeout', timeout, arguments);
  return function () {
    let args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

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

  /**
   * 获取热门搜索 和 热门车型 列表数据
   * @returns
   */
  fetchData = async () => {
    let [carModals, hotWords] = await Promise.all([
      NewsAPI.Search.getHotCarModals(),
      NewsAPI.Search.getSearchHotWords(),
    ]);
    return {
      carModals,
      hotWords: hotWords.map((item: any) => item.title),
    };
  };

  onChangeText = async (text: string) => {
    let searchKeys: string[] = [];

    if (text) {
      this.props.onChangeText && this.props.onChangeText(text);
      searchKeys = await NewsAPI.Search.getSearchKeyList(text);
    }
    this.setState({ searchKeys, keywords: text });
  };

  onPressHotSearchListItem = (text: string) => {
    this.searchKeywords(text);
  };

  onPressHotCarModalItem = (_: number, id: number) => {
    const { onPressItem } = this.props;
    onPressItem && onPressItem(ItemType.CarSeries, id);
  };

  renderContent = (data: any) => {
    console.log('renderContent');

    const { carModals, hotWords } = data;
    const { isFocused, searchKeys, keywords } = this.state;
    const { onPressItem } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <HotSearchList
          data={hotWords}
          onPressItem={this.onPressHotSearchListItem}
        />
        <HotCarModal
          data={carModals}
          onPressItem={this.onPressHotCarModalItem}
        />

        {isFocused && searchKeys.length > 0 && (
          <SearchKeywordsList
            data={searchKeys}
            onPressItem={(text) => {
              if (text) {
                this.searchKeywords(text);
              }
            }}
          />
        )}

        {!isFocused && keywords !== '' && (
          <SearchResult keywords={keywords} onPressItem={onPressItem} />
        )}
      </View>
    );
  };

  render() {
    const { keywords } = this.state;

    const { defaultSearch, theme, onPressCancel } = this.props;
    const { backgroundColorC20 } = theme.colors;

    const headerBackgroundColor = {
      light: ThemeConstants.light.masterColorC13,
      dark: ThemeConstants.dark.headerBackgroundColorC8,
    }[theme.theme];

    return (
      <KeywordsContext.Provider value={keywords}>
        <SafeAreaView
          style={{ backgroundColor: headerBackgroundColor, flex: 1 }}
          edges={['top']}
        >
          <View
            style={[
              styles.row,
              {
                backgroundColor: headerBackgroundColor,
              },
            ]}
          >
            <SearchInput
              placeholder={defaultSearch || '请输入您要搜索的关键词'}
              ref={(ref) => (this.searchInput = ref)}
              defaultValue={keywords}
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
              onChangeText={debounce(this.onChangeText, 200)}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onPressCancel && onPressCancel();
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>取消</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, backgroundColor: backgroundColorC20 }}>
            <LoadingComponent
              fetchData={this.fetchData}
              render={this.renderContent}
            />
          </View>
        </SafeAreaView>
      </KeywordsContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButton: {
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: 'white',
  },
});

export default withTheme(SearchScreen);
