import React, {useState, useEffect} from 'react';
// Styled Component
import {
  SafeAreaView,
  ScrollView,
  View,
  ViewBorder,
  ViewRow,
} from '../../../../../components/styled/View';
import BottomButton from '../../../../../components/buttons/BottomButton';
import Topbar from '../../../../../components/bar/Topbar';
import {Text} from '../../../../../components/styled/Text';
import {Image} from '../../../../../components/styled/Image';
import OrderProduct from '../../../../../components/products/OrderProduct';
import {Button} from '../../../../../components/styled/Button';
// NPM Module
import {Actions} from 'react-native-router-flux';
import Moment from 'moment';
// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import * as customModalActions from '../../../../../store/modules/modal/customModal/actions';
import * as orderActions from '../../../../../store/modules/order/action';
// utils
import {LocaleString} from '../../../../../utils/functions';
// assets Image
const checkNormal = require('../../../../../assets/checkbox/icon_check_normal.png');
const checkPressed = require('../../../../../assets/checkbox/icon_check_pressed.png');

const CouponScreen = () => {
  const dispatch = useDispatch();

  const {
    broadcastProducts, // 자신이 주문할 상품들을 다 가져옴
    coupons, // 자신의 쿠폰 리스트를 다 가져옴
    broadcastIdQuarter, // 결제 시 해당 상품에 적용된 쿠폰의 id 값을 넣어주는 역할 / 랜더링 시 쿠폰 선택 체크값 유지
  } = useSelector(
    (state) => ({
      broadcastProducts: state.broadcast.broadcastProducts,
      coupons: state.coupon.coupons,
      broadcastIdQuarter: state.order.broadcastIdQuarter,
    }),
    shallowEqual,
  );

  // 해당 상품에 적용 되는 쿠폰 저장 변수 ex) [ [{},{}], [{},{}], [{},{},{}] ] couponsForProducts
  // [
  //   [{
  //   "broadcastId": "5ed5c11c60c975013c260d5e",
  //   "coupons": [Object],
  //   "status": false
  // },
  // {
  //   "broadcastId": "5ed5c11c60c975013c260d5e",
  //   "coupons": [Object],
  //   "status": false
  // }],
  // [{
  //   "broadcastId": "5ed6f7f1d41dbb04c1d8feaa",
  //   "coupons": [Object],
  //   "status": false
  // }, {
  //   "broadcastId": "5ed6f7f1d41dbb04c1d8feaa",
  //   "coupons": [Object],
  //   "status": false
  // }],
  // [{
  //   "broadcastId": "5ed5fad7d41dbb04c1d8fe98",
  //   "coupons": [Object],
  //   "status": false
  // },
  // {
  //   "broadcastId": "5ed5fad7d41dbb04c1d8fe98",
  //   "coupons": [Object],
  //   "status": false
  // },
  // {
  //   "broadcastId": "5ed5fad7d41dbb04c1d8fe98",
  //   "coupons": [Object],
  //   "status": false
  // }]
  // ]

  const [couponsForProducts, setCouponsForProducts] = useState(null);

  console.log('couponsForProducts', couponsForProducts);

  useEffect(() => {
    if (coupons?.length > 0) {
      couponsForProductsStore();
    }
  }, [coupons]);

  // 뒤로가기 버튼
  const onPressClose = () => {
    Actions.pop();
  };

  // 쿠폰 타입에 따라 리턴 값 분기처리
  const couponTypeAndValue = (type, value) => {
    if (type === 'percent') {
      return value + '% 할인쿠폰';
    } else if (type === 'fixed') {
      return LocaleString(value) + '원 할인쿠폰';
    } else {
    }
  };

  // 상품에 해당하는 쿠폰 적용 값 리턴
  const couponReplaceProductValue = (
    assignedType,
    couponType,
    assignedId,
    couponValue,
    index,
  ) => {
    let totalPrice = 0;

    if (assignedType === 'broadcast' && couponType === 'percent') {
      for (let j = 0; j < broadcastProducts[index].items.length; j++) {
        totalPrice +=
          broadcastProducts[index].items[j].itemAmount *
          broadcastProducts[index].items[j].itemPrice;
      }
      return Math.floor(totalPrice * (couponValue / 100));
    } else if (assignedType === 'broadcast' && couponType === 'fixed') {
      return couponValue;
    } else if (assignedType === 'product' && couponType === 'percent') {
      for (let j = 0; j < broadcastProducts[i].items.length; j++) {
        totalPrice +=
          broadcastProducts[index].items[j].itemAmount *
          broadcastProducts[index].items[j].itemPrice;
      }
      return Math.floor(totalPrice * (couponValue / 100));
    } else if (assignedType === 'product' && couponType === 'fixed') {
      return couponValue;
    } else if (assignedType === 'all' && couponType === 'percent') {
      for (let j = 0; j < broadcastProducts[index].items.length; j++) {
        totalPrice +=
          broadcastProducts[index].items[j].itemAmount *
          broadcastProducts[index].items[j].itemPrice;
      }
      return Math.floor(totalPrice * (couponValue / 100));
    } else if (assignedType === 'all' && couponType === 'fixed') {
      return couponValue;
    }
  };

  // 해당 상품에 적용 되는 쿠폰 저장
  const couponsForProductsStore = () => {
    let item = []; // 임시 저장
    let resultItems = []; // 리턴 값

    for (let i = 0; i < broadcastProducts.length; i++) {
      for (let j = 0; j < coupons.length; j++) {
        if (
          coupons[j].assignedType === 'broadcast' &&
          broadcastProducts[i].broadcastId === coupons[j].assignedId
        ) {
          item.push({
            coupons: coupons[j], // 쿠폰의 모든 정보
            status: false, // 선택 여부 판단 하기 위한 값
            broadcastId: broadcastProducts[i].broadcastId, // id 값
          });
        } else if (
          coupons[j].assignedType === 'product' &&
          broadcastProducts[i].productId === coupons[j].assignedId
        ) {
          item.push({
            coupons: coupons[j],
            status: false,
            broadcastId: broadcastProducts[i].broadcastId,
          });
        } else if (coupons[j].assignedType === 'all') {
          item.push({
            coupons: coupons[j],
            status: false,
            broadcastId: broadcastProducts[i].broadcastId,
          });
        }
      }
      resultItems.push(item);
      item = [];
    }

    // 쿠폰 적용 후 뒤로가기 버튼 클릭 후 다시 쿠폰페이지 화면 진입 시 현재 체크된 값 계속해서 유지하기 위해 설정
    if (broadcastIdQuarter) {
      for (let i = 0; i < broadcastIdQuarter.length; i++) {
        if (broadcastIdQuarter[i]) {
          resultItems[broadcastIdQuarter[i].iIndex][
            broadcastIdQuarter[i].jIndex
          ].status = true;
        }
      }
    }

    setCouponsForProducts(resultItems);
  };

  // 쿠폰 선택 체크 이미지 토글
  const couponCheckStatus = (
    id,
    index,
    indexSub,
    productItem,
    couponReplaceProductValue,
  ) => {
    // 상품 가격
    let productPrice = 0;

    productItem.map((item) => {
      productPrice += item.itemAmount * item.itemPrice;
    });

    console.log('productPrice', productPrice);

    if (productPrice <= couponReplaceProductValue) {
      return dispatch(
        customModalActions.change_modal_message(
          '쿠폰 할인 금액이 상품 가격보다 높습니다.',
        ),
      );
    }

    let copyCouponsForProducts = [...couponsForProducts];

    // 해당 상품에 체크 상태를 모두 false 설정
    for (let i = 0; i < copyCouponsForProducts[index].length; i++) {
      copyCouponsForProducts[index][i].status = false;
    }

    // 선택한 쿠폰 타입이 all일 경우 선택한 쿠폰의 id 값을 가져와 다른 상품에 현재 클릭한 id 값과 동일한 쿠폰이 있으면 false 처리
    if (
      copyCouponsForProducts[index][indexSub].coupons.assignedType === 'all'
    ) {
      for (let i = 0; i < copyCouponsForProducts.length; i++) {
        for (let j = 0; j < copyCouponsForProducts[i].length; j++) {
          if (copyCouponsForProducts[i][j].coupons._id === id) {
            copyCouponsForProducts[i][j].status = false;
          }
        }
      }

      copyCouponsForProducts[index][indexSub].status = !copyCouponsForProducts[
        index
      ][indexSub].status;
    } else {
      copyCouponsForProducts[index][indexSub].status = !copyCouponsForProducts[
        index
      ][indexSub].status;
    }

    return setCouponsForProducts(copyCouponsForProducts);
  };

  // 해당 상품에 적용 가능한 쿠폰 리스트
  const productCouponList = (broadcastId, productId, index, productItem) => {
    let couponItems = []; // ex) [{}, {}]

    for (let i = 0; i < coupons.length; i++) {
      if (coupons[i].assignedType === 'broadcast') {
        if (broadcastId === coupons[i].assignedId) {
          couponItems.push({
            coupons: coupons[i],
          });
        }
      } else if (coupons[i].assignedType === 'product') {
        if (productId === coupons[i].assignedId) {
          couponItems.push({
            coupons: coupons[i],
          });
        }
      } else {
        couponItems.push({
          coupons: coupons[i],
        });
      }
    }
    // [ [{},{}] [{},{}], [{},{},{}] ]
    return couponItems.map((item, indexSub) => (
      <View marginTop={5} marginBottom={5}>
        <ViewRow>
          <Button
            marginRight={10}
            width={'auto'}
            height={'auto'}
            onPress={() =>
              couponCheckStatus(
                item.coupons._id,
                index,
                indexSub,
                productItem,
                couponReplaceProductValue(
                  item.coupons.assignedType,
                  item.coupons.couponType,
                  item.coupons.assignedId,
                  item.coupons.couponValue,
                  index,
                ),
              )
            }>
            {/* 이중 삼항 연산자 */}
            {couponsForProducts ? (
              couponsForProducts[index][indexSub].status ? (
                <Image width={24} height={24} source={checkPressed} />
              ) : (
                <Image width={24} height={24} source={checkNormal} />
              )
            ) : null}
          </Button>
          <Text>
            {couponReplaceProductValue(
              item.coupons.assignedType,
              item.coupons.couponType,
              item.coupons.assignedId,
              item.coupons.couponValue,
              index,
            )}
            원 할인
            {item.coupons.assignedType === 'all' ? ' [중복]' : null}
          </Text>
        </ViewRow>
        <ViewRow alignItems={'center'}>
          <View marginRight={32} />
          <Text ftGray fontSize={13} marginRight={5}>
            {couponTypeAndValue(
              item.coupons.couponType,
              item.coupons.couponValue,
            )}
          </Text>
          <Text fontSize={11} ftTheme>
            {Moment(item.coupons.createdAt).format('YYYY.MM.DD')} ~{' '}
            {Moment(item.coupons.endedAt).format('YYYY.MM.DD')} 까지
          </Text>
        </ViewRow>
      </View>
    ));
  };

  // 쿠폰 선택 시 이벤트
  const onPressCouponSelect = () => {
    let result = 0;
    let broadcastIdQuarter = [];

    if (couponsForProducts) {
      for (let i = 0; i < couponsForProducts.length; i++) {
        let jValue = null; // broadcastIdQuarter 상품에 적용된 쿠폰이 있는지 없는지

        for (let j = 0; j < couponsForProducts[i].length; j++) {
          if (couponsForProducts[i][j].status) {
            // status = true 모든 상품에 쿠폰이 적용된 할인가 총액을 구함
            result += Number(
              couponReplaceProductValue(
                couponsForProducts[i][j].coupons.assignedType,
                couponsForProducts[i][j].coupons.couponType,
                couponsForProducts[i][j].coupons.assignedId,
                couponsForProducts[i][j].coupons.couponValue,
                i,
              ),
            );
            jValue = j;
          } //broadcastIdQuarter = [ null, {value}, null ]
        }

        if (jValue !== null) {
          broadcastIdQuarter[i] = {
            broadcastId: couponsForProducts[i][jValue].broadcastId,
            couponId: couponsForProducts[i][jValue].coupons._id,
            iIndex: i,
            jIndex: jValue,
          };
        } else {
          broadcastIdQuarter[i] = null;
        }
      }
    } else {
      // 주문할 상품 중 적용할 쿠폰이 하나도 없을 시
      return dispatch(
        customModalActions.change_modal_message('적용하실 쿠폰이 없습니다.'),
      );
    }

    if (result === 0) {
      // 주문할 상품 중 적용가능한 상품이 존재하나 체크하지않고 쿠폰 적용하기 버튼을 누를 시
      dispatch(
        customModalActions.change_modal_message(
          '적용하실 쿠폰을 선택해주세요.',
        ),
      );
    } else {
      dispatch(orderActions.change_coupon_replace_result(result)); // 총 할인값 리덕스 변수 저장
      dispatch(
        orderActions.change_coupon_replace_broadcast_id(broadcastIdQuarter),
      ); // ex) 총 상품 3개중 두번째 상품만 쿠폰을 적용했다고 가정했을 시 broadcastIdQuarter = [null, {value}, null]
      Actions.pop();
    }
  };

  return (
    <SafeAreaView>
      <Topbar
        isLine
        title={'쿠폰 적용'}
        onPressLeft={onPressClose}
        isLeftButton={true}
      />
      <ScrollView paddingLeft={15} paddingRight={15}>
        {broadcastProducts.length !== 0
          ? broadcastProducts.map((item, index) => (
              <ViewBorder
                brTheme
                borderTopWidth={'2'}
                borderBottomWidth={'2'}
                borderLeftWidth={'0'}
                borderRightWidth={'0'}
                key={index}
                paddingTop={10}
                paddingBottom={10}
                marginTop={10}
                marginBottom={10}>
                <OrderProduct
                  productImages={item.productImage}
                  productName={item.productName}
                  hasItem={item.hasItem}
                  items={item.items}
                  status={item.status}
                />
                {coupons?.length > 0 ? (
                  <View>
                    <View
                      width={'100%'}
                      marginTop={5}
                      marginBottom={10}
                      height={2}
                      bgIceBlue
                    />
                    <ViewRow>
                      <Text
                        fontSize={15}
                        marginBottom={15}
                        marginRight={15}
                        marginTop={5}>
                        상품할인
                      </Text>
                      <View>
                        {productCouponList(
                          item.broadcastId,
                          item.productId,
                          index,
                          item.items,
                        )}
                      </View>
                    </ViewRow>
                  </View>
                ) : (
                  <View>
                    <View
                      width={'100%'}
                      marginTop={5}
                      marginBottom={10}
                      height={2}
                      bgIceBlue
                    />
                    <Text>적용가능한 할인쿠폰이 없습니다.</Text>
                  </View>
                )}
              </ViewBorder>
            ))
          : null}
      </ScrollView>
      <BottomButton
        textSize={18}
        text={'적용하기'}
        onPress={onPressCouponSelect}
      />
    </SafeAreaView>
  );
};

export default CouponScreen;
