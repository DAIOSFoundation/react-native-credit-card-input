import React, {useEffect} from 'react';
import SellerMyinfoScreen from './seller/SellerMyinfoScreen';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {Spinner} from 'native-base';
import {Dimensions, Linking} from 'react-native';
import * as userActions from '../../../store/modules/user/actions';
import * as broadcastActions from '../../../store/modules/broadcast/actions';
import * as globalActions from '../../../store/modules/global/actions';
import * as calendarActions from '../../../store/modules/calendar/actions';
import * as searchActions from '../../../store/modules/search/actions';
import {Text} from '../../../components/styled/Text';
import {View} from '../../../components/styled/View';
import ListButton from '../../../components/buttons/ListButton';
import Topbar from '../../../components/bar/Topbar';
import * as customModalActions from '../../../store/modules/modal/customModal/actions';
import {facebookLogOut} from '../../../lib/api/oauth/facebook';
import {kakaoLogOut} from '../../../lib/api/oauth/kakao';
import {naverLogin, naverLogout} from '../../../lib/api/oauth/naver';
import WebView from 'react-native-webview';

const SettingScreen = () => {
  const dispatch = useDispatch();

  const {userInfo, jwtToken, userId, platform} = useSelector(
    (state) => ({
      userInfo: state.user.userInfo,
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      platform: state.user.platform,
      // action.payload.data.channelInfo
    }),
    shallowEqual,
  );

  // 뒤로가기 버튼
  const onPressClose = () => {
    Actions.pop('MyInfo');
  };
  const clearStorage = async () => {
    console.log('clearStorage');
    try {
      const value = await AsyncStorage.multiGet([
        'jwtToken',
        'userId',
        'firebaseToken',
      ]);
      let param = {
        jwtToken: value[0][1],
        userId: value[1][1],
        firebaseToken: value[2][1],
      };
      dispatch(globalActions.delete_firebase_token(param));
      await AsyncStorage.clear();
      if (platform === 'facebook') {
        console.log('facebook logout');
        await facebookLogOut();
      } else if (platform === 'kakao') {
        console.log('kakao logout');
        await kakaoLogOut();
      } else if (platform === 'naver') {
        console.log('naver logout');
        await naverLogout();
      } else {
        console.log('no platform in redux!');
      }
      dispatch(userActions.change_init_state());
      dispatch(broadcastActions.change_init_state());
      dispatch(calendarActions.change_init_state());
      dispatch(searchActions.change_init_state());
      Actions.reset('tabBar');
    } catch (e) {
      console.log('onPressLogout error : ', e);
    }
  };
  const logOut = async () => {
    dispatch(customModalActions.change_modal_message('로그아웃 하시겠습니까?'));
    dispatch(customModalActions.change_modal_onebutton(false));
    dispatch(customModalActions.change_modal_visible(true));
    dispatch(customModalActions.change_modal_onpress_ok(clearStorage));
  };

  const onPressTermsOfService = () => {
    Actions.termsOfServiceScreen();
  };

  const onPressVersion = () => {
    Actions.versionInfoScreen();
  };

  return (
    <View height={'100%'}>
      <Topbar
        isLine
        title={'설정'}
        onPressLeft={onPressClose}
        isLeftButton={true}
      />
      <ListButton text={'로그아웃'} onPress={logOut} />
      {/*<ListButton text={'알람설정'} showArrow />*/}
      <ListButton
        text={'이용약관 및 개인정보 수집약관'}
        onPress={onPressTermsOfService}
        showArrow
      />
      <ListButton text={'버전정보'} onPress={onPressVersion} showArrow />
      {/*<ListButton text={'서비스 이용약관'} showArrow />*/}
      {/*<ListButton*/}
      {/*  text={'디플 결제화면'}*/}
      {/*  showArrow*/}
      {/*  onPress={() => Actions.dpleWebViewScreen()}*/}
      {/*/>*/}
    </View>
  );
};

export default SettingScreen;
