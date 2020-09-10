import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
// Styled Component
import {View, ViewBorderRadius, ViewRow} from '../../../components/styled/View';
import {Text} from '../../../components/styled/Text';
import Topbar from '../../../components/bar/Topbar';
import BottomButton from '../../../components/buttons/BottomButton';
// NPM Module
import {Actions} from 'react-native-router-flux';
// redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as signupActions from '../../../store/modules/signup/actions';
import * as customModalActions from '../../../store/modules/modal/customModal/actions';
import LoadingBar from '../../../components/loadingBar/LoadingBar';

// ARS 인증 스크린
const ArsScreen = () => {
  const dispatch = useDispatch();

  const {
    authNumber,
    phoneAuthId,
    phoneAuthInfo,
    phoneAuthMessage,
    loading,
    statebar,
  } = useSelector(
    (state) => ({
      statebar: state.signup.statebar,
      authNumber: state.signup.authNumber,
      phoneAuthId: state.signup.phoneAuthId,
      phoneAuthInfo: state.signup.phoneAuthInfo,
      phoneAuthMessage: state.signup.phoneAuthMessage,
      loading: state.loading['signup/CHANGE_PHONE_AUTH_TWO'],
    }),
    shallowEqual,
  );

  // 뒤로가기 버튼
  const onPressClose = () => {
    Actions.pop();
  };

  useEffect(() => {
    if (phoneAuthMessage === '200') {
      dispatch(customModalActions.change_modal_message('인증 성공'));
      dispatch(signupActions.change_phone_auth_message_init());
      Actions.pop();
      dispatch(signupActions.change_statebar(statebar + 1));
    } else if (phoneAuthMessage === '403') {
      dispatch(customModalActions.change_modal_message('인증 실패'));
      dispatch(signupActions.change_phone_auth_message_init());
      Actions.pop();
    }
  }, [phoneAuthMessage]);

  // 기기 뒤로가기 버튼 기능 {s}
  const backAndroid = () => {
    Actions.pop();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAndroid);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAndroid);
    };
  }, [backAndroid]);

  useEffect(() => {
    return () => {
      dispatch(signupActions.ars_auth_number_init());
      dispatch(signupActions.ars_phone_auth_id_init());
    };
  }, []);

  const onPressPhoneAuth = () => {
    let param = {
      authNumber: authNumber,
      phoneAuthId: phoneAuthId,
      ...phoneAuthInfo,
    };

    dispatch(signupActions.change_phone_auth_two(param));
  };

  if (loading) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
      </View>
    );
  }

  return (
    <View height={'100%'} justifyContent={'space-between'}>
      <View>
        <Topbar
          onPressLeft={onPressClose}
          isLeftButton={true}
          title={'ARS 인증'}
          isLine={true}
        />
        <View marginLeft={15} marginRight={15} alignItems={'center'}>
          <View marginTop={50}>
            <Text bold ftLarge>
              인증 전화를 받은 후
            </Text>
            <Text bold ftLarge>
              안내 음성에 따라 아래의 숫자를 눌러주세요
            </Text>
          </View>
          <ViewRow marginTop={100}>
            <ViewBorderRadius
              paddingTop={15}
              paddingBottom={15}
              bgIceBlue
              width={'20%'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text fontSize={40}>{authNumber.substring(0, 1)}</Text>
            </ViewBorderRadius>
            <ViewBorderRadius
              paddingTop={15}
              paddingBottom={15}
              bgIceBlue
              width={'20%'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text fontSize={40}>{authNumber.substring(1, 2)}</Text>
            </ViewBorderRadius>
            <ViewBorderRadius
              paddingTop={15}
              paddingBottom={15}
              bgIceBlue
              width={'20%'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text fontSize={40}>{authNumber.substring(2, 3)}</Text>
            </ViewBorderRadius>
            <ViewBorderRadius
              paddingTop={15}
              paddingBottom={15}
              bgIceBlue
              width={'20%'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text fontSize={40}>{authNumber.substring(3, 4)}</Text>
            </ViewBorderRadius>
          </ViewRow>
          <View alignItems={'center'}>
            <Text bold marginTop={20} fontSize={16}>
              수신 차단시 정상적인 인증이 불가능합니다
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View paddingLeft={15} paddingRight={15}>
          <ViewRow alignItems={'center'}>
            <ViewBorderRadius
              bgGray
              borderRadius={100}
              width={25}
              height={25}
              alignItems={'center'}
              justifyContent={'center'}
              marginRight={10}>
              <Text bold ftWhite>
                ?
              </Text>
            </ViewBorderRadius>
            <Text bold>전화를 받기 힘드시다면?</Text>
          </ViewRow>
          <Text
            ftGray
            marginTop={15}
            marginBottom={30}
            style={{lineHeight: 20}}>
            음성을 듣지 않아도 전화를 받은 뒤 번호를 누르면 인증이 정상적으로
            완료됩니다.
          </Text>
        </View>
        <BottomButton
          onPress={() => onPressPhoneAuth()}
          textSize={16}
          text={'인증 전화 받기'}
        />
      </View>
    </View>
  );
};

export default ArsScreen;
