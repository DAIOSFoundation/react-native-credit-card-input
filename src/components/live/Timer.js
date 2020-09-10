import React from 'react';

// Styled Component
import {View, ViewAbsoluteRadius, ViewBorderRadius} from '../styled/View';
import {Text} from '../styled/Text';
// *** 타이머 ***
// Live : 라이브방송 or 녹화방송 분기
// restTimer : 방송 남은 시간
// NPM Module
import CountDown from 'react-native-countdown-component';

const Timer = (props) => {
  return (
    <View>
      {props.live ? (
        <View justifyContent={'center'}>
          <ViewBorderRadius
            bgTheme
            width={65}
            height={32}
            borderRadius={15}
            justifyContent={'center'}
            zIndex={100}>
            <Text ftWhite bold textAlign={'center'} ftSmall>
              On Air
            </Text>
          </ViewBorderRadius>
          {/*<ViewAbsoluteRadius*/}
          {/*  bgDarkNavy*/}
          {/*  width={100}*/}
          {/*  height={30}*/}
          {/*  borderRadius={15}*/}
          {/*  right={0}*/}
          {/*  justifyContent={'center'}*/}
          {/*  alignItems={'flex-end'}>*/}
          {/*<CountDown*/}
          {/*  timeLabels={{m: null, s: null}}*/}
          {/*  showSeparator={true}*/}
          {/*  separatorStyle={{color: 'white'}}*/}
          {/*  until={props.restTimer}*/}
          {/*  digitTxtStyle={{color: 'white'}}*/}
          {/*  // onFinish={() => alert('방송 끄읏 !')}*/}
          {/*  timeToShow={['M', 'S']}*/}
          {/*  size={12}*/}
          {/*  digitStyle={{*/}
          {/*    backgroundColor: 'transport',*/}
          {/*  }}*/}
          {/*  style={{*/}
          {/*    justifyContent: 'center',*/}
          {/*  }}*/}
          {/*/>*/}
          {/*</ViewAbsoluteRadius>*/}
        </View>
      ) : (
        <View>
          {/*<ViewAbsoluteRadius*/}
          {/*  bgDarkNavy*/}
          {/*  height={30}*/}
          {/*  borderRadius={15}*/}
          {/*  right={0}*/}
          {/*  justifyContent={'center'}*/}
          {/*  alignItems={'flex-end'}>*/}
          {/*  <CountDown*/}
          {/*    timeLabels={{m: null, s: null}}*/}
          {/*    showSeparator={true}*/}
          {/*    separatorStyle={{color: 'white'}}*/}
          {/*    until={65}*/}
          {/*    digitTxtStyle={{color: 'white'}}*/}
          {/*    // onFinish={() => alert('방송 끄읏 !')}*/}
          {/*    timeToShow={['M', 'S']}*/}
          {/*    size={12}*/}
          {/*    digitStyle={{*/}
          {/*      backgroundColor: 'transport',*/}
          {/*    }}*/}
          {/*    style={{*/}
          {/*      justifyContent: 'center',*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</ViewAbsoluteRadius>*/}
        </View>
      )}
    </View>
  );
};

export default Timer;
