import React, {useState} from 'react';

import {ImageCirclePreview} from '../styled/Image';
import {ViewRow, View, ViewBorder} from '../styled/View';
import {Text} from '../styled/Text';
import {isEmpty} from '../../utils/functions';
import {GestureButtonBorderRadius} from '../styled/Button';

// 조회된 아이디중 선택
// id : 구분 id onPress
// urlPath : 이미지 경로
// name : 이름
const ConnectProfile = (props) => {
  const onPress = () => {
    props.onPress(props.id);
  };
  return (
    <ViewRow height={50} width={'100%'} justifyContent={'space-between'}>
      <ViewRow alignItems={'center'}>
        <ImageCirclePreview
          borderWidth={1}
          size={props.size || 40}
          source={
            isEmpty(props.urlPath)
              ? require('../../assets/profile/icon_person_profile.png')
              : {uri: props.urlPath}
          }
        />

        <Text ftDarkNavy ftLarge marginLeft={10}>
          {props.name}
        </Text>
      </ViewRow>

      <View alignItems={'center'} justifyContent={'center'}>
        <GestureButtonBorderRadius
          marginLeft={5}
          marginRight={5}
          brTheme
          borderRadius={20}
          width={62}
          height={26}
          onPress={onPress}>
          <Text ftTheme textAlign={'center'}>
            선택
          </Text>
        </GestureButtonBorderRadius>
      </View>
    </ViewRow>
  );
};

export default ConnectProfile;
