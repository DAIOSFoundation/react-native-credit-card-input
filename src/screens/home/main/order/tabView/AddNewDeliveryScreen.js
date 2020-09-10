import React, {useCallback, useEffect} from 'react';
import ModalSelector from 'react-native-modal-selector';
import {Text} from '../../../../../components/styled/Text';
import Topbar from '../../../../../components/bar/Topbar';
import BasicTextInput from '../../../../../components/input/BasicTextInput';

import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {
  ScrollView,
  View,
  ViewBorderRadius,
  ViewRow,
} from '../../../../../components/styled/View';
import {ButtonRadius} from '../../../../../components/styled/Button';
import {Picker} from 'react-native';
import {firstNumPhoneItems} from '../../../../../utils/constants';
import BottomButton from '../../../../../components/buttons/BottomButton';
import * as deliveryActions from '../../../../../store/modules/delivery/actions';
import * as customModalActions from '../../../../../store/modules/modal/customModal/actions';

const AddNewDeliveryScreen = (props) => {
  const dispatch = useDispatch();
  const {
    userId,
    jwtToken,
    userAddress,
    name,
    zipCode,
    address,
    detailAddress,
    frontPhone,
    middlePhone,
    backPhone,
    successMsg,
    tabLocation,
  } = useSelector(
    (state) => ({
      userId: state.user.userId,
      jwtToken: state.user.jwtToken,
      userAddress: state.delivery.userAddress,
      name: state.delivery.name,
      zipCode: state.delivery.zipCode,
      address: state.delivery.address,
      detailAddress: state.delivery.detailAddress,
      frontPhone: state.delivery.frontPhone,
      middlePhone: state.delivery.middlePhone,
      backPhone: state.delivery.backPhone,
      successMsg: state.delivery.successMsg,
      tabLocation: state.global.tabLocation,
    }),
    shallowEqual,
  );

  const onPressClose = () => {
    Actions.pop();
  };

  const onPressAddressScreen = () => {
    if (tabLocation === 'Main') {
      Actions.newAddressScreen({screen: 'addNewDeliveryScreen'});
    } else if (tabLocation === 'MyInfo') {
      Actions.newAddressScreen({screen: 'addNewDeliveryScreen'});
    } else if (tabLocation === 'Calendar') {
      Actions.calendarNewAddressScreen({screen: 'addNewDeliveryScreen'});
    } else if (tabLocation === 'Search') {
      Actions.searchNewAddressScreen({screen: 'addNewDeliveryScreen'});
    }
  };

  // 텍스트 이름 변경
  const onChangeName = (value) => {
    dispatch(deliveryActions.change_name(value));
  };
  // 텍스트 상세주소 변경
  const onChangeDetailAddress = (value) => {
    dispatch(deliveryActions.change_detail_address(value));
  };
  // 텍스트 핸드폰 앞 번호 변경
  const onChangeFrontPhone = (value) => {
    dispatch(deliveryActions.change_front_phone(value));
  };
  // 텍스트 핸드폰 중간 번호 변경
  const onChangeMiddlePhone = (value) => {
    dispatch(deliveryActions.change_middle_phone(value));
  };
  // 텍스트 핸드폰 뒷 번호 변경
  const onChangeBackPhone = (value) => {
    dispatch(deliveryActions.change_back_phone(value));
  };
  const onPressAdd = useCallback(() => {
    let param = {
      name: name,
      phone: frontPhone + middlePhone + backPhone,
      address: address,
      detailAddress: detailAddress,
      zipCode: zipCode,
    };
    if (
      name &&
      address &&
      detailAddress &&
      frontPhone &&
      middlePhone &&
      backPhone
    ) {
      dispatch(
        deliveryActions.request_add_delivery({
          param,
          userId,
          jwtToken,
        }),
      );
      if (tabLocation === 'MyInfo') {
        Actions.pop();
        Actions.myInfoDeliveryListScreen();
      } else if (tabLocation === 'Main') {
        Actions.pop();
        Actions.deliveryListScreen();
      } else if (tabLocation === 'Calendar') {
        Actions.pop();
        Actions.calendarDeliveryListScreen();
      } else if (tabLocation === 'Search') {
        Actions.pop();
        Actions.searchDeliveryListScreen();
      }
    } else {
      dispatch(
        customModalActions.change_modal_message(
          '배송정보를 모두 입력해주세요.',
        ),
      );
    }
  }, [
    name,
    frontPhone,
    middlePhone,
    backPhone,
    address,
    detailAddress,
    zipCode,
  ]);

  return (
    <>
      <Topbar
        onPressLeft={onPressClose}
        isLeftButton={true}
        titleColor={{ftDarkNavy: true}}
        bgColor={{bgWhite: true}}
        lineColor={{brIceBlue: true}}
        title={'새 배송지 추가하기'}
        isLine={true}
      />
      <ScrollView>
        <View marginLeft={20} marginRight={20} marginTop={30}>
          <ViewRow alignItems={'center'}>
            <View width={'20%'}>
              <Text>이름</Text>
            </View>
            <BasicTextInput
              width={'80%'}
              height={35}
              brColor={'#cbced5'}
              onChangeText={onChangeName}
              value={name}
            />
          </ViewRow>

          <ViewRow alignItems={'center'} marginTop={10}>
            <View width={'20%'}>
              <Text>주소</Text>
            </View>
            <ViewRow width={'80%'} justifyContent={'space-between'}>
              <ButtonRadius
                width={'25%'}
                alignSelf={'center'}
                bgNavy
                paddingLeft={5}
                paddingRight={5}
                borderRadius={10}
                onPress={onPressAddressScreen}>
                <Text ftWhite fontSize={13}>
                  주소 찾기
                </Text>
              </ButtonRadius>
              <BasicTextInput
                width={'70%'}
                height={35}
                editable={false}
                brColor={'#cbced5'}
                value={zipCode}
              />
            </ViewRow>
          </ViewRow>
          <ViewRow marginTop={10}>
            <View width={'20%'} />
            <View width={'80%'}>
              <BasicTextInput
                height={35}
                editable={false}
                brColor={'#cbced5'}
                value={address}
              />
            </View>
          </ViewRow>
          <ViewRow marginTop={10} alignItems={'center'}>
            <View width={'20%'} />
            <View width={'80%'}>
              <BasicTextInput
                height={35}
                brColor={'#cbced5'}
                value={detailAddress}
                onChangeText={onChangeDetailAddress}
              />
            </View>
          </ViewRow>
          <ViewRow alignItems={'center'} marginTop={10}>
            <View width={'20%'}>
              <Text>연락처</Text>
            </View>
            <ViewRow
              width={'80%'}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <ViewBorderRadius width={'33%'} brLightGray borderRadius={15}>
                <ModalSelector
                  data={firstNumPhoneItems.map((item, index) => ({
                    key: index,
                    label: item,
                  }))}
                  // initValue={props.deliveryMessage ? props.deliveryMessage : '배송시 요청사항을 선택해주세요'}
                  cancelText={"취소"}
                  onModalClose={(item) => onChangeFrontPhone(item.label)}
                  selectedKey={firstNumPhoneItems.indexOf(frontPhone)}
                  initValue={"선택"}
                />
              </ViewBorderRadius>
              <Text ftGray>-</Text>
              <BasicTextInput
                height={35}
                width={'30%'}
                brColor={'#cbced5'}
                keyboardType="numeric"
                maxLength={4}
                value={middlePhone}
                onChangeText={onChangeMiddlePhone}
              />
              <Text ftGray>-</Text>
              <BasicTextInput
                height={35}
                width={'30%'}
                brColor={'#cbced5'}
                keyboardType="numeric"
                maxLength={4}
                value={backPhone}
                onChangeText={onChangeBackPhone}
              />
            </ViewRow>
          </ViewRow>
        </View>
      </ScrollView>
      <BottomButton textSize={17} onPress={onPressAdd} text={'배송지 추가'} />
    </>
  );
};
export default AddNewDeliveryScreen;
