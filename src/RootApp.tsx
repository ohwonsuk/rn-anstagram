import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RootStackNavigation } from './navigations/RootStackNavigation';
import * as SplashScreen from 'expo-splash-screen';

import { SplashView } from './SplashView';

SplashScreen.preventAutoHideAsync();

export const RootApp:React.FC = () => {
  const [initialize, setInitialize] =useState(false);
  
  useEffect(()=>{
    if (!initialize) {
      SplashScreen.hideAsync();
    };
  },[initialize]);

  if(!initialize) 
    return (
        <SplashView 
          onFinishLoad={()=> setInitialize(true)}
        />
  );

  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  )
}

