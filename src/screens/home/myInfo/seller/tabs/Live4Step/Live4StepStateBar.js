import React from 'react';

import {
  View,
  ViewRow,
  ViewRowAbsolute,
  ViewBorderRadius,
} from '../../../../../../components/styled/View';
import {Text} from '../../../../../../components/styled/Text';
import {Image} from '../../../../../../components/styled/Image';

// 4step상태바
// data : 출력 데이터
// state : 상태
// isBottom : 텍스트 하단 or 상단
const Live4StepStateBar = (props) => {
  const renderText = () => {
    let retList = [];
    let textList = [];
    let viewList = [];
    let borderList = [];
    let percent = String(Math.floor(100 / (props.data.length - 1))) + '%';
    for (let i = 0; i < props.data.length; i++) {
      textList.push(
        <Text
          key={i}
          marginTop={15}
          ftSmall
          {...(props.state === i + 1
            ? {ftTheme: true, bold: true}
            : props.state > i + 1
            ? {ftTheme: true}
            : {ftDarkNavy: true})}>
          {props.data[i]}
        </Text>,
      );

      if (i !== props.data.length - 1) {
        viewList.push(
          <View
            key={i}
            height={4}
            width={percent}
            {...(props.state > i + 1 ? {bgTheme: true} : {bgIceBlue: true})}
          />,
        );
      }

      borderList.push(
        <View key={i} justifyContent={'flex-end'}>
          {i === props.state - 1 ? (
            <Image
              width={15}
              height={25}
              resizeMode={'stretch'}
              source={require('../../../../../../assets/myinfo/icon_human.png')}
            />
          ) : null}
          <ViewBorderRadius
            width={13}
            height={13}
            borderWidth={2}
            borderRadius={10}
            {...(props.state === i + 1
              ? {brTheme: true, bgWhite: true}
              : props.state > i + 1
              ? {brTheme: true, bgTheme: true}
              : {brIceBlue: true, bgIceBlue: true})}
          />
        </View>,
      );
    }

    retList.push(
      <View key={Math.random()}>
        <View
          height={30}
          justifyContent={'flex-end'}
          width={'100%'}
          alignItems={'center'}>
          <ViewRow width={'70%'} justifyContent={'space-between'}>
            {viewList}
          </ViewRow>
        </View>
        <ViewRow
          width={'100%'}
          justifyContent={'space-between'}
          paddingLeft={20}
          paddingRight={20}>
          {textList}
        </ViewRow>
        <ViewRowAbsolute
          width={'75%'}
          height={30}
          marginTop={5}
          alignSelf={'center'}
          justifyContent={'space-between'}>
          {borderList}
        </ViewRowAbsolute>
      </View>,
    );
    return retList;
  };

  return (
    <View marginTop={20} marginLeft={20} marginRight={20} marginBottom={20}>
      {renderText()}
    </View>
  );
};
export default Live4StepStateBar;
