import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {View, ViewRow} from '../../../components/styled/View';
import {Text} from '../../../components/styled/Text';
import {Image} from '../../../components/styled/Image';
import {Button} from '../../../components/styled/Button';
import TextAndInputBottomLine from '../../../components/input/TextAndInputBottomLine';
import {screenWidth} from '../../../components/styled/ScreenSize';
import * as signupActions from '../../../store/modules/signup/actions';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {regPhone, regBirth, isEmptyDataArray} from '../../../utils/functions';
import * as customModalActions from '../../../store/modules/modal/customModal/actions';
import BottomButton from '../../../components/buttons/BottomButton';
import {Actions} from 'react-native-router-flux';
import LoadingBar from '../../../components/loadingBar/LoadingBar';

//개인정보 입력
const SellerIdentityVerification = (props) => {
  const dispatch = useDispatch();

  const {
    statebar,
    name,
    birth,
    birth2,
    phone,
    phoneCarrier,
    isValid,
    authNumber,
    phoneAuthId,
    phoneAuthMessage,
    loading,
  } = useSelector(
    (state) => ({
      statebar: state.signup.statebar,
      name: state.signup.name,
      birth: state.signup.birth,
      birth2: state.signup.birth2,
      phone: state.signup.phone,
      phoneCarrier: state.signup.phoneCarrier,
      isValid: state.signup.isValid,
      authNumber: state.signup.authNumber,
      phoneAuthId: state.signup.phoneAuthId,
      phoneAuthMessage: state.signup.phoneAuthMessage,
      loading: state.loading['signup/CHANGE_PHONE_AUTH_ONE'],
    }),
    shallowEqual,
  );

  // 기기 뒤로가기 버튼 기능 {s}
  const backAndroid = () => {
    dispatch(signupActions.change_statebar(statebar - 1));
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAndroid);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAndroid);
    };
  }, [backAndroid]);
  // 기기 뒤로가기 버튼 기능 {e}

  useEffect(() => {
    if (phoneAuthMessage === 'E1026') {
      dispatch(
        customModalActions.change_modal_message('올바른 정보를 입력해주세요.'),
      );
      dispatch(signupActions.change_phone_auth_message_init());
    }
  }, [phoneAuthMessage]);

  useEffect(() => {
    if (authNumber && phoneAuthId) {
      Actions.arsScreen();
    }
  }, [authNumber, phoneAuthId]);

  // 리덕스 이름 설정
  const onChangeTextName = (name) => {
    dispatch(signupActions.change_name(name));
  };

  // 리덕스 생일 앞자리
  const onChangeTextBirth = (birth, isValid) => {
    dispatch(signupActions.change_birth(birth));
    dispatch(signupActions.change_is_valid(isValid));
  };

  // 리덕스 생일 뒷자리
  const onChangeTextBirth2 = (birth2, isValid) => {
    dispatch(signupActions.change_birth2(birth2));
    // dispatch(signupActions.change_is_valid(isValid));
  };

  // 리덕스 폰번호 설정
  const onChangeTextPhone = (phone, isValid) => {
    dispatch(signupActions.change_phone(phone));
    dispatch(signupActions.change_is_valid(isValid));
  };

  // 값에 따른 통신사 이름 출력
  const phoneCarrierText = (data) => {
    switch (data) {
      case '01':
        return 'SKT';
      case '02':
        return 'KT';
      case '03':
        return 'LG U+';
      case '04':
        return 'SKT 알뜰폰';
      case '05':
        return 'KT 알뜰폰';
      case '06':
        return 'LGU 알뜰폰';
      default:
        return '통신사';
    }
  };

  // 핸드폰 번호 뒷자리 분기
  const birth2Quarter = (data) => {
    switch (data) {
      case '1':
        return {
          birthday: 19 + birth,
          gender: '1',
          nation: '1',
        };
      case '2':
        return {
          birthday: 19 + birth,
          gender: '2',
          nation: '1',
        };
      case '3':
        return {
          birthday: 20 + birth,
          gender: '1',
          nation: '1',
        };
      case '4':
        return {
          birthday: 20 + birth,
          gender: '2',
          nation: '1',
        };
      case '5':
        return {
          birthday: 19 + birth,
          gender: '1',
          nation: '2',
        };
      case '6':
        return {
          birthday: 19 + birth,
          gender: '2',
          nation: '2',
        };
      case '7':
        return {
          birthday: 20 + birth,
          gender: '1',
          nation: '2',
        };
      case '8':
        return {
          birthday: 20 + birth,
          gender: '2',
          nation: '2',
        };
    }
  };

  //다음 버튼
  const onPressNext = () => {
    if (!name) {
      dispatch(
        customModalActions.change_modal_message('이름을 입력해 주세요.'),
      );
      return;
    } else if (!isValid || isEmptyDataArray([birth, birth2, phone])) {
      dispatch(
        customModalActions.change_modal_message('모든 정보를 입력해 주세요'),
      );
      return;
    } else if (!phoneCarrier) {
      dispatch(
        customModalActions.change_modal_message('통신사를 선택해 주세요'),
      );
      return;
    }

    let data = birth2Quarter(birth2);

    let param = {
      name: name,
      phoneNumber: phone,
      telecomCode: phoneCarrier,
      ...data,
    };

    dispatch(signupActions.change_phone_auth_one(param));
    dispatch(signupActions.change_phone_auth_info_temporary_storage(param));
  };

  if (loading) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
      </View>
    );
  }

  return (
    <>
      <View height={'100%'} justifyContent={'space-between'}>
        <View justifyContent={'flex-start'} marginLeft={20} marginRight={20}>
          <Text ftLarge ftDatkNavy bold>
            본인인증을 위해 정보를 입력해주세요.
          </Text>
          <ViewRow marginTop={50} alignItems={'flex-end'}>
            <TextAndInputBottomLine
              title={'이름 (실명)'}
              placeholderText={'이름을 입력해주세요'}
              maxLength={10}
              isBottomLine={true}
              value={name}
              onChangeText={(name) => onChangeTextName(name)}
              width={'100%'}
            />
          </ViewRow>
          <ViewRow marginTop={20} alignItems={'flex-end'}>
            <TextAndInputBottomLine
              title={'주민등록번호'}
              errorText={'정확히 입력 해주세요'}
              valid={regBirth}
              value={birth}
              maxLength={6}
              isBottomLine={true}
              onChangeText={(birth, isValid) =>
                onChangeTextBirth(birth, isValid)
              }
              isOnlyNumber={true}
              width={screenWidth / 2 - 37}
            />
            <Text ftLarge paddingBottom={20} paddingLeft={9} paddingRight={9}>
              {' '}
              -{' '}
            </Text>

            <TextAndInputBottomLine
              maxLength={1}
              value={birth2}
              isBottomLine={true}
              width={30}
              onChangeText={(birth2) => onChangeTextBirth2(birth2)}
              isOnlyNumber={true}
            />
            <TextAndInputBottomLine
              value="  *   *   *   *   *   *  "
              isBottomLine={true}
              width={screenWidth / 2 - 67}
              disabled
            />
          </ViewRow>
          <ViewRow marginTop={20} width={'100%'}>
            <View width={90} justifyContent={'flex-start'}>
              <Text ftDarkNavy bold paddingBottom={10}>
                휴대폰 번호
              </Text>
              <Button onPress={props.onPressBottomModalOpen}>
                <ViewRow
                  width={'100%'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}>
                  <Text ftLightNavyGray marginRight={11}>
                    {phoneCarrierText(phoneCarrier)}
                  </Text>
                  <Image
                    width={8}
                    height={8}
                    source={require('../../../assets/common/black_triangle.png')}
                  />
                </ViewRow>
              </Button>
            </View>
            <View paddingTop={10} paddingLeft={10}>
              <TextAndInputBottomLine
                placeholderText={"' - ' 없이 번호를 입력해주세요"}
                errorText={'휴대폰 번호를 정확히 입력해주세요.'}
                valid={regPhone}
                value={phone}
                maxLength={11}
                isBottomLine={true}
                width={screenWidth - 130}
                isOnlyNumber={true}
                onChangeText={(phone, isValid) =>
                  onChangeTextPhone(phone, isValid)
                }
              />
            </View>
          </ViewRow>
        </View>
        <BottomButton onPress={() => onPressNext()} text={'ARS 인증하기'} />
      </View>
    </>
  );
};

export default SellerIdentityVerification;
