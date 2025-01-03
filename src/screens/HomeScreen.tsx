import React, { useCallback, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { useTotalFeedList } from '../selectors/feed';
import { FeedListItem } from '../components/FeedListItem';
import { useDispatch } from 'react-redux';
import { favoriteFeed, getFeedList, TypeFeedListDispatch } from '../actions/feed';
import { Spacer } from '../components/Spacer';
import { useRootNavigation } from '../navigations/RootStackNavigation';
import carshlytics from '@react-native-firebase/crashlytics';

export const HomeScreen:React.FC = () => {
  const rootNavigation = useRootNavigation();

  const feedList = useTotalFeedList();
  const dispatch = useDispatch<TypeFeedListDispatch>();
  const onPressHome = useCallback(()=>{
    console.log('onPressHome');
    rootNavigation.navigate('AddFeed');
  },[]);

  useEffect(()=>{
    carshlytics().crash();

    dispatch(getFeedList());
  }, []);

  return (
    <View style={{flex:1}}>
      <Header>
          <Header.Title title='HOME'></Header.Title>
          <Header.Icon iconName='add' onPress={onPressHome} />
      </Header>

      <FlatList 
        data={feedList}
        renderItem={({item})=>{
          const isLiked = item.likeHistory.length >0 ? true: false;
          return (
            <FeedListItem 
              image={item.imageUrl}
              comment={item.content}
              isLiked={isLiked}
              likeCount={item.likeHistory.length}
              writer={item.writer.name}
              createdAt={item.createdAt}
              onPressFeed={()=>{
                console.log('onPressFeed');
              }}
              onPressFavorite={()=>{
                console.log('onPressFavorite');
                dispatch(favoriteFeed(item));
              }}
            />
          )
        }}
        ItemSeparatorComponent={()=>(
          <Spacer space={24}/>
        )}  
      />
    </View>
  )
}

