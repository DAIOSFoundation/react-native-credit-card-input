import React, {useEffect} from 'react';
import {Picker} from 'react-native';
// Styled Component
import {
  View,
  ViewBorderRadius,
  ViewRow,
  ViewRowBorderRadius,
} from '../../../../../components/styled/View';
import {Text} from '../../../../../components/styled/Text';
import {
  Button,
  ButtonBorderRadius,
  ButtonRadius,
} from '../../../../../components/styled/Button';
import SelectImageCheckBoxes from '../../../../../components/checkboxes/SelectImageCheckBoxes';
import {ItemPreview} from '../../../../../components/styled/Image';
import BasicTextInput from '../../../../../components/input/BasicTextInput';
import BasicCheckBox from '../../../../../components/checkboxes/BasicCheckBox';
// utils Import
import {LocaleString} from '../../../../../utils/functions';
import {
  deliveryRequestMessage,
  firstNumPhoneItems,
} from '../../../../../utils/constants';
// redux
import * as orderActions from '../../../../../store/modules/order/action';
import * as deliveryActions from '../../../../../store/modules/delivery/actions';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// NPM Module
import {Actions} from 'react-native-router-flux';

// 주문하기 TabView - 배송지 선택
const NewInputRoute = (props) => {
  const dispatch = useDispatch();

  const {tabLocation, couponReplaceResult} = useSelector(
    (state) => ({
      tabLocation: state.global.tabLocation,
      couponReplaceResult: state.order.couponReplaceResult,
    }),
    shallowEqual,
  );

  useEffect(() => {
    console.log('testsetest');
    dispatch(orderActions.change_is_new(true));
    dispatch(deliveryActions.change_island_check_new_input_init());
    return () => {
      dispatch(orderActions.change_new_input_address_init());
    };
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
              {/* <Picker
                selectedValue={props.newFrontPhone}
                style={{
                  height: 35,
                  zIndex: 100,
                }}
                onValueChange={props.onChangeNewFrontPhone}>
                {firstNumPhoneItems.map((item, index) => (
                  <Picker.Item key={index + item} label={item} value={item} />
                ))}
              </Picker> */}
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
    <View>
      <View paddingLeft={15} paddingRight={15} marginTop={20} marginBottom={20}>
        {UserInfoInputView()}
      </View>
      <View marginLeft={15} marginRight={15}>
        <Text fontSize={14} ftDarkNavy marginTop={15} marginBottom={5} bold>
          배송 요청 사항
        </Text>
        <ViewBorderRadius brIceBlue bgWhite>
          <Picker
            selectedValue={props.deliveryMessage}
            style={{
              height: 45,
              width: '100%',
              zIndex: 100,
            }}
            onValueChange={props.changeSelectDeliveryOption}>
            <Picker.Item
              label="배송시 요청사항을 선택해주세요"
              color="#cbced5"
              value="0"
            />
            {deliveryRequestMessage.map((item, index) => (
              <Picker.Item key={index + item} label={item} value={item} />
            ))}
          </Picker>
        </ViewBorderRadius>
      </View>
      <View height={5} bgDarkWhite marginTop={20} marginBottom={20} />
      {/* 쿠폰 적용 View {s} */}
      {props.putSampleItems.length !== 0 ? null : (
        <View marginLeft={15} marginRight={15} marginBottom={15}>
          <Text fontSize={14} ftDarkNavy marginTop={10} marginBottom={5} bold>
            쿠폰 적용
          </Text>
          <Button height={'auto'} onPress={onPressCouponScreen}>
            <ViewRowBorderRadius
              alignItems={'center'}
              justifyContent={'space-between'}
              paddingLeft={10}
              paddingTop={12}
              paddingBottom={12}
              paddingRight={10}
              width={'100%'}
              brIceBlue>
              {couponReplaceResult ? (
                <Text fontSize={15} ftTheme>
                  총 {LocaleString(couponReplaceResult)}원 할인 적용
                </Text>
              ) : (
                <Text ftLightGray fontSize={15}>
                  사용하실 쿠폰을 등록해주세요
                </Text>
              )}
              <Text ftLightGray fontSize={15} />
            </ViewRowBorderRadius>
          </Button>
        </View>
      )}
      {/* 쿠폰 적용 View {e} */}
      <View height={5} bgDarkWhite marginBottom={20} />
      <View paddingLeft={15} paddingRight={15}>
        <Text bold ftDarkNavy fontSize={14}>
          최종 결제 금액
        </Text>
        <View>
          <ViewRow justifyContent={'space-between'} marginTop={10}>
            <Text ftGray fontSize={13}>
              총 상품금액
            </Text>
            <Text ftGray fontSize={13}>
              {LocaleString(props.totalPrice)}원
            </Text>
          </ViewRow>
          <ViewRow justifyContent={'space-between'} marginTop={10}>
            <Text ftGray fontSize={13}>
              배송비
            </Text>
            <Text ftGray fontSize={13}>
              {LocaleString(props.deliveryCharge)}원
            </Text>
          </ViewRow>
          {props.isLandCheckNewInput ? (
            <ViewRow justifyContent={'space-between'} marginTop={10}>
              <Text ftGray fontSize={13}>
                도서/산간 배송비
              </Text>
              <Text ftGray fontSize={13}>
                {props.extraCharge === 0
                  ? '무료'
                  : LocaleString(props.extraCharge) + '원'}
              </Text>
            </ViewRow>
          ) : null}
          {couponReplaceResult ? (
            <ViewRow justifyContent={'space-between'} marginTop={10}>
              <Text ftGray fontSize={13}>
                쿠폰할인
              </Text>
              <Text ftGray fontSize={13}>
                - {LocaleString(couponReplaceResult)}원
              </Text>
            </ViewRow>
          ) : null}
          <View height={2} bgGray marginTop={10} marginBottom={10} />
          <ViewRow justifyContent={'space-between'}>
            <Text fontSize={15} ftDarkNavy bold>
              최종 결제 금액
            </Text>
            {props.isLandCheckNewInput ? (
              <Text fontSize={18} ftTheme bold>
                {LocaleString(
                  props.totalPrice +
                    props.deliveryCharge +
                    props.extraCharge -
                    couponReplaceResult,
                )}
                원
              </Text>
            ) : (
              <Text fontSize={18} ftTheme bold>
                {LocaleString(
                  props.totalPrice + props.deliveryCharge - couponReplaceResult,
                )}
                원
              </Text>
            )}
          </ViewRow>
        </View>
      </View>
      <View height={5} bgDarkWhite marginTop={25} marginBottom={25} />
      <View paddingLeft={15} paddingRight={15}>
        <Text marginBottom={10} bold ftDarkNavy fontSize={14}>
          결제 수단 선택
        </Text>
        <SelectImageCheckBoxes
          isOnlyOne={true}
          data={props.payItems}
          onPress={props.onPressPayCheck}
          index={props.payIndex}
        />
      </View>
      <View height={5} bgTheme marginTop={20} marginBottom={20} />
      <View paddingLeft={5}>
        <BasicCheckBox
          text={'위 구매조건을 확인하였으며 결제진행에 동의합니다'}
          textStyle={{
            bold: true,
            ftDarkNavy: true,
            fontSize: 14,
          }}
          onPress={props.onPressAgreePayment}
          checked={props.agreePayment}
        />
      </View>
      <View paddingLeft={15} paddingRight={15} marginTop={15} marginBottom={15}>
        <Text ftGray fontSize={12}>
          셀러비전은 통신판매중개시스템의 제공자로서, 통신판매의 당사자가 아니며
          상품의 주문, 배송 및 환불 등과 관련한 의무와 책임은 각 판매자에게
          있습니다.
        </Text>
      </View>
    </View>
  );
};

export default NewInputRoute;
