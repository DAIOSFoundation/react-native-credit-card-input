import React from 'react';
// Styled Component
import {Button} from '../../../components/styled/Button';
import {View, ViewAbsolute, ViewRow} from '../../../components/styled/View';
import {screenWidth} from '../../../components/styled/ScreenSize';
import Timer from '../../../components/live/Timer';
import VideoStreaming from '../../../components/video/video';
import {Text} from '../../../components/styled/Text';
import BroadcastingBottom from '../../../components/products/BroadcastingBottom';
import SellerProfile from '../../../components/profiles/SellerProfile';
import {Image} from '../../../components/styled/Image';
import PreventDoubleClick from '../../../components/buttons/PreventDoubleClick';
// NPM Module
import {Actions} from 'react-native-router-flux';
import WebView from 'react-native-webview';
// utils Import
import {
  percentHeight,
  percentWidth,
  tagToString,
  disRate,
  timePrice,
} from '../../../utils/functions';
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as productDetailActions from '../../../store/modules/productDetail/actions';
import * as globalActions from '../../../store/modules/global/actions';
import * as broadcastActions from '../../../store/modules/broadcast/actions';

const SliderEntry = (props) => {
  // redux
  const dispatch = useDispatch();

  const {jwtToken, userId} = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
    }),
    shallowEqual,
  );

  const live = props.data.status === 5;
  const recordedBroadcast = props.data.status === 8;

  const DoubleClickPrevent = PreventDoubleClick(Button);

  // 라이브 스트리밍 방송 종료까지 남은 시간
  // const getRestTimer = () => {
  //   let nowDate = new Date();
  //   let restTimer = 0; // 종료까지 남은 시간
  //
  //   // 현재 시 분 초
  //   let nowHours = nowDate.getHours();
  //   let nowMinutes = nowDate.getMinutes();
  //   let nowSeconds = nowDate.getSeconds();
  //   // 서버에서 받은 시 분
  //   let endHours = props.data.expectedBroadcastEndTime.substring(0, 2);
  //   let endMinutes = props.data.expectedBroadcastEndTime.substring(3, 5);
  //   // 현재시간 분,초 - 서버에서 받은 분,초
  //   let restHour = endHours - nowHours;
  //   let restMinutes = endMinutes - nowMinutes;
  //
  //   restTimer = restHour * 3600 + restMinutes * 60 + (60 - nowSeconds);
  //
  //   return restTimer;
  // };

  const onPressYoutubeFullScreen = () => {
    let param = {
      broadcastId: props.data._id,
      productId: props.data.productId,
    };

    dispatch(broadcastActions.get_broadcast_detail_info(props.data._id));
    Actions.youtubeFullScreen(param);
  };

  const videoStreaming = () => {
    // 라이브 방송일 때
    if (live) {
      // 현재 화면에 해당하는 라이브 스트리밍
      if (props.index === props.target) {
        return (
          <VideoStreaming
            paused={false} // 영상 실행
            data={props.data.dash_playback_url}
            size={'cover'}
            muted={false}
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
          />
        );
      } else {
        // 현재 화면에 해당하지 않을 시 영상정지
        return (
          <VideoStreaming
            paused={true} // 영상 정지
            data={props.data.dash_playback_url}
            size={'cover'}
            muted={false}
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
          />
        );
      }
    } else if (recordedBroadcast) {
      // 녹화 방송일 때
      // 현재 화면에 해당하는 녹화 방송
      if (props.index === props.target) {
        return (
          <View width={'100%'} height={'200%'}>
            <WebView
              userAgent={
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
              }
              mediaPlaybackRequiresUserAction={false}
              allowsInlineMediaPlayback={true}

              style={{
                width: '100%',
                alignSelf: 'center',
                alignContent: 'center',
              }}
              source={{
                uri:
                  'https://www.youtube.com/embed/' +
                  `${props.data.videoId}` +
                  '?rel=0&autoplay=' +
                  props.autoplay +
                  '&mute=1&controls=0&loop=1&playlist=' +
                  `${props.data.videoId}` +
                  '&disablekb=1&playsinline=1',
              }}
            />
            <DoubleClickPrevent
              width={'100%'}
              height={'100%'}
              onPress={onPressYoutubeFullScreen}
              style={{position: 'absolute'}}
            />
          </View>
        );
      } else {
        // 현재 화면에 해당하지 않을 시 썸네일
        return (
          <View width={'100%'} height={'150%'}>
            <Image
              width={'100%'}
              height={'100%'}
              source={{
                uri:
                  'https://img.youtube.com/vi/' +
                  `${props.data.videoId}` +
                  '/hqdefault.jpg',
              }}
            />
          </View>
        );
      }
    }
  };

  const videoFullScreen = () => {
    if (live) {
      let param = {
        broadcastId: props.data._id,
        productId: props.data.productId,
      };

      dispatch(broadcastActions.get_broadcast_detail_info(props.data._id));
      Actions.videoFullScreen(param);
    }
  };

  // 상품 상세보기 버튼
  const onPressProductDetail = () => {
    let param = {
      broadcastId: props.data._id,
      productId: props.data.productId,
    };

    dispatch(productDetailActions.request_product_detail(param));
    Actions.productDetailScreen([props.data._id, props.data.productId, 'main']);
  };

  const onPressRedirectLogin = () => {
    Actions.mainLoginScreen()
  }

  // video slider 로그인 여부에 따른 버튼 변경
  const mainVideoOnPress = () => {
    return jwtToken ? onPressProductDetail : onPressRedirectLogin 
  }

  return (
    <View bgDarkNavy>
      <DoubleClickPrevent
        alignSelf={'center'}
        activeOpacity={1}
        width={screenWidth - percentWidth(4)}
        height={percentHeight(70)}
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          overflow: 'hidden',
        }}
        onPress={() => videoFullScreen(props.data)}>
        <ViewAbsolute top left zIndex={100}>
          <ViewRow alignItems={'center'}>
            {live ? (
              <SellerProfile
                disabled
                size={35}
                urlPath={props.data.userInfo.profileImageUrl}
              />
            ) : (
              <SellerProfile
                urlPath={props.data.userInfo.profileImageUrl}
                outBorderColor={{brDarkNavy: true}}
                disabled
                size={35}
              />
            )}
            <Text ftWhite bold marginLeft={10}>
              {props.data.userInfo.nickName}
            </Text>
          </ViewRow>
        </ViewAbsolute>
        <ViewAbsolute top right zIndex={100}>
          {live ? <Timer live /> : <Timer />}
        </ViewAbsolute>
        {videoStreaming()}
      </DoubleClickPrevent>
      <View paddingLeft={percentWidth(2)} paddingRight={percentWidth(2)}>
        <BroadcastingBottom
          urlPath={props.data.productInfo.productImages[0].path}
          size={40}
          title={props.data.productInfo.productName}
          discount={disRate(
            props.data.productInfo.normalPrice,
            timePrice(
              props.data.expectedStartTime,
              props.data.expectedEndTime,
              props.data.productInfo.sellerLivePrice,
              props.data.productInfo.sellerFeedPrice,
              props.data.status,
            ),
          )}
          price={timePrice(
            props.data.expectedStartTime,
            props.data.expectedEndTime,
            props.data.productInfo.sellerLivePrice,
            props.data.productInfo.sellerFeedPrice,
            props.data.status,
          )}
          hashTag={tagToString(props.data.tags)}
          textLine={1}
          buttonText={'구매하기'}
          onPressButton={mainVideoOnPress()}
        />
      </View>
    </View>
  );
};

export default SliderEntry;
