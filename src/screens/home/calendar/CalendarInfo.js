import React, {useState, useEffect} from 'react';
// Styled Component
import {View, ViewBorder, ViewRow} from '../../../components/styled/View';
import {Text} from '../../../components/styled/Text';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import BasicCalendar from '../../../components/calendar/BasicCalendar';
import {screenHeight, screenWidth} from '../../../components/styled/ScreenSize';
import Broadcast from '../../../components/broadcast/Broadcast';
import Moment from 'moment';
import LoadingBar from '../../../components/loadingBar/LoadingBar';

const CalendarInfo = (props) => {
  const dispatch = useDispatch();
  const {
    userInfo,
    jwtToken,
    userId,
    platform,
    month,
    day,
    numOfBroadcast,
    loading,
  } = useSelector(
    (state) => ({
      userInfo: state.user.userInfo,
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      platform: state.user.platform,
      month: state.calendar.month,
      day: state.calendar.day,
      numOfBroadcast: state.calendar.numOfBroadcast,
      loading: state.loading['broadcast/REQUEST_THIS_MONTH_ALL_BROADCAST'],
    }),
    shallowEqual,
  );

  return (
    <View>
      {loading ? (
        <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
        </View>
      ) : props.monthlyAllBroadcastsTodayBroadcast &&
        props.monthlyAllBroadcastsTodayBroadcast.length !== 0 ? (
        <View>
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
              {props.monthlyAllBroadcastsTodayBroadcast.length}건의 방송
            </Text>
          </ViewRow>
          {props.monthlyAllBroadcastsTodayBroadcast.map((item, index) => {
            return (
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
                prevCommentCount={234}
                onPressPrevComment={(onPressPrevComment) =>
                  onPressPrevComment()
                }
                productName={item.productName}
              />
            );
          })}
        </View>
      ) : (
        <View>
          <ViewBorder
            marginRight={15}
            marginLeft={15}
            brDarkGrayBlue
            borderBottomWith={1}
          />
          <View marginTop={50} alignItems={'center'}>
            <Text ftLightGray>예정된 라이브 방송이 없습니다</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CalendarInfo;
