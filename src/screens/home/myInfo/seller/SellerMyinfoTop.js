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
import * as toastActions from '../../../../store/modules/toast/actions';
import * as userActions from '../../../../store/modules/user/actions';
import * as globalActions from '../../../../store/modules/global/actions';
import ImagePicker from 'react-native-image-crop-picker';

const SellerMyInfoTop = () => {
  const dispatch = useDispatch();
  const {
    jwtToken,
    userId,
    platform,
    channelInfo,
    userInfo,
    additionalInfo,
    toastMsg,
    monthlyBroadcastTime,
    monthlyBroadcastCount,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      platform: state.user.platform,
      channelInfo: state.user.channelInfo,
      userInfo: state.user.userInfo,
      additionalInfo: state.user.additionalInfo,
      toastMsg: state.user.toastMsg,
      monthlyBroadcastTime: state.user.monthlyBroadcastTime,
      monthlyBroadcastCount: state.user.monthlyBroadcastCount,
    }),
    shallowEqual,
  );
  console.log('userInfo => ', userInfo);

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

  // 나의 정보 - 해쉬태그
  const renderAdditionalInfo = useMemo(() => {
    const ret = [];
    if (additionalInfo) {
      for (let i = 0; i < additionalInfo.length; i++) {
        if (interestItems[additionalInfo[i]].indexOf('(') === -1) {
          ret.push('#' + interestItems[additionalInfo[i]].replace(/\n/g, ''));
        } else {
          let string = interestItems[additionalInfo[i]].substring(
            0,
            interestItems[additionalInfo[i]].indexOf('('),
          );

          ret.push('#' + string.replace(/\n/g, ''));
        }
      }
    }
    return ret;
  }, [additionalInfo]);

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
          urlPath={
            typeof userInfo.profileImageUrl !== 'undefined'
              ? userInfo.profileImageUrl
              : null
          }
          onPressPick={onPressPick}
        />
        <View justifyContent={'center'} marginLeft={10}>
          <ViewRow alignItems={'center'} justifyContent={'space-between'}>
            <Text ftWhite bold fontSize={20}>
              {userInfo.nickName}
            </Text>
            <Image
              marginLeft={10}
              width={20}
              height={20}
              source={oAuthImage(platform)}
            />
          </ViewRow>
          <Text ftIceBlue>셀러 코드 SV{userInfo.sellerCode}</Text>
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

      <ViewRow
        marginTop={10}
        marginBottom={10}
        width={'100%'}
        justifyContent={'space-between'}>
        <View width={'33%'} alignItems={'center'}>
          <Text ftWhite ftLarge bold>
            {channelInfo.followerCount}
          </Text>
          <ViewBorderRadius bgTheme borderRadius={5} marginTop={5}>
            <Text ftDarkNavy paddingLeft={10} paddingRight={10} bold>
              팔로워
            </Text>
          </ViewBorderRadius>
        </View>
        <ViewBorder marginTop={10} marginBottom={10} brNavy />
        <View width={'33%'} alignItems={'center'}>
          <ViewRow>
            <Text ftWhite ftLarge bold>
              {/*{channelInfo.followingCount}*/}
              {monthlyBroadcastCount}
            </Text>
          </ViewRow>
          <ViewBorderRadius bgTheme borderRadius={5} marginTop={5}>
            <Text ftDarkNavy paddingLeft={10} paddingRight={10} bold>
              월 방송 횟수
            </Text>
          </ViewBorderRadius>
        </View>
        <ViewBorder marginTop={10} marginBottom={10} brNavy />
        <View width={'33%'} alignItems={'center'}>
          <Text ftWhite ftLarge bold>
            {Math.floor(monthlyBroadcastTime / 60)}
          </Text>
          <ViewBorderRadius bgTheme borderRadius={5} marginTop={5}>
            <Text ftDarkNavy paddingLeft={10} paddingRight={10} bold>
              월 방송 시간
            </Text>
          </ViewBorderRadius>
        </View>
      </ViewRow>
      <View paddingBottom={10}>
        <Text ftIceBlue paddingLeft={5} paddingRight={5}>
          {renderAdditionalInfo.map((item, index) => item + ' ')}
        </Text>
      </View>
    </View>
  );
};

export default SellerMyInfoTop;
