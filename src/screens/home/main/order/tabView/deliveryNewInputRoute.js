import React, {useEffect} from 'react';
import ModalSelector from 'react-native-modal-selector';
// Styled Component
import {
  View,
  ViewBorderRadius,
  ViewRow,
} from '../../../../../components/styled/View';
import {Text} from '../../../../../components/styled/Text';
import {ButtonRadius} from '../../../../../components/styled/Button';
import BasicTextInput from '../../../../../components/input/BasicTextInput';
// utils Import
import {firstNumPhoneItems} from '../../../../../utils/constants';
// redux
import * as orderActions from '../../../../../store/modules/order/action';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// NPM Module
import {Actions} from 'react-native-router-flux';

// 주문하기 TabView - 배송지 선택
const DeliveryNewInputRoute = (props) => {
  const dispatch = useDispatch();

  const {tabLocation} = useSelector(
    (state) => ({
      tabLocation: state.global.tabLocation,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(orderActions.change_is_new(true));
  }, []);

  const onPressAddressScreen = () => {
    if (tabLocation === 'Main') {
      Actions.newAddressScreen({screen: 'newInputRoute'});
    } else if (tabLocation === 'MyInfo') {
      Actions.newAddressScreen({screen: 'newInputRoute'});
    } else if (tabLocation === 'Calendar') {
      Actions.calendarNewAddressScreen({screen: 'newInputRoute'});
    } else if (tabLocation === 'Search') {
      Actions.searchNewAddressScreen({screen: 'newInputRoute'});
    }
  };

  // 유저 정보 입력 뷰
  const UserInfoInputView = () => {
    return (
      <View>
        <ViewRow alignItems={'center'}>
          <View width={'20%'}>
            <Text>이름</Text>
          </View>
          <BasicTextInput
            width={'80%'}
            height={35}
            brColor={'#cbced5'}
            onChangeText={props.onChangeNewName}
            value={props.newName}
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
              value={props.newZipCode}
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
              value={props.newAddress}
            />
          </View>
        </ViewRow>
        <ViewRow marginTop={10} alignItems={'center'}>
          <View width={'20%'}>
            <Text>상세주소</Text>
          </View>
          <View width={'80%'}>
            <BasicTextInput
              height={35}
              brColor={'#cbced5'}
              value={props.newDetailAddress}
              onChangeText={props.onChangeNewDetailAddress}
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
                cancelText={"취소"}
                onModalClose={(item) => props.onChangeNewFrontPhone(item.label)}
                selectedKey={firstNumPhoneItems.indexOf(props.newFrontPhone)}
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
              value={props.newMiddlePhone}
              onChangeText={props.onChangeNewMiddlePhone}
            />
            <Text ftGray>-</Text>
            <BasicTextInput
              height={35}
              width={'30%'}
              brColor={'#cbced5'}
              keyboardType="numeric"
              maxLength={4}
              value={props.newBackPhone}
              onChangeText={props.onChangeNewBackPhone}
            />
          </ViewRow>
        </ViewRow>
      </View>
    );
  };

  return (
    <View paddingLeft={15} paddingRight={15} marginTop={20}>
      {UserInfoInputView()}
    </View>
  );
};

export default DeliveryNewInputRoute;
