import React, {useState} from 'react';
import {ButtonBorderRadius} from '../styled/Button';
import {ImageCirclePreview, ImageAbsolute} from '../styled/Image';
import ImagePicker from 'react-native-image-crop-picker';
import {isEmpty} from '../../utils/functions';

// 이미지 선택하고 이미지 리턴
// urlPath : 이미지 경로
// size : 크기
// isIcon : 하단 아이콘 출력 여부 true, false
// onPress : 이미지 리턴 받을 함수 return image

const PickProfile = (props) => {
  return (
    <ButtonBorderRadius
      width={props.size || 124}
      height={props.size || 124}
      borderRadius={props.size / 2 || 124 / 2}
      onPress={props.onPressPick}>
      <ImageCirclePreview
        size={props.size || 124}
        source={
          isEmpty(props.urlPath)
            ? require('../../assets/profile/icon_person_profile.png')
            : props.urlPath.path
            ? {uri: props.urlPath.path}
            : {uri: props.urlPath}
        }
      />
      {props.isIcon ? (
        <ImageAbsolute
          right={-1}
          width={32}
          height={32}
          alignSelf={'flex-end'}
          source={require('../../assets/profile/icon_camera_oval.png')}
        />
      ) : null}
    </ButtonBorderRadius>
  );
};

export default PickProfile;
