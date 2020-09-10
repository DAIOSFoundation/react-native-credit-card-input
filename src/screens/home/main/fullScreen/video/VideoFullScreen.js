import React, {useEffect, useRef, useState} from 'react';
// Styled Component
import {
  ScrollView,
  View,
  ViewAbsolute,
  ViewRadiusCustom,
  ViewRow,
  ViewBorderRadius,
} from '../../../../../components/styled/View';
import SellerProfile from '../../../../../components/profiles/SellerProfile';
import {Text} from '../../../../../components/styled/Text';
import BroadcastingBottom from '../../../../../components/products/BroadcastingBottom';
import VideoStreaming from '../../../../../components/video/video';
import BottomModal from '../../../../../components/modal/BottomModal';
import {Button} from '../../../../../components/styled/Button';
import {Image} from '../../../../../components/styled/Image';
import LoadingBar from '../../../../../components/loadingBar/LoadingBar';
import ToastMessage from '../../../../../components/toast/ToastMessage';
// TabView Import
import BuyRoute from '../tabView/BuyRoute';
import CartRoute from '../tabView/CartRoute';
// utils Import
import {disRate, percentWidth, timePrice} from '../../../../../utils/functions';
// NPM Module
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {Actions} from 'react-native-router-flux';
// assets Img
const modalCancel = require('../../../../../assets/common/icon_cancel_black.png');
// redux
import * as broadcastActions from '../../../../../store/modules/broadcast/actions';
import * as userActions from '../../../../../store/modules/user/actions';
import * as globalActions from '../../../../../store/modules/global/actions';
import * as viewerBroadcastActions from '../../../../../store/modules/viewerBroadcast/actions';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// Screen Import
import Comment from './comment/Comment';
import CountDownTimer from '../../../../../components/timer/CountDownTimer'
import EvilIcons from 'react-native-vector-icons/EvilIcons';

// 라이브 스트리밍 풀 화면
const VideoFullScreen = (props) => {
  // redux
  const dispatch = useDispatch();

  const {
    jwtToken,
    broadcastDetail,
    keepCallingCommentsIntervalId,
    currentProduct,
    userId,
    successMsg,
    loading,
    toastMessage,
    channelInfo,
    viewerCount,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      broadcastDetail: state.broadcast.broadcastDetail,
      keepCallingCommentsIntervalId:
      state.broadcast.keepCallingCommentsIntervalId,
      currentProduct: state.broadcast.currentProduct,
      userId: state.user.userId,
      successMsg: state.user.successMsg,
      loading: state.loading['broadcast/GET_BROADCAST_DETAIL_INFO'],
      toastMessage: state.global.toastMessage,
      channelInfo: state.user.channelInfo,
      viewerCount: state.viewerBroadcast.viewerCount,
    }),
    shallowEqual,
  );

  // 스크롤뷰 하단부터 시작하기위한 참조 선언
  const scrollViewRef = useRef(null);

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
    // dispatch(broadcastActions.change_interval_id(null))
    const params = {
      userId,
      jwtToken,
    };

    if (jwtToken && userId) {
      const body = {
        broadcastId: props.broadcastId,
        productId: props.productId,
        jwtToken: jwtToken,
      };

      dispatch(broadcastActions.request_broadcast_product(body));
      dispatch(userActions.request_user_myinfo(params));
      channelInfo && dispatch(viewerBroadcastActions.get_viewer_broadcast_info({channelPk: channelInfo.channelPk}));
    }
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(keepCallingCommentsIntervalId);
      dispatch(broadcastActions.change_broadcast_comments());
    };
  }, [keepCallingCommentsIntervalId]);

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

  // 담기 탭뷰
  const cartRoute = () => {
    return <CartRoute/>;
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
          marginTop={15}
          alignSelf={'flex-end'}
          width={23}
          height={23}
          activeOpacity={1}
          onPress={bottomClosed}>
          <Image width={23} height={23} source={modalCancel}/>
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

  if (loading) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}}/>
      </View>
    );
  }

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

  const onPressLiveClose = () => {
    Actions.pop()
  }

  return (
    <View>
      <ToastMessage/>
      <ViewAbsolute top left>
        <ViewRow alignItems={'center'}>
          <Button onPress={onPressSellerProfile} width={'auto'}>
            {broadcastDetail ? (
              broadcastDetail.status === 5 ? (
                <SellerProfile
                  size={35}
                  disabled
                  urlPath={broadcastDetail.sellerInfo.profileImageUrl}
                />
              ) : (
                <SellerProfile
                  size={35}
                  disabled
                  outBorderColor={{brDarkNavy: true}}
                  urlPath={broadcastDetail.sellerInfo.profileImageUrl}
                />
              )
            ) : null}
          </Button>
          <Text ftWhite bold marginLeft={10}>
            {broadcastDetail ? broadcastDetail.sellerInfo.nickName : null}
          </Text>
        </ViewRow>
      </ViewAbsolute>
      <ViewAbsolute top right>
        <ViewRow
          alignItems={'center'}
          paddingTop={3}
        >
          <ViewRow marginRight={7}>
            <ViewBorderRadius bgTheme>
              <Text
                ftWhite
                fontSize={12}
                paddingTop={5}
                paddingBottom={5}
                paddingLeft={5}
                paddingRight={5}
              >라이브 방송
              </Text>
            </ViewBorderRadius>
            <ViewBorderRadius
              bgWhite
              marginRight={8}
              marginLeft={10}
              alignItems={'center'}
              justifyContent={'center'}>
              <ViewRow
                paddingLeft={3}
                paddingRight={5}
              >
                <EvilIcons name="eye" size={22}/>
                <Text fontSize={11}>{viewerCount}</Text>
              </ViewRow>
            </ViewBorderRadius>
          </ViewRow>
          <Button
            width={19}
            height={19}
            paddingTop={14}
            onPress={onPressLiveClose}>
            <Image
              width={19}
              height={19}
              source={require('../../../../../assets/common/icon_cancel_white.png')}
            />
          </Button>
        </ViewRow>
        <ViewBorderRadius bgTheme>
          <CountDownTimer expectedEndTime={broadcastDetail.expectedEndTime}/>
        </ViewBorderRadius>
      </ViewAbsolute>
      <ViewAbsolute width={'100%'} bottom={0}>
        <ScrollView
          paddingLeft={10}
          paddingRight={10}
          marginBottom={10}
          height={200}
          ref={scrollViewRef}
          onContentSizeChange={(contentWidth, contentHeight) => {
            scrollViewRef.current.scrollToEnd({animated: true});
          }}>
          {broadcastDetail ? (
            <Comment
              broadcastId={broadcastDetail._id}
              sellerProfile={broadcastDetail.sellerInfo.profileImageUrl}
              sellerName={broadcastDetail.sellerInfo.nickName}
            />
          ) : null}
        </ScrollView>
        <View width={'70%'} marginLeft={15} marginBottom={60}>
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
        <VideoStreaming
          fullScreen={true}
          paused={false}
          data={broadcastDetail.dash_playback_url}
          size={'contain'}
          muted={true}
        />
      ) : null}
    </View>
  );
};

export default VideoFullScreen;
