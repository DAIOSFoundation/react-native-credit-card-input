import React from 'react';
// Styled Component
import {View, ViewRow} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import {Button} from '../../../../components/styled/Button';
import {Image} from '../../../../components/styled/Image';
import ListButton from '../../../../components/buttons/ListButton';
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../../../store/modules/user/actions';
// NPM Module
import {Actions} from 'react-native-router-flux';
import {Linking} from 'react-native';

const ViewerMyinfoBody = () => {
  const dispatch = useDispatch();
  const {
    broadcasts,
    channelInfo,
    userInfo,
    jwtToken,
    userId,
    additionalInfo,
  } = useSelector(
    (state) => ({
      broadcasts: state.live4Step.broadcasts,
      channelInfo: state.user.channelInfo,
      userInfo: state.user.userInfo,
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      additionalInfo: state.user.additionalInfo,
    }),
    shallowEqual,
  );

  let newBroadcasts = [];
  if (broadcasts) {
    newBroadcasts = broadcasts.filter((item) => {
      return item.status < 8;
    });
  }

  // 시청자 마이페이지 - 예약방송 스크린
  const reservationScreen = () => {
    Actions.viewerReservationScreen();
  };

  // useEffect(() => {
  //   dispatch(live4StepActions.request_broadcast(jwtToken))
  // }, [jwtToken])

  // 나의 카트 보기 이벤트
  const onPressMyCart = () => {
    Actions.viewerMyCartScreen();
  };

  // 셀러비전 카카오톡에 문의하기
  const onPressKakaoQuestion = () => {
    const url = 'https://pf.kakao.com/_ERAiT';
    Linking.openURL(url);
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
      {/*  <Text bold ftDartNavy>*/}
      {/*    즐겨찾는 셀러*/}
      {/*  </Text>*/}

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
            onPress={reservationScreen}>
            <Image
              source={require('../../../../assets/myinfo/icon_livebell_normal.png')}
            />
          </Button>
          <Text marginTop={5} ftDarkNavy bold>
            예약방송
          </Text>
        </View>
        <View alignItems={'center'} width={'25%'}>
          <Button
            width={50}
            height={50}
            alignSelf={'center'}
            onPress={() => Actions.viewerCouponScreen()}>
            <Image
              source={require('../../../../assets/myinfo/icon_mycoupon_normal.png')}
            />
          </Button>
          <Text marginTop={5} ftDarkNavy bold>
            쿠폰
          </Text>
        </View>
        <View alignItems={'center'} width={'25%'}>
          <Button
            width={50}
            height={50}
            alignSelf={'center'}
            onPress={onPressMyCart}>
            <Image
              source={require('../../../../assets/myinfo/icon_mycart_normal.png')}
            />
          </Button>
          <Text marginTop={5} ftDarkNavy bold>
            카트
          </Text>
        </View>
        <View alignItems={'center'} width={'25%'}>
          <Button
            width={50}
            height={50}
            alignSelf={'center'}
            onPress={() => Actions.viewerPurchaseListScreen()}>
            <Image
              source={require('../../../../assets/myinfo/icon_purchasehistory_normal.png')}
            />
          </Button>
          <Text marginTop={5} ftDarkNavy bold>
            주문내역
          </Text>
        </View>
      </ViewRow>
      <View height={40} bgDarkWhite marginTop={10} justifyContent={'flex-end'}>
        <Text bold ftGray marginLeft={15} marginBottom={5}>
          회원정보
        </Text>
      </View>
      {/*<ViewRow bgWhite height={50} marginRight={15} marginLeft={15} alignItems={'center'} justifyContent={'space-between'}>*/}
      {/*  <Text ftDarkNavy>나의 포인트</Text>*/}
      {/*  <ViewRow alignItems={'center'}>*/}
      {/*    <Text bold ftTheme paddingRight={10}>*/}
      {/*      10,000 P*/}
      {/*    </Text>*/}
      {/*    <View alignItems={'center'}>*/}
      {/*      <Button width={12} height={12}>*/}
      {/*        <Image*/}
      {/*          justifyContent={'center'}*/}
      {/*          source={require('../../../../assets/myinfo/icon_small_more_grey.png')}*/}
      {/*        />*/}
      {/*      </Button>*/}
      {/*    </View>*/}
      {/*  </ViewRow>*/}
      {/*</ViewRow>*/}
      {/*<ListButton text={'Q/A 문의내역'} showArrow ftDarkNavy/>*/}
      <ListButton
        text={'나의 프로필 수정'}
        showArrow
        ftDarkNavy
        onPress={() => Actions.viewerEditProfileScreen()}
      />
      <View height={40} bgDarkWhite marginTop={10} justifyContent={'flex-end'}>
        <Text bold ftGray marginLeft={15} marginBottom={5}>
          서비스 안내
        </Text>
      </View>
      {/*<ListButton text={'공지사항'} showArrow ftDarkNavy/>*/}
      {/*<ListButton text={'자주 묻는 질문'} showArrow ftDarkNavy/>*/}
      <ListButton
        onPress={onPressKakaoQuestion}
        text={'셀러비전 카카오톡에 문의하기'}
        showArrow
        ftDarkNavy
      />
    </>
  );
};

export default ViewerMyinfoBody;
