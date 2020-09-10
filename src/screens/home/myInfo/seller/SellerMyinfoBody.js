import React, {useState, useEffect, useMemo} from 'react';
// Styled Component
import {
  Container,
  ViewRow,
  View,
  ScrollView,
  ViewBorderRadius,
  ViewBorder,
  ViewRadiusCustom,
} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import {
  Button,
  ButtonBorderRadius,
  ButtonRadius,
} from '../../../../components/styled/Button';
import {screenWidth} from '../../../../components/styled/ScreenSize';
import ListButton from '../../../../components/buttons/ListButton';
import SellerProfile from '../../../../components/profiles/SellerProfile';
import {Image} from '../../../../components/styled/Image';
// Screen Import
import Preview from './tabs/Live4Step/Preview';
import LiveScheduleScreen from './tabs/LiveSchedule/LiveScheduleScreen';
// Redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as live4StepActions from '../../../../store/modules/myinfo/live4Step/actions';
import * as myInfoActions from '../../../../store/modules/myinfo/actions';
import * as broadcastActions from '../../../../store/modules/broadcast/actions';
// NPM Module
import {Actions} from 'react-native-router-flux';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native';

const SellerMyinfoBody = (props) => {
  const dispatch = useDispatch();
  const [changeConfirmText, setChangeConfirmText] = useState(false);

  const {
    broadcasts,
    channelInfo,
    userInfo,
    jwtToken,
    additionalInfo,
    menu,
    deleteStepOneTwoBroadcast,
    youtubeUploadSuccessMessage,
  } = useSelector(
    (state) => ({
      broadcasts: state.live4Step.broadcasts,
      channelInfo: state.user.channelInfo,
      userInfo: state.user.userInfo,
      jwtToken: state.user.jwtToken,
      additionalInfo: state.user.additionalInfo,
      menu: state.myInfo.menu,
      deleteStepOneTwoBroadcast: state.broadcast.deleteStepOneTwoBroadcast,
      youtubeUploadSuccessMessage: state.live4Step.youtubeUploadSuccessMessage,
    }),
    shallowEqual,
  );

  let filteredBroadcasts = [];
  if (broadcasts.length > 0) {
    filteredBroadcasts = broadcasts.filter((item) => {
      return item.status < 7;
    });
  }

  const recommendAction = () => {
    Actions.recommendScreen();
  };

  useEffect(() => {
    dispatch(live4StepActions.request_broadcast(jwtToken));
  }, [jwtToken]);

  useEffect(() => {
    dispatch(live4StepActions.request_broadcast(jwtToken));
    dispatch(broadcastActions.change_status());
  }, [deleteStepOneTwoBroadcast]);

  const clickCheck = () => {
    setChangeConfirmText(true);
  };

  const Previews = () => {
    console.log('Previews =>', filteredBroadcasts);
    if (filteredBroadcasts.length > 0) {
      return filteredBroadcasts.map((item) => (
        <Preview
          key={item._id}
          broadcastId={item._id}
          productId={item.productId}
          src={item.productImageUrl}
          step={item.status}
          name={item.productName}
          requestContractEmail={item.requestContractEmail}
          bottomOpen={(title) => bottomOpen(title, item)}
          clickCheck={() => clickCheck()}
          changeConfirmText={changeConfirmText}
        />
      ));
    } else {
      return null;
    }
  };

  const bottomOpen = (title, item) => {
    props.bottomOpen(title, item);
  };

  const EmptyLive = () => {
    return (
      <View alignItems={'center'} justifyContent={'center'} marginBottom={30}>
        <Text marginTop={20} ftGray>
          준비중인 라이브 방송이 없습니다.
        </Text>
        <Text marginBottom={20} ftGray>
          샘플을 신청하시고 라이브 방송을 진행해보세요!
        </Text>
        <ButtonRadius
          bgTheme
          marginTop={10}
          height={34}
          width={screenWidth / 2}
          alignSelf={'center'}
          onPress={recommendAction}>
          <Text ftWhite ftSize={13}>
            상품 추천 받기
          </Text>
        </ButtonRadius>
      </View>
    );
  };

  const changeMenu = (menu) => {
    console.log('menu ; ', menu);
    dispatch(myInfoActions.change_menu(menu));
    const params = {
      date: new Date().getTime(),
      jwtToken,
    };
    // dispatch(broadcastActions.request_seller_this_week_broadcast(params));
  };

  // 라방 4Step 가이드 스크린 이동
  const onPressLive4StepGuide = () => {
    Actions.live4StepGuideScreen();
  };

  return (
    <>
      {/* 마이 팬 리스트 */}
      {/*<ViewRow*/}
      {/*  bgDarkWhite*/}
      {/*  height={50}*/}
      {/*  paddingLeft={20}*/}
      {/*  paddingRight={20}*/}
      {/*  width={'100%'}*/}
      {/*  alignItems={'center'}*/}
      {/*  justifyContent={'space-between'}>*/}
      {/*  <Text ftDartNavy>마이 팬 리스트</Text>*/}

      {/*  <ViewRow alignItems={'center'}>*/}
      {/*    /!* <View marginLeft={3} marginRight={3}>*/}
      {/*      <SellerProfile outLine={false} size={35} outBorderColor={{}} />*/}
      {/*    </View>*/}
      {/*    <View marginLeft={3} marginRight={3}>*/}
      {/*      <SellerProfile outLine={false} size={35} outBorderColor={{}} />*/}
      {/*    </View>*/}
      {/*    <View marginLeft={3} marginRight={3}>*/}
      {/*      <SellerProfile outLine={false} size={35} outBorderColor={{}} />*/}
      {/*    </View> *!/*/}
      {/*    <Text ftDartNavy paddingRight={10}>*/}
      {/*      {userInfo.favorites.length} 명*/}
      {/*    </Text>*/}

      {/*    <View alignItems={'center'}>*/}
      {/*      <Button width={24} height={24}>*/}
      {/*        <Image*/}
      {/*          source={require('../../../../assets/common/icon_more_arrow_black.png')}*/}
      {/*        />*/}
      {/*      </Button>*/}
      {/*    </View>*/}
      {/*  </ViewRow>*/}
      {/*</ViewRow>*/}

      {/* 탭 버튼 */}
      <ViewRow width={'100%'} marginTop={10} paddingLeft={10} paddingRight={10}>
        <View alignItems={'center'} width={'25%'}>
          <Button
            width={50}
            height={50}
            alignSelf={'center'}
            onPress={recommendAction}>
            <Image
              source={require('../../../../assets/myinfo/icon_sample_normal.png')}
            />
          </Button>
          <Text marginTop={5} ftGray>
            상품추천
          </Text>
        </View>
        <View alignItems={'center'} width={'25%'}>
          <Button
            width={50}
            height={50}
            alignSelf={'center'}
            onPress={() => changeMenu('live4step')}>
            {menu === 'live4step' ? (
              <Image
                source={require('../../../../assets/myinfo/icon_livestart_pressed.png')}
              />
            ) : (
              <Image
                source={require('../../../../assets/myinfo/icon_livestart_normal.png')}
              />
            )}
          </Button>
          <Text marginTop={5} ftGray>
            라방 4Step
          </Text>
        </View>
        <View alignItems={'center'} width={'25%'}>
          <Button
            width={50}
            height={50}
            alignSelf={'center'}
            onPress={() => changeMenu('calendar')}>
            {menu === 'calendar' ? (
              <Image
                source={require('../../../../assets/myinfo/icon_schedule_pressed.png')}
              />
            ) : (
              <Image
                source={require('../../../../assets/myinfo/icon_schedule_normal.png')}
              />
            )}
          </Button>
          <Text marginTop={5} ftGray>
            라방 일정관리
          </Text>
        </View>
        <View alignItems={'center'} width={'25%'}>
          <Button
            width={50}
            height={50}
            alignSelf={'center'}
            // onPress={() => Actions.adjustmentScreen()}
            onPress={props.onPressAdjustmentButton}>
            <Image
              source={require('../../../../assets/myinfo/icon_calculate_normal.png')}
            />
          </Button>
          <Text marginTop={5} ftGray>
            정산관리
          </Text>
        </View>
      </ViewRow>
      <View height={4} bgDarkWhite marginTop={10} />

      {menu === 'live4step' ? (
        <>
          <TouchableOpacity 
            onPress={() => Actions.purchaseListScreen()}
            style={{marginBottom: 5, marginLeft: 15}}>
            <ViewRow>
              <Entypo
                name="shopping-cart"
                style={{color: '#e6427a', fontSize: 30, paddingTop: 8, paddingRight: 13}}
              />
              <Text paddingTop={14}>샘플 결제 및 배송 내역 확인</Text>
            </ViewRow>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onPressLive4StepGuide}
            style={{marginBottom: 20, marginLeft: 15}}>
            <ViewRow>
              <FontAwesome5
                name="question"
                style={{color: '#e6427a', fontSize: 30, paddingTop: 8, paddingRight: 15}}
              />
              <Text paddingTop={14}>라이브 방송이 처음이신가요?</Text>
            </ViewRow>
          </TouchableOpacity>
          {filteredBroadcasts.length > 0 ? null : <EmptyLive />}
          <Previews />
          {/*<Preview step={1} name={'[임시] 로얄베르겐 1'} />*/}
          {/*<Preview step={2} name={'[임시] 로얄베르겐 2'} />*/}
          {/*<Preview step={3} name={'[임시] 로얄베르겐 3'} />*/}
          {/*<Preview step={4} name={'[임시] 로얄베르겐 4'} />*/}
          {/*<Preview step={5} name={'[임시] 로얄베르겐 4'} />*/}
          {/*<Preview step={6} name={'[임시] 로얄베르겐 4'} />*/}
          {/*<Preview step={7} name={'[임시] 로얄베르겐 4'} />*/}
        </>
      ) : (
        <LiveScheduleScreen
          bottomOpen={(title, item) => bottomOpen(title, item)}
        />
      )}
    </>
  );
};

export default SellerMyinfoBody;
