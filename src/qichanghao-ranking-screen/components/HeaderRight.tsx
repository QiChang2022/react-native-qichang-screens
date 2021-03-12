import { Button, Image } from '@damoness/react-native-qichang-kit';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RecordType } from '../types';

const HeaderRight: React.FC<{
  onPressShare?: () => void;
  onPressDate?: () => void;
  recordType: RecordType;
}> = ({ onPressShare, onPressDate, recordType }) => (
  <View style={styles.container}>
    <Button style={styles.monthWeekButton} onPress={onPressDate}>
      {recordType === RecordType.month ? (
        <Image source={require('../assets/month_icon.png')} />
      ) : (
        <Image source={require('../assets/week_icon.png')} />
      )}
    </Button>
    <Button style={styles.shareButton} onPress={onPressShare}>
      <Image source={require('../assets/lanmu_share_icon.png')} />
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  monthWeekButton: { marginRight: 20, paddingVertical: 8 },
  shareButton: { marginRight: 20 },
});

export default HeaderRight;
