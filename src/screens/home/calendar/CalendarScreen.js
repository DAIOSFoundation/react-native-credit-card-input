import React, {useState, useEffect, useRef} from 'react';
// Styled Component
import {
  ScrollView,
  View,
  ViewBorder,
  ViewRow,
} from '../../../components/styled/View';
import {Text} from '../../../components/styled/Text';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import BasicCalendar from '../../../components/calendar/BasicCalendar';
import {screenHeight, screenWidth} from '../../../components/styled/ScreenSize';
import * as calendarActions from '../../../store/modules/calendar/actions';
import * as Common from '../../../components/styled/Common';
import * as broadcastActions from '../../../store/modules/broadcast/actions';
import Moment from 'moment';
import {
  timePrice,
  disRate,
  broadcastStatusTitle,
} from '../../../utils/functions';
import {Actions} from 'react-native-router-flux';
import TabCalendarBroadcast from '../../../components/broadcast/TabCalendarBroadcast';
import LoadingBar from '../../../components/loadingBar/LoadingBar';
import * as productDetailActions from '../../../store/modules/productDetail/actions';
import CustomModal from '../../../components/modal/CustomModal';
import * as globalActions from '../../../store/modules/global/actions';

const CalendarScreen = () => {
  const [monthlySchedule, setMonthlySchedule] = useState(null);
  const [liveText, setLiveTest] = useState('');

  const scrollViewRef = useRef(null);

  const dispatch = useDispatch();
  const {
    jwtToken,
    monthlyAllBroadcastsMarkedDate,
    monthlyAllBroadcastsTodayBroadcast,
    date,
    calendarChangeDate,
    scheduleFirstRendering,
    period,
    priceInfo,
    month,
    day,
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
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      monthlyAllBroadcastsMarkedDate:
        state.broadcast.monthlyAllBroadcastsMarkedDate,
      monthlyAllBroadcastsTodayBroadcast:
        state.broadcast.monthlyAllBroadcastsTodayBroadcast,
      date: state.calendar.date,
      calendarChangeDate: state.calendar.calendarChangeDate,
      scheduleFirstRendering: state.broadcast.scheduleFirstRendering,
      period: state.broadcast.period,
      priceInfo: state.broadcast.priceInfo,
      month: state.calendar.month,
      day: state.calendar.day,
      loading: state.loading['broadcast/REQUEST_THIS_MONTH_ALL_BROADCAST'],

      isVisible: state.customModal.isVisible,
      isOneButton: state.customModal.isOneButton,
      isFull: state.customModal.isFull,
      message: state.customModal.message,
      onPressOK: state.customModal.onPressOK,
      size: state.customModal.size,
      elements: state.customModal.elements,
      buttonHeight: state.customModal.buttonHeight,
      scrollJustifyContent: state.customModal.scrollJustifyContent,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(globalActions.change_tab_location('Calendar'));
  }, []);

  useEffect(() => {
    setCalendar();
  }, [monthlyAllBroadcastsMarkedDate]);

  useEffect(() => {
    const params = {
      timeStamp: new Date().getTime(),
      timezoneOffset: new Date().getTimezoneOffset() / 60,
      jwtToken,
    };
    const paramTow = {
      timeStamp: new Date(calendarChangeDate).getTime(),
      timezoneOffset: new Date().getTimezoneOffset() / 60,
      jwtToken,
    };
    if (calendarChangeDate) {
      dispatch(broadcastActions.request_specific_month_all_broadcast(paramTow));
    } else if (scheduleFirstRendering) {
      dispatch(broadcastActions.request_this_month_all_broadcast(params));
    }
  }, []);

  useEffect(() => {
    if (
      monthlyAllBroadcastsTodayBroadcast &&
      monthlyAllBroadcastsTodayBroadcast.length !== 0
    ) {
      let price = [];
      monthlyAllBroadcastsTodayBroadcast.map((item, index) => {
        price.push({
          salePrice: timePrice(
            item.expectedStartTime,
            item.expectedEndTime,
            item.productInfo.sellerLivePrice,
            item.productInfo.sellerFeedPrice,
            item.status,
          ),
          discountPrice: disRate(
            item.productInfo.normalPrice,
            timePrice(
              item.expectedStartTime,
              item.expectedEndTime,
              item.productInfo.sellerLivePrice,
              item.productInfo.sellerFeedPrice,
              item.status,
            ),
          ),
          statusTitle: broadcastStatusTitle(
            item.expectedStartTime,
            item.expectedEndTime,
            item.productInfo.sellerLivePrice,
            item.productInfo.sellerFeedPrice,
            item.status,
          )
            ? '라이브 특가'
            : '',
        });
      });
      dispatch(broadcastActions.change_product_price(price));
    }
  }, [monthlyAllBroadcastsTodayBroadcast]);

  const onPressCalendarAlreadyComment = (data) => {
    let param = {
      broadcastId: data.id,
      productId: data.productId,
    };
    const body = {
      broadcastId: data.id,
      productId: data.productId,
      jwtToken: jwtToken,
    };

    if (data.status === 3 || data.status === 4) {
      dispatch(productDetailActions.request_product_detail(param));
      Actions.calendarProductDetailScreen([data.id, data.productId]);
      dispatch(broadcastActions.request_broadcast_product(body));
    } else {
      dispatch(productDetailActions.request_product_detail(param));
      Actions.calendarProductDetailScreen([data.id, data.productId]);
      dispatch(broadcastActions.request_broadcast_product(body));
    }
  };

  const setCalendar = () => {
    if (
      monthlyAllBroadcastsMarkedDate &&
      monthlyAllBroadcastsMarkedDate.length !== 0
    ) {
      setMonthlySchedule(
        monthlyAllBroadcastsMarkedDate.reduce(
          (acc, it) => ({
            ...acc,
            [Moment(it.expectedStartTime).format('YYYY-MM-DD')]: {},
          }),
          {},
        ),
      );
    }
  };

  const onPressDate = (date) => {
    const splitDate = date.dateString.split('-');
    const timeStamp = new Date(
      splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2],
    ).getTime();
    const params = {
      jwtToken,
      timeStamp,
      timezoneOffset: new Date().getTimezoneOffset() / 60,
    };
    dispatch(broadcastActions.request_specific_day_all_broadcast(params));
    dispatch(calendarActions.change_date({date}));
    const todayTimeStamp = Moment(new Date()).format('YYYY-MM-DD');
    const selectedDateTimeStamp = Moment(date.dateString).format('YYYY-MM-DD');
    const calculateDate =
      new Date(todayTimeStamp).getTime() -
      new Date(selectedDateTimeStamp).getTime();
    if (calculateDate > 0) {
      dispatch(broadcastActions.change_period('past'));
    } else if (calculateDate < 0) {
      dispatch(broadcastActions.change_period('future'));
    } else {
      dispatch(broadcastActions.change_period('today'));
    }
  };

  const onPressTimeStamp = (date) => {
    const splitDate = date.dateString.split('-');
    const timeStamp = new Date(splitDate[0] + '-' + splitDate[1]).getTime();
    const params = {
      jwtToken,
      timeStamp,
    };
    dispatch(calendarActions.change_calendar_date({date}));
    dispatch(broadcastActions.request_specific_month_all_broadcast(params));
  };

  return (
    <ScrollView bgDarkNavy height={screenHeight}>
      <ViewRow alignItems={'center'} marginTop={30} marginLeft={15}>
        <Text ftWhite fontSize={20}>
          라이브 방송 일정보기
        </Text>
      </ViewRow>
      <ViewRow
        alignItems={'center'}
        marginTop={10}
        marginBottom={25}
        marginLeft={15}>
        <Text ftWhite fontSize={13}>
          확정된 전체 라이브 방송 일정을 확인 할 수 있습니다.
        </Text>
      </ViewRow>
      <ViewBorder brDarkGrayBlue borderBottomWith={1} />
      {loading ? (
        <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}} />
        </View>
      ) : (
        <>
          <BasicCalendar
            currentCalendar={calendarChangeDate}
            onPressTimeStamp={onPressTimeStamp}
            backgroundColor={Common.colors.DARK_NAVY}
            monthTextColor={Common.colors.WHITE}
            dayTextColor={Common.colors.WHITE}
            dateTextColor={Common.colors.WHITE}
            arrowColor={Common.colors.NAVY}
            todayCircleColor={Common.colors.THEME}
            todayTextColor={Common.colors.WHITE}
            onPress={onPressDate}
            markDate={monthlySchedule}
          />
          <ViewBorder brDarkGrayBlue borderTopWidth={5} borderBottomWith={5} />
          <ViewRow
            bgDarkNavy
            marginTop={15}
            marginLeft={15}
            marginBottom={3}
            marginRight={15}
            justifyContent={'space-between'}>
            <Text ftWhite bold fontSize={15}>
              {month}월 {day}일
            </Text>
            <Text ftTheme>
              {monthlyAllBroadcastsTodayBroadcast.length}건의 방송
            </Text>
          </ViewRow>
          <View
            marginTop={10}
            marginLeft={15}
            marginRight={15}
            bgDarkGrayBlue
            height={0.5}
          />
          {priceInfo && monthlyAllBroadcastsTodayBroadcast.length !== 0 ? (
            monthlyAllBroadcastsTodayBroadcast.map((item, index) => {
              return (
                <TabCalendarBroadcast
                  id={item._id}
                  productId={item.productId}
                  status={item.status}
                  productImageUrl={item.productImageUrl}
                  productName={item.productName}
                  date={Moment(item.expectedStartTime).format('M.DD')}
                  day={new Date(item.expectedStartTime).getDay()}
                  sellerNickName={item.nickName.nickName}
                  expectedBroadcastStartTime={Moment(
                    item.expectedStartTime,
                  ).format('HH:mm')}
                  expectedBroadcastEndTime={Moment(
                    new Date(
                      new Date(item.expectedStartTime).getTime() +
                        1000 * 60 * item.expectedPeriod,
                    ),
                  ).format('HH:mm')}
                  prevCommentCount={234}
                  onPressPrevComment={(onPressPrevComment) =>
                    onPressPrevComment()
                  }
                  priceInfo={priceInfo ? priceInfo[index] : null}
                  liveText={liveText}
                  onPressCalendarAlreadyComment={(data) =>
                    onPressCalendarAlreadyComment(data)
                  }
                />
              );
            })
          ) : (
            <View alignItems={'center'} marginTop={40} marginBottom={40}>
              <Text ftWhite>예정된 라이브 방송이 없습니다</Text>
            </View>
          )}
        </>
      )}
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
        currentScene={'Calendar'}
      />
    </ScrollView>
  );
};

export default CalendarScreen;
