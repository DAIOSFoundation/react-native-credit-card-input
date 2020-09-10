import React, {useEffect, useState} from 'react';
import {Clipboard} from 'react-native';
// Styled Component
import BackgroundOpacityModal from '../../../../../../components/modal/BackgroundOpacityModal';
import {
  ScrollView,
  View,
  ViewBorder,
  ViewRow,
} from '../../../../../../components/styled/View';
import {Text} from '../../../../../../components/styled/Text';
import Topbar from '../../../../../../components/bar/Topbar';
import {screenHeight} from '../../../../../../components/styled/ScreenSize';
import BasicCalendar from '../../../../../../components/calendar/BasicCalendar';
import * as Common from '../../../../../../components/styled/Common';
import Broadcast from '../../../../../../components/broadcast/Broadcast';
import {ButtonBorderRadius} from '../../../../../../components/styled/Button';
import LoadingBar from '../../../../../../components/loadingBar/LoadingBar';
import ToastMessage from '../../../../../../components/toast/ToastMessage';
// Redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as broadcastActions from '../../../../../../store/modules/broadcast/actions';
import * as calendarActions from '../../../../../../store/modules/calendar/actions';
import * as globalActions from '../../../../../../store/modules/global/actions';
// NPM Module
import {Actions} from 'react-native-router-flux';
import Moment from 'moment';

const LiveScheduleDetailScreen = () => {
  const dispatch = useDispatch();

  const [monthlySchedule, setMonthlySchedule] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const modalInnerButton = {data: {step: 3, title: ['구매 url 복사']}};
  const [broadcastId, setBroadcastId] = useState('');
  const [productId, setProductId] = useState('');

  const onPressClose = () => {
    Actions.pop();
  };
  const {
    jwtToken,
    monthlyBroadcastsMarkedData,
    monthlyBroadcastsTodayBroadcast,
    scheduleRendering,
    month,
    day,
    loading,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      monthlyBroadcastsMarkedData: state.broadcast.monthlyBroadcastsMarkedData,
      monthlyBroadcastsTodayBroadcast:
        state.broadcast.monthlyBroadcastsTodayBroadcast,
      scheduleRendering: state.broadcast.scheduleRendering,
      month: state.calendar.sellerMonth,
      day: state.calendar.sellerDay,
      loading: state.loading['broadcast/REQUEST_THIS_MONTH_BROADCAST'],
    }),
    shallowEqual,
  );

  useEffect(() => {
    setCalendar();
  }, [monthlyBroadcastsMarkedData]);

  useEffect(() => {
    onPressToday();
  }, []);

  const setCalendar = () => {
    if (monthlyBroadcastsMarkedData.length !== 0) {
      setMonthlySchedule(
        monthlyBroadcastsMarkedData.reduce(
          (acc, it) => ({
            ...acc,
            [Moment(it.expectedStartTime).format('YYYY-MM-DD')]: {},
          }),
          {},
        ),
      );
    }
  };

  const onPressTimeStamp = (date) => {
    const splitDate = date.dateString.split('-');
    const changeTimeStamp = new Date(
      splitDate[0] + '-' + splitDate[1] + '-01',
    ).getTime();
    const paramsForSpecific = {
      jwtToken,
      changeTimeStamp,
    };
    dispatch(
      broadcastActions.request_specific_month_broadcast(paramsForSpecific),
    );
  };

  const onPressToday = () => {
    const today = new Date();
    const setDate =
      today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2);
    const splitDate = setDate.split('-');
    const makeTodayDate = Moment(today).format('YYYY-MM-DD');
    const changeTimeStamp = new Date(
      splitDate[0] + '-' + splitDate[1] + '-01',
    ).getTime();
    const date = {
      dateString: makeTodayDate,
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    onPressDate(date);
    const params = {
      changeTimeStamp,
      jwtToken,
      timezoneOffset: new Date().getTimezoneOffset() / 60,
    };
    dispatch(calendarActions.change_date({date}));
    dispatch(broadcastActions.request_this_month_broadcast(params));
  };

  const onPressDate = (date) => {
    const splitDate = date.dateString.split('-');
    const timeStamp = new Date(
      splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2],
    ).getTime();
    const params = {
      timeStamp,
      jwtToken,
      timezoneOffset: new Date().getTimezoneOffset() / 60,
    };
    dispatch(broadcastActions.request_specific_day_broadcast(params));
    dispatch(calendarActions.change_seller_page_date({date}));
  };

  const onPressPrevComment = (id) => {
    Actions.myPageAlreadyCommentScreen(id);
  };

  const onPressBroadcastSetting = (broadcastId, productId) => {
    bottomOpen();
    setBroadcastId(broadcastId);
    setProductId(productId);
  };

  const bottomClosed = () => {
    setIsVisible(false);
  };

  const bottomOpen = () => {
    setIsVisible(true);
  };

  const onPressModalBtn = () => {
    setIsVisible(false);

    Clipboard.setString(
      `https://dev-api.sellervision.net/v1/broadcasts/${broadcastId}/products/${productId}/link`,
    );
    dispatch(globalActions.change_toast_message('구매 url이 복사되었습니다'));
  };

  // // todo - 구매 url 통신 후 추가 해야함
  // const copyToClipboard = () => {
  //   Clipboard.setString('testClip');
  //   dispatch(globalActions.change_toast_message('구매 url이 복사되었습니다'));
  // };

  console.log(
    'monthlyBroadcastsTodayBroadcast',
    monthlyBroadcastsTodayBroadcast,
  );

  return (
    <View height={'100%'}>
      <Topbar
        onPressLeft={onPressClose}
        isLeftButton={true}
        bgColor={{bgWhite: true}}
        title={'라방 일정'}
        isLine={true}
      />
      {loading ? (
        <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
        </View>
      ) : (
        <ScrollView bgDarkWhite height={screenHeight}>
          <BasicCalendar
            onPressTimeStamp={onPressTimeStamp}
            backgroundColor={Common.colors.WHITE}
            monthTextColor={Common.colors.DARK_NAVY}
            dayTextColor={Common.colors.DARK_NAVY}
            dateTextColor={Common.colors.DARK_NAVY}
            arrowColor={Common.colors.NAVY}
            todayCircleColor={Common.colors.THEME}
            todayTextColor={Common.colors.WHITE}
            markDate={monthlySchedule ? monthlySchedule : {}}
            onPress={onPressDate}
          />
          <View bgWhite>
            <ViewRow
              bgWhite
              marginTop={15}
              marginLeft={15}
              marginBottom={6}
              marginRight={15}
              justifyContent={'space-between'}>
              <Text ftDarkNavy bold fontSize={15}>
                {month}월 {day}일
              </Text>
              {monthlyBroadcastsTodayBroadcast &&
              monthlyBroadcastsTodayBroadcast.length !== 0 ? (
                <Text ftTheme>
                  {monthlyBroadcastsTodayBroadcast.length}건의 방송
                </Text>
              ) : (
                <Text ftTheme>0건의 방송</Text>
              )}
            </ViewRow>
            <ViewBorder
              marginRight={15}
              marginLeft={15}
              brIceBlue
              borderBottomWith={1}
            />
          </View>
          {monthlyBroadcastsTodayBroadcast &&
          monthlyBroadcastsTodayBroadcast.length !== 0 ? (
            monthlyBroadcastsTodayBroadcast.map((item, index) => (
              <Broadcast
                id={item._id}
                productImageUrl={item.productImageUrl}
                date={Moment(item.expectedStartTime).format('M.DD')}
                day={new Date(item.expectedStartTime).getDay()}
                expectedBroadcastStartTime={Moment(
                  item.expectedStartTime,
                ).format('hh:mm')}
                expectedBroadcastEndTime={Moment(
                  new Date(
                    new Date(item.expectedStartTime).getTime() +
                      1000 * 60 * item.expectedPeriod,
                  ),
                ).format('hh:mm')}
                prevCommentCount={item.prevComments.length}
                onPressPrevComment={(id) => onPressPrevComment(id)}
                productName={item.productName}
                onPressBroadcastSetting={() =>
                  onPressBroadcastSetting(item._id, item.productId)
                }
              />
            ))
          ) : (
            <View
              alignItems={'center'}
              bgWhite
              paddingTop={40}
              paddingBottom={40}>
              <Text ftGray>예정된 라이브 방송이 없습니다.</Text>
            </View>
          )}
          {monthlyBroadcastsTodayBroadcast &&
          monthlyBroadcastsTodayBroadcast.length !== 0 ? (
            <View height={65} marginTop={25}>
              <ButtonBorderRadius
                borderRadius={20}
                width={120}
                alignSelf={'center'}
                bgTheme
                onPress={onPressToday}>
                <Text ftWhite>오늘 날짜 보기</Text>
              </ButtonBorderRadius>
            </View>
          ) : (
            <></>
          )}
        </ScrollView>
      )}
      <BackgroundOpacityModal
        isVisible={isVisible}
        bottomClosed={bottomClosed}
        modalInnerButton={modalInnerButton}
        onPressModalBtn={() => onPressModalBtn()}
      />
      <ToastMessage />
    </View>
  );
};
export default LiveScheduleDetailScreen;
