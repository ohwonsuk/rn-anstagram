import React, { ReactElement } from 'react';
import { View } from 'react-native';
import {State, TapGestureHandler} from 'react-native-gesture-handler';

export const DoubleTabButton:React.FC<{
  onPressDoubleTab:()=>void;
  children:ReactElement
}> = (props) => {
  return (
    <TapGestureHandler
      numberOfTaps={2}
      onHandlerStateChange={({nativeEvent})=>{
        if(nativeEvent.state === State.ACTIVE){
          props.onPressDoubleTab();
        }
      }}
      >
      <View>
        {props.children}
      </View>
    </TapGestureHandler>
  )
}


