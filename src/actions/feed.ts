import { FeedInfo } from '../@types/FeedInfo';
import { RootReducer } from '../store';
import { sleep } from '../utils/sleep';
import {ThunkAction } from 'redux-thunk';

export const GET_FEED_LIST_REQUEST = 'GET_FEED_LIST_REQUEST' as const;
export const GET_FEED_LIST_SUCCESS = 'GET_FEED_LIST_SUCCESS' as const;
export const GET_FEED_LIST_FAILURE = 'GET_FEED_LIST_FAILURE' as const;

export const CREATE_FEED_REQUEST = 'CREATE_FEED_REQUEST' as const;
export const CREATE_FEED_SUCCESS = 'CREATE_FEED_SUCCESS' as const;
export const CREATE_FEED_FAILURE = 'CREATE_FEED_FAILURE' as const;

export const FAVORITE_FEED_REQUEST = 'FAVORITE_FEED_REQUEST' as const;
export const FAVORITE_FEED_SUCCESS = 'FAVORITE_FEED_SUCCESS' as const;
export const FAVORITE_FEED_FAILURE = 'FAVORITE_FEED_FAILURE' as const;

export const getFeedListRequest = () => {
  return {
    type:GET_FEED_LIST_REQUEST
  }
}

export const getFeedListSuccess = (list:FeedInfo[]) => {
  return {
    type:GET_FEED_LIST_SUCCESS,
    list
  }
}

export const getFeedListFailure = () => {
  return {
    type:GET_FEED_LIST_FAILURE
  }
}

export const getFeedList = ():TypeFeedListThunkAction => async(dispatch) => {
  dispatch(getFeedListRequest());

  await sleep(500);

  dispatch(getFeedListSuccess([{
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

export const createFeedRequest = () => {
  return {
    type: CREATE_FEED_REQUEST
  }
}

export const createFeedSuccess = (item:FeedInfo) => {
  return {
    type: CREATE_FEED_SUCCESS,
    item
  }
}

export const createFeedFailure = () => {
  return {
    type: CREATE_FEED_FAILURE
  }
}

export const createFeed = (item:Omit<FeedInfo, 'id'|'writer'|'createdAt'|'likeHistory'>):TypeFeedListThunkAction => async (dispatch, getState) => {
  dispatch(createFeedRequest());

  const createdAt = new Date().getTime();
  const userInfo = getState().userInfo.userInfo;

  await sleep(200);

  dispatch(createFeedSuccess({
    id:'ID-010',
    content: item.content,
    writer:{
      name:userInfo?.name ?? 'Unknown',
      uid:userInfo?.uid ?? 'Unknown'
    },
    imageUrl:item.imageUrl,
    likeHistory:[],
    createdAt:createdAt
  }))

}

export const favoriteFeedRequest = () => {
  return {
    type:FAVORITE_FEED_REQUEST
  }
}

export const favoriteFeedSuccess = (feedId:FeedInfo['id'], myId:string, action:'add'|'del') => {
  return {
    type:FAVORITE_FEED_SUCCESS,
    feedId,
    myId,
    action
  }
}

export const favoriteFeedFailure = () => {
  return {
    type:FAVORITE_FEED_FAILURE
  }
}

export const favoriteFeed = (item:FeedInfo):TypeFeedListThunkAction => async (dispatch, getState) => {
  dispatch(favoriteFeedRequest());

  const myId = getState().userInfo.userInfo?.uid || null;

  if(myId === null){
    dispatch(favoriteFeedFailure());
    return;
  }

  await sleep(1000);
  const hasMyId = item.likeHistory.filter((likeUserId)=> likeUserId === myId).length > 0;

  if(hasMyId){
    // 있을 경우엔 빼는 액션
    dispatch(favoriteFeedSuccess(item.id, myId, 'del'));
  } else {
    dispatch(favoriteFeedSuccess(item.id, myId, 'add'));
    // 없을 경우엔 추가하는 액션
  }

}

export type TypeFeedListThunkAction = ThunkAction<void, RootReducer, undefined, TypeFeedListActions>
export type TypeFeedListActions = 
  | ReturnType<typeof getFeedListRequest>
  | ReturnType<typeof getFeedListSuccess>
  | ReturnType<typeof getFeedListFailure>
  | ReturnType<typeof createFeedRequest>
  | ReturnType<typeof createFeedSuccess>
  | ReturnType<typeof createFeedFailure>
  | ReturnType<typeof favoriteFeedRequest>
  | ReturnType<typeof favoriteFeedSuccess>
  | ReturnType<typeof favoriteFeedFailure>
