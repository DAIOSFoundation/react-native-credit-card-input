import React, {useEffect} from 'react';
import ModalSelector from 'react-native-modal-selector';
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
// regular card
import SliderCardImage from '../../../../../components/carousel/SliderCardImage';
import {screenWidth} from '../../../../../components/styled/ScreenSize';
import BasicCheckBox from '../../../../../components/checkboxes/BasicCheckBox';

// utils Import
import {LocaleString, changeFirstNumber, percentWidth} from '../../../../../utils/functions';
import {deliveryRequestMessage} from '../../../../../utils/constants';
// redux
import * as orderActions from '../../../../../store/modules/order/action';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// NPM Module
import {Actions} from 'react-native-router-flux';

// 주문하기 TabView - 배송지 선택
const DeliveryAreaRoute = (props) => {
  // redux
  const dispatch = useDispatch();

  const {
    tabLocation, 
    couponReplaceResult, 
    putSampleItems, 
    paymentType,
    creditCardInfo,
    postCreditCardStatus,
  } = useSelector(
    (state) => ({
      tabLocation: state.global.tabLocation,
      couponReplaceResult: state.order.couponReplaceResult,
      putSampleItems: state.recommend.putSampleItems,
      paymentType: state.productDetail.paymentType,
      creditCardInfo: state.regularPayment.creditCardInfo,
      postCreditCardStatus: state.productDetail.postCreditCardStatus,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(orderActions.change_is_new(false));
    console.log('props ==> ', props.data)
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
    <View>
      <View paddingLeft={15} paddingRight={15} marginTop={20} marginBottom={20}>
        {props.userAddress && props.userAddress.length !== 0
          ? BasicUserInfoView()
          : BasicUserInfoViewFailure()}
        <View marginTop={10}>
          <Text fontSize={14} ftDarkNavy marginTop={15} marginBottom={5} bold>
            배송 요청 사항
          </Text>
          <ModalSelector
            data={deliveryRequestMessage.map((item, index) => ({
              key: index,
              label: item, 
            }))}
            // initValue={props.deliveryMessage ? props.deliveryMessage : '배송시 요청사항을 선택해주세요'}
            cancelText={"취소"}
            onModalClose={(item) => props.changeSelectDeliveryOption(item.label)}
            selectedKey={deliveryRequestMessage.indexOf(props.deliveryMessage)}
            initValue={"배송시 요청사항을 선택해주세요"}
          />
       </View>
      </View>
      {paymentType ? (
        <View paddingLeft={15} paddingRight={15} marginBottom={20}>
        <View height={5} bgDarkWhite marginBottom={20} />
          <Text fontSize={14} ftDarkNavy marginTop={15} marginBottom={5} bold>
            정기결제 카드 선택
          </Text>
          <SliderCardImage
            data={creditCardInfo}
            sliderWidth={screenWidth}
            itemWidth={percentWidth(80)}
            onPressDeleteCreditCard={props.onPressDeleteCreditCard}
            pagination
          />
        </View>
      ) : (
        null
      )}
      {/* 쿠폰 적용 View {s} */}
      {putSampleItems.length !== 0 || paymentType === 'period' ? null : (
        <View marginLeft={15} marginRight={15} marginBottom={15}>
          <View height={5} bgDarkWhite marginBottom={20} />
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
          {props.isLandCheckBasic ? (
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
            {props.isLandCheckBasic ? (
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

export default DeliveryAreaRoute;
