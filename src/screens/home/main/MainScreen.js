import React, {useEffect, useRef} from 'react';
// Styled Component
import {
  Container,
  SafeAreaView,
  ScrollView,
  View,
  ViewRow,
} from '../../../components/styled/View';
import {Image} from '../../../components/styled/Image';
import {Text} from '../../../components/styled/Text';
import LoadingBar from '../../../components/loadingBar/LoadingBar';
import SliderImage from '../../../components/carousel/SliderImage';
import {screenWidth} from '../../../components/styled/ScreenSize';
import CustomModal from '../../../components/modal/CustomModal';
import SliderLivePreview from '../../../components/carousel/SliderLivePreview';
import {Button} from '../../../components/styled/Button';
import ToastMessage from '../../../components/toast/ToastMessage';
// Component Import
import SliderView from './SliderView';
import FavoritesSeller from './FavoritesSeller';
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as broadcastActions from '../../../store/modules/broadcast/actions';
import * as userActions from '../../../store/modules/user/actions';
import * as globalActions from '../../../store/modules/global/actions';
// utils Import
import {percentHeight, percentWidth} from '../../../utils/functions';
// NPM Module
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import {TouchableOpacity} from 'react-native';
import * as recommendActions from '../../../store/modules/recommend/actions';
import * as productDetailActions from '../../../store/modules/productDetail/actions';
import MainSubBroadcastForm from '../../../components/broadcast/MainSubBroadcastForm';
import LiveProfile from '../../../components/profiles/LiveProfile';
// assets Image
const main_top_logo = require('../../../assets/main/sellervision_logo.png');
const sellervisionSymbol = require('../../../assets/main/sellervision_symbol.png');
const moreArrowIcon = require('../../../assets/main/icon_more_arrow.png');

const MainScreen = () => {
  const dispatch = useDispatch();

  const {
    broadcasts,
    subBroadcasts,
    autoplay,
    loading,
    isVisible,
    isOneButton,
    isFull,
    message,
    onPressOK,
    size,
    elements,
    buttonHeight,
    scrollJustifyContent,
    broadcastsPreview,
    jwtToken,
    userId,
  } = useSelector(
    (state) => ({
      broadcasts: state.broadcast.broadcasts,
      subBroadcasts: state.broadcast.subBroadcasts,
      autoplay: state.broadcast.autoplay,
      broadcastsPreview: state.broadcast.broadcastsPreview,
      loading: state.loading['broadcast/GET_BROADCAST_INFO'],
      isVisible: state.customModal.isVisible,
      isOneButton: state.customModal.isOneButton,
      isFull: state.customModal.isFull,
      message: state.customModal.message,
      onPressOK: state.customModal.onPressOK,
      size: state.customModal.size,
      elements: state.customModal.elements,
      buttonHeight: state.customModal.buttonHeight,
      scrollJustifyContent: state.customModal.scrollJustifyContent,
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
    }),
    shallowEqual,
  );

  const scrollRef = useRef(null);

  const loginCheck = async () => {
    const value = await AsyncStorage.multiGet([
      'jwtToken',
      'userId',
      'type',
      'activate',
    ]);

    console.log('loginCheck => ', value);

    dispatch(userActions.change_login_info(value));
  };

  useEffect(() => {
    loginCheck();
    console.log('useEffect !!!');
    dispatch(broadcastActions.get_broadcast_preview());
    dispatch(broadcastActions.get_broadcast_info());
    dispatch(globalActions.change_tab_location('Main'));
  }, []);

  // 메인화면 라이브 예고 클릭시 상세화면 진입
  const onPressDetail = (data) => {
    let param = {
      jwtToken: jwtToken,
      broadcastId: data.broadcastId,
      productId: data.productId,
    };
    dispatch(productDetailActions.request_product_detail(param));
    Actions.productDetailScreen([data.broadcastId, data.productId, 'Main']);
  };

  const EventBar = () => (
    <View
      width={'100%'}
      alignItems={'center'}
      paddingTop={15}
      paddingBottom={15}
      style={{
        backgroundColor: '#ffcd3f',
      }}>
      <Text bold ftBigLarge>
        라이브 어택 이벤트
      </Text>
    </View>
  );

  const StreamingNotFound = () => {
    return (
      <View alignItems={'center'} height={percentHeight(60)}>
        <Text ftWhite fontSize={20} bold marginTop={50}>
          죄송합니다
        </Text>
        <Text ftWhite marginTop={15} fontSize={16}>
          시청 가능한 영상이 없습니다.
        </Text>
        <Image
          marginTop={50}
          source={require('../../../assets/signup/cry_face.png')}
          width={180}
          height={180}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}} />
      </View>
    );
  }

  const ImageSliderArray = [{image: 1}, {image: 2}, {image: 3}];

  const onPressLivePreview = () => {
    if (jwtToken && userId) {
      Actions.livePreviewScreen();
    } else {
      dispatch(globalActions.change_toast_message('로그인 후 이용해주세요.'));
    }
  };

  // 후순위 방송 보기
  const onPressSubBroadcastVideo = (data) => {
    if (data.status === 5) {
      // 생방 일때
      let param = {
        broadcastId: data._id,
        productId: data.productId,
      };

      dispatch(broadcastActions.get_broadcast_detail_info(data._id));
      Actions.videoFullScreen(param);
    } else if (data.status === 8) {
      // 녹방 일때
      let param = {
        broadcastId: data._id,
        productId: data.productId,
      };

      dispatch(broadcastActions.get_broadcast_detail_info(data._id));
      Actions.youtubeFullScreen(param);
    }
  };

  return (
    <>
      <ToastMessage />
      <ScrollView bgDarkNavy>
        <Container>
          <ViewRow marginTop={20} marginBottom={5}>
            <Image
              width={22}
              height={17}
              marginRight={7}
              source={sellervisionSymbol}
            />
            <Image width={155} height={17} source={main_top_logo} />
          </ViewRow>
          {broadcasts.length > 0 ? (
            <SliderView broadcasts={broadcasts} autoplay={autoplay} />
          ) : (
            <StreamingNotFound />
          )}
          {/* 후순위 방송 정보들 */}
          <SafeAreaView>
            <ScrollView horizontal={true} ref={scrollRef}>
              <ViewRow>
                {subBroadcasts.length !== 0
                  ? subBroadcasts.map((item, index) => {
                      return (
                        <View key={index}>
                          <MainSubBroadcastForm
                            subBroadcasetInfo={item}
                            onPressSubBroadcastVideo={onPressSubBroadcastVideo}
                          />
                        </View>
                      );
                    })
                  : null}
              </ViewRow>
            </ScrollView>
          </SafeAreaView>
          <View marginTop={20} marginBottom={20} width={'100%'}>
            <EventBar />
          </View>
          {broadcastsPreview.length !== 0 ? (
            <View width={'100%'} marginTop={15}>
              <ViewRow
                justifyContent={'space-between'}
                paddingLeft={15}
                paddingRight={15}>
                <View>
                  <Text ftLarge ftWhite bold>
                    라이브 예고
                  </Text>
                </View>
                <View>
                  <Button width={24} height={24} onPress={onPressLivePreview}>
                    <Image width={24} height={24} source={moreArrowIcon} />
                  </Button>
                </View>
              </ViewRow>
              <SliderLivePreview
                data={broadcastsPreview}
                sliderWidth={percentWidth(90)}
                itemWidth={percentWidth(80)}
                onPress={(data) => onPressDetail(data)}
              />
            </View>
          ) : null}
          <View bgLightNavy width={'100%'} height={7} />
          <View marginTop={30} marginBottom={10} width={'100%'}>
            <Text ftWhite paddingLeft={15} bold fontSize={20}>
              라이브 기획전
            </Text>
            <SliderImage
              data={ImageSliderArray}
              sliderWidth={screenWidth}
              itemWidth={percentWidth(80)}
              pagination
            />
          </View>
        </Container>
      </ScrollView>
      <CustomModal
        isVisible={isVisible}
        isOneButton={isOneButton}
        isFull={isFull}
        message={message}
        onPressOK={onPressOK}
        size={size}
        elements={elements}
        buttonHeight={buttonHeight}
        scrollJustifyContent={scrollJustifyContent}
        currentScene={'Main'}
      />
    </>
  );
};

export default MainScreen;
