import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { signIn, TypeUserDispatch } from './actions/user';
import { LoadingView } from './components/LoadingView';
import { LocalImage } from './components/LocalImage';
import { Typography } from './components/Typography';
import { Spacer } from './components/Spacer';


export const SplashView:React.FC<{onFinishLoad:()=>void}> = (props) => {
  const [showLoginButton, setShowLoginButton] = useState(false);
  const dispatch = useDispatch<TypeUserDispatch>();

  const appInit = useCallback(async ()=>{
    try{
      const userInfo = await GoogleSignin.signInSilently();
      const idToken = userInfo.data?.idToken ?? '';
      if(idToken !== null){
        // await
        // 로그인에 대한 어떠한 처리
        await dispatch(signIn(idToken));
        props.onFinishLoad();
      }
      // setShowLoginButton(true);
    }catch(ex){
      setShowLoginButton(true);
    }
  }, []);

  const onPressSignIn = useCallback(async ()=>{
    console.log('user select');
    try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog:true
    })
    console.log('signin');
    const userInfo = await GoogleSignin.signIn();
    console.log('get userinfo');
    const idToken = userInfo.data?.idToken ?? '';
    console.log('User Info',userInfo);
    if(idToken !== null){
      //signin
      await dispatch(signIn(idToken));
      props.onFinishLoad();
    }else{
      console.log('no user info');
    }} catch (error) {
      console.error('Google Sign-In Error',error);
    }
  }, []);

  useEffect(()=>{
    appInit();
  }, []);

  if (!showLoginButton) return (
    <LoadingView />
  );

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <View>
        <LocalImage localAsset={require('../assets/icon.png')} width={100} height={100} />
      </View>
      <Spacer space={50} />
      <View>
        <Typography fontSize={36} color='blue'>Daily Photo Memo</Typography>
      </View>
      <Spacer space={20} />
      {showLoginButton && <GoogleSigninButton onPress={onPressSignIn} />}
    </View>
  )
}

