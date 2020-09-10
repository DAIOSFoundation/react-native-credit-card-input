import React, {useState, useEffect} from 'react';
import {ViewRow, View} from '../../components/styled/View';
import {Text} from '../../components/styled/Text';
import {Button} from '../../components/styled/Button';
import {Image} from '../../components/styled/Image';
import {isEmpty} from '../../utils/functions';
import {NBCheckBox} from '../styled/CheckBox';

// 기본 체크박스
// id : 고유값
// text: 텍스트
// textStyle : 텍스트 스타일
// onPress : 체크박스 터치 리턴 함수 체크 여부 리턴함
// size : 체크박스 크기
// isRight : 체크박스 방향
const BasicCheckBox = (props) => {
  const textStyle = props.textStyle || {ftDarkNavy: true};
  const size = props.size || 22;

  const onPress = () => {
    props.onPress([!props.checked, props.id]);
  };

  return props.isRight ? (
    <Button onPress={() => onPress()}>
      <ViewRow
        height={'100%'}
        justifyContent={'space-between'}
        alignItems={'center'}
        paddingLeft={10}
        paddingRight={10}
        width={'100%'}>
        {isEmpty(props.text) ? null : (
          <Text marginRight={10} {...textStyle}>
            {props.text}
          </Text>
        )}

        <Image
          width={size}
          height={size}
          resizeMode={'stretch'}
          source={
            props.checked
              ? require('../../assets/checkbox/icon_check_pressed.png')
              : require('../../assets/checkbox/icon_check_normal.png')
          }
        />
      </ViewRow>
    </Button>
  ) : (
    <Button
      justifyContent={'flex-start'}
      disabled={props.disabled}
      onPress={() => onPress()}
      paddingLeft={10}>
      <ViewRow alignItems={'center'}>
        <Image
          width={size}
          height={size}
          resizeMode={'stretch'}
          source={
            props.checked
              ? require('../../assets/checkbox/icon_check_pressed.png')
              : require('../../assets/checkbox/icon_check_normal.png')
          }
        />

        {/* <NBCheckBox size={props.size}  disabled={props.disabled} checked={props.checked}  */}
        {/* onPress={() => onPress()}/> */}

        {isEmpty(props.text) ? null : (
          <Text marginLeft={10} {...textStyle}>
            {props.text}
          </Text>
        )}
      </ViewRow>
    </Button>
  );
};

export default BasicCheckBox;
