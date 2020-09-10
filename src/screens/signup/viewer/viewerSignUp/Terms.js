import React from 'react';
import {Linking} from 'react-native';
// Styled Component
import {
  ViewBorderRadius,
  View,
  ViewRow,
  SafeAreaView,
} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import {Button} from '../../../../components/styled/Button';
import BasicCheckBox from '../../../../components/checkboxes/BasicCheckBox';
import BottomButton from '../../../../components/buttons/BottomButton';
// Redux
import * as customModalActions from '../../../../store/modules/modal/customModal/actions';
import * as signupActions from '../../../../store/modules/signup/actions';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
// NPM Module
import {Actions} from 'react-native-router-flux';

//약관동의 폼
const Terms = () => {
  const dispatch = useDispatch();
  const {statebar, agreePrivacy, agreeMarketing, agreeALL} = useSelector(
    (state) => ({
      statebar: state.signup.statebar,
      agreePrivacy: state.signup.agreePrivacy,
      agreeMarketing: state.signup.agreeMarketing,
      agreeALL: state.signup.agreeALL,
    }),
    shallowEqual,
  );

  //이용약관/개인정보 동의
  const onPressPrivacy = (check) => {
    dispatch(signupActions.change_agree_privacy(check[0]));
    if (!check[0]) {
      dispatch(signupActions.change_agree_all(false));
    } else if (check[0] && agreeMarketing) {
      dispatch(signupActions.change_agree_all(true));
    }
  };

  //신규 및 이벤트 알림 동의
  const onPressMarketing = (check) => {
    dispatch(signupActions.change_agree_marketing(check[0]));
    if (!check[0]) {
      dispatch(signupActions.change_agree_all(false));
    } else if (agreePrivacy && check[0]) {
      dispatch(signupActions.change_agree_all(true));
    }
  };

  //모두 동의
  const onPressALL = (check) => {
    dispatch(signupActions.change_agree_all(check[0]));
  };

  //다음 버튼
  const onPressNext = () => {
    if (!agreePrivacy) {
      dispatch(
        customModalActions.change_modal_message('이용약관에 동의해주세요'),
      );
      return;
    }

    dispatch(signupActions.change_statebar(statebar + 1));
  };

  // 이용약관/개인정보 처리방침 동의 보기 모달
  const onPressSecurity = () => {
    Actions.termsOfServiceScreen();
    // Linking.openURL('https://dev-api.sellervision.net/pdf/termsOfService');
    // const attrFrom = {
    //   isOneButton: true,
    //   size: '100%',
    //   buttonHeight: 55,
    //   scrollJustifyContent: 'center',
    //   elements: (
    //     <SafeAreaView>
    //       <View justifyContent={'center'} alignItems={'center'}>
    //         <Text>
    //           이용약관/개인정보 처리방침 동의 보기 모달
    //         </Text>
    //       </View>
    //     </SafeAreaView>
    //   )
    // };
    // dispatch(customModalActions.change_modal_attr(attrFrom));
  };

  // 신규 및 이벤트 알림 SMS/메일 수신 선택
  const onPressEvent = () => {
    const attrFrom = {
      isOneButton: true,
      size: '100%',
      buttonHeight: 55,
      scrollJustifyContent: 'center',
      elements: (
        <SafeAreaView>
          <View justifyContent={'center'} alignItems={'center'}>
            <Text>신규 및 이벤트 알림 SMS/메일 수신 선택</Text>
          </View>
        </SafeAreaView>
      ),
    };
    dispatch(customModalActions.change_modal_attr(attrFrom));
  };

  return (
    <View height={'100%'} justifyContent={'space-between'}>
      <View justifyContent={'flex-start'} marginLeft={20} marginRight={20}>
        <Text ftLarge bold ftDarkNavy>
          시청자 회원가입 약관동의
        </Text>
        <ViewBorderRadius
          marginTop={25}
          marginBottom={5}
          height={110}
          width={'100%'}
          brLightGray
          justifyContent={'space-between'}>
          <View marginTop={15} marginBottom={15}>
            <ViewRow
              height={'50%'}
              justifyContent={'center'}
              alignItems={'center'}>
              <View width={'85%'}>
                <BasicCheckBox
                  text={'이용약관/개인정보 처리방침 동의(필수)'}
                  onPress={onPressPrivacy}
                  checked={agreePrivacy}
                />
              </View>
              <View width={'15%'}>
                <Button
                  width={'auto'}
                  justifyContent={'flex-start'}
                  onPress={onPressSecurity}>
                  <Text ftDarkNavy textDecorationLine={'underline'}>
                    보기
                  </Text>
                </Button>
              </View>
            </ViewRow>
            <ViewRow
              height={'50%'}
              justifyContent={'center'}
              alignItems={'center'}>
              <View width={'85%'}>
                <BasicCheckBox
                  text={'신규 및 이벤트 알림 SMS/메일 수신(선택)'}
                  onPress={onPressMarketing}
                  checked={agreeMarketing}
                />
              </View>
              <View width={'15%'}>
                <Button
                  width={'auto'}
                  justifyContent={'flex-start'}
                  onPress={onPressEvent}>
                  <Text ftDarkNavy textDecorationLine={'underline'}>
                    보기
                  </Text>
                </Button>
              </View>
            </ViewRow>
          </View>
        </ViewBorderRadius>
        <ViewBorderRadius
          height={55}
          width={'100%'}
          justifyContent={'center'}
          brLightGray>
          <BasicCheckBox
            text={'셀러비전 이용약관 전체 동의'}
            textStyle={{ftDarkNavy: true, bold: true}}
            onPress={onPressALL}
            checked={agreeALL}
          />
        </ViewBorderRadius>
      </View>
      <BottomButton onPress={() => onPressNext()} text={'다음'} />
    </View>
  );
};

export default Terms;
