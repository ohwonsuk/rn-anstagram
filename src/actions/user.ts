import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { sleep } from '../utils/sleep';
import { RootReducer } from '../store';
import { FeedInfo } from '../@types/FeedInfo';
import { UserInfo } from '../@types/UserInfo';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const SET_USER_INFO = 'SET_USER_INFO' as const;

export const GET_MY_FEED_REQUEST = 'GET_MY_FEED_REQUEST' as const;
export const GET_MY_FEED_SUCCESS = 'GET_MY_FEED_SUCCESS' as const;
export const GET_MY_FEED_FAILURE = 'GET_MY_FEED_FAILURE' as const;

export const setUserInfo = (user:UserInfo) => {
  return {
    type: SET_USER_INFO,
    user
  }
}

export const getMyFeedRequest = () => {
  return {
    type:GET_MY_FEED_REQUEST
  }
}

export const getMyFeedSuccess = (list:FeedInfo[]) => {
  return {
    type: GET_MY_FEED_SUCCESS,
    list
  }
}

export const getMyFeedFailure = () => {
  return {
    type: GET_MY_FEED_FAILURE
  }
}

export const signIn = (idToken:string):TypeUserThunkAction => async (dispatch) => {
  // await sleep(1000);
  // dispatch(setUserInfo({
  //   uid:'TEST_UID',
  //   name:'TEST_NAME',
  //   profileImage:'TEST_PROFILE_IMAGE'
  // }));

  const googleSigninCredential = auth.GoogleAuthProvider.credential(idToken);
  const signinResult = await auth().signInWithCredential(googleSigninCredential);
  console.log('signin-result', signinResult);
  const userDB = await database().ref(`/users/${signinResult.user.uid}`);
  const user = await userDB.once('value').then((snapshot)=> snapshot.val());
  console.log('user', user);

  const now = new Date().getTime();
  if(user === null){
    await userDB.set({
      name:signinResult.user.displayName,
      profileImage:signinResult.user.photoURL,
      uid:signinResult.user.uid,
      createdAt:now,
      lastLoginAt:now
    })
  }else{
    await userDB.update({
      lastLoginAt:now
    })
  }

  dispatch(
    setUserInfo({
      uid:signinResult.user.uid,
      name:signinResult.user.displayName ?? 'Unknown Name',
      profileImage:signinResult.user.photoURL ?? ''
    })
  )
}

export const getMyFeedList = ():TypeUserThunkAction => async (dispatch) => {
  dispatch(getMyFeedRequest());

  await sleep(500);

  dispatch(getMyFeedSuccess([{
    id:'ID_01',
    content:'CONTENT_01',
    writer:{
      name:'WRITER_NAME_01',
      uid:'WRITER_UID_01'
    },
    imageUrl:'https://images.pexels.com/photos/5723941/pexels-photo-5723941.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
    likeHistory:['UID_01', 'UID_02', 'UID_03'],
    createdAt:new Date().getTime()
  },
  {
    id:'ID_02',
    content:'CONTENT_02',
    writer:{
      name:'WRITER_NAME_02',
      uid:'WRITER_UID_02'
    },
    imageUrl:'https://images.pexels.com/photos/5723941/pexels-photo-5723941.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
    likeHistory:['UID_01', 'UID_02', 'UID_03'],
    createdAt:new Date().getTime()
  },
  {
    id:'ID_03',
    content:'CONTENT_03',
    writer:{
      name:'WRITER_NAME_03',
      uid:'WRITER_UID_03'
    },
    imageUrl:'https://images.pexels.com/photos/5723941/pexels-photo-5723941.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
    likeHistory:['UID_01', 'UID_02', 'UID_03'],
    createdAt:new Date().getTime()
  },
  {
    id:'ID_04',
    content:'CONTENT_04',
    writer:{
      name:'WRITER_NAME_01',
      uid:'WRITER_UID_01'
    },
    imageUrl:'https://images.pexels.com/photos/5723941/pexels-photo-5723941.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
    likeHistory:['UID_01', 'UID_02', 'UID_03'],
    createdAt:new Date().getTime()
  },
]));
}

export type TypeUserDispatch = ThunkDispatch<RootReducer, undefined, TypeUserInfoActions>
export type TypeUserThunkAction = ThunkAction<Promise<void>, RootReducer, undefined, TypeUserInfoActions>;
export type TypeUserInfoActions = 
  | ReturnType<typeof setUserInfo>
  | ReturnType<typeof getMyFeedRequest>
  | ReturnType<typeof getMyFeedSuccess>
  | ReturnType<typeof getMyFeedFailure>