import React, {useEffect} from 'react';
// Styled Component
import {ScrollView, View, ViewRow} from '../../../../components/styled/View';
import Topbar from '../../../../components/bar/Topbar';
import {Text} from '../../../../components/styled/Text';
import BuyProduct from '../../../../components/products/BuyProduct';
import {Image} from '../../../../components/styled/Image';
import {Button} from '../../../../components/styled/Button';
// NPM Module
import {Actions} from 'react-native-router-flux';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// Action
import * as OrderHistoryActions from '../../../../store/modules/orderHistory/action';
import Moment from 'moment';
import {deliveryState} from '../../../../utils/deliveryState';
import LoadingBar from '../../../../components/loadingBar/LoadingBar';
// assets Img
const navyTriangleArrow = require('../../../../assets/common/navy_triangle_02.png');
const pinkTriangleArrow = require('../../../../assets/common/pink_triangle_03.png');

// 주문 상세내역 화면
const PurchaseDetailScreen = (props) => {
  const dispatch = useDispatch();
  const {jwtToken, orderHistory, loading, userId} = useSelector(
    (state) => ({
      userId: state.user.userId,
      jwtToken: state.user.jwtToken,
      orderHistory: state.orderHistory.orderHistory,
      loading: state.loading['orderHistory/REQUEST_GET_ORDER_HISTORY'],
    }),
    shallowEqual,
  );
  useEffect(() => {
    let param = {
      _id: props._id,
      productId: props.productId,
      jwtToken,
    };
    dispatch(OrderHistoryActions.request_get_order_history(param));
  }, []);

  if (loading) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
      </View>
    );
  }
  return (
    <View height={'100%'}>
      <Topbar
        isLine
        title={'주문 상세 내역'}
        isLeftButton
        onPressLeft={() => Actions.pop()}
      />
      {orderHistory ? (
        <ScrollView bgDarkWhite>
          <View bgDarkWhite paddingTop={10} paddingLeft={15}>
            <Text ftGray>구매번호 : {orderHistory._id}</Text>
          </View>
          <View bgDarkWhite paddingBottom={10} paddingLeft={15}>
            {/*<Text ftGray>구매번호 : {orderHistory._id}</Text>*/}
          </View>
          <BuyProduct
            urlPath={orderHistory.products[0].sampleImagePath}
            size={74}
            productName={orderHistory.products[0].sampleName}
            price={
              orderHistory.products[0].sampleAmount *
                orderHistory.products[0].samplePrice +
              orderHistory.products[0].sampleDeliveryCharge
            }
            state={deliveryState(orderHistory.products[0].productStatus)}
            date={Moment(orderHistory.createdAt).format('YYYY.MM.DD')}
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
            {/*<ViewRow alignItems={'center'}>*/}
            {/*  <Button width={'auto'} height={'auto'}>*/}
            {/*    <Text ftNavy>배송조회</Text>*/}
            {/*    <Image*/}
            {/*      marginLeft={10}*/}
            {/*      width={6}*/}
            {/*      height={9}*/}
            {/*      source={navyTriangleArrow}*/}
            {/*    />*/}
            {/*  </Button>*/}
            {/*</ViewRow>*/}
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
                <Text ftDarkNavy>{orderHistory.name}</Text>
              </View>
            </ViewRow>
            <ViewRow marginTop={5} marginBottom={5}>
              <View width={'30%'}>
                <Text ftDarkNavy>연락처</Text>
              </View>
              <View width={'70%'}>
                <Text ftDarkNavy>{orderHistory.phone}</Text>
              </View>
            </ViewRow>
            <ViewRow marginTop={5} marginBottom={5}>
              <View width={'30%'}>
                <Text ftDarkNavy>주소</Text>
              </View>
              <View width={'70%'}>
                <Text ftDarkNavy>{orderHistory.zipCode}</Text>
              </View>
            </ViewRow>
            <ViewRow>
              <View width={'30%'} />
              <View width={'70%'}>
                <Text ftDarkNavy>{orderHistory.address}</Text>
              </View>
            </ViewRow>
            <ViewRow marginTop={5} marginBottom={5}>
              <View width={'30%'}>
                <Text ftDarkNavy>배송 메세지</Text>
              </View>
              <ViewRow>
                <View width={'70%'}>
                  <Text ftDarkNavy>{orderHistory.deliveryMessage}</Text>
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
                  {orderHistory.products[0].samplePrice}원
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
                <Text ftDarkNavy bold>
                  {orderHistory.products[0].sampleAmount}개
                </Text>
              </View>
            </ViewRow>
            <ViewRow marginTop={5} marginBottom={5}>
              <View width={'30%'}>
                <Text ftDarkNavy>배송비</Text>
              </View>
              <View width={'70%'} alignItems={'flex-end'}>
                <Text ftDarkNavy bold>
                  {orderHistory.products[0].sampleDeliveryCharge}원
                </Text>
              </View>
            </ViewRow>
            <View marginTop={5} marginBottom={10} bgDarkWhite height={1} />
            <ViewRow>
              <View width={'30%'}>
                <Text ftTheme>결제금액</Text>
              </View>
              <View width={'70%'} alignItems={'flex-end'}>
                <Text ftTheme ftLarge bold>
                  {orderHistory.products[0].sampleAmount *
                    orderHistory.products[0].samplePrice +
                    orderHistory.products[0].sampleDeliveryCharge}
                  원
                </Text>
              </View>
            </ViewRow>
            <View alignItems={'flex-end'}>
              <Text ftGray>
                {orderHistory.paymentMethod}결제{' '}
                {Moment(orderHistory.createdAt).format('(YYYY.MM.DD h:mm:ss)')}
              </Text>
            </View>
          </View>
          <View bgDarkWhite height={5} />
          {/*<ViewRow bgWhite paddingRight={15} justifyContent={'flex-end'}>*/}
          {/*  <Button*/}
          {/*    width={'auto'}*/}
          {/*    height={'auto'}*/}
          {/*    paddingTop={10}*/}
          {/*    paddingBottom={10}>*/}
          {/*    <Text ftGray ftLarge>*/}
          {/*      상품 상세 페이지 보기*/}
          {/*    </Text>*/}
          {/*    <Image*/}
          {/*      marginLeft={10}*/}
          {/*      width={6}*/}
          {/*      height={10}*/}
          {/*      source={pinkTriangleArrow}*/}
          {/*    />*/}
          {/*  </Button>*/}
          {/*</ViewRow>*/}
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  );
};

export default PurchaseDetailScreen;
