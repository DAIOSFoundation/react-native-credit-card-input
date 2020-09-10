import React, {useEffect, useState, useCallback} from 'react';
// Styled Component
import {
  SafeAreaView,
  ScrollView,
  View,
  ViewRow,
} from '../../../../components/styled/View';
import Topbar from '../../../../components/bar/Topbar';
import {Text} from '../../../../components/styled/Text';
import BottomButton from '../../../../components/buttons/BottomButton';
import OrderProduct from '../../../../components/products/OrderProduct';
import {screenWidth} from '../../../../components/styled/ScreenSize';
import LoadingBar from '../../../../components/loadingBar/LoadingBar';
import ToastMessage from '../../../../components/toast/ToastMessage';
// NPM Module
import {Actions} from 'react-native-router-flux';
import {TabBar, TabView} from 'react-native-tab-view';
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as orderActions from '../../../../store/modules/order/action';
import * as customModalActions from '../../../../store/modules/modal/customModal/actions';
import * as broadcastActions from '../../../../store/modules/broadcast/actions';
import * as couponActions from '../../../../store/modules/coupon/actions';
import * as deliveryActions from '../../../../store/modules/delivery/actions';
import * as regularPaymentActions from '../../../../store/modules/regularPayment/actions';
import * as globalActions from '../../../../store/modules/global/actions';
// utils Import
import {LocaleString} from '../../../../utils/functions';
// TabView Import
import SelectDeliveryAreaRoute from './tabView/selectDeliveryAreaRoute';
import DeliveryNewInputRoute from './tabView/deliveryNewInputRoute';
import PaymentRoute from './tabView/paymentRoute';
import { deleteCreditCard } from '../../../../lib/api/creditCard';
import connectToState from '../../../CreditCard/src/connectToState';

import RegularPaymentSuccessScreen from './RegularPaymentSuccessScreen';

// assets Img
const nicePayIcon = require('../../../../assets/pay/nicepay_small.png');
const kakaoIcon = require('../../../../assets/pay/kakao_small.png');
const naverIcon = require('../../../../assets/pay/naver_small.png');
const dpleIcon = require('../../../../assets/pay/dple_payment.png');

// 구매할 제품 리스트 확인 후 구매
const PurchaseFormScreen = () => {
  // redux
  const dispatch = useDispatch();

  const [products, setProducts] = useState('');
  const [basicAddressExtraCharge, setBasicAddressExtraCharge] = useState(0); // 도서 산간 비용(배송지 선택 탭)
  const [newInputExtraCharge, setNewInputExtraCharge] = useState(0); // 도서 산간 비용(신규입력 탭)

  const {
    userId,
    jwtToken,
    putSampleItems,
    totalPrice,
    deliveryCharge,
    agreePayment,
    payIndex,
    pg,
    isNew,
    userAddress,
    deliveryMessage,
    newName,
    newZipCode,
    newAddress,
    newDetailAddress,
    newFrontPhone,
    newMiddlePhone,
    newBackPhone,
    paymentPlatform,
    broadcastProducts,
    orderMessage,
    tabLocation,
    couponReplaceResult,
    broadcastIdQuarter,
    loading,
    isLandCheckNewInput,
    isLandCheckBasic,
    modalMsg,
    merchantUid,
    paymentType,
    postCreditCardStatus,
    deleteCardStatus,
    target,
    creditCardInfo,
    productId,
    regularPaymentStatus,
    recurringMonthSelect,
  } = useSelector(
    (state) => ({
      userId: state.user.userId,
      jwtToken: state.user.jwtToken,
      putSampleItems: state.recommend.putSampleItems,
      totalPrice: state.recommend.totalPrice,
      deliveryCharge: state.recommend.deliveryCharge,
      agreePayment: state.order.agreePayment,
      payIndex: state.order.payIndex,
      pg: state.order.pg,
      isNew: state.order.isNew,
      userAddress: state.order.userAddress,
      deliveryMessage: state.order.deliveryMessage,
      newName: state.order.newName,
      newZipCode: state.order.newZipCode,
      newAddress: state.order.newAddress,
      newDetailAddress: state.order.newDetailAddress,
      newFrontPhone: state.order.newFrontPhone,
      newMiddlePhone: state.order.newMiddlePhone,
      newBackPhone: state.order.newBackPhone,
      paymentPlatform: state.order.paymentPlatform,
      broadcastProducts: state.broadcast.broadcastProducts,
      orderMessage: state.order.orderMessage,
      tabLocation: state.global.tabLocation,
      couponReplaceResult: state.order.couponReplaceResult,
      broadcastIdQuarter: state.order.broadcastIdQuarter,
      loading: state.loading['pay/GET_USER_ADDRESS'],
      loading: state.loading['regularPaymnet/DELETE_CREDIT_CARD'],
      loading: state.loading['regularPaymnet/POST_REGULAR_PAYMENT'],
      isLandCheckNewInput: state.delivery.isLandCheckNewInput,
      isLandCheckBasic: state.delivery.isLandCheckBasic,
      modalMsg: state.delivery.modalMsg,
      merchantUid: state.order.merchantUid,
      paymentType: state.productDetail.paymentType,
      postCreditCardStatus: state.regularPayment.postCreditCardStatus,
      deleteCardStatus: state.regularPayment.deleteCardStatus,
      target: state.regularPayment.target,
      creditCardInfo: state.regularPayment.creditCardInfo,
      productId: state.productDetail.productId,
      regularPaymentStatus: state.regularPayment.regularPaymentStatus,
      recurringMonthSelect: state.regularPayment.recurringMonthSelect,
    }),
    shallowEqual
  );

  const broadcastAndRecommendQuarter = () => {
    const initItems = [];
    // 서버에 보내는 상품 데이터

    if (broadcastProducts.length !== 0) {
      // 라이브 or 녹방 영상에서 구매하는 상품일 시
      for (let i = 0; i < broadcastProducts.length; i++) {
        if (broadcastProducts[i].hasItem) {
          // 상품 옵션 여부 분기
          initItems.push({
            broadcastId: broadcastProducts[i].broadcastId,
            productId: broadcastProducts[i].productId,
            hasItem: broadcastProducts[i].hasItem,
            items: broadcastProducts[i].items,
            productName: broadcastProducts[i].productName,
          });
        } else {
          initItems.push({
            broadcastId: broadcastProducts[i].broadcastId,
            productId: broadcastProducts[i].productId,
            hasItem: broadcastProducts[i].hasItem,
            itemId: broadcastProducts[i].itemId,
            items: broadcastProducts[i].items,
            productName: broadcastProducts[i].productName,
          });
        }
      }
    } else if (putSampleItems.length !== 0) {
      // 추천상품페이지에서 담은 상품일 시
      for (let i = 0; i < putSampleItems.length; i++) {
        initItems.push({
          productId: putSampleItems[i].productId,
          sampleAmount: putSampleItems[i].productAmount,
          samplePrice: putSampleItems[i].productPrice,
          sampleName: putSampleItems[i].productName,
        });
      }
    }

    if (broadcastIdQuarter) {
      for (let i = 0; i < initItems.length; i++) {
        // initItems 주문할 상품들의 값을 가지고 있는 변수 couponScreen에 broadcastProducts와 같음
        // broadcastIdQuarter의 n번쨰 값으로 선택되었는지 안되었는지 확인해서 상품 배열안에 쿠폰id를 넣어줌
        if (broadcastIdQuarter[i]) {
          initItems[i].couponId = broadcastIdQuarter[i].couponId;
        }
      }
    }
    setProducts(initItems);
  };

  useEffect(() => {
    // 선택된 카드가 존재할 때
    if (merchantUid && paymentType) {
      const selectedCard = creditCardInfo[target];
      if(selectedCard){
        const params = {
          jwtToken: jwtToken,
          orderHistoryId: merchantUid,
          productId: productId,
          billCardId:  selectedCard._id,
          month: Number(recurringMonthSelect[0]),
        };
        dispatch(customModalActions.change_modal_message('결제 하시겠습니까?'))
        dispatch(customModalActions.change_modal_onebutton(false))
        dispatch(customModalActions.change_modal_onpress_ok(() => onPressPostRegularPayment(params)))
      } else {
        // 선택된 카드가 없이 결제하를 눌렀을 때
        dispatch(customModalActions.change_modal_message('카드를 선택해 주세요'));
      }
    } else {
      if ((merchantUid && pg === 'nice') || (merchantUid && pg === 'kakaopay')) {
        Actions.purchaseIamPortScreen();
      } else if (pg === 'dple') {
        Actions.dpleWebViewScreen();
      } else {
        console.log('pg', pg);
      }
    }
  }, [merchantUid]);

  useEffect(() => {
    broadcastAndRecommendQuarter();
  }, [broadcastIdQuarter]);

  useEffect(() => {
    let param = {
      userId: userId,
      jwtToken: jwtToken,
    };

    // 유저 기존 주소 가져오기
    dispatch(orderActions.get_user_address(param));
    // 정기결제 카드 정보 가져오기
    dispatch(regularPaymentActions.get_credit_card_info({jwtToken}))

    return () => {
      dispatch(orderActions.change_init_state());
      dispatch(broadcastActions.change_broadcast_product_init_state());
    };
  }, []);

  // 자신의 쿠폰 정보 가져 오기
  useEffect(() => {
    if (jwtToken && userId) {
      dispatch(
        couponActions.request_get_coupon({
          userId,
          jwtToken,
        }),
      );
    }
  }, [jwtToken, userId]);

  useEffect(() => {
    if (userAddress && userAddress.length !== 0) {
      let param = {
        userId: userId,
        jwtToken: jwtToken,
        zipCode: userAddress[0].zipCode,
      };

      dispatch(deliveryActions.get_island_check_basic(param));
    }
  }, [userAddress]);

  useEffect(() => {
    if (orderMessage) {
      if (orderMessage === 'E1113') {
        dispatch(
          customModalActions.change_modal_message(
            '결제오류입니다. 다시 시도해주세요',
          ),
        );
      } else if (orderMessage === 'E1107') {
        dispatch(
          customModalActions.change_modal_message(
            '재고 보다 많은 요청을 하였습니다. 다시 시도해주세요',
          ),
        );
      } else if (orderMessage === 'E1106') {
        dispatch(
          customModalActions.change_modal_message(
            '요청하신 샘플 상품이 없습니다.',
          ),
        );
      }

      dispatch(orderActions.change_order_message(''));
    }
  }, [orderMessage]);

  useEffect(() => {
    // 도서 산간 지역 배송비 분기
    let basicAddressExtraCharge = 0;
    let newInputExtraCharge = 0;

    if (isLandCheckNewInput) {
      if (putSampleItems.length !== 0) {
        for (let i = 0; i < putSampleItems.length; i++) {
          if (putSampleItems[i].isExtraCharge) {
            newInputExtraCharge += putSampleItems[i].extraCharge;
          }
        }
      } else if (broadcastProducts.length !== 0) {
        for (let i = 0; i < broadcastProducts.length; i++) {
          if (broadcastProducts[i].isExtraCharge) {
            newInputExtraCharge += broadcastProducts[i].extraCharge;
          }
        }
      }

      setNewInputExtraCharge(newInputExtraCharge);
    } else {
      setNewInputExtraCharge(0);
    }

    if (isLandCheckBasic) {
      if (putSampleItems.length !== 0) {
        for (let i = 0; i < putSampleItems.length; i++) {
          if (putSampleItems[i].isExtraCharge) {
            basicAddressExtraCharge += putSampleItems[i].extraCharge;
          }
        }
      } else if (broadcastProducts.length !== 0) {
        for (let i = 0; i < broadcastProducts.length; i++) {
          if (broadcastProducts[i].isExtraCharge) {
            basicAddressExtraCharge += broadcastProducts[i].extraCharge;
          }
        }
      }

      setBasicAddressExtraCharge(basicAddressExtraCharge);
    } else {
      setBasicAddressExtraCharge(0);
    }
  }, [isLandCheckNewInput, isLandCheckBasic]);

  useEffect(() => {
    if (modalMsg === 'isLand') {
      dispatch(
        customModalActions.change_modal_message(
          '도서/산간 지역입니다.\n' +
            '구매 상품중 추가 배송비가 부가될 수 있습니다.',
        ),
      );
      dispatch(deliveryActions.change_modal_status(''));
    }
  }, [modalMsg]);

  // 추천상품페이지 or 라이브 & 녹방 - 배송비 총합 분기처리
  const deliveryChargeQuarter = () => {
    if (broadcastProducts.length !== 0) {
      let result = 0;

      broadcastProducts.map((item, index) => (result += item.deliveryCharge));
      return result;
    } else if (putSampleItems.length !== 0) {
      return deliveryCharge;
    }
  };

  // 카드 등록 성공 모달
  useEffect(() => {
    if(postCreditCardStatus === 200){
      dispatch(globalActions.change_toast_message('카드가 등록 되었습니다'));
      dispatch(regularPaymentActions.change_credit_card_info_clear());
      dispatch(regularPaymentActions.change_post_credit_card_status_clear());
      dispatch(regularPaymentActions.get_credit_card_info({jwtToken}))
    }
  },[postCreditCardStatus])

  // 카드 삭제 여부에 따라 렌더
  useEffect(() => {
    if (deleteCreditCard) {
      dispatch(regularPaymentActions.change_delete_card_status(false))
      dispatch(regularPaymentActions.get_credit_card_info({jwtToken}))
    }
  },[deleteCardStatus])

  // 추천상품페이지 or 라이브 & 녹방 - 총액 분기처리
  const totalPriceQuarter = () => {
    if (broadcastProducts.length !== 0) {
      let result = 0;

      for (let i = 0; i < broadcastProducts.length; i++) {
        for (let j = 0; j < broadcastProducts[i].items.length; j++) {
          result +=
            broadcastProducts[i].items[j].itemPrice *
            broadcastProducts[i].items[j].itemAmount;
        }
      }
      return result;
    } else if (putSampleItems.length !== 0) {
      return totalPrice;
    }
  };

  useEffect(() => {
    if (regularPaymentStatus === 200) {
      dispatch(customModalActions.change_modal_message('결제가 완료 되었습니다'))
      dispatch(customModalActions.change_modal_onpress_ok(() => {
        dispatch(regularPaymentActions.change_regular_payment_status_clear());
        Actions.reset('tabBar');
      }))
      // Actions.regularPaymentSuccessScreen();
    } else if (regularPaymentStatus !== null ) {
      dispatch(regularPaymentActions.change_regular_payment_status_clear());
      Actions.regularPaymentFailedScreen();
    }
  }, [regularPaymentStatus])
  
  // 결제 버튼
  const onPressPayment = useCallback(() => {
    // 결제진행동의 확인
    if (agreePayment) {
      // 결제수단선택 확인
      if (pg) {
        if (isNew === true) {
          // 신규입력이면

          // 추천상품페이지 or 라이브 & 녹방 - 결제 분기처리
          if (broadcastProducts.length !== 0) {
            let param = {
              orderDetails: products,
              paymentPlatform: paymentPlatform,
              paymentMethod: 'card',
              pg: pg,
              isNewAddress: isNew,
              name: newName,
              phone: newFrontPhone + newMiddlePhone + newBackPhone,
              address: newAddress,
              detailAddress: newDetailAddress,
              zipCode: newZipCode,
              orderPrice: totalPriceQuarter(),
              deliveryCharge: deliveryChargeQuarter(),
              deliveryMessage: deliveryMessage,
              extraCharge: newInputExtraCharge,
              pointPrice: 0, //todo 추후 기능 탑재
              couponPrice: couponReplaceResult,
              payment:
                totalPriceQuarter() +
                deliveryChargeQuarter() +
                newInputExtraCharge -
                couponReplaceResult,
              broadcast: true,
            };

            // 배송정보 모두 입력 시
            if (
              newName &&
              newAddress &&
              newDetailAddress &&
              newFrontPhone &&
              newMiddlePhone &&
              newBackPhone
            ) {
              dispatch(
                orderActions.request_broadcast_product_payment({
                  param,
                  jwtToken,
                }),
              );
              dispatch(orderActions.change_payment_product(param));
            } else {
              dispatch(
                customModalActions.change_modal_message(
                  '배송정보를 모두 입력해주세요.',
                ),
              );
            }
          } else if (putSampleItems.length !== 0) {
            // 샘플상품 구매
            let param = {
              products: products,
              paymentPlatform: paymentPlatform,
              paymentMethod: 'card',
              pg: pg,
              isNewAddress: isNew,
              name: newName,
              phone: newFrontPhone + newMiddlePhone + newBackPhone,
              address: newAddress,
              detailAddress: newDetailAddress,
              zipCode: newZipCode,
              totalPrice: totalPrice,
              deliveryCharge: deliveryCharge,
              deliveryMessage: deliveryMessage,
              recommend: true,
              extraCharge: newInputExtraCharge,
              payment: totalPrice + deliveryCharge + newInputExtraCharge,
            };

            // 배송정보 모두 입력 시
            if (
              newName &&
              newAddress &&
              newDetailAddress &&
              newFrontPhone &&
              newMiddlePhone &&
              newBackPhone
            ) {
              dispatch(
                orderActions.request_recommend_sample_payment({
                  param,
                  jwtToken,
                }),
              );
              dispatch(orderActions.change_payment_product(param));
            } else {
              dispatch(
                customModalActions.change_modal_message(
                  '배송정보를 모두 입력해주세요.',
                ),
              );
            }
          }
        } else {
          // 신규입력이 아니면, 기존배송지가 없을 경우
          if (userAddress.length === 0) {
            dispatch(
              customModalActions.change_modal_message(
                '기존 배송지가 없습니다 !' +
                  '\n' +
                  '배송지목록 또는 신규입력을 이용해주세요.',
              ),
            );
          } else {
            // 추천상품페이지 or 라이브 & 녹방 - 결제 분기처리
            if (broadcastProducts.length !== 0) {
              let param = {
                orderDetails: products,
                paymentPlatform: paymentPlatform,
                paymentMethod: 'card',
                pg: pg,
                isNewAddress: isNew,
                name: userAddress[0].name,
                phone: userAddress[0].phone,
                address: userAddress[0].address,
                detailAddress: userAddress[0].detailAddress,
                zipCode: userAddress[0].zipCode,
                orderPrice: totalPriceQuarter(),
                deliveryCharge: deliveryChargeQuarter(),
                deliveryMessage: deliveryMessage,
                pointPrice: 0, //todo 추후 기능 탑재
                couponPrice: couponReplaceResult,
                extraCharge: basicAddressExtraCharge,
                payment:
                  totalPriceQuarter() +
                  deliveryChargeQuarter() +
                  basicAddressExtraCharge -
                  couponReplaceResult,
                broadcast: true,
              };
              dispatch(
                orderActions.request_broadcast_product_payment({
                  param,
                  jwtToken,
                }),
              );
              dispatch(orderActions.change_payment_product(param));
            } else if (putSampleItems.length !== 0) {
              let param = {
                products: products,
                paymentPlatform: paymentPlatform,
                paymentMethod: 'card',
                pg: pg,
                isNewAddress: isNew,
                name: userAddress[0].name,
                phone: userAddress[0].phone,
                address: userAddress[0].address,
                detailAddress: userAddress[0].detailAddress,
                zipCode: userAddress[0].zipCode,
                totalPrice: totalPrice,
                deliveryCharge: deliveryCharge,
                extraCharge: basicAddressExtraCharge,
                deliveryMessage: deliveryMessage,
                recommend: true,
                payment: totalPrice + deliveryCharge + basicAddressExtraCharge,
              };
              dispatch(
                orderActions.request_recommend_sample_payment({
                  param,
                  jwtToken,
                }),
              );
              dispatch(orderActions.change_payment_product(param));
            }
          }
        }
      } else {
        dispatch(
          customModalActions.change_modal_message(
            '결제수단을 선택하여 주시기 바랍니다.',
          ),
        );
      }
    } else {
      dispatch(
        customModalActions.change_modal_message(
          '결제진행에 동의해주시기 바랍니다.',
        ),
      );
    }
  }, [
    isNew,
    products,
    totalPrice,
    deliveryMessage,
    pg,
    agreePayment,
    userAddress,
    newName,
    newFrontPhone,
    newMiddlePhone,
    newBackPhone,
    newAddress,
    newDetailAddress,
    newZipCode,
    couponReplaceResult,
    basicAddressExtraCharge,
    newInputExtraCharge,
  ]);

  // 뒤로가기 버튼
  const onPressClose = () => {
    Actions.pop();
  };

  // 배송 요청사항 옵션 선택하기
  const changeSelectDeliveryOption = (value) => {
    if (value !== '0') {
      dispatch(orderActions.change_delivery_message(value));
    }
  };

  // 결제 진행 동의
  const onPressAgreePayment = (check) => {
    dispatch(orderActions.change_agree_payment(check[0]));
  };

  // 페이 체크여부 확인
  const onPressPayCheck = (pay) => {
    dispatch(orderActions.change_payment_index(pay[0].id));
    dispatch(orderActions.change_payment_method(pay[0].pg));
  };

  // 신규 텍스트 이름 변경
  const onChangeNewName = (value) => {
    dispatch(orderActions.change_new_name(value));
  };
  // 신규 텍스트 상세주소 변경
  const onChangeNewDetailAddress = (value) => {
    dispatch(orderActions.change_new_detail_address(value));
  };
  // 신규 텍스트 핸드폰 앞 번호 변경
  const onChangeNewFrontPhone = (value) => {
    dispatch(orderActions.change_new_front_phone(value));
  };
  // 신규 텍스트 핸드폰 중간 번호 변경
  const onChangeNewMiddlePhone = (value) => {
    dispatch(orderActions.change_new_middle_phone(value));
  };
  // 신규 텍스트 핸드폰 뒷 번호 변경
  const onChangeNewBackPhone = (value) => {
    dispatch(orderActions.change_new_back_phone(value));
  };

  // 정기결제 카드 삭제 onpress_ok 함수
  const deleteCard = (billCardId) => {
    const params = {jwtToken, billCardId}
    dispatch(regularPaymentActions.detele_credit_card(params))
  }

  // 정기결제 카드 삭제
  const onPressDeleteCreditCard = (billCardId) => {
    dispatch(customModalActions.change_modal_message('카드를 삭제 하시겠습니까?'));
    dispatch(customModalActions.change_modal_onebutton(false));
    dispatch(customModalActions.change_modal_onpress_ok(() => deleteCard(billCardId)));
  };

  const onPressPostRegularPayment = (params) => {
    setPaymentLoading(true);
    dispatch(regularPaymentActions.post_regular_payment(params));
  }

  var payItems;
  // 페이 종류
  if (paymentType) {
    payItems = [
      {
        id: 1,
        image: nicePayIcon,
        pg: 'nice',
        description: '나이스페이먼츠는 정기결제를 지원합니다',
      },
    ]
  } else {
    payItems = [
      {
        id: 1,
        image: nicePayIcon,
        pg: 'nice',
        description: '나이스페이먼츠는 삼성페이, 페이코, 일반결제를 지원합니다',
      },
      {
        id: 2,
        image: dpleIcon,
        pg: 'dple',
      },
      {
        id: 3,
        image: kakaoIcon,
        pg: 'kakaopay',
      },
      // {id: 3, image: naverIcon, pg: 'naver'},
    ];
  }

  const initialLayout = {width: screenWidth};
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'selectDeliveryAreaRoute', title: '신규 입력'},
    {key: 'deliveryNewInputRoute', title: '배송지 선택'},
  ]);
  const [paymentLoading, setPaymentLoading] = useState(null);

  // 탭뷰 - 배송지선택
  const selectDeliveryAreaRoute = () => {
    if (index === 0) {
      return (
        <SelectDeliveryAreaRoute userAddress={userAddress} />
      );
    } else {
      return null;
    }
  };

  // 탭뷰 - 신규 입력
  const deliveryNewInputRoute = () => {
    if (index === 1) {
      return (
        <DeliveryNewInputRoute 
          newZipCode={newZipCode}
          newAddress={newAddress}
          newName={newName}
          onChangeNewName={onChangeNewName}
          newDetailAddress={newDetailAddress}
          onChangeNewDetailAddress={onChangeNewDetailAddress}
          newFrontPhone={newFrontPhone}
          onChangeNewFrontPhone={onChangeNewFrontPhone}
          newMiddlePhone={newMiddlePhone}
          onChangeNewMiddlePhone={onChangeNewMiddlePhone}
          newBackPhone={newBackPhone}
          onChangeNewBackPhone={onChangeNewBackPhone} 
        />
      );
    } else {
      return null;
    }
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'selectDeliveryAreaRoute':
        return selectDeliveryAreaRoute();
      case 'deliveryNewInputRoute':
        return deliveryNewInputRoute();
      default:
        return null;
    }
  };

  // 탭뷰 - 탭바 스타일
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor="#e6427a"
      inactiveColor="#767b80"
      labelStyle={{fontWeight: 'bold'}}
      indicatorStyle={{backgroundColor: '#e6427a'}}
      style={{backgroundColor: 'white'}}
    />
  );

  // 추천상품페이지 or 라이브 & 녹방 - 상품 디테일 정보 분기처리
  const productDetailQuarter = () => {
    if (broadcastProducts.length !== 0) {
      return (
        <View paddingLeft={15} paddingRight={15}>
          {broadcastProducts.map((item, index) => (
            <View key={index}>
              <ViewRow justifyContent={'space-between'}>
                <Text fontSize={15} ftDarkNavy>
                  {item.sellerName}
                </Text>
                <Text ftGray fontSize={13} marginBottom={10}>
                  {item.deliveryCharge === 0
                    ? '배송비 무료'
                    : '배송비 ' + LocaleString(item.deliveryCharge) + '원'}
                </Text>
              </ViewRow>
              <View width={'100%'} bgTheme height={2} marginBottom={15} />
              <View maginTop={10} marginBottom={10}>
                <OrderProduct
                  productImages={item.productImage}
                  productName={item.productName}
                  hasItem={item.hasItem}
                  items={item.items}
                  status={item.status}
                />
              </View>
            </View>
          ))}
        </View>
      );
    } else if (putSampleItems.length !== 0) {
      return (
        <View paddingLeft={15} paddingRight={15}>
          <View alignItems={'flex-end'}>
            <Text ftGray fontSize={13} marginBottom={10}>
              {deliveryCharge === 0
                ? '배송비 무료'
                : '배송비 ' + LocaleString(deliveryCharge) + '원'}
            </Text>
            <View width={'100%'} bgTheme height={2} marginBottom={15} />
          </View>
          {putSampleItems.map((item, idx) => (
            <View key={item + idx} maginTop={10} marginBottom={10}>
              <OrderProduct
                productImages={item.productImages}
                productName={item.productName}
                productAmount={item.productAmount}
                productPrice={item.productPrice}
              />
            </View>
          ))}
        </View>
      );
    }
  };

  console.log('PurchaseFormScreen broadcastProducts => ', broadcastProducts);
  console.log('PurchaseFormScreen putSampleItems => ', putSampleItems);

  if (loading) {
    if (paymentLoading) {
      return <RegularPaymentSuccessScreen loading={true}/>;
      // Actions.regularPaymentSuccessScreen();
    } else {
      return (
        <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}} />
        </View>
    );
  }
  }

  return (
    <SafeAreaView>
      <ToastMessage />
      <Topbar
        isLine
        title={'주문하기'}
        onPressLeft={onPressClose}
        isLeftButton={true}
      />
      <ScrollView marginTop={20}>
        {productDetailQuarter()}
        <View height={5} bgDarkWhite />
        <View>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
          <PaymentRoute 
            userAddress={userAddress}
            changeSelectDeliveryOption={changeSelectDeliveryOption}
            onPressAgreePayment={onPressAgreePayment}
            onPressDeleteCreditCard={onPressDeleteCreditCard}
            onPressPayCheck={onPressPayCheck}
            agreePayment={agreePayment}
            totalPrice={totalPriceQuarter()}
            deliveryCharge={deliveryChargeQuarter()}
            payItems={payItems}
            payIndex={payIndex}
            deliveryMessage={deliveryMessage}
            tabLocation={tabLocation}
            isLandCheckBasic={isLandCheckBasic}
            isLandCheckNewInput={isLandCheckNewInput}
            putSampleItems={putSampleItems}
            extraCharge={basicAddressExtraCharge}
          />
        </View>
      </ScrollView>
      <BottomButton onPress={onPressPayment} textSize={16} text={'결제하기'} />
    </SafeAreaView>
  );
};

export default PurchaseFormScreen;
