import React, { useContext } from 'react';
import { TextStyle, StyleProp } from 'react-native';
import { Title } from '../../components';

import KeywordsContext from './KeywordsContext';

type Props = {
  style?: StyleProp<TextStyle>;
  title: string;
  theme?: 'light' | 'dark';
};

export default function KeyTitle({ style, ...other }: Props) {
  const keywords = useContext(KeywordsContext);

  return <Title keywords={keywords} style={style} {...other} />;
}
