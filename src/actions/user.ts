import { ThunkAction } from 'redux-thunk';
import { sleep } from '../utils/sleep';
import { RootReducer } from '../store';
import { FeedInfo } from '../@types/FeedInfo';
import { UserInfo } from '../@types/UserInfo';

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

export const signIn = ():TypeUserThunkAction => async (dispatch) => {
  await sleep(1000);
  dispatch(setUserInfo({
    uid:'TEST_UID',
    name:'TEST_NAME',
    profileImage:'TEST_PROFILE_IMAGE'
  }));
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
    imageUrl:'IMAGE_URL_01',
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
    imageUrl:'IMAGE_URL_02',
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
    imageUrl:'IMAGE_URL_03',
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
    imageUrl:'IMAGE_URL_04',
    likeHistory:['UID_01', 'UID_02', 'UID_03'],
    createdAt:new Date().getTime()
  },
]));
}


export type TypeUserThunkAction = ThunkAction<Promise<void>, RootReducer, undefined, TypeUserInfoActions>;
export type TypeUserInfoActions = 
  | ReturnType<typeof setUserInfo>
  | ReturnType<typeof getMyFeedRequest>
  | ReturnType<typeof getMyFeedSuccess>
  | ReturnType<typeof getMyFeedFailure>