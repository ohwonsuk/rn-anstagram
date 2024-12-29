import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootApp } from './src/RootApp';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import mobileAds, { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

GoogleSignin.configure({
  webClientId:'66885161739-8iptqdk41hb36lpup3tkl4h2ibe2epj2.apps.googleusercontent.com',
  offlineAccess:true
});

mobileAds().initialize().then((result)=>{
  console.log(result);
})

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Provider store={store}>
          <RootApp />
          <BannerAd unitId="ca-app-pub-1302837095363225~8380541177" size={BannerAdSize.FULL_BANNER} />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
