import React from 'react';
import { View } from 'react-native';
import { Header } from '../Header/Header';

export const HomeScreen:React.FC = () => {
  return (
    <View style={{flex:1}}>
      <Header>
          <Header.Title title='HOME'></Header.Title>
      </Header>
    </View>
  )
}

