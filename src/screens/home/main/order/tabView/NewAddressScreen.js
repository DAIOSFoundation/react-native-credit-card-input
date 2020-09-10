import React from 'react';
// Styled Component
import {SafeAreaView} from '../../../../../components/styled/View';
import Topbar from '../../../../../components/bar/Topbar';
// NPM Module
import {Actions} from 'react-native-router-flux';
import Postcode from 'react-native-daum-postcode';
// Redux
import * as orderActions from '../../../../../store/modules/order/action';
import * as deliveryActions from '../../../../../store/modules/delivery/actions';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

const NewAddressScreen = (props) => {
  const dispatch = useDispatch();

  const {userId, jwtToken} = useSelector(
    (state) => ({
      userId: state.user.userId,
      jwtToken: state.user.jwtToken,
    }),
    shallowEqual,
  );

  const onChangeRequestAddress = (data) => {
    if (props.screen === 'addNewDeliveryScreen') {
      if (data.userSelectedType === 'R') {
        dispatch(deliveryActions.change_zipcode(data.zonecode));
        dispatch(deliveryActions.change_address(data.address));
      } else {
        dispatch(deliveryActions.change_zipcode(data.zonecode));
        dispatch(deliveryActions.change_address(data.jibunAddress));
      }
    } else if (props.screen === 'newInputRoute') {
      if (data.userSelectedType === 'R') {
        dispatch(orderActions.change_new_zipcode(data.zonecode));
        dispatch(orderActions.change_new_address(data.address));
      } else {
        dispatch(orderActions.change_new_zipcode(data.zonecode));
        dispatch(orderActions.change_new_address(data.jibunAddress));
      }
    }

    let param = {
      userId: userId,
      jwtToken: jwtToken,
      zipCode: data.zonecode,
    };

    dispatch(deliveryActions.get_island_check_new_input(param));
    Actions.pop();
  };

  const onPressBack = () => {
    Actions.pop();
  };

  return (
    <SafeAreaView>
      <Topbar
        onPressLeft={onPressBack}
        isLeftButton={true}
        title={'신규 주소지 입력'}
        isLine={true}
      />
      <Postcode
        style={{width: '100%', height: 10000}}
        jsOptions={{animated: true}}
        onSelected={(data) => onChangeRequestAddress(data)}
      />
    </SafeAreaView>
  );
};

export default NewAddressScreen;
