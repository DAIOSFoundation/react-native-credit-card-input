import React, {useEffect} from 'react';
// Styled Component
import {Text} from '../../../../../components/styled/Text';
import Topbar from '../../../../../components/bar/Topbar';
import {ScrollView, View} from '../../../../../components/styled/View';
import LoadingBar from '../../../../../components/loadingBar/LoadingBar';
import PurchaseListProduct from '../../../../../components/products/PurchaseListProduct';
// utils Import
import {deliveryState} from '../../../../../utils/deliveryState';
// NPM Module
import {Actions} from 'react-native-router-flux';
// Redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as orderHistoryActions from '../../../../../store/modules/orderHistory/action';
import * as customModalActions from '../../../../../store/modules/modal/customModal/actions';

const ViewerPurchaseListScreen = () => {
  const dispatch = useDispatch();

  const {loading, jwtToken, orderHistoryList, successMsg} = useSelector(
    (state) => ({
      loading: state.loading['orderHistory/REQUEST_GET_VIEWER_ORDER_LIST'],
      jwtToken: state.user.jwtToken,
      orderHistoryList: state.orderHistory.orderHistoryList,
      successMsg: state.orderHistory.successMsg,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(orderHistoryActions.request_get_viewer_order_list(jwtToken));
    return () => {
      dispatch(orderHistoryActions.change_confirm_success_message());
    };
  }, [successMsg]);

  // 좌측하단 버튼 string
  const statusToButtonString = (status) => {
    switch (status) {
      case 101:
      case 102:
      case 103:
      case 104:
      case 105:
      case 106:
        return '구매 확정';
      case 107:
        return '';
      default:
        return status;
    }
  };

  const requestConfirm = (orderHistoryParams) => {
    dispatch(
      orderHistoryActions.request_order_product_confirm(orderHistoryParams),
    );
  };

  const statusToDispatch = (status, orderHistoryId, orderDetailId) => {
    const orderHistoryParams = {
      jwtToken: jwtToken,
      status,
      orderHistoryId,
      orderDetailId,
    };
    switch (status) {
      case 101:
      case 102:
      case 103:
      case 104:
      case 105:
      case 106:
        return (
          dispatch(
            customModalActions.change_modal_message('구매확정 하시겠습니까?'),
          ),
          dispatch(customModalActions.change_modal_onebutton(false)),
          dispatch(customModalActions.change_modal_visible(true)),
          dispatch(
            customModalActions.change_modal_onpress_ok(() =>
              requestConfirm(orderHistoryParams),
            ),
          )
        );
      case 107:
      default:
        return status;
    }
  };

  const productState = (item) => {
    let productStateCheck = 0;

    for (let i = 0; i < item.length; i++) {
      if (item[i].itemStatus === 181) {
        productStateCheck++;
      }
    }

    if (productStateCheck === 0) {
      return deliveryState(item[0].itemStatus);
    } else if (item.length === productStateCheck) {
      return '결제 취소';
    } else {
      return '부분 취소';
    }
  };

  // const leftButtonText = (item) =>{
  // let productStateCheck = 0;
  //
  // for (let i = 0; i < item.length; i++) {
  //   if (item[i].itemStatus === 181) {
  //     productStateCheck++;
  //   }
  // }
  //
  // if (productStateCheck === 0) {
  //   return deliveryState(item[0].itemStatus);
  // } else if (item.length === productStateCheck) {
  //   return '';
  // } else {
  //   return '';
  // }
  // };

  const OrderHistory = () => {
    let productsArray = [];
    let orderPrice = 0;
    {
      orderHistoryList.map((item, index) => {
        item.orderDetails.map((product) => {
          {
            product.items.map((test) => {
              test.itemStatus !== 181
                ? product.items.length > 1
                  ? (orderPrice += test.itemPrice * test.itemAmount)
                  : (orderPrice = test.itemPrice * test.itemAmount)
                : null;
            });
            if (product.couponInfo) {
              if (product.couponInfo.couponType == 'percent') {
                orderPrice -=
                  orderPrice * (product.couponInfo.couponValue / 100);
              } else if (product.couponInfo.couponType == 'fixed') {
                orderPrice -= product.couponInfo.couponValue;
              }
            }
          }

          productsArray.push(
            <PurchaseListProduct
              key={product._id}
              urlPath={product.productInfo.productImages[0].path}
              size={74}
              productName={product.productInfo.productName}
              price={orderPrice + product.deliveryCharge}
              hasItem={product.hasItem}
              itemInfo={product.items}
              state={productState(product.items)}
              date={item.createdAt.substring(0, 10)}
              // onPressLeftText={
              //   leftButtonText(product.items) !== ''
              //     ? leftButtonText(product.items)
              //     : ''
              // }
              onPressLeftButton={() =>
                statusToDispatch(
                  product.items[0].itemStatus,
                  item._id,
                  product._id,
                )
              }
              onPressRightText={'주문 상세 내역'}
              onPressRightButton={() =>
                Actions.viewerPurchaseDetailScreen({
                  _id: item._id,
                  productId: product._id,
                })
              }
            />,
          );
          orderPrice = 0;
        });
      });
    }
    return productsArray;
  };

  return (
    <>
      <Topbar
        isLine
        title={'구매내역'}
        isLeftButton
        onPressLeft={() => Actions.pop()}
      />
      {loading ? (
        <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
        </View>
      ) : (
        <ScrollView>
          {orderHistoryList && orderHistoryList.length !== 0 ? (
            <View>
              <OrderHistory />
            </View>
          ) : (
            <View paddingLeft={15}>
              <Text>구매한 상품이 없습니다.</Text>
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
};
export default ViewerPurchaseListScreen;
