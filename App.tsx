import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FeedListItem } from './src/components/FeedListItem';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <FeedListItem 
          image='https://images.pexels.com/photos/250177/pexels-photo-250177.jpeg?auto=compress&cs=tinysrgb&w=800'
          likeCount={10}
          writer='Wonsuk Oh'
          comment='This is test!!'
          isLiked={true}
          onPressFeed={()=>{
            console.log('onpress!!')
          }
          }
        />
      </View>
    </SafeAreaProvider>
  );
}
