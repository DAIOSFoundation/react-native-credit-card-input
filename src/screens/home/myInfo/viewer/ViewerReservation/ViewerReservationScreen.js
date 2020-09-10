import React, {useState, useEffect} from 'react';
// Styled Component
import {ScrollView, View} from '../../../../../components/styled/View';
import LivePreview from '../../../../../components/live/LivePreview';
import Topbar from '../../../../../components/bar/Topbar';
import LoadingBar from '../../../../../components/loadingBar/LoadingBar';
// utils Import
import {dayOfTheWeek} from '../../../../../utils/functions';
// NPM Module
import Moment from 'moment';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
// redux
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as broadcastActions from '../../../../../store/modules/broadcast/actions';
import * as userActions from '../../../../../store/modules/user/actions';

// 뷰어 마이페이지 - 예약방송 리스트
const ViewerReservationScreen = () => {
  // rudux
  const dispatch = useDispatch();

  const {
    reservationBroadcasts,
    loading,
    jwtToken,
    userId,
    alarmMessage,
  } = useSelector(
    (state) => ({
      reservationBroadcasts: state.user.reservationBroadcasts,
      userId: state.user.userId,
      loading: state.loading['user/REQUEST_RESERVATION_BROADCASTS'],
      jwtToken: state.user.jwtToken,
      alarmMessage: state.broadcast.alarmMessage,
    }),
    shallowEqual,
  );

  const [timeSort, setTimeSort] = useState([]);

  useEffect(() => {
    let param = {
      userId: userId,
      jwtToken: jwtToken,
    };

    dispatch(userActions.request_reservation_broadcasts(param));
  }, []);

  useEffect(() => {
    if (reservationBroadcasts) {
      const result = [...reservationBroadcasts];

      result.sort((a, b) => {
        console.log('a,b', a, b);
        return a.broadcastInfo.expectedStartTime <
          b.broadcastInfo.expectedStartTime
          ? -1
          : a.broadcastInfo.expectedStartTime >
            b.broadcastInfo.expectedStartTime
          ? 1
          : 0;
      });

      setTimeSort(result);
    }
  }, [reservationBroadcasts]);

  useEffect(() => {
    if (alarmMessage === 'S201') {
      let param = {
        userId: userId,
        jwtToken: jwtToken,
      };
      dispatch(userActions.request_reservation_broadcasts(param));

      dispatch(broadcastActions.change_alarm_message_init());
    }
  }, [alarmMessage]);

  // 뒤로가기 버튼
  const onPressBack = () => {
    Actions.pop();
  };

  // 알람 취소 버튼 이벤트
  const onPressUserDeleteAlarm = (id) => {
    console.log('유저 예약방송 알람해제', id);

    let param = {
      jwtToken: jwtToken,
      broadcastId: id,
    };

    dispatch(broadcastActions.delete_broadcast_preview_alarm(param));
  };

  if (loading) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}} />
      </View>
    );
  }

  console.log('test', timeSort);
  return (
    <View height={'100%'}>
      <Topbar
        onPressLeft={onPressBack}
        isLeftButton={true}
        title={'예약 방송 리스트'}
        isLine={true}
      />
      <ScrollView>
        {reservationBroadcasts
          ? timeSort.map((item, index) => (
              <View key={index}>
                <LivePreview
                  id={item.assignedId}
                  imagePath={item.broadcastInfo.productImageUrl}
                  sellerNickName={item.sellerInfo.nickName}
                  profilePath={item.sellerInfo.profileImageUrl}
                  status={false}
                  user
                  detail
                  time={Moment(item.broadcastInfo.expectedStartTime).format(
                    'A hh:mm',
                  )}
                  day={dayOfTheWeek(
                    Moment(item.broadcastInfo.expectedStartTime).day(),
                  )}
                  date={Moment(item.broadcastInfo.expectedStartTime).format(
                    'M월 D일',
                  )}
                  height={{height: 250}}
                  onPressUserDeleteAlarm={onPressUserDeleteAlarm}
                />
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#FF8469', '#e6427a']}>
                  <View height={10} width={'100%'} />
                </LinearGradient>
              </View>
            ))
          : null}
      </ScrollView>
    </View>
  );
};

export default ViewerReservationScreen;
