import React, {useState, useEffect} from 'react';
// Styled Component
import {
  SafeAreaView,
  View,
  ViewAbsolute,
  ViewRadiusCustom,
  ViewRow,
} from '../../../../../components/styled/View';
import {Button} from '../../../../../components/styled/Button';
import {Image} from '../../../../../components/styled/Image';
import BroadcastingBottom from '../../../../../components/products/BroadcastingBottom';
import BottomModal from '../../../../../components/modal/BottomModal';
import SellerProfile from '../../../../../components/profiles/SellerProfile';
import LoadingBar from '../../../../../components/loadingBar/LoadingBar';
import {Text} from '../../../../../components/styled/Text';
import ToastMessage from '../../../../../components/toast/ToastMessage';
// NPM Module
import WebView from 'react-native-webview';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {Actions} from 'react-native-router-flux';
// utils Import
import {disRate, percentWidth, timePrice} from '../../../../../utils/functions';
// TabView Import
import BuyRoute from '../tabView/BuyRoute';
import CartRoute from '../tabView/CartRoute';
// assets Img
const modalCancel = require('../../../../../assets/common/icon_cancel_black.png');
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as broadcastActions from '../../../../../store/modules/broadcast/actions';
import * as globalActions from '../../../../../store/modules/global/actions';
import * as productDetailActions from '../../../../../store/modules/productDetail/actions';

// 녹화방송 풀 화면
const YoutubeFullScreen = (props) => {
  //redux
  const dispatch = useDispatch();

  const {
    jwtToken,
    broadcastDetail,
    currentProduct,
    userId,
    successMsg,
    loading,
    toastMessage,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      broadcastDetail: state.broadcast.broadcastDetail,
      currentProduct: state.broadcast.currentProduct,
      userId: state.user.userId,
      successMsg: state.user.successMsg,
      loading: state.loading['broadcast/GET_BROADCAST_DETAIL_INFO'],
      toastMessage: state.global.toastMessage,
    }),
    shallowEqual,
  );

  const [snapPoints, setSnapPoints] = useState([0]);

  const bottomClosed = () => {
    setSnapPoints([0]);
  };
  const bottomOpen = () => {
    if (jwtToken) {
      setSnapPoints(['80%']);
    }
  };

  useEffect(() => {
    if (jwtToken && userId) {
      const body = {
        broadcastId: props.broadcastId,
        productId: props.productId,
        jwtToken: jwtToken,
      };

      dispatch(broadcastActions.request_broadcast_product(body));
      dispatch(productDetailActions.request_product_detail(body));
    }
  }, []);

  // 구매하기 탭뷰
  const buyRoute = () => {
    return broadcastDetail ? (
      <BuyRoute
        product={currentProduct}
        broadcastId={broadcastDetail._id}
        productId={broadcastDetail.productId}
        price={timePrice(
          broadcastDetail.expectedStartTime,
          broadcastDetail.expectedEndTime,
          broadcastDetail.productInfo.sellerLivePrice,
          broadcastDetail.productInfo.sellerFeedPrice,
          broadcastDetail.status,
        )}
        discount={disRate(
          broadcastDetail.productInfo.normalPrice,
          timePrice(
            broadcastDetail.expectedStartTime,
            broadcastDetail.expectedEndTime,
            broadcastDetail.productInfo.sellerLivePrice,
            broadcastDetail.productInfo.sellerFeedPrice,
            broadcastDetail.status,
          ),
        )}
        status={broadcastDetail.status}
        deliveryChargeAmount={broadcastDetail.productInfo.deliveryChargeAmount}
        isExtraCharge={broadcastDetail.productInfo.isExtraCharge}
        extraCharge={broadcastDetail.productInfo.extraCharge}
      />
    ) : null;
  };

  // 카트 탭뷰
  const cartRoute = () => {
    return <CartRoute />;
  };

  const initialLayout = {width: percentWidth(100)};

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'buy', title: '구매하기'},
    {key: 'put', title: '카트'},
  ]);

  const renderScene = SceneMap({
    buy: buyRoute,
    put: cartRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor="#e6427a"
      inactiveColor="black"
      labelStyle={{fontWeight: 'bold', fontSize: 16}}
      indicatorStyle={{backgroundColor: '#e6427a'}}
      style={{backgroundColor: 'white'}}
    />
  );

  const bottomSheetHeader = () => {
    return (
      <ViewRadiusCustom
        bgWhite
        justifyContent={'center'}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        marginBottom={-1}
        width={'100%'}
        height={30}>
        <Button
          marginRight={15}
          alignSelf={'flex-end'}
          width={25}
          height={25}
          activeOpacity={1}
          onPress={bottomClosed}>
          <Image width={25} height={25} source={modalCancel} />
        </Button>
      </ViewRadiusCustom>
    );
  };

  const bottomSheetContent = () => {
    return (
      <View height={'100%'}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </View>
    );
  };

  console.log('YoutubeFullScreen broadcastDetail => ', broadcastDetail);

  const onPressSellerProfile = () => {
    // Actions.newAddressScreen({screen:'newInputRoute'});
    if (jwtToken && userId) {
      Actions.sellerPageForViewerScreen({
        data: broadcastDetail.sellerInfo._id,
        screen: 'YoutubeFullScreen',
      });
    } else {
      dispatch(
        globalActions.change_toast_message('로그인 후 이용하실 수 있습니다.'),
      );
    }
  };

  if (loading) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}} />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ToastMessage />
      <ViewAbsolute top={30} left>
        <ViewRow alignItems={'center'}>
          <Button onPress={onPressSellerProfile} width={'auto'}>
            {broadcastDetail ? (
              <SellerProfile
                size={35}
                disabled
                outBorderColor={{brDarkNavy: true}}
                urlPath={broadcastDetail.sellerInfo.profileImageUrl}
              />
            ) : null}
          </Button>
          <Text ftWhite bold marginLeft={10}>
            {broadcastDetail ? broadcastDetail.sellerInfo.nickName : null}
          </Text>
        </ViewRow>
      </ViewAbsolute>
      <ViewAbsolute width={'100%'} bottom={60}>
        <View width={'70%'} marginLeft={15}>
          {broadcastDetail ? (
            <BroadcastingBottom
              fullScreen
              urlPath={broadcastDetail.productInfo.productImages[0].path}
              size={40}
              title={broadcastDetail.productInfo.productName}
              discount={disRate(
                broadcastDetail.productInfo.normalPrice,
                timePrice(
                  broadcastDetail.expectedStartTime,
                  broadcastDetail.expectedEndTime,
                  broadcastDetail.productInfo.sellerLivePrice,
                  broadcastDetail.productInfo.sellerFeedPrice,
                  broadcastDetail.status,
                ),
              )}
              price={timePrice(
                broadcastDetail.expectedStartTime,
                broadcastDetail.expectedEndTime,
                broadcastDetail.productInfo.sellerLivePrice,
                broadcastDetail.productInfo.sellerFeedPrice,
                broadcastDetail.status,
              )}
              textLine={1}
              onPressButton={bottomOpen}
              token={jwtToken}
            />
          ) : null}
        </View>
      </ViewAbsolute>
      <BottomModal
        headerGesture={false}
        contentGesture={false}
        initialSnap={0}
        snapPoints={snapPoints}
        header={bottomSheetHeader()}
        view={bottomSheetContent()}
      />
      {broadcastDetail ? (
        <WebView
          userAgent={
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
          }
          mediaPlaybackRequiresUserAction={false}
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            alignContent: 'center',
          }}
          source={{
            uri:
              'https://www.youtube.com/embed/' +
              `${broadcastDetail.videoId}` +
              '?rel=0&autoplay=1&modestbranding=1&fs=0' +
              '&controls=1&loop=1&playlist=' +
              `${broadcastDetail.videoId}`,
          }}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default YoutubeFullScreen;
