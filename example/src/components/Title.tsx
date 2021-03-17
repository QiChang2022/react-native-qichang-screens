import React, { Fragment } from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { ThemeConstants } from '@damoness/react-native-qichang-kit';

const Title: React.FC<{
  style?: StyleProp<TextStyle>;
  keywords?: string;
  title: string;
  theme?: 'light' | 'dark';
}> = ({ keywords, title, theme = 'light', style }) => {
  const { fontColorC2 } = ThemeConstants[theme];

  return keywords ? (
    <Text
      style={[styles.title, { color: fontColorC2 }, style]}
      numberOfLines={3}
    >
      {title.split(keywords).map((item, index) => {
        if (index > 0) {
          return (
            <Fragment key={index}>
              <Text style={{ color: ThemeConstants.light.masterColorC13 }}>
                {keywords}
              </Text>
              {item}
            </Fragment>
          );
        } else {
          return item;
        }
      })}
    </Text>
  ) : (
    <Text
      style={[styles.title, { color: fontColorC2 }, style]}
      numberOfLines={3}
    >
      {title}
    </Text>
  );
};

export default React.memo(Title);

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    lineHeight: 21,
    paddingBottom: 12,
    marginTop: -3,
  },
});
