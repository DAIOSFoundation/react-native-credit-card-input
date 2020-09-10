import React, {useEffect, useMemo} from 'react';

import {
  ViewRow,
  View,
  ViewAbsolute,
  ViewBorderRadius,
  ViewBorder,
} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import {Button} from '../../../../components/styled/Button';
import {Image} from '../../../../components/styled/Image';
import PickProfile from '../../../../components/profiles/PickProfile';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {interestItems} from '../../../../utils/constants';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import * as signupActions from '../../../../store/modules/signup/actions';
import * as userActions from '../../../../store/modules/user/actions';
import * as globalActions from '../../../../store/modules/global/actions';
import ToastMessage from '../../../../components/toast/ToastMessage';

const ViewerMyInfoTop = () => {
  const dispatch = useDispatch();
  const {
    platform,
    userInfo,
    additionalInfo,
    userId,
    jwtToken,
    toastMsg,
    toastMessage,
  } = useSelector(
    (state) => ({
      platform: state.user.platform,
      userInfo: state.user.userInfo,
      additionalInfo: state.user.additionalInfo,
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      toastMsg: state.user.toastMsg,
      toastMessage: state.global.toastMessage,
    }),
    shallowEqual,
  );

  const oAuthImage = (platform) => {
    switch (platform) {
      case 'kakao':
        return require('../../../../assets/login/kakao.png');
      case 'naver':
        return require('../../../../assets/login/naver.png');
      case 'facebook':
        return require('../../../../assets/login/facebook.png');
      default:
        return null;
    }
  };

  const renderAdditionalInfo = () => {
    const ret = [];
    if (additionalInfo) {
      for (let i = 0; i < additionalInfo.length; i++) {
        ret.push(interestItems[additionalInfo[i]].replace(/\n/g, '') + '\t');
      }
    }
    return ret;
  };
  // 프로필 이미지 변경
  // 이미지 picker
  const onPressPick = () => {
    ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      cropping: true,
    }).then((image) => {
      const data = {userId, jwtToken, image: {profileImage: image}};
      dispatch(userActions.upload_profile_image(data));
    });
  };

  useEffect(() => {
    if (toastMsg === 'SUCCESS') {
      dispatch(globalActions.change_toast_message('업로드 성공 하였습니다.'));
      dispatch(userActions.reset_msg());
    }
  }, [toastMsg]);

  useEffect(() => {
    const param = {
      userId,
      jwtToken,
    };
    if (userId && jwtToken) {
      dispatch(userActions.request_user_myinfo(param));
    }
  }, [toastMsg]);

  return (
    <View bgDarkNavy paddingLeft={15} paddingRight={15}>
      <ViewRow alignItems={'center'} marginTop={15}>
        <PickProfile
          size={72}
          urlPath={userInfo.profileImageUrl ? userInfo.profileImageUrl : null}
          onPressPick={onPressPick}
        />
        <View justifyContent={'center'} marginLeft={10}>
          <ViewRow alignItems={'center'} justifyContent={'space-between'}>
            <Text ftWhite bold fontSize={20} marginRight={10}>
              {userInfo.nickName}
            </Text>
            <Image width={20} height={20} source={oAuthImage(platform)} />
          </ViewRow>
        </View>
        <ViewAbsolute width={24} top right>
          <Button
            width={24}
            height={24}
            hitSlop={{top: 60, bottom: 60, left: 60, right: 60}}
            onPress={() => Actions.settingScreen()}>
            <Image
              source={require('../../../../assets/common/icon_setting_pink.png')}
            />
          </Button>
        </ViewAbsolute>
      </ViewRow>
      <ViewRow alignItems={'center'} marginTop={10}>
        <Image
          width={12}
          height={12}
          marginRight={5}
          source={require('../../../../assets/myinfo/icon_star_navy.png')}
        />
        <Text ftWhite>관심태그</Text>
      </ViewRow>
      {additionalInfo ? (
        <Text
          ftIceBlue
          marginTop={10}
          marginBottom={10}
          paddingLeft={5}
          paddingRight={5}>
          {useMemo(() => renderAdditionalInfo())}
        </Text>
      ) : (
        <Button alignItems={'center'} justifyContent={'flex-start'}>
          <Text ftWhite>설문 답변시 500P 쿠폰 증정</Text>
        </Button>
      )}
    </View>
  );
};

export default ViewerMyInfoTop;
