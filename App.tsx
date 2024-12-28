import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootApp } from './src/RootApp';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:'66885161739-8iptqdk41hb36lpup3tkl4h2ibe2epj2.apps.googleusercontent.com',
  offlineAccess:true
});

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootApp />
      </Provider>
    </SafeAreaProvider>
  );
}
