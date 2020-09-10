import React from 'react';
// Styled Component
import {SafeAreaView, View, ViewBorderRadius, ViewRow} from '../styled/View';
import {Image, ItemPreview} from '../styled/Image';
import {Text} from '../styled/Text';
import {Button, ButtonRadius} from '../styled/Button';
// assets Img
const minIcon = require('../../assets/common/icon_item_minus.png');
const plusIcon = require('../../assets/common/icon_item_plus.png');
const cancelRadiusIcon = require('../../assets/common/icon_cancel_radius.png');
// utils Import
import {isEmpty, LocaleString} from '../../utils/functions';
// NPM Module
import {Actions} from 'react-native-router-flux';

// 라이브 & 녹화 카트 바텀모달 상품정보
// title : 제품 타이틀
// urlPath : 이미지 경로
// productName : 상품명
// discount : 할인율
// price : 가격
// onPressButton : 버튼 이벤트
// textLine : 텍스트 라인 제한(몇 줄 허용할지..)
// onPressIncrease : 개수 증가 이벤트
// onPressDecrease : 개수 감소 이벤트
// onPressDelete : 개별 삭제 이벤트
// onPressAllDelete : 전체 삭제 이벤트
// products : 카트에 담긴 상품들
// hasItem : 옵션 여부
// deliveryCharge : 배송비
// broadcastId : 방송 id
// productId : 제품 id
// id : 고유 값
// check : 체크 여부
// sellingStatus : 판매 제품상태 0 - 임시저장 / 1 - 판매대기 / 2 - 판매중 / 3 - 일시품절 / 4 - 판매종료
// products.itemInfo.itemAmount 재고량

const ModalBuyProduct = (props) => {
  // 제품 수량 증가
  const onPressIncrease = (data) => {
    if (!isEmpty(props.onPressIncrease)) props.onPressIncrease(data);
  };
  // 제품 수량 감소
  const onPressDecrease = (data) => {
    if (!isEmpty(props.onPressDecrease)) props.onPressDecrease(data);
  };
  // 제품 개별 삭제
  const onPressDelete = (data) => {
    if (!isEmpty(props.onPressDelete)) props.onPressDelete(data);
  };
  // 제품 전체 삭제
  const onPressAllDelete = (data) => {
    if (!isEmpty(props.onPressAllDelete)) props.onPressAllDelete(data);
  };

  // 상품 체크
  const onPressCheck = () => {
    let check = false;

    if (props.sellingStatus === 2) {
      for (let i = 0; i < props.products.length; i++) {
        if (props.products[i].itemInfo.itemAmount !== 0) {
          check = true;
        }
      }

      if (check) {
        props.onPressCheck([!props.checked, props.index]);
      }
    }
  };

  // 판매제품의 상태 값
  const sellingStatus = () => {
    let result = '';

    switch (props.sellingStatus) {
      case 0:
        result = '임시저장';
        break;
      case 1:
        result = '판매대기';
        break;
      case 3:
        result = '일시품절';
        break;
      case 4:
        result = '판매종료';
        break;
    }

    return result;
  };

  // 총 주문 금액
  const renderTotalProductPrice = () => {
    let result = 0;

    if (props.sellingStatus === 2) {
      for (let i = 0; i < props.products.length; i++) {
        if (props.products[i].itemInfo.itemAmount !== 0) {
          result += props.price * props.products[i].amount;
        }
      }
    }

    return result;
  };

  // 총 배송비 금액
  const renderTotalDeliveryChargePrice = () => {
    let amount = 0;
    let check = [];

    if (props.sellingStatus === 2) {
      // 0(임시저장) / 1(판매대기) / 2(판매중) / 3(일시품절) / 4(판매종료)
      for (let i = 0; i < props.products.length; i++) {
        if (props.products[i].itemInfo.itemAmount !== 0) {
          // 재고량
          check.push(props.products[i]);
        }
      }
    }

    if (check.length !== 0) {
      // 최소 1개의 판매중인 상품이 있을 시
      check.map((item) => (amount += item.amount));

      if (amount / props.deliveryChargeAmount > 1) {
        return (
          props.deliveryCharge * Math.ceil(amount / props.deliveryChargeAmount)
        );
      } else {
        return props.deliveryCharge;
      }
    } else {
      // 없으면 0 리턴
      return 0;
    }
  };

  // 각 제품에 상태에 따른 수량 활성화 여부
  const productAmountStatus = (status, amount) => {
    if (status === 0) {
      // 판매 중지
      return (
        <ViewBorderRadius
          height={28}
          justifyContent={'center'}
          brIceBlue
          marginRight={10}
          marginLeft={10}
          bgSoftGray>
          <Text paddingLeft={20} paddingRight={20} ftLightGray>
            {amount}
          </Text>
        </ViewBorderRadius>
      );
    } else {
      // 판매 중
      return (
        <ViewBorderRadius
          height={28}
          justifyContent={'center'}
          brIceBlue
          marginRight={10}
          marginLeft={10}>
          <Text paddingLeft={20} paddingRight={20}>
            {amount}
          </Text>
        </ViewBorderRadius>
      );
    }
  };

  // 각 제품 상태에 따른 제품이름 앞 상태값 적용
  const productNameStatus = (status) => {
    if (status === 0) {
      return (
        <Text ftTheme ftSmall bold>
          (판매중지)
        </Text>
      );
    }
  };

  return (
    <View>
      <View paddingLeft={15} paddingRight={15} marginTop={15}>
        <Text fontSize={13} ftDarkNavy bold>
          {props.title}
        </Text>
        <View bgTheme height={1} marginTop={10} marginBottom={10} />
        <ViewRow>
          <Button width={'10%'} height={24} onPress={onPressCheck}>
            <Image
              width={24}
              source={
                props.checked
                  ? require('../../assets/checkbox/icon_check_pressed.png')
                  : require('../../assets/checkbox/icon_check_normal.png')
              }
            />
          </Button>
          <Button disabled width={58} height={58} marginRight={10}>
            <ItemPreview
              marginRight={5}
              size={'100%'}
              source={{uri: props.urlPath}}
            />
          </Button>
          <SafeAreaView justifyContent={'center'}>
            <Text ftGray numberOfLines={props.textLine}>
              {props.productName}
            </Text>
            <ViewRow alignItems={'center'}>
              <Text ftTheme bold marginRight={5}>
                {props.discount}%
              </Text>
              <Text bold ftDarkNavy ftLarge marginRight={5}>
                {LocaleString(props.price)}원
              </Text>
              <Text ftTheme>{sellingStatus()}</Text>
            </ViewRow>
          </SafeAreaView>
        </ViewRow>
      </View>
      <View paddingLeft={15} paddingRight={15} alignItems={'center'}>
        {props.sellingStatus === 2
          ? props.products.map((item, index) => (
              <ViewRow marginTop={10} marginBottom={10} key={item + index}>
                <View width={'10%'} />
                <ViewRow width={'90%'} alignItems={'center'}>
                  <View>
                    {item.itemInfo.itemAmount === 0 ? (
                      <Button width={30} height={28}>
                        <Image source={minIcon} />
                      </Button>
                    ) : (
                      <Button
                        width={30}
                        height={28}
                        onPress={() =>
                          onPressDecrease({
                            broadcastId: props.broadcastId,
                            productId: props.productId,
                            itemId: item._id,
                            itemAmount: item.amount,
                          })
                        }>
                        <Image source={minIcon} />
                      </Button>
                    )}
                  </View>
                  {productAmountStatus(item.itemInfo.itemAmount, item.amount)}
                  <View marginRight={10}>
                    {item.itemInfo.itemAmount === 0 ? (
                      <Button width={30} height={28}>
                        <Image source={plusIcon} />
                      </Button>
                    ) : (
                      <Button
                        width={30}
                        height={28}
                        onPress={() =>
                          onPressIncrease({
                            broadcastId: props.broadcastId,
                            productId: props.productId,
                            itemId: item._id,
                            itemAmount: item.amount,
                          })
                        }>
                        <Image source={plusIcon} />
                      </Button>
                    )}
                  </View>
                  <ViewBorderRadius
                    bgDarkWhite
                    brIceBlue
                    justifyContent={'center'}
                    paddingLeft={15}
                    paddingTop={5}
                    paddingBottom={5}
                    style={{flex: 1}}>
                    <Text>
                      {productNameStatus(item.itemInfo.itemAmount)}
                      {props.hasItem
                        ? item.itemInfo.itemName
                        : props.productName}
                    </Text>
                  </ViewBorderRadius>
                  <View marginLeft={10}>
                    {item.itemInfo.itemAmount === 0 ? (
                      <Button width={30} height={28}>
                        <Image source={cancelRadiusIcon} />
                      </Button>
                    ) : (
                      <Button
                        width={30}
                        height={28}
                        onPress={() =>
                          onPressDelete({
                            cartDetailId: props.id,
                            itemId: item._id,
                          })
                        }>
                        <Image source={cancelRadiusIcon} />
                      </Button>
                    )}
                  </View>
                </ViewRow>
              </ViewRow>
            ))
          : null}
        <View width={'100%'}>
          {props.sellingStatus === 2 ? (
            <ButtonRadius
              onPress={() =>
                onPressAllDelete({
                  cartDetailId: props.id,
                })
              }
              width={'auto'}
              height={28}
              bgTheme
              paddingLeft={15}
              paddingRight={15}
              alignSelf={'flex-end'}>
              <Text ftWhite bold>
                삭제
              </Text>
            </ButtonRadius>
          ) : null}
        </View>
      </View>
      <View
        bgDarkWhite
        width={'100%'}
        height={1}
        marginTop={10}
        marginBottom={10}
      />
      <View alignItems={'flex-end'} paddingRight={15} marginBottom={10}>
        <Text ftDarkNavy bold>
          {props.deliveryCharge === 0
            ? '배송비무료'
            : '배송비 ' +
              LocaleString(renderTotalDeliveryChargePrice()) +
              '원'}{' '}
          + 상품 금액 {renderTotalProductPrice()}원 ={' '}
          {LocaleString(
            renderTotalDeliveryChargePrice() + renderTotalProductPrice(),
          )}{' '}
          원
        </Text>
      </View>
    </View>
  );
};

export default ModalBuyProduct;
