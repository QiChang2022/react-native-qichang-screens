import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';

type Props = {
  data: {
    face: string;
    name: string;
    summary: string;
  };
};

function UserHeaderComponent({ data }: Props) {
  const { face, name, summary } = data;

  console.log('ColumnHeaderComponent');

  return (
    <View style={styles.container}>
      <Image source={{ uri: face }} style={StyleSheet.absoluteFill} />

      <BlurView
        style={[StyleSheet.absoluteFill]}
        blurType="light"
        blurAmount={10}
      />

      <View
        style={[
          StyleSheet.absoluteFill,
          // eslint-disable-next-line react-native/no-inline-styles
          { backgroundColor: 'rgba(0,0,0,0.4)' },
        ]}
      />

      <View style={styles.contentContainer}>
        <Image source={{ uri: face }} style={styles.avatar} />
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.summaryText} numberOfLines={2}>
          {summary}
        </Text>
      </View>
    </View>
  );
}

export default React.memo(UserHeaderComponent);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 375 / 234,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  avatar: { height: 60, width: 60, borderRadius: 30 },
  nameText: { marginTop: 17, fontSize: 20, color: 'white' },
  summaryText: {
    marginTop: 10,
    fontSize: 14,
    color: 'white',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
});
