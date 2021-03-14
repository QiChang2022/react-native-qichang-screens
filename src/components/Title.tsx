import React, { Fragment } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ThemeConstants } from '@damoness/react-native-qichang-kit';

const Title: React.FC<{
  keywords?: string;
  title: string;
  theme?: 'light' | 'dark';
}> = ({ keywords, title, theme = 'light' }) => {
  const { fontColorC2 } = ThemeConstants[theme];

  return !!keywords ? (
    <Text style={[styles.title, { color: fontColorC2 }]} numberOfLines={3}>
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
    <Text style={[styles.title, { color: fontColorC2 }]} numberOfLines={3}>
      {title}
    </Text>
  );
};

export default React.memo(Title);

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: -3,
    lineHeight: 21,
    paddingBottom: 12,
  },
});
