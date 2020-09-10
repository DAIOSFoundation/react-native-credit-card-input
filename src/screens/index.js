import React, {useEffect} from 'react';
// NPM Module
import {Router, Stack, Scene, Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

//redux
import * as globalActions from '../store/modules/global/actions';
import {useDispatch} from 'react-redux';

//회원가입 스크린
import SelectViewerORSellerScreen from './signup/SelectViewerORSellerScreen';
import ViewerSignUpScreen from './signup/viewer/ViewerSignUpScreen';
import ViewerSignUpSuccessScreen from './signup/viewer/ViewerSignUpSuccessScreen';
import SellerSignUpScreen from './signup/seller/SellerSignUpScreen';
import SellerSuccessApplyScreen from './signup/seller/SellerSuccessApplyScreen';
import SellerSignUpFailScreen from './signup/seller/SellerSignUpFailScreen';
import SellerSignUpFailReasonScreen from './signup/seller/SellerSignUpFailReasonScreen';
import SellerSignUpSuccessScreen from './signup/seller/SellerSignUpSuccessScreen';
import LoginScreen from './login/LoginScreen';
import LoginRouterScreen from './login/LoginRouterScreen';

// Styled Component
import {Image} from '../components/styled/Image';

// Tab - 메인 스크린
import MainScreen from './home/main/MainScreen';
import VideoFullScreen from './home/main/fullScreen/video/VideoFullScreen';
import YoutubeFullScreen from './home/main/fullScreen/youtube/YoutubeFullScreen';
import PurchaseFormScreen from './home/main/order/PurchaseFormScreen';
import PurchaseIamPortScreen from './home/main/order/PurchaseIamPortScreen';
import PaymentSuccessScreen from './home/main/order/PaymentSuccessScreen';
import PaymentFailedScreen from './home/main/order/PaymentFailedScreen';
import RegularPaymentSuccessScreen from './home/main/order/RegularPaymentSuccessScreen';
import RegularPaymentFailedScreen from './home/main/order/RegularPaymentFailedScreen';
import PaymentCancelledScreen from './home/main/order/PaymentCancelledScreen';
import ProductDetailScreen from './home/main/productDetail/ProductDetailScreen';
import ProductDetailPlayer from './home/main/productDetail/player/ProductDetailPlayer';
import QnAWriteScreen from './home/main/productDetail/tabView/QnAWriteScreen';
import FavoritesScreen from './home/main/FavoritesScreen';
import LivePreviewScreen from './home/main/livePreview/LivePreviewScreen';
import DeliveryListScreen from './home/main/order/tabView/DeliveryListScreen';
import AddNewDeliveryScreen from './home/main/order/tabView/AddNewDeliveryScreen';
import AlreadyCommentScreen from './home/main/AlreadyCommentScreen';
import SellerPageForViewerScreen from './home/main/SellerPageForViewerScreen';
import RegularPaymentScreen from './home/main/order/RegularPaymentScreen';
import AddCardScreen from './home/main/order/AddCardScreen';

// Tab - 날짜 스크린
import CalendarScreen from './home/calendar/CalendarScreen';

// Tab - 검색 스크린
import SearchScreen from './home/search/SearchScreen';

// Tab - 나의 정보 스크린
import MyInfoScreen from './home/myInfo/MyInfo';
import RecommendScreen from './home/myInfo/seller/tabs/Recommend/RecommendScreen';
import NewAddressScreen from './home/main/order/tabView/NewAddressScreen';
import PurchaseListScreen from './home/myInfo/purchase/PurchaseListScreen';
import PurchaseDetailScreen from './home/myInfo/purchase/PurchaseDetailScreen';
import SettingScreen from './home/myInfo/SettingScreen';
import Live4StepScenarioScreen from './home/myInfo/seller/tabs/Live4Step/Live4StepScenarioScreen';
import Live4StepActivateScreen from './home/myInfo/seller/tabs/Live4Step/Live4StepActivateScreen';
import DpleWebViewScreen from './home/main/order/DpleWebViewScreen';
import AdjustmentScreen from './home/myInfo/seller/adjustment/AdjustmentScreen';
import ArsScreen from './signup/seller/ARSScreen';
import AdjustmentHistoryScreen from './home/myInfo/seller/adjustment/AdjustmentHistoryScreen';
import LiveScheduleDetailScreen from './home/myInfo/seller/tabs/LiveSchedule/LiveScheduleDetailScreen';
import RegisterAccountScreen from './home/myInfo/seller/adjustment/RegisterAccountScreen';
import ViewerPurchaseListScreen from './home/myInfo/viewer/ViewePurchaseList/ViewerPurchaseListScreen';
import ViewerPurchaseDetailScreen from './home/myInfo/viewer/ViewePurchaseList/ViewerPurchaseDetailScreen';
import ViewerEditProfileScreen from './home/myInfo/viewer/ViewerEditProfileScreen';
import RecommendDetailScreen from './home/myInfo/seller/tabs/Recommend/RecommendDetailScreen';

// 뷰어 나의 정보 - 카트
import ViewerMyCartScreen from './home/myInfo/viewer/ViewerMyCart/ViewerMyCartScreen';
import ViewerCouponScreen from './home/myInfo/viewer/ViewerMyCoupon/ViewerMyCouponScreen';
import ViewerReservationScreen from './home/myInfo/viewer/ViewerReservation/ViewerReservationScreen';

// 로딩 스크린
import LoadingScreen from './home/LoadingScreen';
// 쿠폰 스크린
import CouponScreen from './home/main/order/coupon/CouponScreen';
// 약관 스크린
import TermsOfServiceScreen from './home/myInfo/TermsOfServiceScreen';
import TermsOfContentsUtilScreen from './home/myInfo/TemrsOfContentsUtilScreen';
import TermsOfAcceptSMS from './home/myInfo/TermsOfAcceptSMS';
import NoticeScreen from './home/myInfo/seller/tabs/Live4Step/broadcastManual/NoticeScreen';
import IgtvLinkInputScreen from './home/myInfo/seller/tabs/Live4Step/broadcastManual/IGTVLinkInputScreen';
import VideoUploadScreen from './home/myInfo/seller/tabs/Live4Step/broadcastManual/VideoUploadScreen';

import BroadcastUploadSuccessScreen from './home/myInfo/seller/tabs/Live4Step/broadcastManual/BroadcastUploadSuccessScreen';
// 버전 확인 스크린
import VersionInfoScreen from './home/myInfo/VersionInfoScreen';
import Live4StepGuideScreen from './home/myInfo/seller/tabs/Live4Step/guide/Live4StepGuideScreen';

const Index = () => {
  const dispatch = useDispatch();

  // TabBarIcon Setting
  const tabBarIcon = ({title, focused}) => {
    const iconSize = 30;
    switch (title) {
      case 'Main':
        return (
          <Image
            resizeMode="contain"
            source={
              focused
                ? require('../assets/tabBar/icon_home_pressed.png')
                : require('../assets/tabBar/icon_home_normal.png')
            }
            style={{height: iconSize, width: iconSize}}
          />
        );
      case 'Calendar':
        return (
          <Image
            resizeMode="contain"
            source={
              focused
                ? require('../assets/tabBar/icon_date_pressed.png')
                : require('../assets/tabBar/icon_date_normal.png')
            }
            style={{height: iconSize, width: iconSize}}
          />
        );
      case 'Search':
        return (
          <Image
            resizeMode="contain"
            source={
              focused
                ? require('../assets/tabBar/icon_search_pressed.png')
                : require('../assets/tabBar/icon_search_normal.png')
            }
            style={{height: iconSize, width: iconSize}}
          />
        );
      case 'MyInfo':
        return (
          <Image
            resizeMode="contain"
            source={
              focused
                ? require('../assets/tabBar/icon_my_pressed.png')
                : require('../assets/tabBar/icon_my_normal.png')
            }
            style={{height: iconSize, width: iconSize}}
          />
        );
    }
  };

  // 탭 누를때마다 새로고침
  let bEnter = {};
  const onEnter = () => {
    if (bEnter[Actions.currentScene]) {
      Actions.refresh({key: Math.random()});
    }
    bEnter[Actions.currentScene] = true;
  };

  //파이어베이스 토큰 정보를 서버에 저장하는 역할
  const _updateTokenToServer = async () => {
    const fcmToken = await firebase.messaging().getToken();
    const value = await AsyncStorage.multiGet([
      'jwtToken',
      'userId',
      'firebaseToken',
    ]);

    console.log('jwtToken : ', value[0][1]);
    console.log('beforeFirebaseToken : ', value[2][1]);
    console.log('afterFirebaseToken : ', fcmToken);

    //저장된 파이어베이스 토큰이 없을 경우
    if (value[2][1] === null) {
      await AsyncStorage.setItem('firebaseToken', fcmToken);
      dispatch(globalActions.set_firebase_token(fcmToken));
    } else {
      dispatch(globalActions.set_firebase_token(fcmToken));
    }

    //기존 파이어베이스 토큰(저장되어있는 값) 새로 발급된 파이어베이스 토큰이 다를 경우
    if (fcmToken && fcmToken !== value[2][1]) {
      //로그인 유무와 상관없이 변견된 파이어베이스 토큰을 저장
      await AsyncStorage.setItem('firebaseToken', fcmToken);
      dispatch(globalActions.set_firebase_token(fcmToken));
      //로그인 되어있는 상태인지 확인
      if (
        fcmToken &&
        fcmToken !== '' &&
        value[0][1] !== '' &&
        value[0][1] !== undefined
      ) {
        let param = {
          jwtToken: value[0][1],
          userId: value[1][1],
          beforeFirebaseToken: value[2][1],
          afterFirebaseToken: fcmToken,
        };
        console.log('Sign UP state');
        //로그인 되어 있을 경우 변경된 토큰값을 보냄
        dispatch(globalActions.change_firebase_token(param));
      }
    }
  };

  const _checkPermission = async () => {
    console.log('checkPermission');
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      //Permission 있다면 서버에 token 정보를 저장합니다.
      _updateTokenToServer();
    } else {
      //Permission 없다면 Permission 요청합니다.
      _requestPermission();
    }
  };

  const _requestPermission = async () => {
    try {
      // User has authorised
      //Permission 요청한 후
      const permission = await firebase.messaging().requestPermission();
      console.log('_requestPermission : ', permission);
      //서버에 해당 Permission 저장합니다.
      await _updateTokenToServer();
    } catch (error) {
      // User has rejected permissions
      console.log("you can't handle push notification");
    }
  };

  const notificationListener = async () => {
    try {
      const result = await firebase.notifications();

      //앱이 활성화 된 상태에서 요청되는 푸시알림 처리
      result.onNotification((notification) => {
        console.log('onNotification ', notification);
        console.log('onNotification id', notification.notificationId);

        let {title, body} = notification;
        console.log(title, body);
        const channelId = new firebase.notifications.Android.Channel(
          'SellerVision',
          'SellerVision',
          firebase.notifications.Android.Importance.Max,
        );

        // Create the channel
        firebase.notifications().android.createChannel(channelId);
        console.log('channelId', channelId);

        const newNotification = new firebase.notifications.Notification().android
          .setChannelId('SellerVision')
          .android.setSmallIcon('@drawable/ic_notification')
          .android.setAutoCancel(true)
          .android.setCategory(firebase.notifications.Android.Category.Alarm)
          .android.setPriority(firebase.notifications.Android.Priority.Max)
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .setData(notification.data)
          .setSound('default')
          .setData(notification._android._notification._data);

        console.log('newNotification', newNotification);
        firebase.notifications().displayNotification(newNotification);
      });
    } catch (e) {
      console.log('notificationListener error : ', e);
      return e;
    }
  };

  // 앱이 포그라운드 또는 백그라운드에서 실행 중일 때, 푸시 알림을 클릭하여 열 때 해당 푸시 알림을 처리함
  const notificationOpenedListener = async () => {
    try {
      const result = await firebase.notifications();

      result.onNotificationOpened((notificationOpen) => {
        console.log(
          'onNotificationOpened data : ',
          notificationOpen.notification._data,
        );

        if (notificationOpen.notification._data.broadcastId) {
          console.log('앱이 포그라운드 또는 백그라운드에서 실행 중일 때');
          dispatch(
            globalActions.set_notification_broadcast_id(
              notificationOpen.notification._data.broadcastId,
            ),
          );
          dispatch(
            globalActions.set_notification_product_id(
              notificationOpen.notification._data.productId,
            ),
          );
          dispatch(
            globalActions.set_notification_type(
              notificationOpen.notification._data.type,
            ),
          );
          dispatch(
            globalActions.set_notification_status(
              notificationOpen.notification._data.status,
            ),
          );
          Actions.loadingScreen();
        } else {
          console.log(
            '앱이 포그라운드 또는 백그라운드에서 실행 중일 때 Error',
            notificationOpen.notification._data.broadcastId,
          );
        }
      });
    } catch (e) {
      console.log('notificationOpenedListener error : ', e);
      return e;
    }
  };

  //ios 전용
  //notification은 없고 data만 있는 푸시 알림을 받을 때 onNotification()와 같은 역할
  // const messageListener = async () => {
  //   try {
  //     const result = await firebase.messaging();
  //     result.onMessage(message => {
  //       // Process your message as required
  //       // This listener is called with the app activated
  //       console.log('messageListener : ', message);
  //       // console.log('messageListener2 : ', message._data.title);
  //       // console.log('messageListener3 : ', message._data.contents);
  //       // PushNotificationIOS.presentLocalNotification({
  //       //   alertBody: message._data.contents,
  //       //   alertTitle: message._data.title,
  //       //   vibrate: 'vibrate',
  //       // });
  //     });
  //   } catch (e) {
  //     console.log('messageListener error : ', e);
  //     return e;
  //   }
  // };

  //앱이 종료된 상태에서의 푸시알림이 왔을때 그 푸시 알림을 클릭하여 앱이 실행됐을 때 호출됨
  const notificationOpen = async () => {
    try {
      const result = await firebase.notifications().getInitialNotification();

      if (result !== null) {
        console.log('notificationOpen : ', result.notification._data);

        if (result.notification._data !== undefined) {
          console.log('앱이 종료된 상태에서의 푸시알림');
          dispatch(
            globalActions.set_notification_broadcast_id(
              result.notification._data.broadcastId,
            ),
          );
          dispatch(
            globalActions.set_notification_product_id(
              result.notification._data.productId,
            ),
          );
          dispatch(
            globalActions.set_notification_type(result.notification._data.type),
          );
          dispatch(
            globalActions.set_notification_status(
              result.notification._data.status,
            ),
          );
          Actions.loadingScreen();
        } else {
          console.log('앱이 종료된 상태에서의 푸시알림 Error');
        }
      }
    } catch (e) {
      console.log('notificationOpen error : ', e);
      return e;
    }
  };
  const _listenForNotifications = async () => {
    // onNotificationDisplayed - ios only
    await notificationListener();
    await notificationOpenedListener();
    await notificationOpen();
    // await messageListener();
    //
    // await PushNotificationIOS.addEventListener('notification',()=>{
    //   console.log("addListener handler")
    // });
  };

  useEffect(() => {
    _checkPermission();
    _listenForNotifications();

    return () => {
      notificationListener();
    };
  }, []);

  return (
    <Router>
      <Stack key="root" hideNavBar>
        <Scene key="loadingScreen" component={LoadingScreen} />
        {/* TabBar Group*/}
        <Scene
          key="tabBar"
          tabs={true}
          showLabel={false}
          // tabBarStyle={{
          //   borderTopRightRadius: 15,
          //   borderTopLeftRadius: 15,
          //   position: 'absolute',
          // }}
          labelStyle={{
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          <Scene key="Main" title="Main" Screentitle="Main" icon={tabBarIcon}>
            <Scene
              key="mainScreen"
              component={MainScreen}
              hideNavBar
              onEnter={onEnter}
            />
            <Scene
              key="productDetailScreen"
              component={ProductDetailScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="productDetailPlayer"
              component={ProductDetailPlayer}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="purchaseFormScreen"
              component={PurchaseFormScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="newAddressScreen"
              component={NewAddressScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="paymentSuccessScreen"
              component={PaymentSuccessScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="regularPaymentSuccessScreen"
              component={RegularPaymentSuccessScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="regularPaymentFailedScreen"
              component={RegularPaymentFailedScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="paymentFailedScreen"
              component={PaymentFailedScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="paymentCancelledScreen"
              component={PaymentCancelledScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="qnaWriteScreen"
              component={QnAWriteScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="videoFullScreen"
              component={VideoFullScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="youtubeFullScreen"
              component={YoutubeFullScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="favoritesScreen"
              component={FavoritesScreen}
              hideNavBar
            />
            <Scene
              key="livePreviewScreen"
              component={LivePreviewScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="deliveryListScreen"
              component={DeliveryListScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="addNewDeliveryScreen"
              component={AddNewDeliveryScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="alreadyCommentScreen"
              component={AlreadyCommentScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="sellerPageForViewerScreen"
              component={SellerPageForViewerScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="mainCouponScreen"
              component={CouponScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="mainRecommendDetailScreen"
              component={RecommendDetailScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="mainLoginScreen"
              component={LoginScreen}
              hideNavBar
              hideTabBar
            />
          </Scene>
          <Scene
            key="Calendar"
            title="Calendar"
            Screentitle="Calendar"
            icon={tabBarIcon}>
            <Scene
              key="calendarLoginRouter"
              title="CalendarLoginRouter"
              // hideTabBar={true}
              hideNavBar={true}
              component={LoginRouterScreen}
              onEnter={onEnter}
            />
            <Scene
              key="calendarScreen"
              component={CalendarScreen}
              hideNavBar
              onEnter={onEnter}
            />
            <Scene
              key="calendarProductDetailScreen"
              component={ProductDetailScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="calendarAlreadyCommentScreen"
              component={AlreadyCommentScreen}
              hideNavBar
              hideTabBar
            />
            {/*캘린더 탭 구매스크린*/}
            <Scene
              key="calendarPurchaseFormScreen"
              component={PurchaseFormScreen}
              hideNavBar
              hideTabBar
            />
            {/*캘린더 탭 새 배송지 추가*/}
            <Scene
              key="calendarAddNewDeliveryScreen"
              component={AddNewDeliveryScreen}
              hideNavBar
              hideTabBar
            />
            {/*캘린더 탭 배송지 리스트*/}
            <Scene
              key="calendarDeliveryListScreen"
              component={DeliveryListScreen}
              hideNavBar
              hideTabBar
            />
            {/*캘린더 탭 주소 찾기 화면*/}
            <Scene
              key="calendarNewAddressScreen"
              component={NewAddressScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="calendarCouponScreen"
              component={CouponScreen}
              hideNavBar
              hideTabBar
            />
          </Scene>
          <Scene
            key="Search"
            title="Search"
            Screentitle="Search"
            icon={tabBarIcon}>
            <Scene
              key="searchLoginRouter"
              title="SearchLoginRouter"
              // hideTabBar={true}
              hideNavBar={true}
              component={LoginRouterScreen}
              onEnter={onEnter}
            />
            <Scene
              key="searchScreen"
              component={SearchScreen}
              hideNavBar
              onEnter={onEnter}
            />
            <Scene
              key="searchSellerPageForViewerScreen"
              component={SellerPageForViewerScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="searchAlreadyCommentScreen"
              component={AlreadyCommentScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="searchProductDetailScreen"
              component={ProductDetailScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="searchYoutubeFullScreen"
              component={YoutubeFullScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="searchVideoFullScreen"
              component={VideoFullScreen}
              hideNavBar
              hideTabBar
            />
            {/*검색 탭 구매스크린*/}
            <Scene
              key="searchPurchaseFormScreen"
              component={PurchaseFormScreen}
              hideNavBar
              hideTabBar
            />
            {/*검색 탭 새 배송지 추가*/}
            <Scene
              key="searchAddNewDeliveryScreen"
              component={AddNewDeliveryScreen}
              hideNavBar
              hideTabBar
            />
            {/*검색 탭 배송지 리스트*/}
            <Scene
              key="searchDeliveryListScreen"
              component={DeliveryListScreen}
              hideNavBar
              hideTabBar
            />
            {/*검색 탭 주소 찾기 화면*/}
            <Scene
              key="searchNewAddressScreen"
              component={NewAddressScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="searchCouponScreen"
              component={CouponScreen}
              hideNavBar
              hideTabBar
            />
          </Scene>
          <Scene
            key="MyInfo"
            title="MyInfo"
            Screentitle="MyInfo"
            icon={tabBarIcon}>
            <Scene
              key="myInfoLoginRouter"
              title="MyInfoLoginRouter"
              // hideTabBar={true}
              hideNavBar={true}
              component={LoginRouterScreen}
              onEnter={onEnter}
            />
            <Scene
              key="myInfoScreen"
              component={MyInfoScreen}
              hideNavBar
              onEnter={onEnter}
            />
            <Scene
              key="recommendScreen"
              component={RecommendScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="recommendDetailScreen"
              component={RecommendDetailScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="myInfoPurchaseFormScreen"
              component={PurchaseFormScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="newAddressScreen"
              component={NewAddressScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="settingScreen"
              component={SettingScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="live4StepScenarioScreen"
              component={Live4StepScenarioScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="live4StepActivateScreen"
              component={Live4StepActivateScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="purchaseListScreen"
              component={PurchaseListScreen}
              hideNavBar
              hideTabBar
            />
            {/* 뷰어 예약방송 스크린 */}
            <Scene
              key="viewerReservationScreen"
              hideNavBar
              hideTabBar
              component={ViewerReservationScreen}
            />
            {/* 뷰어 카트 스크린 */}
            <Scene
              key="viewerMyCartScreen"
              hideNavBar
              hideTabBar
              component={ViewerMyCartScreen}
            />
            {/* 뷰어 주문 내역 */}
            <Scene
              key="viewerPurchaseListScreen"
              component={ViewerPurchaseListScreen}
              hideNavBar
              hideTabBar
            />
            {/* 뷰어 주문 내역 상세*/}
            <Scene
              key="viewerPurchaseDetailScreen"
              component={ViewerPurchaseDetailScreen}
              hideNavBar
              hideTabBar
            />
            {/* 뷰어 쿠폰 스크린 */}
            <Scene
              key="viewerCouponScreen"
              hideNavBar
              hideTabBar
              component={ViewerCouponScreen}
            />
            {/*주문 상세 내역*/}
            <Scene
              key="purchaseDetailScreen"
              component={PurchaseDetailScreen}
              hideNavBar
              hideTabBar
            />
            {/*새 배송지 추가하기*/}
            <Scene
              key="myInfoAddNewDeliveryScreen"
              component={AddNewDeliveryScreen}
              hideNavBar
              hideTabBar
            />
            {/*마이페이지 배송지 리스트*/}
            <Scene
              key="myInfoDeliveryListScreen"
              component={DeliveryListScreen}
              hideNavBar
              hideTabBar
            />
            {/*정산관리 페이지*/}
            <Scene
              key="adjustmentScreen"
              component={AdjustmentScreen}
              hideNavBar
              hideTabBar
            />
            {/*정산 내역 페이지*/}
            <Scene
              key="adjustmentHistoryScreen"
              component={AdjustmentHistoryScreen}
              hideNavBar
              hideTabBar
            />
            {/*라방 일정 달력 상세보기 페이지*/}
            <Scene
              key="liveScheduleDetailScreen"
              component={LiveScheduleDetailScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="myPageAlreadyCommentScreen"
              component={AlreadyCommentScreen}
              hideNavBar
              hideTabBar
            />
            {/*정산 관리 계좌 추가 페이지*/}
            <Scene
              key="registerAccountScreen"
              component={RegisterAccountScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="myInfoCouponScreen"
              component={CouponScreen}
              hideNavBar
              hideTabBar
            />
            {/*시청자 마이페이지 프로필 수정*/}
            <Scene
              key="viewerEditProfileScreen"
              component={ViewerEditProfileScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="myInfoRecommendDetailScreen"
              component={RecommendDetailScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="noticeScreen"
              component={NoticeScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="igtvLinkInputScreen"
              component={IgtvLinkInputScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="videoUploadScreen"
              component={VideoUploadScreen}
              hideNavBar
              hideTabBar
            />
            <Scene
              key="broadcastUploadSuccessScreen"
              component={BroadcastUploadSuccessScreen}
              hideNavBar
              hideTabBar
            />
            {/* 라방 4Step 가이드 스크린 화면 */}
            <Scene
              key="live4StepGuideScreen"
              component={Live4StepGuideScreen}
              hideNavBar
              hideTabBar
            />
          </Scene>
        </Scene>
        {/*로그인 or 회원가입*/}
        <Scene
          key="SignUp"
          title="SignUp"
          Screentitle="SignUp"
          hideTabBar={true}
          hideNavBar={true}>
          <Scene key="loginScreen" component={LoginScreen} />
          <Scene key="arsScreen" component={ArsScreen} />
          <Scene
            key="selectViewerORSellerScreen"
            component={SelectViewerORSellerScreen}
          />
          <Scene key="viewerSignUpScreen" component={ViewerSignUpScreen} />
          <Scene
            key="sellerSignUpScreen"
            hideTabBar={true}
            hideNavBar={true}
            component={SellerSignUpScreen}
          />
        </Scene>
        {/*회원가입 성공시 */}
        <Scene
          key="viewerSignUpSuccess"
          hideTabBar={true}
          hideNavBar={true}
          component={ViewerSignUpSuccessScreen}
        />
        <Scene
          key="sellerSuccessApplyScreen"
          hideTabBar={true}
          hideNavBar={true}
          component={SellerSuccessApplyScreen}
        />
        <Scene
          key="sellerSignUpFailScreen"
          hideTabBar={true}
          hideNavBar={true}
          component={SellerSignUpFailScreen}
        />

        <Scene
          key="sellerSignUpFailReasonScreen"
          hideTabBar={true}
          hideNavBar={true}
          component={SellerSignUpFailReasonScreen}
        />
        <Scene
          key="sellerSignUpSucessScreen"
          hideTabBar={true}
          hideNavBar={true}
          component={SellerSignUpSuccessScreen}
        />
        <Scene
          key="sellerRecommendScreen"
          component={RecommendScreen}
          hideNavBar
          hideTabBar
        />
        <Scene
          key="termsOfServiceScreen"
          component={TermsOfServiceScreen}
          hideNavBar
          hideTabBar
        />
        <Scene
          key="termsOfContentsUtilScreen"
          component={TermsOfContentsUtilScreen}
          hideNavBar
          hideTabBar
        />
        <Scene
          key="termsOfAcceptSMS"
          component={TermsOfAcceptSMS}
          hideNavBar
          hideTabBar
        />
        <Scene
          key="versionInfoScreen"
          component={VersionInfoScreen}
          hideNavBar
          hideTabBar
        />
        <Scene
          key="purchaseIamPortScreen"
          component={PurchaseIamPortScreen}
          hideNavBar
          hideTabBar
          Screentitle="purchaseIamPortScreen"
        />
        {/*디플 웹뷰*/}
        <Scene
          key="dpleWebViewScreen"
          component={DpleWebViewScreen}
          hideNavBar
          hideTabBar
        />
        {/* 정기 결제 */}
        <Scene
          key="regularPaymentScreen"
          component={RegularPaymentScreen}
          hideNavBar
          hideTabBar
        />
        {/* 정기 결제 카드 등록 */}
        <Scene
          key="addCardScreen"
          component={AddCardScreen}
          hideNavBar
          hideTabBar
        />
        {/* ... */}
      </Stack>
    </Router>
  );
};

export default Index;
