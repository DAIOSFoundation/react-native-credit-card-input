import React, {useState, useEffect, useMemo} from 'react';
// NPM Module
import {Actions} from 'react-native-router-flux';
// Styled Component
import {
  SafeAreaView,
  ScrollView,
  ViewRow,
} from '../../../../../components/styled/View';
import ModalBuyProduct from '../../../../../components/products/ModalBuyProduct';
import ModalRecurringBuyProduct from '../../../../../components/products/ModalRecurringBuyProduct';
import {Text} from '../../../../../components/styled/Text';
import BottomButton from '../../../../../components/buttons/BottomButton';
// redux
import * as customModalActions from '../../../../../store/modules/modal/customModal/actions';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../../../store/modules/user/actions';
import * as broadcastActions from '../../../../../store/modules/broadcast/actions';
import * as productDetailActions from '../../../../../store/modules/productDetail/actions';
// utils Import
import {LocaleString} from '../../../../../utils/functions';

// 구매하기 탭뷰
const BuyRoute = (props) => {
  // redux
  const dispatch = useDispatch();

  const {
    jwtToken, 
    userId, 
    successMsg, 
    paymentType,
    recurringMonthSelect,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      successMsg: state.user.successMsg,
      paymentType: state.productDetail.paymentType,
      recurringMonthSelect: state.regularPayment.recurringMonthSelect,
    }),
    shallowEqual,
  );

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

  useEffect(() => {
    if (successMsg !== '') {
      dispatch(customModalActions.change_modal_message(successMsg));
      dispatch(userActions.reset_msg());
    }
    console.log('successMsg', successMsg);
  }, [successMsg]);

  // 바로 구매 버튼 이벤트
  const onPressDirectPurchase = () => {
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
          Actions.purchaseFormScreen()
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
          Actions.purchaseFormScreen();
        } else {
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
          Actions.purchaseFormScreen()
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
          Actions.purchaseFormScreen();
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

  // 상품 상세보기 버튼
  const onPressProductDetail = () => {
    let param = {
      broadcastId: props.broadcastId,
      productId: props.productId,
    };

    dispatch(productDetailActions.request_product_detail(param));
    Actions.productDetailScreen([
      props.broadcastId,
      props.productId,
      'fullScreen',
    ]);
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

  const buttonTextChange = () => {
    return paymentType ? '정기결제' : '구매하기'
  };

  const modalBuyButtonChange = () => {
    if (paymentType) {
      return (
        <ModalRecurringBuyProduct
          urlPath={props.product.productImages[0].path}
          productName={props.product.productName}
          discount={props.discount}
          price={props.price}
          onPressIncrease={(item) => onPressSetItems(item)}
          onPressDecrease={(item) => onPressSetItems(item)}
          onPressDelete={(item) => onPressSetItems(item)}
          onChangeSelectOption={(item) => onPressSetItems(item)}
          textLine={2}
          productOptionTitle={'옵션선택'}
          productOption={props.product.items}
          status={props.status}
          onPressProductDetail={onPressProductDetail}
        />
      )
    } else {
      return (
        <ModalBuyProduct
          urlPath={props.product.productImages[0].path}
          productName={props.product.productName}
          discount={props.discount}
          price={props.price}
          buttonText={'카트에 담기'}
          onPressButton={addCart}
          onPressIncrease={(item) => onPressSetItems(item)}
          onPressDecrease={(item) => onPressSetItems(item)}
          onPressDelete={(item) => onPressSetItems(item)}
          onChangeSelectOption={(item) => onPressSetItems(item)}
          textLine={2}
          productOptionTitle={'옵션선택'}
          productOption={props.product.items}
          status={props.status}
          onPressProductDetail={onPressProductDetail}
        />
      )
    }
  }

  return (
    <SafeAreaView bgWhite>
      {props.product ? (
        <>
          <ScrollView>
            {/* <ModalBuyProduct
              urlPath={props.product.productImages[0].path}
              productName={props.product.productName}
              discount={props.discount}
              price={props.price}
              buttonText={'카트에 담기'}
              onPressButton={addCart}
              onPressIncrease={(item) => onPressSetItems(item)}
              onPressDecrease={(item) => onPressSetItems(item)}
              onPressDelete={(item) => onPressSetItems(item)}
              onChangeSelectOption={(item) => onPressSetItems(item)}
              textLine={2}
              productOptionTitle={'옵션선택'}
              productOption={props.product.items}
              status={props.status}
              onPressProductDetail={onPressProductDetail}
            /> */}
            {modalBuyButtonChange()}
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
              총 주문 금액(배송비 : {amountDeliveryCharge()})
            </Text>
            <Text ftTheme bold ftLarge fontSize={14}>
              {LocaleString(renderTotalOrderPrice() + amountDeliveryCharge())}{' '}
              원
            </Text>
          </ViewRow>
          <BottomButton
            textSize={16}
            onPress={onPressDirectPurchase}
            text={buttonTextChange()}
          />
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default BuyRoute;
