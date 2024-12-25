import React from 'react';
import { FlatList, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { FeedListItem } from '../components/FeedListItem';
import { Spacer } from '../components/Spacer';
import { useRootNavigation, useRootRoute } from '../navigations/RootStackNavigation';
import { HeaderIcon } from '../components/Header/HeaderIcon';

export const FeedListScreen:React.FC = () => {
  const route = useRootRoute<'FeedList'>();
  const navigation = useRootNavigation<'FeedList'>();

  return (
    <View style={{flex:1}}>
      <Header.Group>
          <Header.Title title='FEED LIST'></Header.Title>
          <Header.Icon 
            iconName='close' 
            onPress={()=>{
              navigation.goBack();
            }} />
      </Header.Group>

            <FlatList 
              data={route.params.list}
              renderItem={({item})=>{
                return (
                  <FeedListItem 
                    image={item.imageUrl}
                    comment={item.content}
                    isLiked={false}
                    likeCount={item.likeHistory.length}
                    writer={item.writer.name}
                    onPressFeed={()=>{
                      console.log('onPressFeed');
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

