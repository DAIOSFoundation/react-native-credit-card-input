import React, {useEffect} from 'react';
// Styled Component
import {
  View,
  ViewRow,
} from '../../../../../components/styled/View';
import {Text} from '../../../../../components/styled/Text';
import {ButtonRadius} from '../../../../../components/styled/Button';

// utils Import
import {changeFirstNumber} from '../../../../../utils/functions';
// redux
import * as orderActions from '../../../../../store/modules/order/action';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// NPM Module
import {Actions} from 'react-native-router-flux';

// 주문하기 TabView - 배송지 선택
const SelectDeliveryAreaRoute = (props) => {
  // redux
  const dispatch = useDispatch();

  const {tabLocation} = useSelector(
    (state) => ({
      tabLocation: state.global.tabLocation,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(orderActions.change_is_new(false));
  }, []);
  
  const onPress = () => {
    if (tabLocation === 'MyInfo') {
      Actions.myInfoDeliveryListScreen();
    } else if (tabLocation === 'Main') {
      Actions.deliveryListScreen();
    } else if (tabLocation === 'Calendar') {
      Actions.calendarDeliveryListScreen();
    } else if (tabLocation === 'Search') {
      Actions.searchDeliveryListScreen();
    }
  };

  // 기존 배송지가 있을 경우 뷰
  const BasicUserInfoView = () => {
    return (
      <View>
        <ViewRow justifyContent={'space-between'} alignItems={'center'}>
          <ViewRow alignItems={'center'}>
            <Text>{props.userAddress[0].name}</Text>
            <Text
              height={11}
              width={1}
              bgDarkGray
              marginRight={5}
              marginLeft={5}
            />
            <Text>{changeFirstNumber(props.userAddress[0].phone)}</Text>
          </ViewRow>
          <ButtonRadius
            bgNavy
            width={'auto'}
            height={'auto'}
            paddingTop={5}
            paddingLeft={5}
            paddingRight={5}
            paddingBottom={5}
            onPress={() => onPress()}>
            <Text ftWhite fontSize={12}>
              배송지 목록
            </Text>
          </ButtonRadius>
        </ViewRow>
        <ViewRow alignItems={'center'} marginTop={5}>
          <Text ftDarkNavy>우편번호</Text>
          <Text
            height={11}
            width={1}
            bgDarkGray
            marginRight={5}
            marginLeft={5}
          />
          <Text ftDarkNavy>{props.userAddress[0].zipCode}</Text>
        </ViewRow>
        <View marginTop={5}>
          <Text fontSize={14} ftDarkNavy>
            {props.userAddress[0].address}
          </Text>
          <Text marginTop={5}>{props.userAddress[0].detailAddress}</Text>
        </View>
      </View>
    );
  };
  //todo 기존 배송지가 없을 시 - 추후 이미지 추가할 것
  const BasicUserInfoViewFailure = () => {
    return (
      <ViewRow justifyContent={'space-between'} alignItems={'center'}>
        <Text>기존 배송지가 없습니다.</Text>
        <ButtonRadius
          bgNavy
          width={'auto'}
          height={'auto'}
          paddingTop={5}
          paddingLeft={5}
          paddingRight={5}
          paddingBottom={5}
          onPress={() => Actions.deliveryListScreen()}>
          <Text ftWhite fontSize={12}>
            배송지 목록
          </Text>
        </ButtonRadius>
      </ViewRow>
    );
  };

  // 쿠폰 적용 페이지 이동
  const onPressCouponScreen = () => {
    if (tabLocation === 'MyInfo') {
      Actions.myInfoCouponScreen();
    } else if (tabLocation === 'Main') {
      Actions.mainCouponScreen();
    } else if (tabLocation === 'Calendar') {
      Actions.calendarCouponScreen();
    } else if (tabLocation === 'Search') {
      Actions.searchCouponScreen();
    }
  };

  return (
    <View paddingLeft={15} paddingRight={15} marginTop={20}>
      {props.userAddress && props.userAddress.length !== 0
        ? BasicUserInfoView()
        : BasicUserInfoViewFailure()}
    </View>
  );
};

export default SelectDeliveryAreaRoute;
