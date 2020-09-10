import React from 'react';
import {
  ViewRow,
  View,
  ViewRowAbsolute,
  ViewBorderRadius,
} from '../../../../../components/styled/View';
import {Text} from '../../../../../components/styled/Text';

// 회원가입 상태바
// data : 출력 데이터
// state : 상태
const StateBar = (props) => {
  const renderText = () => {
    let retList = [];
    let textList = [];
    let viewList = [];
    let borderList = [];
    let percent = String(Math.ceil(100 / (props.data.length - 1))) + '%';
    for (let i = 0; i < props.data.length; i++) {
      textList.push(
        <Text
          key={'text' + i}
          ftSmall
          {...(props.state === i + 1
            ? {ftTheme: true, bold: true}
            : props.state > i + 1
            ? {ftTheme: true}
            : {ftLightGray: true})}>
          {props.data[i]}
        </Text>,
      );

      if (i !== props.data.length - 1) {
        viewList.push(
          <View
            key={'view' + i}
            marginTop={7}
            height={3}
            width={percent}
            {...(props.state > i + 1 ? {bgTheme: true} : {bgIceBlue: true})}
          />,
        );
      }

      borderList.push(
        <ViewBorderRadius
          key={'borderRadius' + i}
          width={18}
          height={18}
          borderWidth={2}
          borderRadius={10}
          {...(props.state === i + 1
            ? {brTheme: true, bgWhite: true}
            : props.state > i + 1
            ? {brTheme: true, bgTheme: true}
            : {brIceBlue: true, bgIceBlue: true})}
        />,
      );
    }

    retList.push(
      <ViewRow width={'100%'} justifyContent={'space-between'} key={'viewRow'}>
        {textList}
      </ViewRow>,
    );

    retList.push(
      <View
        key={'view'}
        height={30}
        marginTop={5}
        paddingLeft={15}
        paddingRight={15}
        width={'100%'}
        alignItems={'center'}>
        <ViewRow width={'90%'} justifyContent={'space-between'}>
          {viewList}
        </ViewRow>
      </View>,
    );

    retList.push(
      <ViewRowAbsolute
        key={'rowAbsolute'}
        width={'90%'}
        height={30}
        marginTop={20}
        alignSelf={'center'}
        justifyContent={'space-between'}>
        {borderList}
      </ViewRowAbsolute>,
    );

    return retList;
  };

  return <View>{renderText()}</View>;
};

export default StateBar;
