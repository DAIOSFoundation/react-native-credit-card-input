import React, {useEffect, useState} from 'react';
import PurchaseListProduct from '../../../../../components/products/PurchaseListProduct';
// Styled Component
import {ScrollView, View, ViewRow} from '../../../../../components/styled/View';
import Topbar from '../../../../../components/bar/Topbar';
import {Text} from '../../../../../components/styled/Text';
import BuyProduct from '../../../../../components/products/BuyProduct';
import {
  Button,
  ButtonBorderRadius,
} from '../../../../../components/styled/Button';
import {Image} from '../../../../../components/styled/Image';
// NPM Module
import {Actions} from 'react-native-router-flux';
import Moment from 'moment';
import * as customModalActions from '../../../../../store/modules/modal/customModal/actions';
import * as orderHistoryActions from '../../../../../store/modules/orderHistory/action';
// utils Import
import {deliveryState} from '../../../../../utils/deliveryState';
// Redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as OrderHistoryActions from '../../../../../store/modules/orderHistory/action';
import {requestViewerOrderDetail} from '../../../../../store/modules/orderHistory/sagas';
import LoadingBar from '../../../../../components/loadingBar/LoadingBar';

const navyTriangleArrow = require('../../../../../assets/common/navy_triangle_02.png');
const pinkTriangleArrow = require('../../../../../assets/common/pink_triangle_03.png');

const ViewerPurchaseDetailScreen = (props) => {
  const dispatch = useDispatch();
  const [payment, setPayment] = useState(0);
  const [couponValue, setCouponValue] = useState(0);
  const {
    jwtToken,
    orderHistoryList,
    loading,
    userId,
    orderHistoryDetail,
    orderHistoryDetailItems,
  } = useSelector(
    (state) => ({
      userId: state.user.userId,
      jwtToken: state.user.jwtToken,
      orderHistoryList: state.orderHistory.orderHistoryList,
      orderHistory: state.orderHistory.orderHistory,
      loading: state.loading['orderHistory/REQUEST_VIEWER_ORDER_DETAIL'],
      orderHistoryDetail: state.orderHistory.orderHistoryDetail,
      orderHistoryDetailItems: state.orderHistory.orderHistoryDetailItems,
    }),
    shallowEqual,
  );
  useEffect(() => {
    let param = {
      orderHistoryId: props._id,
      detailId: props.productId,
      jwtToken: jwtToken,
    };
    dispatch(OrderHistoryActions.request_viewer_order_detail(param));
  }, []);

  const SampleAmount = () => {
    let productPrice = 0;
    orderHistoryDetail.items.map((item) => {
      item.itemStatus !== 181
        ? (productPrice += item.itemPrice * item.itemAmount)
        : 0;
    });
    if (orderHistoryDetail.couponInfo) {
      const calculatePrice = productPrice;
      if (orderHistoryDetail.couponInfo.couponType === 'percent') {
        productPrice =
          productPrice -
          productPrice * (orderHistoryDetail.couponInfo.couponValue / 100);
        setCouponValue(
          calculatePrice * (orderHistoryDetail.couponInfo.couponValue / 100),
        );
      }
      if (orderHistoryDetail.couponInfo.couponType === 'fixed') {
        productPrice = productPrice - orderHistoryDetail.couponInfo.couponValue;
        setCouponValue(orderHistoryDetail.couponInfo.couponValue);
      }
    }
    setPayment(productPrice);
    let sampleAmount = 0;
    orderHistoryDetail.items.map((item) => {
      item.itemStatus !== 181 ? (sampleAmount += item.itemAmount) : 0;
    });
    return (
      <Text ftDarkNavy bold>
        {sampleAmount}개
      </Text>
    );
  };

  const cancelOrderPrice = (items) => {
    let price = 0;
    items.map((item) =>
      item.itemStatus === 181 ? (price += item.cancelDetails.orderPrice) : null,
    );

    return price;
  };

  const cancelDeliveryCharge = (items) => {
    let deliveryCharge = 0;
    items.map((item) =>
      item.itemStatus === 181
        ? (deliveryCharge += item.cancelDetails.deliveryCharge)
        : null,
    );

    return deliveryCharge;
  };

  const cancelCouponPrice = (items) => {
    let couponPrice = 0;
    items.map((item) =>
      item.itemStatus === 181
        ? (couponPrice += item.cancelDetails.couponPrice)
        : null,
    );

    return couponPrice;
  };

  const cancelRefundPrice = (items) => {
    let refundPrice = 0;
    items.map((item) =>
      item.itemStatus === 181
        ? (refundPrice += item.cancelDetails.refundPrice)
        : null,
    );

    return refundPrice;
  };

  const orderPriceCheck = (items) => {
    console.log('orderPriceCheckkk=>>>', orderHistoryDetail);
    let check = 0;

    for (let i = 0; i < items.length; i++) {
      if (items[i].itemStatus !== 181) {
        check++;
      }
    }

    if (check === 0) {
      return 0;
    } else {
      return items[0].itemPrice;
    }
  };

  const cancelDetailsCheck = (items) => {
    let check = 0;

    for (let i = 0; i < items.length; i++) {
      if (items[i].cancelDetails) {
        check++;
      }
    }

    if (check === 0) {
      return false;
    } else {
      return true;
    }
  };

  const buttonText = (status) => {
    switch (status) {
      case 101:
      case 102:
      case 103:
      case 104:
      case 105:
      case 106:
        return '구매 확정';
      case 107:
        return '구매 확정';
      case 181:
        return '결제 취소';
      default:
        return ' ';
    }
  };

  const onPressOptionButton = (status, orderHistoryId, orderDetailId) => {
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

  const requestConfirm = (orderHistoryParams) => {
    dispatch(
      orderHistoryActions.request_order_product_confirm(orderHistoryParams),
    );
    let param = {
      orderHistoryId: props._id,
      detailId: props.productId,
      jwtToken: jwtToken,
    };
    dispatch(OrderHistoryActions.request_viewer_order_detail(param));
  };

  const checkButton = (item) => {
    const status = [107, 181];
    if (status.includes(item)) {
      return false;
    } else return true;
  };

  return (
    <View height={'100%'}>
      <Topbar
        isLine
        title={'주문 상세 내역'}
        isLeftButton
        onPressLeft={() => Actions.pop()}
      />
      {loading ? (
        <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{white: true}} />
        </View>
      ) : orderHistoryDetail && orderHistoryDetail.length !== 0 ? (
        <ScrollView bgDarkWhite>
          <View bgDarkWhite paddingTop={10} paddingLeft={15}>
            <Text ftGray>구매번호 :{orderHistoryDetail._id}</Text>
          </View>
          <View bgDarkWhite paddingBottom={10} paddingLeft={15} />
          <BuyProduct
            urlPath={orderHistoryDetail.productInfo.productImages[0].path}
            size={74}
            productName={orderHistoryDetail.productInfo.productName}
            price={payment + orderHistoryDetail.deliveryCharge}
            state={deliveryState(orderHistoryDetail.items[0].itemStatus)}
            date={Moment(orderHistoryDetail.createAt).format('YYYY.MM.DD')}
            detail
          />
          <ViewRow
            bgDarkWhite
            paddingTop={15}
            paddingBottom={5}
            paddingLeft={15}
            paddingRight={15}
            justifyContent={'space-between'}>
            <Text ftGray ftLarge bold>
              배송지 정보
            </Text>
            <ViewRow alignItems={'center'}>
              <Button width={'auto'} height={'auto'}>
                <Text ftNavy>배송조회</Text>
                <Image
                  marginLeft={10}
                  width={6}
                  height={9}
                  source={navyTriangleArrow}
                />
              </Button>
            </ViewRow>
          </ViewRow>
          <View
            bgWhite
            paddingLeft={15}
            paddingRight={15}
            paddingTop={15}
            paddingBottom={15}>
            <ViewRow marginTop={5} marginBottom={5}>
              <View width={'30%'}>
                <Text ftDarkNavy>이름</Text>
              </View>
              <View width={'70%'}>
                <Text ftDarkNavy>{orderHistoryDetail.name}</Text>
              </View>
            </ViewRow>
            <ViewRow marginTop={5} marginBottom={5}>
              <View width={'30%'}>
                <Text ftDarkNavy>연락처</Text>
              </View>
              <View width={'70%'}>
                <Text ftDarkNavy>{orderHistoryDetail.phone}</Text>
              </View>
            </ViewRow>
            <ViewRow marginTop={5} marginBottom={5}>
              <View width={'30%'}>
                <Text ftDarkNavy>주소</Text>
              </View>
              <View width={'70%'}>
                <Text ftDarkNavy>{orderHistoryDetail.zipCode}</Text>
              </View>
            </ViewRow>
            <ViewRow>
              <View width={'30%'} />
              <View width={'70%'}>
                <Text ftDarkNavy>{orderHistoryDetail.address}</Text>
              </View>
            </ViewRow>
            <ViewRow marginTop={5} marginBottom={5}>
              <View width={'30%'}>
                <Text ftDarkNavy>배송 메세지</Text>
              </View>
              <ViewRow>
                <View width={'70%'}>
                  <Text ftDarkNavy>{orderHistoryDetail.deliveryMessage}</Text>
                </View>
              </ViewRow>
            </ViewRow>
          </View>
          <View
            bgDarkWhite
            paddingTop={15}
            paddingBottom={5}
            paddingLeft={15}
            paddingRight={15}
            justifyContent={'space-between'}>
            <Text ftGray ftLarge bold>
              결제금액 정보
            </Text>
          </View>
          <View
            bgWhite
            paddingLeft={15}
            paddingRight={15}
            paddingTop={15}
            paddingBottom={15}>
            <ViewRow marginTop={5} marginBottom={5}>
              <View width={'30%'}>
                <Text ftDarkNavy>주문금액</Text>
              </View>
              <View width={'70%'} alignItems={'flex-end'}>
                <Text ftDarkNavy bold>
                  {orderPriceCheck(orderHistoryDetail.items)}원
                </Text>
              </View>
            </ViewRow>
            {/*<ViewRow marginTop={5} marginBottom={5}>*/}
            {/*  <View width={'30%'}>*/}
            {/*    <Text ftDarkNavy>할인금액</Text>*/}
            {/*  </View>*/}
            {/*  <View width={'70%'} alignItems={'flex-end'}>*/}
            {/*    <Text ftDarkNavy bold>*/}
            {/*      0원*/}
            {/*    </Text>*/}
            {/*  </View>*/}
            {/*</ViewRow>*/}
            <ViewRow marginTop={5} marginBottom={5}>
              <View width={'30%'}>
                <Text ftDarkNavy>수량</Text>
              </View>
              <View width={'70%'} alignItems={'flex-end'}>
                <SampleAmount />
              </View>
            </ViewRow>
            <ViewRow marginTop={5} marginBottom={5}>
              <View width={'30%'}>
                <Text ftDarkNavy>배송비</Text>
              </View>
              <View width={'70%'} alignItems={'flex-end'}>
                <Text ftDarkNavy bold>
                  {orderHistoryDetail.deliveryCharge}원
                </Text>
              </View>
            </ViewRow>

            {orderHistoryDetail.couponInfo ? (
              <ViewRow marginTop={5} marginBottom={5}>
                <View width={'30%'}>
                  <Text ftDarkNavy>쿠폰 할인</Text>
                </View>
                <View width={'70%'} alignItems={'flex-end'}>
                  <Text ftDarkNavy bold>
                    {couponValue}원
                  </Text>
                </View>
              </ViewRow>
            ) : (
              <></>
            )}

            <View marginTop={5} marginBottom={10} bgDarkWhite height={1} />
            <ViewRow>
              <View width={'30%'}>
                <Text ftTheme>결제금액</Text>
              </View>
              <View width={'70%'} alignItems={'flex-end'}>
                <Text ftTheme ftLarge bold>
                  {payment + orderHistoryDetail.deliveryCharge}원
                </Text>
              </View>
            </ViewRow>
            <View alignItems={'flex-end'}>
              <Text ftGray>
                {orderHistoryDetail.x}결제
                {Moment(orderHistoryDetail.createdAt).format(
                  '(YYYY.MM.DD h:mm:ss)',
                )}
              </Text>
            </View>
          </View>
          <View
            bgDarkWhite
            paddingTop={15}
            paddingBottom={5}
            paddingLeft={15}
            paddingRight={15}
            justifyContent={'space-between'}>
            <Text ftGray ftLarge bold>
              구매 옵션
            </Text>
          </View>
          <View
            bgWhite
            paddingLeft={15}
            paddingRight={15}
            paddingTop={15}
            paddingBottom={15}>
            <ViewRow>
              <View width={'100%'}>
                {orderHistoryDetailItems?.map((data, index) => {
                  return (
                    <ViewRow
                      marginTop={5}
                      marginBottom={5}
                      alignItems={'center'}
                      justifyContent={'space-between'}>
                      <View>
                        <Text ftDarkNavy bold>
                          옵션 {index + 1}
                        </Text>
                        <Text ftDarkNavy fontSize={15}>
                          {data.itemInfo[0].items.itemName}
                        </Text>
                      </View>
                      <View width={'30%'} alignItems={'flex-end'}>
                        {checkButton(data.itemStatus) ? (
                          <ButtonBorderRadius
                            brTheme
                            borderRadius={10}
                            onPress={() =>
                              onPressOptionButton(
                                data.itemStatus,
                                orderHistoryDetail.orderHistoryId,
                                orderHistoryDetail.orderDetailId,
                              )
                            }>
                            <Text ftTheme>{buttonText(data.itemStatus)}</Text>
                          </ButtonBorderRadius>
                        ) : (
                          <View alignItems={'center'}>
                            <Text ftTheme bold ftSize={15}>
                              {buttonText(data.itemStatus)}
                            </Text>
                          </View>
                        )}
                      </View>
                    </ViewRow>
                  );
                })}
              </View>
              {/*<View width={'70%'} alignItems={'flex-end'}>*/}
              {/*  <Text ftDarkNavy bold>*/}
              {/*    {orderHistoryDetail.items[0].itemStatus}*/}
              {/*  </Text>*/}
              {/*  <Button/>*/}
              {/*</View>*/}
            </ViewRow>
          </View>

          {cancelDetailsCheck(orderHistoryDetail.items) ? (
            <View paddingLeft={15} paddingRight={15}>
              <View bgDarkWhite paddingTop={15} paddingBottom={5}>
                <Text ftGray ftLarge bold>
                  취소금액 정보
                </Text>
              </View>
              <View bgWhite>
                <ViewRow marginTop={5} marginBottom={5}>
                  <View width={'30%'}>
                    <Text ftDarkNavy>주문금액</Text>
                  </View>
                  <View width={'70%'} alignItems={'flex-end'}>
                    <Text ftDarkNavy bold>
                      {cancelOrderPrice(orderHistoryDetail.items)}원
                    </Text>
                  </View>
                </ViewRow>
                <ViewRow marginTop={5} marginBottom={5}>
                  <View width={'30%'}>
                    <Text ftDarkNavy>배송비</Text>
                  </View>
                  <View width={'70%'} alignItems={'flex-end'}>
                    <Text ftDarkNavy bold>
                      {cancelDeliveryCharge(orderHistoryDetail.items)}원
                    </Text>
                  </View>
                </ViewRow>
                <ViewRow marginTop={5} marginBottom={5}>
                  <View width={'30%'}>
                    <Text ftDarkNavy>쿠폰할인가</Text>
                  </View>
                  <View width={'70%'} alignItems={'flex-end'}>
                    <Text ftDarkNavy bold>
                      {cancelCouponPrice(orderHistoryDetail.items)}원
                    </Text>
                  </View>
                </ViewRow>
                <ViewRow marginTop={5} marginBottom={5}>
                  <View width={'30%'}>
                    <Text ftDarkNavy>환불 사유</Text>
                  </View>
                  <View width={'70%'} alignItems={'flex-end'}>
                    <Text ftDarkNavy bold>
                      {orderHistoryDetail.items[0].cancelDetails
                        ? orderHistoryDetail.items[0].cancelDetails.cancelNote
                        : null}
                    </Text>
                  </View>
                </ViewRow>
                <ViewRow marginTop={5} marginBottom={5}>
                  <View width={'30%'}>
                    <Text ftDarkNavy>총 환불가</Text>
                  </View>
                  <View width={'70%'} alignItems={'flex-end'}>
                    <Text ftTheme bold>
                      - {cancelRefundPrice(orderHistoryDetail.items)}원
                    </Text>
                  </View>
                </ViewRow>
              </View>
            </View>
          ) : null}
          <View bgDarkWhite height={5} />
          <ViewRow bgWhite paddingRight={15} justifyContent={'flex-end'} />
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  );
};
export default ViewerPurchaseDetailScreen;
