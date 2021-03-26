import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { QichanghaoStackParamList } from '../navigation/QichanghaoStackNavigator';
import { QichanghaoRankingScreen } from 'react-native-qichang-screens';

type Props = StackScreenProps<QichanghaoStackParamList, 'QichanghaoRanking'>;

const QichanghaoRankingScreenContainer: React.FC<Props> = ({ navigation }) => {
  return (
    <QichanghaoRankingScreen
      onPressQichanghaoItem={(id) => {
        navigation.push('UserDetail', { userId: id });
      }}
    />
  );
};

export default QichanghaoRankingScreenContainer;
