import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export const LoadingView:React.FC = () => {
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <LottieView
        autoPlay
        style={{
          width: 150,
          height: 150
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/loading.json')}
      />
    </View>
  )
}