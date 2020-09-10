import React from 'react';
import {Content, Spinner} from 'native-base';
// utils Import
import {screenHeight, screenWidth} from '../styled/ScreenSize';
// Styled Component
import {SafeAreaView} from '../styled/View';

// *** 로딩바 ***
// color : 로딩바 색상
// bgColor : 백그라운드 색상
// tabBar : 탭바 존재 여부 default = true //todo 분기처리 할 예정
const LoadingBar = (props) => {
  const bgColor = props.bgColor || 'white';

  return (
    <SafeAreaView width={'100%'} height={'100%'} {...bgColor}>
      <Content>
        <Spinner
          style={{
            justifySelf: 'center',
            height: screenHeight,
            width: screenWidth,
            alignItems: 'center',
            alignSelf: 'center',
            justifyItems: 'center',
          }}
          color={props.color}
        />
      </Content>
    </SafeAreaView>
  );
};

export default LoadingBar;
