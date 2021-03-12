/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  onClick?: (index: number) => void;
  currentIndex: number;
  data: Array<{
    value: number;
    label: string;
  }>;
  selectedColor: string;
}

const Tab: React.FC<Props> = ({
  data,
  currentIndex,
  onClick,
  selectedColor,
}) => {
  const [clickedIndex, setClickedIndex] = useState(currentIndex);

  useEffect(() => {
    setClickedIndex(currentIndex);
    return () => {};
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const selected = clickedIndex === index;

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => {
              setClickedIndex(index);
              onClick && onClick(index);
            }}
            style={[
              styles.item,
              {
                backgroundColor: selected
                  ? 'rgb(255,255,255)'
                  : 'rgba(255,255,255,0.4)',
              },
            ]}
          >
            <Text
              key={index}
              style={[
                styles.text,
                { color: selected ? selectedColor : 'rgba(255,255,255,0.8)' },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    height: 20,
    flexDirection: 'row',
  },
  text: {
    fontSize: 12,
  },
  item: {
    width: 45,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Tab;
