/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { RecordType } from '../types';

type Props = {
  currentIndex: number;
  recordType: RecordType;
  data: Array<{
    id: number;
    date: string;
  }>;
  onPress?: (index: number, time: string) => void;
};

const TimeRangeView: React.FC<Props> = ({
  onPress,
  data,
  recordType,
  currentIndex,
}) => {
  console.log(data);

  const [, setIndex] = useState(-1);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        选择{recordType === RecordType.week ? '周榜' : '月榜'}时间区间
      </Text>
      {data.map((x, i) => {
        const selected = currentIndex === i;
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setIndex(i);
              setTimeout(() => {
                onPress && onPress(i, x.date);
              }, 100);
            }}
            activeOpacity={0.8}
          >
            <View style={styles.itemContainer}>
              <Text
                style={{
                  fontSize: 16,
                  color: selected ? '#222222' : '#888888',
                }}
              >
                {x.date}
              </Text>
            </View>
            {selected && (
              <Image
                source={require('../assets/time_bg.png')}
                style={styles.selectedImage}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  title: {
    fontSize: 18,
    color: '#222222',
    fontWeight: 'bold',
    marginTop: 33,
    marginBottom: 35,
    marginLeft: 20,
  },
  itemContainer: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {},

  selectedImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
  },
});

export default TimeRangeView;
