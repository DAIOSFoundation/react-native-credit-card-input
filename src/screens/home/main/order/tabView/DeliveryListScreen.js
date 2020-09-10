import React, {useEffect} from 'react';
import {
  ScrollView,
  View,
  ViewBorderRow,
  ViewRow,
} from '../../../../../components/styled/View';
import Topbar from '../../../../../components/bar/Topbar';
import {Actions} from 'react-native-router-flux';
import {Text} from '../../../../../components/styled/Text';
import {Button, ButtonRadius} from '../../../../../components/styled/Button';
import DeliveryListCard from '../../../../../components/products/deliveryListCard';
import {screenHeight} from '../../../../../components/styled/ScreenSize';
import {Image} from '../../../../../components/styled/Image';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as deliveryActions from '../../../../../store/modules/delivery/actions';
import * as orderActions from '../../../../../store/modules/order/action';
import LoadingBar from '../../../../../components/loadingBar/LoadingBar';

const DeliveryListScreen = () => {
  const dispatch = useDispatch();
  const onPressClose = () => {
    Actions.pop();
  };
  const {userId, jwtToken, userAddress, loading, tabLocation} = useSelector(
    (state) => ({
      userId: state.user.userId,
      jwtToken: state.user.jwtToken,
      userAddress: state.delivery.userAddress,
      loading: state.loading['delivery/REQUEST_GET_USER_ADDRESS'],
      tabLocation: state.global.tabLocation,
    }),
    shallowEqual,
  );
  useEffect(() => {
    dispatch(
      deliveryActions.request_get_user_addresses({
        userId,
        jwtToken,
      }),
    );
    let param = {
      userAddress,
    };
  }, []);

  const onPressDelivery = (value) => {
    dispatch(orderActions.change_delivery_list(value));
    Actions.pop();
  };

  const onPressNewAddress = () => {
    Actions.pop();
    if (tabLocation === 'MyInfo') {
      Actions.myInfoAddNewDeliveryScreen();
    } else if (tabLocation === 'Main') {
      Actions.addNewDeliveryScreen();
    } else if (tabLocation === 'Calendar') {
      Actions.calendarAddNewDeliveryScreen();
    } else if (tabLocation === 'Search') {
      Actions.searchNewAddressScreen();
    }
  };

  return (
    <>
      <Topbar
        onPressLeft={onPressClose}
        isLeftButton={true}
        titleColor={{ftDarkNavy: true}}
        bgColor={{bgWhite: true}}
        lineColor={{brIceBlue: true}}
        title={'배송지 목록'}
        isLine={true}
      />
      {loading ? (
        <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
        </View>
      ) : (
        <ScrollView bgIceBlue height={screenHeight}>
          <DeliveryListCard
            userAddress={userAddress}
            onPressDelivery={(item) => onPressDelivery([item])}
          />
        </ScrollView>
      )}
      <Button
        bgWhite
        width={'100%'}
        height={55}
        alignItems={'center'}
        onPress={() => onPressNewAddress()}>
        <ViewRow>
          <Text fontSize={17}>새 배송지 추가하기</Text>
          <Image
            width={10}
            height={10}
            marginTop={7}
            marginLeft={5}
            source={require('../../../../../assets/common/icon_add_black.png')}
          />
        </ViewRow>
      </Button>
    </>
  );
};
export default DeliveryListScreen;
