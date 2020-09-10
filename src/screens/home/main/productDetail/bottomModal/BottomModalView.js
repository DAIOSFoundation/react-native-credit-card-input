import React, {useEffect, useState} from 'react';
// Styled Component
import {
  SafeAreaView,
  ScrollView,
  ViewRow,
} from '../../../../../components/styled/View';
import BottomButton from '../../../../../components/buttons/BottomButton';
// NPM Module
import {Actions} from 'react-native-router-flux';
// utils Import
import {LocaleString} from '../../../../../utils/functions';
// redux
import * as customModalActions from '../../../../../store/modules/modal/customModal/actions';
import * as userActions from '../../../../../store/modules/user/actions';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// Bottom Modal Product Import
import ModalProductInfo from './ModalProductInfo';
import {Text} from '../../../../../components/styled/Text';
import * as broadcastActions from '../../../../../store/modules/broadcast/actions';

// 상품 상세보기 바텀 모달 뷰
const BottomModalView = (props) => {
  // redux
  const dispatch = useDispatch();

  const {
    jwtToken, 
    userId, 
    successMsg, 
    tabLocation,
    paymentType,
    recurringMonthSelect,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      successMsg: state.user.successMsg,
      tabLocation: state.global.tabLocation,
      paymentType: state.productDetail.paymentType,
      recurringMonthSelect: state.regularPayment.recurringMonthSelect,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (successMsg !== '') {
      dispatch(customModalActions.change_modal_message(successMsg));
      dispatch(userActions.reset_msg());
    }
    console.log('successMsg', successMsg);
  }, [successMsg]);

  const [items, setItems] = useState([]);

  // 변경된 아이템
  const onPressSetItems = (item) => {
    setItems(item);
  };

  // 총 주문 금액
  const renderTotalOrderPrice = () => {
    let result = 0;
    for (let i = 0; i < items.length; i++) {
      result += props.price * items[i].amount;
    }
    return result;
  };

  // 카트에 담기 버튼
  const addCart = () => {
    if (renderTotalOrderPrice() > 0) {
      if (props.product.hasItem && items) {
        // 옵션이 여러개 일 때

        // 개별 상품들 중 수량이 0 인 경우
        for (let j = 0; j < items.length; j++) {
          if (items[j].amount === 0) {
            return dispatch(
              customModalActions.change_modal_message(
                '상품의 수량을 확인해주세요.',
              ),
            );
          }
        }

        let initItems = [];

        for (let i = 0; i < items.length; i++) {
          initItems.push({
            itemId: items[i].itemId,
            amount: items[i].amount,
          });
        }

        let param = {
          jwtToken: jwtToken,
          userId: userId,
          body: {
            broadcastId: props.broadcastId,
            productId: props.productId,
            items: initItems,
          },
        };

        dispatch(userActions.request_add_cart(param));
      } else {
        // 단일 상품 일 때

        let param = {
          jwtToken: jwtToken,
          userId: userId,
          body: {
            broadcastId: props.broadcastId,
            productId: props.productId,
            items: [
              {
                amount: items[0].amount,
              },
            ],
          },
        };

        dispatch(userActions.request_add_cart(param));
      }
    } else {
      dispatch(
        customModalActions.change_modal_message('상품의 수량을 확인해주세요.'),
      );
    } 
  };

  // 바로 구매 버튼 이벤트
  const directPurchase = () => {
    if (renderTotalOrderPrice() > 0) {
      // 개별 상품들 중 수량이 0 인 경우
      for (let j = 0; j < items.length; j++) {
        if (items[j].amount === 0) {
          return dispatch(
            customModalActions.change_modal_message(
              '상품의 수량을 확인해주세요.',
            ),
          );
        }
      }

      if (paymentType) {
        if (props.product.hasItem && recurringMonthSelect) {
          // 상품 옵션이 있는 경우
          let initItem = [];

          for (let i = 0; i < items.length; i++) {
            initItem.push({
              itemId: items[i].itemId,
              itemAmount: items[i].amount,
              itemPrice: props.price,
              itemName: items[i].itemName,
            });
          }

          let param = [
            {
              broadcastId: props.broadcastId,
              productId: props.productId,
              hasItem: props.product.hasItem,
              items: initItem,
              deliveryCharge: amountDeliveryCharge(),
              productImage: props.product.productImages[0].path,
              productName: props.product.productName,
              status: props.status,
              sellerName: props.product.sellerInfo.nickName,
              isExtraCharge: props.isExtraCharge,
              extraCharge: props.extraCharge,
            },
          ];

          console.log('옵션있는 상품구매 => ', param);
          dispatch(broadcastActions.change_broadcast_product(param));
          if (tabLocation === 'Main') {
            Actions.purchaseFormScreen();
          } else if (tabLocation === 'Calendar') {
            Actions.calendarPurchaseFormScreen();
          } else if (tabLocation === 'Search') {
            Actions.searchPurchaseFormScreen();
          }
        } else if (!props.product.hasItem && recurringMonthSelect) {
          // 상품 옵션이 없는 경우
          let param = [
            {
              broadcastId: props.broadcastId,
              productId: props.productId,
              hasItem: props.product.hasItem,
              itemId: items[0].itemId,
              items: [
                {
                  itemAmount: items[0].amount,
                  itemPrice: props.price,
                },
              ],
              deliveryCharge: amountDeliveryCharge(),
              productImage: props.product.productImages[0].path,
              productName: props.product.productName,
              status: props.status,
              sellerName: props.product.sellerInfo.nickName,
              isExtraCharge: props.isExtraCharge,
              extraCharge: props.extraCharge,
            },
          ];

          console.log('옵션없는 상품구매 => ', param);
          dispatch(broadcastActions.change_broadcast_product(param));
          if (tabLocation === 'Main') {
            Actions.purchaseFormScreen();
          } else if (tabLocation === 'Calendar') {
            Actions.calendarPurchaseFormScreen();
          } else if (tabLocation === 'Search') {
            Actions.searchPurchaseFormScreen();
          }
        } else if (paymentType) {
          dispatch(
            customModalActions.change_modal_message(
              '정기결제 기간을 선택해 주세요.'
            ),
          )
        }
      } else {
        if (props.product.hasItem) {
          // 상품 옵션이 있는 경우
          let initItem = [];

          for (let i = 0; i < items.length; i++) {
            initItem.push({
              itemId: items[i].itemId,
              itemAmount: items[i].amount,
              itemPrice: props.price,
              itemName: items[i].itemName,
            });
          }

          let param = [
            {
              broadcastId: props.broadcastId,
              productId: props.productId,
              hasItem: props.product.hasItem,
              items: initItem,
              deliveryCharge: amountDeliveryCharge(),
              productImage: props.product.productImages[0].path,
              productName: props.product.productName,
              status: props.status,
              sellerName: props.product.sellerInfo.nickName,
              isExtraCharge: props.isExtraCharge,
              extraCharge: props.extraCharge,
            },
          ];

          console.log('옵션있는 상품구매 => ', param);
          dispatch(broadcastActions.change_broadcast_product(param));
          if (tabLocation === 'Main') {
            Actions.purchaseFormScreen();
          } else if (tabLocation === 'Calendar') {
            Actions.calendarPurchaseFormScreen();
          } else if (tabLocation === 'Search') {
            Actions.searchPurchaseFormScreen();
          }
        } else {
          // 상품 옵션이 없는 경우
          let param = [
            {
              broadcastId: props.broadcastId,
              productId: props.productId,
              hasItem: props.product.hasItem,
              itemId: items[0].itemId,
              items: [
                {
                  itemAmount: items[0].amount,
                  itemPrice: props.price,
                },
              ],
              deliveryCharge: amountDeliveryCharge(),
              productImage: props.product.productImages[0].path,
              productName: props.product.productName,
              status: props.status,
              sellerName: props.product.sellerInfo.nickName,
              isExtraCharge: props.isExtraCharge,
              extraCharge: props.extraCharge,
            },
          ];

          console.log('옵션없는 상품구매 => ', param);
          dispatch(broadcastActions.change_broadcast_product(param));
          if (tabLocation === 'Main') {
            Actions.purchaseFormScreen();
          } else if (tabLocation === 'Calendar') {
            Actions.calendarPurchaseFormScreen();
          } else if (tabLocation === 'Search') {
            Actions.searchPurchaseFormScreen();
          }
        } 
      }
    } else {
      dispatch(
        customModalActions.change_modal_message(
          '구매 하실 물품을 선택해주세요.',
        ),
      );
    }
  };

  // 배송비 묶음 배송 처리
  const amountDeliveryCharge = () => {
    let amount = 0;

    if (items.length !== 0) {
      items.map((item) => {
        amount += item.amount;
      });
    }

    if (amount / props.deliveryChargeAmount > 1) {
      return (
        props.product.deliveryCharge *
        Math.ceil(amount / props.deliveryChargeAmount)
      );
    } else {
      return props.product.deliveryCharge;
    }
  };

  return (
    <SafeAreaView bgWhite>
      {props.product ? (
        <>
          <ScrollView>
            <ModalProductInfo
              urlPath={props.product.productImages[0].path}
              productName={props.product.productName}
              discount={props.discount}
              price={props.price}
              onPressButton={addCart}
              onPressIncrease={(item) => onPressSetItems(item)}
              onPressDecrease={(item) => onPressSetItems(item)}
              onPressDelete={(item) => onPressSetItems(item)}
              onChangeSelectOption={(item) => onPressSetItems(item)}
              textLine={2}
              productOptionTitle={'옵션선택'}
              productOption={props.product.items}
              status={props.status}
            />
          </ScrollView>
          <ViewRow
            bgDarkWhite
            paddingLeft={15}
            paddingRight={15}
            paddingTop={10}
            justifyContent={'flex-end'}
            alignItems={'center'}
            paddingBottom={10}
            style={{borderTopColor: '#edeff2', borderTopWidth: 1}}>
            <Text marginRight={10} fontSize={13} ftDarkNavy bold>
              총 주문 금액(배송비 : {amountDeliveryCharge()}원)
            </Text>
            <Text ftTheme bold ftLarge fontSize={14}>
              {LocaleString(renderTotalOrderPrice() + amountDeliveryCharge())}원
            </Text>
          </ViewRow>
          <ViewRow>
            {paymentType ? (
              <BottomButton
                width={'100%'}
                text={'정기결제'}
                onPress={directPurchase}
              />
              ) : (
              <>
                <BottomButton
                  width={'50%'}
                  bgColor={{bgDarkNavy: true}}
                  text={'담기'}
                  onPress={addCart}
                />
                <BottomButton
                  width={'50%'}
                  text={'구매하기'}
                  onPress={directPurchase}
                />
              </>
            )}
          </ViewRow>
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default BottomModalView;
