import React from 'react';
// Styled Component
import {View} from '../../../../../components/styled/View';
// NPM Module
import WebView from 'react-native-webview';

// 탭 - 상품상세정보 동영상플레이어
const ProductDetailPlayer = (props) => {
  return (
    <View width={'100%'} height={'100%'}>
      <WebView
        style={{
          width: '100%',
          height: '100%',
          alignSelf: 'center',
          alignContent: 'center',
        }}
        source={{
          uri: props.data,
        }}
      />
    </View>
  );
};

export default ProductDetailPlayer;
