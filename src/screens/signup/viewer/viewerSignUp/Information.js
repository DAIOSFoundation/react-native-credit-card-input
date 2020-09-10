import React, {useEffect, useState} from 'react';
import {
  View,
  ViewRadiusCustom,
  Container,
  ViewBorderRadius,
  ViewBorder,
  ViewBorderRow,
  ScrollView,
} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import {Button} from '../../../../components/styled/Button';
import {Image} from '../../../../components/styled/Image';
import {Actions} from 'react-native-router-flux';
import SelectButtons from '../../../../components/buttons/SelectButtons';
import {
  interestItems,
  whereShop,
  averageAmount,
} from '../../../../utils/constants';
import * as signupActions from '../../../../store/modules/signup/actions';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as userActions from '../../../../store/modules/user/actions';
import BottomModal from '../../../../components/modal/BottomModal';
import {screenHeight} from '../../../../components/styled/ScreenSize';
import SelectCheckBoxes from '../../../../components/checkboxes/SelectCheckBoxes';
import BottomButton from '../../../../components/buttons/BottomButton';
import {BackHandler} from 'react-native';
import {multiSet} from '../../../../utils/functions';

// title : 상단 설문 관련 내용
// description : 상세 내용
const Information = (props) => {
  const title = props.title || '아래의 설문 답변시 500P 쿠폰 증정!';
  const description =
    props.description ||
    '아래의 간단한 질문에 답해주시면\n회원님께 알맞는 상품을 저희가 추천해드릴게요!';

  const dispatch = useDispatch();

  const {
    jwtToken,
    userId,
    firebaseToken,
    platform,
    oAuthToken,
    type,
    nickName,
    gender,
    profileImage,
    email,
    shoppingPlace,
    shoppingAmount,
    productOfInterest,
    birth,
    phone,
    phoneCarrier,
    name,
    agreePrivacy,
    agreeMarketing,
    statebar,
  } = useSelector(
    (state) => ({
      firebaseToken: state.global.firebaseToken,
      platform: state.user.platform,
      oAuthToken: state.user.oAuthToken,
      type: state.signup.type,
      nickName: state.signup.nickName,
      gender: state.signup.gender,
      email: state.signup.email,
      profileImage: state.signup.profileImage,
      shoppingPlace: state.signup.shoppingPlace,
      shoppingAmount: state.signup.shoppingAmount,
      productOfInterest: state.signup.productOfInterest,
      name: state.signup.name,
      birth: state.signup.birth,
      phone: state.signup.phone,
      phoneCarrier: state.signup.phoneCarrier,
      agreePrivacy: state.signup.agreePrivacy,
      agreeMarketing: state.signup.agreeMarketing,
      statebar: state.signup.statebar,
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
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

  //어디서 쇼핑 선택
  const onPressPlace = (data) => {
    dispatch(signupActions.change_shopping_place(data[0]));
  };

  //1회 소비 평균 금액 선택
  const onPressAmount = (data) => {
    dispatch(signupActions.change_shopping_amount(data[0]));
  };

  //다음 버튼
  const onPressNext = () => {
    let body = {
      platform: platform,
      oAuthToken: oAuthToken,
      type: type,
      nickName: nickName,
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
    };
    console.log('body', body);
    dispatch(userActions.request_signup_viewer(body));
  };

  //로그인 시도 성공시
  useEffect(() => {
    if (jwtToken !== null && userId !== null && type !== null) {
      multiSet(jwtToken, userId, type, firebaseToken).then(() => {
        Actions.push('viewerSignUpSuccess');
      });
    }
  }, [jwtToken, userId]);

  const renderInterest = () => {
    let pressedData = [];
    if (!productOfInterest) {
      return '카테고리 선택하기';
    } else {
      for (let i = 0; i < productOfInterest.length; i++) {
        pressedData.push(
          interestItems[productOfInterest[i]].replace(/\n/g, '') + '\t',
        );
      }
      return pressedData;
    }
  };

  return (
    <View height={'100%'} justifyContent={'space-between'}>
      <View justifyContent={'flex-start'} marginLeft={20} marginRight={20}>
        <Text ftLarge ftDarkNavy bold>
          {title}
        </Text>
        <Text ftNavy fontSize={13} marginBottom={25}>
          {description}
        </Text>

        <Text ftDarkNavy bold>
          관심있는 상품은 무엇인가요?
        </Text>
        <ViewBorderRow
          borderLeftWidth={'0'}
          borderRightWidth={'0'}
          borderTopWidth={'0'}
          justifyContent={'space-between'}
          brLightGray
          alignItems={'center'}
          width={'100%'}>
          <Button
            width={'100%'}
            justifyContent={'space-between'}
            onPress={props.onPressBottomModalOpen}>
            <Text ftLightGray marginRight={11}>
              {renderInterest()}
            </Text>
            <Image
              width={8}
              height={8}
              source={require('../../../../assets/common/black_triangle.png')}
            />
          </Button>
        </ViewBorderRow>

        <Text ftDarkNavy bold marginTop={30}>
          주로 어디에서 쇼핑을 하시나요?
        </Text>
        <View width={'100%'} marginTop={15}>
          <SelectButtons
            data={whereShop}
            lineCnt={4}
            isOnlyOne={true}
            onPress={onPressPlace}
          />
        </View>

        <Text ftDarkNavy bold marginTop={30}>
          쇼핑 1회에 소비하는 평균 금액은 얼마인가요?
        </Text>
        <View width={'100%'} marginTop={15}>
          <SelectButtons
            data={averageAmount}
            lineCnt={4}
            isOnlyOne={true}
            onPress={onPressAmount}
          />
        </View>
      </View>
      <BottomButton onPress={() => onPressNext()} text={'다음'} />
    </View>
  );
};

export default Information;
