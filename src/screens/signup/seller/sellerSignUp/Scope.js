import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
// Styled Component
import {View, ViewAbsolute} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import {Button} from '../../../../components/styled/Button';
import TextAndInputBottomLine from '../../../../components/input/TextAndInputBottomLine';
import {Image} from '../../../../components/styled/Image';
import SelectButtons from '../../../../components/buttons/SelectButtons';
// utils Import
import {scope, needRevenue, checkBoxArray} from '../../../../utils/constants';
import {
  isEmpty,
  isEmptyDataArray,
  regNumber,
} from '../../../../utils/functions';
// Redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as signupActions from '../../../../store/modules/signup/actions';
import * as customModalActions from '../../../../store/modules/modal/customModal/actions';
import * as userActions from '../../../../store/modules/user/actions';
// assets Image
const cancelIcon = require('../../../../assets/signup/icon_item_cancel.png');

const Scope = (props) => {
  const dispatch = useDispatch();

  const {
    firebaseToken,
    jwtToken,
    userId,
    platform,
    oAuthToken,
    type,

    gender,
    email,
    profileImage,
    statebar,
    errorMsg,
    agreePrivacy,
    agreeMarketing,
    agreeContentsUtil,
    agreeBroadcast,
    name,
    birth,

    phone,
    phoneCarrier,
    productOfInterest,
    shoppingPlace,
    shoppingAmount,
    checkedNickName,
    numOfLive,
    sellingPrice,
    sellingCategory,
    channelName,
    selectedChannelPk,

    desiredIncome,
    sellingType,
    numOfUpload,
    channelGenderRatio,
    channelAgeRange,
    appearance,
    voice,
    scopeIndex,
    isValidDesiredIncome,
  } = useSelector(
    (state) => ({
      firebaseToken: state.global.firebaseToken,
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,

      platform: state.user.platform,
      oAuthToken: state.user.oAuthToken,
      type: state.signup.type,

      gender: state.signup.gender,
      email: state.signup.email,
      profileImage: state.signup.profileImage,

      statebar: state.signup.statebar,
      errorMsg: state.signup.errorMsg,
      agreePrivacy: state.signup.agreePrivacy,
      agreeMarketing: state.signup.agreeMarketing,
      agreeContentsUtil: state.signup.agreeContentsUtil,
      agreeBroadcast: state.signup.agreeBroadcast,
      name: state.signup.name,
      birth: state.signup.birth,
      birth2: state.signup.birth2,
      phone: state.signup.phone,
      phoneCarrier: state.signup.phoneCarrier,
      isValid: state.signup.isValid,
      productOfInterest: state.signup.productOfInterest,
      shoppingPlace: state.signup.shoppingPlace,
      shoppingAmount: state.signup.shoppingAmount,
      checkedNickName: state.signup.checkedNickName,
      broadcastExperience: state.signup.broadcastExperience,
      sellingExperience: state.signup.sellingExperience,
      numOfLive: state.signup.numOfLive,
      sellingPrice: state.signup.sellingPrice,
      sellingCategory: state.signup.sellingCategory,
      channelName: state.signup.channelName,
      channelGenderRatio: state.signup.channelGenderRatio,

      selectedChannelPk: state.signup.selectedChannelPk,
      channelProfile: state.signup.channelProfile,

      channelAgeRange: state.signup.channelAgeRange,
      numOfUpload: state.signup.numOfUpload,
      sellingType: state.signup.sellingType,
      desiredIncome: state.signup.desiredIncome,

      appearance: state.signup.appearance,
      voice: state.signup.voice,
      scopeIndex: state.signup.scopeIndex,
      isValidDesiredIncome: state.signup.isValidDesiredIncome,
    }),
    shallowEqual,
  );

  const [renderValue, setRenderValue] = useState(0);

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

  // 활동 범위
  const onPressSellingType = (type) => {
    dispatch(signupActions.change_selling_type(type[0]));
  };

  // 벌고싶은 수익
  const onPressDesiredIncome = (income) => {
    if (!isEmpty(income[0])) {
      var sliceStr = income[0].slice(1, -2);
      dispatch(
        signupActions.change_desired_income(
          parseInt(!desiredIncome ? 0 : desiredIncome) + parseInt(sliceStr),
        ),
      );
      dispatch(signupActions.change_is_valid_desired_income(true));
    }
  };

  const onChangeTextDesiredIncome = (income, isValid) => {
    dispatch(signupActions.change_is_valid_desired_income(isValid));
    dispatch(signupActions.change_desired_income(income));
  };

  // 다음 버튼
  const onPressNext = () => {
    if (isEmptyDataArray([sellingType, desiredIncome])) {
      dispatch(
        customModalActions.change_modal_message('활동 범위를 선택 해세요'),
      );
      return;
    } else if (desiredIncome === 0 || !isValidDesiredIncome) {
      dispatch(
        customModalActions.change_modal_message(
          '월 수익을 정확히 입력해주세요',
        ),
      );
      return;
    }
    let body = {
      platform: platform,
      oAuthToken: oAuthToken,
      type: type,
      nickName: checkedNickName,
      birth: birth,
      gender: gender,
      email: email,
      firebaseToken: firebaseToken,
      agreeMarketing: agreeMarketing,
      agreePrivacy: agreePrivacy,
      productOfInterest: productOfInterest,
      shoppingPlace: shoppingPlace,
      shoppingAmount: shoppingAmount,
      profileImage: profileImage,
      phone: '+82' + phone.substring(1),
      phoneCarrier: phoneCarrier,
      name: name,
      numOfLive: numOfLive,
      sellingPrice: sellingPrice,
      sellingCategory: sellingCategory,
      channelPk: selectedChannelPk,
      channelName: channelName,
      agreeContentsUtil: agreeContentsUtil,
      agreeBroadcast: agreeBroadcast,
      numOfUpload: numOfUpload,
      channelGenderRatio: JSON.stringify({
        man: channelGenderRatio[0],
        woman: 100 - channelGenderRatio,
      }),
      channelAgeRange: channelAgeRange,
      appearance: appearance,
      voice: voice,
      sellingType: sellingType,
      desiredIncome: desiredIncome,
    };
    console.log('body', body);
    dispatch(userActions.request_signup_seller(body));
  };

  // 월 수익 입력 란 취소 버튼
  const desiredCancel = () => {
    dispatch(signupActions.change_desired_income(0));
    setRenderValue(Math.random());
  };

  return (
    <View height={'100%'} justifyContent={'space-between'}>
      <View justifyContent={'flex-start'} marginLeft={20} marginRight={20}>
        <Text ftLarge ftTheme bold>
          05 활동범위
        </Text>
        <View marginTop={30}>
          <Text ftDarkNavy bold>
            회망하는 셀러 활동 범위를 고르세요.
          </Text>
          <View width={'100%'} marginTop={15}>
            <SelectButtons
              data={checkBoxArray(scope)}
              lineCnt={3}
              isOnlyOne={true}
              onPress={onPressSellingType}
              selectedIndex={scopeIndex}
            />
          </View>

          <View width={'100%'} marginTop={30}>
            <TextAndInputBottomLine
              title={'라방을 통해 벌고픈 월 수익은 얼마인가요?'}
              isBottomLine={true}
              isOnlyNumber={true}
              valid={regNumber}
              value={desiredIncome.toString()}
              onChangeText={(desiredIncome, isValid) =>
                onChangeTextDesiredIncome(desiredIncome, isValid)
              }
            />
            <ViewAbsolute
              marginLeft={desiredIncome.toString().length * 10}
              marginTop={35}
              alignSelf={'flex-start'}>
              <Text>만원</Text>
            </ViewAbsolute>
            <ViewAbsolute marginTop={35} right={0}>
              <Button width={20} height={20} onPress={desiredCancel}>
                <Image width={20} height={20} source={cancelIcon} />
              </Button>
            </ViewAbsolute>
            <SelectButtons
              render={renderValue}
              data={needRevenue}
              lineCnt={4}
              isOnlyOne={true}
              onPress={onPressDesiredIncome}
            />
          </View>
        </View>
      </View>
      <Button bgTheme height={45} marginTop={15} onPress={() => onPressNext()}>
        <Text ftWhite>가입 신청</Text>
      </Button>
    </View>
  );
};

export default Scope;
