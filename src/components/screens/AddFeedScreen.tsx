import React from 'react';
import { View } from 'react-native';
import { Header } from '../Header/Header';

export const AddFeedScreen:React.FC = () => {
  return (
    <View style={{flex:1}}>
      <Header>
          <Header.Title title='ADD FEED'></Header.Title>
      </Header>
    </View>
  )
}

