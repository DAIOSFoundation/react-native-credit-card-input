import React, {useEffect} from 'react';
import {ViewRow, View, Container} from '../../components/styled/View';
import {Button, ButtonRadius} from '../../components/styled/Button';
import {Image, ImageAbsolute} from '../../components/styled/Image';
import {Text} from '../../components/styled/Text';
import Topbar from '../../components/bar/Topbar';
import {kakaoLogin} from '../../lib/api/oauth/kakao';
import {naverLogin} from '../../lib/api/oauth/naver';
import {facebookLogin} from '../../lib/api/oauth/facebook';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as userActions from '../../store/modules/user/actions';
import * as signupActions from '../../store/modules/signup/actions';

import {Actions} from 'react-native-router-flux';
import CustomModal from '../../components/modal/CustomModal';
import * as customModalActions from '../../store/modules/modal/customModal/actions';
import {jsonToFormData, multiSet} from '../../utils/functions';
import * as broadcastActions from '../../store/modules/broadcast/actions';
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const {
    oAuthToken,
    jwtToken,
    userId,
    type,
    platform,
    errorMsg,
    successMsg,
    isVisible,
    isOneButton,
    isFull,
    message,
    onPressOK,
    size,
    elements,
    firebaseToken,
    buttonHeight,
    scrollJustifyContent,
  } = useSelector(
    (state) => ({
      oAuthToken: state.user.oAuthToken,
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      type: state.user.type,
      platform: state.user.platform,
      errorMsg: state.user.errorMsg,
      successMsg: state.user.successMsg,

      isVisible: state.customModal.isVisible,
      isOneButton: state.customModal.isOneButton,
      isFull: state.customModal.isFull,
      message: state.customModal.message,
      onPressOK: state.customModal.onPressOK,
      size: state.customModal.size,
      elements: state.customModal.elements,
      firebaseToken: state.global.firebaseToken,
      buttonHeight: state.customModal.buttonHeight,
      scrollJustifyContent: state.customModal.scrollJustifyContent,
    }),
    shallowEqual,
  );

  //닫기 버튼
  const onPressClose = () => {
    dispatch(broadcastActions.change_autoplay(true));
    Actions.pop();
  };

  //카카오 로그인
  const onPressKakao = async () => {
    try {
      dispatch(userActions.change_error_msg(''));
      const result = await kakaoLogin();
      console.log('KaKaoLogin : ', result);
      if (result !== false) {
        dispatch(userActions.change_platform('kakao'));
        dispatch(userActions.change_oauth_token(result.accessToken));
      }
    } catch (error) {
      console.log('onPressKakao error : ', error);
    }
  };

  //네이버 로그인
  const onPressNaver = async () => {
    try {
      dispatch(userActions.change_error_msg(''));
      const result = await naverLogin();
      console.log('NaverLogin : ', result);
      if (result !== false) {
        dispatch(userActions.change_platform('naver'));
        dispatch(userActions.change_oauth_token(result.accessToken));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  //페이스북 로그인
  const onPressFacebook = async () => {
    try {
      dispatch(userActions.change_error_msg(''));
      const result = await facebookLogin();
      if (result !== false) {
        dispatch(userActions.change_platform('facebook'));
        dispatch(userActions.change_oauth_token(result.accessToken));
      }
    } catch (error) {
      console.log('error', error);
    }

    // let image = {"cropRect": {"height": 186, "width": 139, "x": 66, "y": 0}, "height": 401, "mime": "image/jpeg", "modificationDate": "1582249809000", "path": "file:///storage/emulated/0/Pictures/6a3254ae-0675-450e-818f-886f5a2cf807.jpg", "size": 73043, "width": 300};

    // let body = {
    //   platform: 'facebook',
    //   oAuthToken:
    //     'EAAJTo6UdooEBADxtnAAXeiNsBcrre6qFdpyTdpJz9HjzxrZCxamLjZCwYBZCM6S7Pnvu9pDl7H0ZAZA1WWLj6jANkZAVT2CzBzjA1gDanPl1PCh4DrVsvY9vNETNPyN0JbgSdFhBnyc5VTdOY1AxsZAYZAPIoas4YpZBNXJ2yOZCpUqYZByURpRAEixmejcR8eUSyjrDLTOOJNZCAZBvsjRL3DKYmt8sZBYZCaPMmPmCZBvhECeYhgZDZD',
    //   type: 'viewer',
    //   nickName: 'jayjay313',
    //   birth: '900111',
    //   gender: '1',
    //   email: 'ioume22n7@gmail.com',
    //   firebaseToken: '',
    //   agreeMarketing: 'true',
    //   productOfInterest: '[0,36]',
    //   shoppingPlace: '백화점,SNS',
    //   shoppingAmount: '5~10만',
    //   profileImage: {"cropRect": {"height": 186, "width": 139, "x": 66, "y": 0}, "height": 401, "mime": "image/jpeg", "modificationDate": "1582249809000", "path": "file:///storage/emulated/0/Pictures/6a3254ae-0675-450e-818f-886f5a2cf807.jpg", "size": 73043, "width": 300},
    //   // {name: 'profileImage', filename:'test.jpeg', type:'image/jpeg,', data:RNFetchBlob.wrap(picObj.path)},
    //   phone: '+821062922538',
    //   phoneCarrier: 'KT',
    //   name: 's홍길',
    // };

    // dispatch(signupActions.request_signup_viewer(body));
  };

  //로그인 시도
  useEffect(() => {
    console.log('oAuthToken => ', oAuthToken);
    console.log('jwtToken => ', jwtToken);
    if (oAuthToken && !jwtToken) {
      const body = {
        platform,
        token: oAuthToken,
        firebaseToken: firebaseToken,
      };
      dispatch(userActions.request_login_oauth(body));
    }
  }, [oAuthToken]);

  //에러처리
  useEffect(() => {
    if (errorMsg) {
      switch (errorMsg.substring(0, 5)) {
        //미회원
        case 'E1001':
          Actions.push('selectViewerORSellerScreen');
          return;
        case 'E1004':
          dispatch(
            customModalActions.change_modal_message(
              '잠시 후 다시 시도해 주세요',
            ),
          );
          return;
        default:
          dispatch(customModalActions.change_modal_message(errorMsg));
      }
    }
  }, [errorMsg]);

  //이미 가입된 회원일 시 로그인 처리
  useEffect(() => {
    if (jwtToken && userId) {
      console.log('successMsg', successMsg);
      switch (successMsg.substring(0, 5)) {
        //미회원
        case 'S0000':
          multiSet(jwtToken, userId, type, firebaseToken).then(() =>
            Actions.reset('tabBar'),
          );
          dispatch(userActions.reset_msg(''));
          return;
        default:
          console.log('LoginScreen default useEffect');
      }
    }
  }, [jwtToken, userId]);

  useEffect(() => {
    return () => {
      dispatch(broadcastActions.change_autoplay(true));
    };
  }, []);

  return (
    <>
      <Topbar
        bgColor={{bgDarkNavy: true}}
        isRightButton={true}
        onPressRight={onPressClose}
      />
      <Container bgDarkNavy paddingLeft={20} paddingRight={20}>
        <View
          width={'100%'}
          marginTop={50}
          marginBottom={50}
          justifyContent={'flex-start'}>
          <Text ftWhite ftLarge bold>
            SNS 계정으로
          </Text>
          <Text ftWhite ftLarge bold marginTop={5}>
            간편하게 셀러비전을 즐겨보세요.
          </Text>
        </View>
        <View width={'100%'} paddingLeft={50} paddingRight={50}>
          <ButtonRadius
            justifyContent={'flex-start'}
            borderRadius={30}
            height={54}
            bgWhite
            marginTop={10}
            marginBottom={10}
            onPress={() => onPressKakao()}>
            <Image
              width={54}
              height={54}
              marginRight={7}
              source={require('../../assets/login/kakao.png')}
            />
            <Text bold ftDarkNavy>
              카카오톡으로 시작하기
            </Text>
          </ButtonRadius>
          <ButtonRadius
            justifyContent={'flex-start'}
            borderRadius={30}
            height={54}
            bgWhite
            marginTop={10}
            marginBottom={10}
            onPress={() => onPressNaver()}>
            <Image
              width={54}
              height={54}
              marginRight={7}
              source={require('../../assets/login/naver.png')}
            />
            <Text bold ftDarkNavy>
              네이버로 시작하기
            </Text>
          </ButtonRadius>
          <ButtonRadius
            justifyContent={'flex-start'}
            borderRadius={30}
            height={54}
            bgWhite
            marginTop={10}
            marginBottom={10}
            onPress={() => onPressFacebook()}>
            <Image
              width={54}
              height={54}
              marginRight={7}
              source={require('../../assets/login/facebook.png')}
            />
            <Text bold ftDarkNavy>
              페이스북으로 시작하기
            </Text>
          </ButtonRadius>
        </View>
      </Container>
      <CustomModal
        isVisible={isVisible}
        isOneButton={isOneButton}
        isFull={isFull}
        message={message}
        onPressOK={onPressOK}
        size={size}
        elements={elements}
        buttonHeight={buttonHeight}
        scrollJustifyContent={scrollJustifyContent}
        currentScene={'SignUp'}
      />
    </>
  );
};

export default LoginScreen;
