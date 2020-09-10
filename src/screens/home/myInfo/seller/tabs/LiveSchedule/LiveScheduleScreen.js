/*
 * Copyright (c) 2020.3
 * Written by kj <ace@daiblab.com>
 *
 * This file is part of SellerVision-RN
 * Desc -
 */

import React, {useEffect, useRef, useState, useMemo} from 'react';
// Styled Component
import Modal from 'react-native-modal';
import {TouchableWithoutFeedback} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  View,
  ViewAbsoluteRadius,
  ViewBorder,
  ViewBorderRadius,
  ViewBorderRow,
  ViewRadiusCustom,
  ViewRow,
  ViewRowBorderRadius,
  ViewRowRadiusCustom,
} from '../../../../../../components/styled/View';
import Topbar from '../../../../../../components/bar/Topbar';
import {Text} from '../../../../../../components/styled/Text';
import {Image} from '../../../../../../components/styled/Image';
import {Button, ButtonRadius} from '../../../../../../components/styled/Button';
import OneWeekCalendar from '../../../../../../components/calendar/oneWeekCalendar';
import {dayToText, LocaleString} from '../../../../../../utils/functions';
import Broadcast from '../../../../../../components/broadcast/Broadcast';
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import BottomModal from '../../../../../../components/modal/BottomModal';
import {Actions} from 'react-native-router-flux';
import * as broadcastActions from '../../../../../../store/modules/broadcast/actions';
import Moment from 'moment';
import PutProduct from '../../../../../../components/products/PutProduct';
// assets Img
const iconCalendar = require('../../../../../../assets/myinfo/icon_calendar_detail.png');
const modalCancel = require('../../../../../../assets/common/icon_cancel_black.png');

// 추천 상품 화면
const LiveScheduleScreen = (props) => {
  // redux
  const dispatch = useDispatch();
  const [calendarDate, setCalendarDate] = useState([]);
  const [snapPoints, setSnapPoints] = useState([0]);
  const [isVisible, setIsVisible] = useState(false);
  const {
    year,
    month,
    day,
    date,
    userId,
    jwtToken,
    sellerTabWeekBroadcastsMarkedData,
    sellerTabTodayBroadcasts,
    sellerTabAppointedBroadcasts,
    changeCalendar,
  } = useSelector(
    (state) => ({
      year: state.liveCalendar.year,
      month: state.liveCalendar.month,
      day: state.liveCalendar.day,
      date: state.liveCalendar.date,
      userId: state.user.userId,
      jwtToken: state.user.jwtToken,
      sellerTabWeekBroadcastsMarkedData:
        state.broadcast.sellerTabWeekBroadcastsMarkedData,
      sellerTabTodayBroadcasts: state.broadcast.sellerTabTodayBroadcasts,
      sellerTabAppointedBroadcasts:
        state.broadcast.sellerTabAppointedBroadcasts,
      changeCalendar: state.broadcast.changeCalendar,
    }),
    shallowEqual,
  );

  useEffect(() => {
    const params = {
      date: new Date().getTime(),
      jwtToken,
    };
    dispatch(broadcastActions.request_seller_this_week_broadcast(params));
  }, []);

  useEffect(() => {
    sellerTabWeekBroadcastsMarkedData.map((item) => {
      let day = new Date(item.expectedStartTime).getDate();
      let newDate = {day: day, broadcastActions: true};
      setCalendarDate((calendarDate) => [...calendarDate, newDate]);
    });
  }, [sellerTabWeekBroadcastsMarkedData]);

  const onPressPrevComment = (id) => {
    Actions.myPageAlreadyCommentScreen(id);
  };

  const onPressBroadcastSetting = (item) => {
    props.bottomOpen({data: {title: ['구매 URL 복사'], step: 4}}, item);
  };

  const onPressSellerMyPageCalendar = () => {
    Actions.liveScheduleDetailScreen();
  };

  return (
    <>
      <ViewRow
        marginTop={15}
        marginLeft={15}
        marginBottom={3}
        marginRight={15}
        justifyContent={'space-between'}>
        <Text ftFunNavy bold fontSize={18}>
          {year}년 {month}월
        </Text>
        <Button width={32} height={32} onPress={onPressSellerMyPageCalendar}>
          <Image source={iconCalendar} />
        </Button>
      </ViewRow>
      <ViewBorder
        marginRight={15}
        marginLeft={15}
        brDarkWhite
        borderBottomWith={1}
      />
      <OneWeekCalendar
        data={calendarDate}
        year={year}
        month={month}
        day={day}
        date={date}
      />
      <View height={4} bgDarkWhite marginTop={10} marginBottom={10} />
      <ScrollView>
        <View>
          <ViewRow
            marginTop={15}
            marginLeft={15}
            marginBottom={3}
            marginRight={15}
            alignItems={'center'}>
            <Text ftFunNavy bold fontSize={16}>
              오늘의 방송
            </Text>
            <Text paddingLeft={5} fontSize={15} ftTheme bold>
              {sellerTabTodayBroadcasts.length}
            </Text>
          </ViewRow>
        </View>
        {sellerTabTodayBroadcasts.map((item, index) => {
          return (
            // 예정된 방송 있으면 보여줌
            <View>
              <ViewBorder
                marginRight={15}
                marginLeft={15}
                brDarkWhite
                borderBottomWith={1}
              />
              <Broadcast
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
                onPressPrevComment={() => onPressPrevComment(item._id)}
                onPressBroadcastSetting={() => onPressBroadcastSetting(item)}
                productName={item.productName}
              />
            </View>
          );
        })}
        <View>
          <View height={4} bgDarkWhite marginTop={10} marginBottom={10} />
          <ViewRow
            marginTop={15}
            marginLeft={15}
            marginBottom={3}
            marginRight={15}
            alignItems={'center'}>
            <Text ftFunNavy bold fontSize={16}>
              예정된 방송
            </Text>
            <Text paddingLeft={5} fontSize={15} ftTheme bold>
              {sellerTabAppointedBroadcasts.length}
            </Text>
          </ViewRow>
        </View>
        {sellerTabAppointedBroadcasts.map((item, index) => {
          return (
            // 예정된 방송 있으면 보여줌
            <View>
              <ViewBorder
                marginRight={15}
                marginLeft={15}
                brDarkWhite
                borderBottomWith={1}
              />
              <Broadcast
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
                onPressPrevComment={() => onPressPrevComment(item._id)}
                onPressBroadcastSetting={() => onPressBroadcastSetting(item)}
                productName={item.productName}
              />
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

export default LiveScheduleScreen;
