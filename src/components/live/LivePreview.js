import React, {useEffect, useState} from 'react';
// Styled Component
import {
  View,
  ViewAbsolute,
  ViewBorderRadius,
  ViewRadiusCustom,
  ViewRow,
} from '../styled/View';
import {Image} from '../styled/Image';
import {Text} from '../styled/Text';
import SellerProfile from '../profiles/SellerProfile';
import {Button} from '../styled/Button';
// utils Import
import {isEmpty} from '../../utils/functions';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
// assets Images
const iconBellPressed = require('../../assets/main/icon_bell_pressed.png');
const iconBellNormal = require('../../assets/main/icon_bell_normal.png');

// 라이브 예고 상세정보 화면
// id : broadcast ID
// imagePath : 이미지 경로
// sellerNickName : 셀러 닉네임
// profilePath : 셀러 이미지 경로
// status : 라이브 or 녹방 상태
// detail: 상세화면 분기 처리
// date : 날짜 및 시간
// height : 높이 설정
// time : 방송 시간
// day : 방송 요일
// date : 방송 월,일
// alarmStatus : 알람 상태값
// user : 메인화면에서 진입한 것 인지 / 유저 나의 마이페이지에서 예약방송 진입한것인지 분기

const LivePreview = (props) => {
  //todo 추후 date 부분 수정 예정

  const height = props.height || {height: 200};

  const borderTopLeftRadius = props.borderTopLeftRadius || {
    borderTopLeftRadius: 0,
  };
  const borderTopRightRadius = props.borderTopRightRadius || {
    borderTopRightRadius: 0,
  };

  // 알림 취소 버튼 이벤트 - 메인화면
  const onPressDeleteAlarm = (alarm) => {
    if (!isEmpty(props.onPressDeleteAlarm)) {
      props.onPressDeleteAlarm([alarm, props.alarmStatus]);
    }
  };
  // 알람 받기 버튼 이벤트 - 메인화면
  const onPressRequestAlarm = (alarm) => {
    if (!isEmpty(props.onPressRequestAlarm)) {
      props.onPressRequestAlarm([alarm, props.alarmStatus]);
    }
  };

  // 알림 취소 버튼 이벤트 - 유저 마이페이지 - 예약방송
  const onPressUserDeleteAlarm = (alarm) => {
    if (!isEmpty(props.onPressUserDeleteAlarm)) {
      props.onPressUserDeleteAlarm(alarm);
    }
  };

  // 상세화면 알람 이미지 분기 - 메인화면
  const detailAlarm = () => {
    if (!props.detail) {
      return null;
    } else {
      if (props.alarmStatus.status) {
        return (
          <Button
            width={'auto'}
            height={'auto'}
            onPress={() => onPressDeleteAlarm(props.id)}>
            <Image width={30} height={30} source={iconBellPressed} />
          </Button>
        );
      } else {
        return (
          <Button
            width={'auto'}
            height={'auto'}
            onPress={() => onPressRequestAlarm(props.id)}>
            <Image width={30} height={30} source={iconBellNormal} />
          </Button>
        );
      }
    }
  };

  // 예약방송 알람 이미지
  const userAlarm = () => {
    return (
      <Button
        width={'auto'}
        height={'auto'}
        onPress={() => onPressUserDeleteAlarm(props.id)}>
        <Image width={30} height={30} source={iconBellPressed} />
      </Button>
    );
  };

  return (
    <View {...height}>
      <ViewRadiusCustom
        {...borderTopLeftRadius}
        {...borderTopRightRadius}
        style={{overflow: 'hidden'}}>
        <TouchableOpacity onPress={props.onPress}>
          <Image source={{uri: props.imagePath}} />
        </TouchableOpacity>
        <ViewAbsolute top left>
          <ViewRow alignItems={'center'}>
            {props.status ? (
              <SellerProfile disabled size={35} urlPath={props.profilePath} />
            ) : (
              <SellerProfile
                outBorderColor={{brDarkNavy: true}}
                disabled
                size={35}
                urlPath={props.profilePath}
              />
            )}
            <Text ftWhite marginLeft={10} bold>
              {props.sellerNickName}
            </Text>
          </ViewRow>
        </ViewAbsolute>
        <ViewAbsolute top right>
          {props.user ? userAlarm() : detailAlarm()}
        </ViewAbsolute>
        <ViewAbsolute bottom={15} paddingLeft={10}>
          <Text
            ftWhite
            ftLarge
            bold
            style={{
              textShadowColor: 'rgba(0,0,0,0.8)',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 10,
            }}>
            {props.date} ({props.day})
          </Text>
          <Text
            ftWhite
            bold
            fontSize={22}
            style={{
              textShadowColor: 'rgba(0,0,0,0.8)',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 10,
            }}>
            {props.time}
          </Text>
        </ViewAbsolute>
      </ViewRadiusCustom>
    </View>
  );
};

export default LivePreview;
