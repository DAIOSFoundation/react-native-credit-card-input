import React from 'react';
import {View} from '../styled/View';
import {ButtonBorderRadius} from '../styled/Button';
import {ImageCirclePreview} from '../styled/Image';
import {isEmpty} from '../../utils/functions';

// 셀러 프로필 이미지
// id : 구분 id onPress 리턴에 포함
// urlPath : 이미지 경로
// onPress : 프로필 터치 리턴 받을 함수
// disabled : 버튼 비 활성화
// size : 크기
// outLine : border 인라인 아웃라인
// borderWidth : broder 두꼐
// brTheme : 라인 색
{
  /*
  <SellerProfile
    id={'uniKey'}
    urlPath={''}
    onPress={onPress}/> */
}
const SellerProfile = (props) => {
  const inBorderColor = props.inBorderColor || {brDarkNavy: true};
  const outBorderColor = props.outBorderColor || {brTheme: true};

  const onPress = () => {
    props.onPress(props.id);
  };
  return (
    <View width={props.size || 68}>
      {props.outLine ? (
        <ButtonBorderRadius
          {...outBorderColor}
          width={props.size || 68}
          height={props.size || 68}
          borderRadius={props.size / 2 || 68 / 2}
          onPress={onPress}
          borderWidth={props.borderWidth || 2}
          disabled={props.disabled}>
          <ImageCirclePreview
            {...inBorderColor}
            size={props.size - 4 || 64}
            borderWidth={props.borderWidth - 1 || 1}
            source={
              isEmpty(props.urlPath)
                ? require('../../assets/profile/icon_person_profile.png')
                : {uri: props.urlPath}
            }
          />
        </ButtonBorderRadius>
      ) : (
        <ButtonBorderRadius
          width={props.size || 68}
          height={props.size || 68}
          borderRadius={props.size / 2 || 68 / 2}
          onPress={onPress}
          disabled={props.disabled}>
          <ImageCirclePreview
            {...outBorderColor}
            size={props.size || 64}
            borderWidth={props.borderWidth || 2}
            source={
              isEmpty(props.urlPath)
                ? require('../../assets/profile/icon_person_profile.png')
                : {uri: props.urlPath}
            }
          />
        </ButtonBorderRadius>
      )}
    </View>
  );
};

export default SellerProfile;
