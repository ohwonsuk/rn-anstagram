import React from 'react';
import { ImageProps, StyleProp ,Image as RNImage } from 'react-native';

export const LocalImage:React.FC<{
  localAsset:number,
  width:number,
  height:number,
  style?:StyleProp<ImageProps>
}> = (props) => {
  return (
    <RNImage
      source={props.localAsset}
      style={[props.style, {
        width: props.width,
        height: props.height
      }]} />
  )
}
