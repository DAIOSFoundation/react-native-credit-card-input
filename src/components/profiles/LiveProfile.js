import React from 'react';
import {Text} from '../styled/Text';
import {View} from '../styled/View';
import {ButtonBorderRadius} from '../styled/Button';
import {ImageCirclePreview, ImageAbsolute} from '../styled/Image';
import {isEmpty} from '../../utils/functions';
import * as broadcastActions from '../../store/modules/broadcast/actions';
import {Actions} from 'react-native-router-flux';
import {useDispatch} from 'react-redux';

// 라이브 셀러와 셀러 프로필
// id : 구분 id onPress 리턴에 포함
// urlPath : 이미지 경로
// isLive : 라이브 중 여부 true, false
// userName : 하단 유저 이름
// onPress : 프로필 터치 리턴 받을 함수
// disabled : 버튼 비 활성화
// size : 크기
{
  /*
  <LiveProfile
    id={'uniKey'}
    urlPath={''}
    isLive={true}
    userName={'최상호'}
    onPress={onPressProfile}/> */
}
const LiveProfile = (props) => {
  const dispatch = useDispatch();

  const onPress = () => {
    // let param = {
    //   broadcastId: '5f17fac2a2372211d4e8c841',
    //   productId: '5ef416e3b2cf070ffc80123d',
    // };
    //
    // dispatch(broadcastActions.get_broadcast_detail_info('5f17fac2a2372211d4e8c841'));
    // Actions.youtubeFullScreen(param);
  };

  return props.isLive ? (
    <View width={props.size || 68}>
      <ButtonBorderRadius
        brTheme
        width={props.size || 68}
        height={props.size || 68}
        borderRadius={props.size / 2 || 68 / 2}
        borderWidth={2}
        disabled={props.disabled}
        onPress={onPress}>
        <ImageCirclePreview
          brDarkNavy
          borderWidth={1}
          size={props.size - 4 || 62}
          source={
            isEmpty(props.urlPath)
              ? require('../../assets/profile/icon_person_profile.png')
              : {uri: props.urlPath}
          }
        />
        <ImageAbsolute
          right={-5}
          width={20}
          height={20}
          alignSelf={'flex-end'}
          source={require('../../assets/profile/icon_pinklive.png')}
        />
      </ButtonBorderRadius>
      {props.userName ? (
        <Text ftWhite textAlign={'center'}>
          {props.userName}
        </Text>
      ) : null}
    </View>
  ) : (
    <View width={props.size || 68}>
      <ButtonBorderRadius
        brLightNavy
        width={props.size || 68}
        height={props.size || 68}
        borderRadius={props.size / 2 || 68 / 2}
        borderWidth={2}
        disabled={props.disabled}
        onPress={onPress}>
        <ImageCirclePreview
          brDarkNavy
          size={props.size - 4 || 64}
          borderWidth={3}
          source={
            isEmpty(props.urlPath)
              ? require('../../assets/profile/icon_person_profile.png')
              : {uri: props.urlPath}
          }
        />
      </ButtonBorderRadius>
      {props.userName ? (
        <Text ftWhite textAlign={'center'}>
          {props.userName}
        </Text>
      ) : null}
    </View>
  );
};

export default LiveProfile;
