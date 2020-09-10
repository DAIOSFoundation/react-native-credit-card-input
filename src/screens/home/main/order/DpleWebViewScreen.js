import React, {useEffect, useState} from 'react';
// Styled Component
import {SafeAreaView, View} from '../../../../components/styled/View';
import LoadingBar from '../../../../components/loadingBar/LoadingBar';
// NPM Module
import {WebView} from 'react-native-webview';
// Redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as dpleActions from '../../../../store/modules/dple/actions';
import * as userActions from '../../../../store/modules/user/actions';
// Screen Import
import PaymentSuccessScreen from './PaymentSuccessScreen';
import PaymentFailedScreen from './PaymentFailedScreen';
import PaymentCancelledScreen from './PaymentCancelledScreen';

const DpleWebViewScreen = () => {
  const prohibitZoom = `const meta = document.createElement('meta'); meta.setAttribute('content', 'initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `;

  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const {
    jwtToken,
    dpleJwtToken,
    userId,
    paymentProduct,
    loading,
    dpleWebViewHost,
    orderHistoryId,
    clientCode,
    sessionCode,
    payPrice,
    clientSessionCode,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      dpleJwtToken: state.user.dpleJwtToken,
      userId: state.user.userId,
      paymentProduct: state.order.paymentProduct,
      loading: state.loading['dple/POST_DPLE_PAYMENT'],
      dpleWebViewHost: state.dple.dpleWebViewHost,
      orderHistoryId: state.dple.orderHistoryId,
      clientCode: state.dple.clientCode,
      sessionCode: state.dple.sessionCode,
      payPrice: state.dple.payPrice,
      clientSessionCode: state.dple.clientSessionCode,
    }),
    shallowEqual,
  );

  useEffect(() => {
    let userInfo = {
      jwtToken: jwtToken,
      userId: userId,
    };

    dispatch(userActions.get_viewer_is_dple_jwt(userInfo));

    let param = {
      jwtToken: jwtToken,
      userId: userId,
      productName: productNameQuarter(),
      productPrice: paymentProduct.payment,
      payPrice: paymentProduct.payment,
    };
    dispatch(dpleActions.post_dple_payment(param));
  }, []);

  //  상품 이름 분기처리
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

  const patchPostMessageJsCode = `
    // document.body.style.backgroundColor = 'red';
    true; // note: this is required, or you'll sometimes get silent failures
    window.ReactNativeWebView.postMessage(document.getElementsByTagName("div")[1].id);`;

  const onMessage = async (message) => {
    console.log('WebView onMessage ：', message);
    setMessage(message);
  };

  if (loading) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
      </View>
    );
  } else if (message === 'payment-success') {
    // 결제 성공 스크린
    console.log('payment-success', message);
    return <PaymentSuccessScreen />;
  } else if (message === 'payment-failed') {
    // 결제 실패 스크린
    console.log('payment-failed', message);
    return <PaymentFailedScreen />;
  } else if (message === 'payment-cancelled') {
    // 결제 취소 스크린
    console.log('payment-cancelled', message);
    return <PaymentCancelledScreen />;
  } else if (message === 'not-found') {
    // 404 스크린
    console.log('not-found');
  } else {
    return (
      <SafeAreaView>
        <WebView
          source={{
            uri: `${dpleWebViewHost}?id=${orderHistoryId}&clientCode=${clientCode}&sessionCode=${sessionCode}&payPrice=${payPrice}&clientSessionCode=${clientSessionCode}&userToken=${dpleJwtToken}`,
          }}
          originWhitelist={['*']}
          javaScriptEnabledAndroid={true}
          javaScriptEnable={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          injectedJavaScript={patchPostMessageJsCode}
          injectJavaScript={prohibitZoom}
          onMessage={(e) => onMessage(e.nativeEvent.data)}
        />
      </SafeAreaView>
    );
  }
};

export default DpleWebViewScreen;
