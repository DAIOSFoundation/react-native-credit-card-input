import React, {useEffect} from 'react';
import {Linking} from 'react-native';
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as broadcastActions from '../../store/modules/broadcast/actions';
import * as productDetailActions from '../../store/modules/productDetail/actions';
// NPM Module
import {Actions} from 'react-native-router-flux';
// Styled Component
import LoadingBar from '../../components/loadingBar/LoadingBar';

const LoadingScreen = () => {
  const dispatch = useDispatch();

  const {
    notificationBroadcastId,
    notificationProductId,
    notificationType,
    notificationStatus,
    jwtToken,
  } = useSelector(
    (state) => ({
      notificationBroadcastId: state.global.notificationBroadcastId,
      notificationProductId: state.global.notificationProductId,
      notificationType: state.global.notificationType,
      notificationStatus: state.global.notificationStatus,
      jwtToken: state.user.jwtToken,
    }),
    shallowEqual,
  );

  const getTokenData = async () => {
    try {
      console.log('LoadingScreen  request Id : ', notificationBroadcastId);
      if (
        jwtToken &&
        notificationBroadcastId !== null &&
        notificationProductId !== null
      ) {
        console.log('notificationType : ', notificationType);
        // 로그인 되고 푸쉬 알람을 통해 들어왔을 경우
        if (notificationType === 'broadcast') {
          // 방송 전체화면 진입 시
          let param = {
            broadcastId: notificationBroadcastId,
            productId: notificationProductId,
          };

          if (notificationStatus === '5') {
            // 라이브 방송 중일 때
            dispatch(
              broadcastActions.get_broadcast_detail_info(
                notificationBroadcastId,
              ),
            );
            Actions.replace('mainScreen');
            Actions.videoFullScreen(param);
          } else if (notificationStatus === '8') {
            // 녹화방송 일 때
            dispatch(
              broadcastActions.get_broadcast_detail_info(
                notificationBroadcastId,
              ),
            );
            Actions.replace('mainScreen');
            Actions.youtubeFullScreen(param);
          } else {
            console.log('notificationStatus Error !!!', notificationStatus);
          }
        } else if (notificationType === 'product') {
          // 상품 상세정보 화면 진입 시
        } else if (notificationType === 'contract') {
          // 계약서 진행 완료 시
          Actions.replace('mainScreen');
          Actions.myInfoLoginRouter();
        } else {
          console.log('getTokenData error !!!');
        }
      } else {
        Actions.replace('tabBar');
      }
    } catch (e) {
      console.error('Screen Index.js getTokenData error : ', e);
    }
  };

  const handleOpenURL = (event) => {
    console.log('opened!! ', event);
    let data = event !== null ? event.url || event : null;
    console.log('data!! ', data);
    if (data !== null) {
      //dauth://login?name=daiosShop를 파싱한 부분
      // console.log('OAuth login 시도 : ', data.split('?')[1].split('='));

      let array = data.split('//')[1].split('home/')[1].split('=');
      console.log('array1 ; ', array);
      if (array[0] === 'broadcast') {
        let param = {
          broadcastId: array[1],
          productId: array[3],
        };
        dispatch(productDetailActions.request_product_detail(param));

        Actions.productDetailScreen([array[1], array[3], 'main']);
        // dispatch(requestActions.set_oauth_login(true));
      } else if (array[0] === 'product') {
        console.log('data : ', array[1]);
      }
    } else {
      console.log('일반적인 상황');
    }
  };

  useEffect(() => {
    Linking.addEventListener('url', (url) => handleOpenURL(url));
    Linking.getInitialURL().then((url) => handleOpenURL(url));

    return () => {
      Linking.removeEventListener('url', ({url}) => handleOpenURL(url));
    };
  }, []);

  useEffect(() => {
    getTokenData();
  }, [notificationBroadcastId, jwtToken]);

  return (
    <>
      <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}} />
    </>
  );
};

export default LoadingScreen;
