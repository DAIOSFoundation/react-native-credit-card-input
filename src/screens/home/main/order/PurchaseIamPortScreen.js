import React, {useEffect, useMemo} from 'react';
import {BackHandler} from 'react-native';
// Styled Component
import {SafeAreaView, View} from '../../../../components/styled/View';
import Topbar from '../../../../components/bar/Topbar';
import {Text} from '../../../../components/styled/Text';
import LoadingBar from '../../../../components/loadingBar/LoadingBar';
import CustomModal from '../../../../components/modal/CustomModal';
// redux
import * as paymentActions from '../../../../store/modules/payment/actions';
import * as orderAction from '../../../../store/modules/order/action';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as customModalActions from '../../../../store/modules/modal/customModal/actions';
// NPM Module
import {Actions} from 'react-native-router-flux';
import IMP from 'iamport-react-native';
// Screen Import
import PaymentSuccessScreen from './PaymentSuccessScreen';
import PaymentFailedScreen from './PaymentFailedScreen';

// 구매할 제품 리스트 확인 후 구매
const PurchaseIamPortScreen = () => {
  // const [data, setData] = useState(null);

  const dispatch = useDispatch();

  const {
    jwtToken,
    userId,
    impUid,
    paymentData,
    paymentSuccess,
    loading,
    paymentProduct,
    merchantUid,
    isVisible,
    isOneButton,
    message,
    onPressOK,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      impUid: state.payment.uid,
      paymentData: state.payment.paymentData,
      paymentSuccess: state.payment.paymentSuccess,
      loading: state.loading['payment/REQUEST_CONFIRM'],
      paymentProduct: state.order.paymentProduct,
      merchantUid: state.order.merchantUid,
      isVisible: state.customModal.isVisible,
      isOneButton: state.customModal.isOneButton,
      message: state.customModal.message,
      onPressOK: state.customModal.onPressOK,
    }),
    shallowEqual,
  );

  // 기기 뒤로가기 버튼 기능 {s}
  const backAndroid = () => {
    onPressClose();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAndroid);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAndroid);
    };
  }, [backAndroid]);

  // 기기 뒤로가기 버튼 기능 {e}

  useEffect(() => {
    //todo test
    return () => {
      dispatch(orderAction.change_merchantuid_init());
    };
  }, []);

  const callback = (response) => {
    console.log('IMP Callback Response => ', response);
    const body = {
      response,
      jwtToken,
    };
    dispatch(paymentActions.request_confirm(body));
  };

  console.log('userId => ', userId);
  console.log('merchantUid => ', merchantUid);

  // 추천상품페이지 or 라이브 & 녹방 - 상품 이름 분기처리
  const productNameQuarter = () => {
    if (paymentProduct.broadcast) {
      return paymentProduct.orderDetails.length > 1
        ? paymentProduct.orderDetails[0].productName +
            ' 외 ' +
            (paymentProduct.orderDetails.length - 1) +
            '개'
        : paymentProduct.orderDetails[0].productName;
    } else if (paymentProduct.recommend) {
      return paymentProduct.products.length > 1
        ? paymentProduct.products[0].sampleName +
            ' 외 ' +
            (paymentProduct.products.length - 1) +
            '개'
        : paymentProduct.products[0].sampleName;
    }
  };

  // 추천상품페이지 or 라이브 & 녹방 - 상품 금액 분기처리
  // const productAmountQuarter = () => {
  //   if (paymentProduct.broadcast) {
  //     return paymentProduct.payment;
  //   } else if (paymentProduct.recommend) {
  //     return paymentProduct.totalPrice + paymentProduct.deliveryCharge + paymentProduct.extraCharge;
  //   }
  // };

  const data = useMemo(() => {
    if (paymentProduct && merchantUid) {
      return {
        pg: paymentProduct.pg,
        pay_method: paymentProduct.paymentMethod,
        name: productNameQuarter(),
        merchant_uid: merchantUid,
        amount: paymentProduct.payment,
        buyer_name: paymentProduct.name,
        buyer_tel: paymentProduct.phone,
        buyer_addr: paymentProduct.address,
        buyer_postcode: paymentProduct.zipCode,
        app_scheme: 'SellerVision',
      };
    }
  }, [paymentProduct, merchantUid]);

  // customModal 확인 버튼 누를 시 실행 함수
  const onPressModalOK = () => {
    // Actions.reset('tabBar');
    Actions.pop();
  };

  // 뒤로가기 버튼
  const onPressClose = () => {
    dispatch(
      customModalActions.change_modal_message('결제를 취소하시겠습니까 ?'),
    );
    dispatch(customModalActions.change_modal_onebutton(false));
    dispatch(customModalActions.change_modal_onpress_ok(onPressModalOK));
  };

  console.log('paymentSuccess => ', paymentSuccess);
  console.log('payment data => ', data);

  if (loading || !merchantUid) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}} />
      </View>
    );
  } else if (paymentSuccess) {
    // 결제 성공
    return <PaymentSuccessScreen />;
  } else if (paymentSuccess === false) {
    return <PaymentFailedScreen />;
  } else {
    return (
      <View height={'100%'}>
        <Topbar
          isLine
          title={'아임포트 결제화면'}
          onPressLeft={onPressClose}
          isLeftButton={true}
        />
        <SafeAreaView>
          {data ? (
            <IMP.Payment
              userCode={'imp65319322'} // 가맹점 식별코드
              data={data} // 결제 데이터
              callback={callback} // 결제 종료 후 콜백
            />
          ) : (
            <View>
              <Text>No Data...</Text>
            </View>
          )}
        </SafeAreaView>
        <CustomModal
          isVisible={isVisible}
          isOneButton={isOneButton}
          message={message}
          onPressOK={onPressOK}
          currentScene={'purchaseIamPortScreen'}
        />
      </View>
    );
  }
};

export default PurchaseIamPortScreen;
