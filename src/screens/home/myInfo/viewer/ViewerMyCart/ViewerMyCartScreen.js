import React, {useEffect, useState} from 'react';
// Styled Component
import {ScrollView, View, ViewRow} from '../../../../../components/styled/View';
import Topbar from '../../../../../components/bar/Topbar';
import BottomButton from '../../../../../components/buttons/BottomButton';
import {Button} from '../../../../../components/styled/Button';
import {Image} from '../../../../../components/styled/Image';
import {Text} from '../../../../../components/styled/Text';
import ModalCartProduct from '../../../../../components/products/ModalCartProduct';
// NPM Module
import {Actions} from 'react-native-router-flux';
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../../../store/modules/user/actions';
import * as customModalActions from '../../../../../store/modules/modal/customModal/actions';
// asset Images
const iconNormalCheck = require('../../../../../assets/checkbox/icon_check_normal.png');
const iconPressedCheck = require('../../../../../assets/checkbox/icon_check_pressed.png');
// utils Import
import {
  disRate,
  LocaleString,
  timePrice,
  timeStatus,
} from '../../../../../utils/functions';
import * as broadcastActions from '../../../../../store/modules/broadcast/actions';
import LoadingBar from '../../../../../components/loadingBar/LoadingBar';
// 뷰어 - 나의 카트 화면
const ViewerMyCartScreen = () => {
  // redux
  const dispatch = useDispatch();

  // 뒤로가기 버튼 이벤트
  const onPressBack = () => {
    Actions.pop();
  };

  const {jwtToken, userId, carts, rendering, loading} = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      carts: state.user.carts,
      rendering: state.user.rendering,
      loading: state.loading['user/REQUEST_GET_CART'],
    }),
    shallowEqual,
  );

  const [check, setCheck] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);

  useEffect(() => {
    if (jwtToken && userId) {
      const body = {
        jwtToken: jwtToken,
        userId: userId,
      };

      dispatch(userActions.request_get_cart(body));
    }
  }, [rendering]);

  useEffect(() => {
    if (carts) {
      let initCheck = [];

      for (let i = 0; i < carts.length; i++) {
        initCheck.push(false);
      }
      setCheck(initCheck);
    }
  }, [carts]);

  // 상품 체크
  const onPressCheck = (value) => {
    let initCheck = [...check];

    initCheck[value[1]] = value[0];

    setCheck(initCheck);
  };
  // 상품 전체 선택 여부
  const productAllSelect = () => {
    // 카트에 상품이 없을 경우
    if (check.length === 0) {
      return false;
    }

    // 카트에 최소 한개 이상 선택 되지 않은 상품이 있을 경우 선택해제
    for (let i = 0; i < check.length; i++) {
      if (check[i] === false) {
        return false;
      }
    }
  };

  // 상품 전체 선택 버튼
  const onPressProductAllSelect = () => {
    let initCheck = [...check];

    // 전체 선택시 상품들 중 구매 불가능한 상품 체크
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].productInfo.sellingStatus !== 2) {
        return dispatch(
          customModalActions.change_modal_message(
            '상품들 중 구매가 불가능한 상품이있어 \n\n 전체선택을 할 수 없습니다.',
          ),
        );
      }
    }

    if (initCheck.includes(false)) {
      // 하나라도 체크되지 않은 상품이 있을 시 전체 선택
      for (let i = 0; i < check.length; i++) {
        if (initCheck[i] === false) {
          initCheck[i] = true;
        }
      }
    } else {
      // 상품이 모두 선택 되어있을 시 전체 해제
      for (let i = 0; i < check.length; i++) {
        initCheck[i] = false;
      }
    }

    setCheck(initCheck);
  };

  // 총 주문 금액
  const renderTotalOrderPrice = () => {
    let result = 0;

    for (let i = 0; i < carts.length; i++) {
      if (check[i]) {
        if (carts[i].productInfo.sellingStatus === 2) {
          for (let j = 0; j < carts[i].items.length; j++) {
            if (carts[i].items[j].itemInfo.itemAmount !== 0) {
              // 실시간 방송일 경우 라이브할인가 적용 (broadcastStatus = 5)
              result +=
                (timeStatus(
                  carts[i].expectedStartTime,
                  carts[i].expectedEndTime,
                  carts[i].broadcastStatus,
                )
                  ? carts[i].productInfo.sellerLivePrice
                  : carts[i].productInfo.sellerFeedPrice) *
                carts[i].items[j].amount;
            }
          }
        }
      }
    }

    return result;
  };

  // 총 배송비 금액
  const renderTotalDeliveryChargePrice = () => {
    let items = [];

    for (let i = 0; i < carts.length; i++) {
      let checks = [];
      // 체크 상태와 제품의 상태를 확인하여 카트의 items를 for문으로 돌리고,
      // 재고량이 0 이 아닐시 checks배열에 아이템을 푸쉬한다.
      if (check[i] && carts[i].productInfo.sellingStatus === 2) {
        for (let j = 0; j < carts[i].items.length; j++) {
          if (carts[i].items[j].itemInfo.itemAmount !== 0) {
            checks.push(carts[i].items[j]);
          }
        }

        // checks배열의 길이가 0 이 아니라는건 하나의 상품에 최소 하나이상의 구매할수 있는 옵션의 상품이 존재한다는것
        // 고로 deliveryCharge와 deliveryChargeAmount를 넣어줘야함
        if (checks.length !== 0) {
          items.push({
            items: checks,
            deliveryCharge: carts[i].productInfo.deliveryCharge,
            deliveryChargeAmount: carts[i].productInfo.deliveryChargeAmount,
          });
        }
      }
    }

    let amount;

    if (items.length !== 0) {
      let result = [];

      items.map(
        (item) => (
          (amount = 0),
          item.items.map((itemSub) => (amount += itemSub.amount)),
          result.push({
            amount: amount,
            deliveryCharge: item.deliveryCharge,
            deliveryChargeAmount: item.deliveryChargeAmount,
          })
        ),
      );

      let deliveryCharge = 0;

      for (let i = 0; i < result.length; i++) {
        if (result[i].amount / result[i].deliveryChargeAmount > 1) {
          deliveryCharge +=
            result[i].deliveryCharge *
            Math.ceil(result[i].amount / result[i].deliveryChargeAmount);
        } else {
          deliveryCharge += result[i].deliveryCharge;
        }
      }

      return deliveryCharge;
    } else {
      return 0;
    }
  };

  // 수량 증가 이벤트
  const onPressIncrease = (data) => {
    let param = {
      jwtToken: jwtToken,
      userId: userId,
      body: {
        broadcastId: data.broadcastId,
        productId: data.productId,
        itemId: data.itemId,
        amount: data.itemAmount + 1,
      },
    };

    dispatch(userActions.change_cart_product_amount(param));
  };
  // 수량 감소 이벤트
  const onPressDecrease = (data) => {
    let param = {
      jwtToken: jwtToken,
      userId: userId,
      body: {
        broadcastId: data.broadcastId,
        productId: data.productId,
        itemId: data.itemId,
        amount: data.itemAmount - 1,
      },
    };

    if (data.itemAmount > 1) {
      dispatch(userActions.change_cart_product_amount(param));
    }
  };
  // 상품 개별 삭제 이벤트
  const onPressDelete = (data) => {
    let param = {
      jwtToken: jwtToken,
      userId: userId,
      cartDetailId: data.cartDetailId,
      itemId: data.itemId,
    };

    dispatch(userActions.delete_cart_product_part(param));
  };
  // 상품 전체 삭제 이벤트
  const onPressAllDelete = (data) => {
    let param = {
      jwtToken: jwtToken,
      userId: userId,
      cartDetailId: data.cartDetailId,
    };

    dispatch(userActions.delete_cart_product_all(param));
  };

  // 선택 상품 구매 이벤트
  const selectProductPurchase = () => {
    if (renderTotalOrderPrice() > 0) {
      setCartProduct([]);

      for (let i = 0; i < carts.length; i++) {
        if (check[i]) {
          // 판매제품 상태 값 분기
          if (carts[i].productInfo.sellingStatus === 2) {
            // 판매제품 옵션 여부 / true false
            if (carts[i].hasItem) {
              let initItem = [];

              for (let j = 0; j < carts[i].items.length; j++) {
                // 판매제품 개별 상태 값 분기
                if (carts[i].items[j].itemInfo.itemAmount !== 0) {
                  initItem.push({
                    itemId: carts[i].items[j].itemId,
                    itemAmount: carts[i].items[j].amount,
                    itemPrice: timePrice(
                      carts[i].expectedStartTime,
                      carts[i].expectedEndTime,
                      carts[i].productInfo.sellerLivePrice,
                      carts[i].productInfo.sellerFeedPrice,
                      carts[i].broadcastStatus,
                    ),
                    itemName: carts[i].items[j].itemInfo.itemName,
                  });
                }
              }

              let deliveryCharge = 0;
              let amount = 0;

              if (initItem.length !== 0) {
                initItem.map((item) => (amount += item.itemAmount));

                if (amount / carts[i].productInfo.deliveryChargeAmount > 1) {
                  deliveryCharge +=
                    carts[i].productInfo.deliveryCharge *
                    Math.ceil(
                      amount / carts[i].productInfo.deliveryChargeAmount,
                    );
                } else {
                  deliveryCharge += carts[i].productInfo.deliveryCharge;
                }
              }

              let param = {
                broadcastId: carts[i].broadcastId,
                productId: carts[i].productId,
                hasItem: carts[i].hasItem,
                items: initItem,
                deliveryCharge: deliveryCharge,
                productImage: carts[i].productInfo.productImages[0].path,
                productName: carts[i].productInfo.productName,
                status: carts[i].broadcastStatus,
                sellerName: carts[i].sellerInfo.nickName,
                isExtraCharge: carts[i].productInfo.isExtraCharge,
                extraCharge: carts[i].productInfo.extraCharge,
              };

              cartProduct.push(param);
            } else {
              // 판매제품 개별 상태 값 분기
              if (carts[i].items[0].itemInfo.itemAmount !== 0) {
                let deliveryCharge = 0;

                if (
                  carts[i].items[0].amount /
                    carts[i].productInfo.deliveryChargeAmount >
                  1
                ) {
                  deliveryCharge +=
                    carts[i].productInfo.deliveryCharge *
                    Math.ceil(
                      carts[i].items[0].amount /
                        carts[i].productInfo.deliveryChargeAmount,
                    );
                } else {
                  deliveryCharge += carts[i].productInfo.deliveryCharge;
                }

                let param = {
                  broadcastId: carts[i].broadcastId,
                  productId: carts[i].productId,
                  hasItem: carts[i].hasItem,
                  itemId: carts[i].productInfo.items[0]._id,
                  items: [
                    {
                      itemAmount: carts[i].items[0].amount,
                      itemPrice: timePrice(
                        carts[i].expectedStartTime,
                        carts[i].expectedEndTime,
                        carts[i].productInfo.sellerLivePrice,
                        carts[i].productInfo.sellerFeedPrice,
                        carts[i].broadcastStatus,
                      ),
                    },
                  ],
                  deliveryCharge: deliveryCharge,
                  productImage: carts[i].productInfo.productImages[0].path,
                  productName: carts[i].productInfo.productName,
                  status: carts[i].broadcastStatus,
                  sellerName: carts[i].sellerInfo.nickName,
                  isExtraCharge: carts[i].productInfo.isExtraCharge,
                  extraCharge: carts[i].productInfo.extraCharge,
                };

                cartProduct.push(param);
              }
            }
          } else {
            return dispatch(
              customModalActions.change_modal_message(
                '재고가 없는 상품이 포함되어 있습니다.',
              ),
            );
          }
        }
      }
      console.log('카트에 담긴 선택 상품 구매 => ', cartProduct);
      dispatch(broadcastActions.change_broadcast_product(cartProduct));
      Actions.myInfoPurchaseFormScreen();
    } else {
      dispatch(
        customModalActions.change_modal_message(
          '구매 하실 물품을 선택해주세요.',
        ),
      );
    }
  };

  return (
    <View height={'100%'}>
      <Topbar isLine title={'카트'} isLeftButton onPressLeft={onPressBack} />
      <ViewRow alignItems={'center'} paddingTop={15} paddingLeft={15}>
        <Button
          marginRight={15}
          width={24}
          height={24}
          onPress={onPressProductAllSelect}>
          <Image
            source={
              productAllSelect() === false ? iconNormalCheck : iconPressedCheck
            }
          />
        </Button>
        <Text fontSize={17} ftDarkNavy bold>
          상품 전체 선택
        </Text>
      </ViewRow>
      {loading ? (
        <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
        </View>
      ) : carts ? (
        <>
          <ScrollView>
            {carts.map((item, index) => (
              <ModalCartProduct
                id={item._id}
                index={index}
                checked={check[index]}
                broadcastId={item.broadcastId}
                productId={item.productId}
                key={item + index}
                title={item.sellerInfo.nickName}
                urlPath={item.productInfo.productImages[0].path}
                hasItem={item.hasItem}
                productName={item.productInfo.productName}
                products={item.items}
                sellingStatus={item.productInfo.sellingStatus}
                discount={disRate(
                  item.productInfo.normalPrice,
                  timePrice(
                    item.expectedStartTime,
                    item.expectedEndTime,
                    item.productInfo.sellerLivePrice,
                    item.productInfo.sellerFeedPrice,
                    item.broadcastStatus,
                  ),
                )}
                price={timePrice(
                  item.expectedStartTime,
                  item.expectedEndTime,
                  item.productInfo.sellerLivePrice,
                  item.productInfo.sellerFeedPrice,
                  item.broadcastStatus,
                )}
                deliveryCharge={item.productInfo.deliveryCharge}
                onPressDelete={onPressDelete}
                onPressAllDelete={onPressAllDelete}
                onPressIncrease={onPressIncrease}
                onPressDecrease={onPressDecrease}
                onPressCheck={onPressCheck}
                textLine={2}
                deliveryChargeAmount={item.productInfo.deliveryChargeAmount}
              />
            ))}
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
            <Text marginRight={10} fontSize={15} ftDarkNavy bold>
              총 주문 금액
            </Text>
            <Text ftTheme bold ftLarge fontSize={14}>
              {LocaleString(
                renderTotalOrderPrice() + renderTotalDeliveryChargePrice(),
              )}{' '}
              원
            </Text>
          </ViewRow>
          <ViewRow>
            <BottomButton
              textSize={17}
              width={'100%'}
              text={'선택 상품 구매'}
              onPress={selectProductPurchase}
            />
          </ViewRow>
        </>
      ) : null}
    </View>
  );
};

export default ViewerMyCartScreen;
