import React, {useEffect} from 'react';
// Styled Component
import {ScrollView, View, ViewRow} from '../../../../../components/styled/View';
import LivePreview from '../../../../../components/live/LivePreview';
import {Text} from '../../../../../components/styled/Text';
import {ButtonBorderRadius} from '../../../../../components/styled/Button';
import {Image} from '../../../../../components/styled/Image';
// NPM Module
import Moment from 'moment';
import 'moment/locale/ko';
import LinearGradient from 'react-native-linear-gradient';
// utils Import
import {dayOfTheWeek} from '../../../../../utils/functions';
// assets Image
const cryFaceIcon = require('../../../../../assets/signup/cry_face.png');
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as broadcastActions from '../../../../../store/modules/broadcast/actions';
import * as globalActions from '../../../../../store/modules/global/actions';
import {Actions} from 'react-native-router-flux';
import {TouchableOpacity} from 'react-native';
import * as recommendActions from '../../../../../store/modules/recommend/actions';
import * as productDetailActions from '../../../../../store/modules/productDetail/actions';

// 해당 요일에 보여지는 라이브 예고 정보
const LivePreviewDay = (props) => {
  //redux
  const dispatch = useDispatch();

  const {jwtToken, alarmMessage, alarmState} = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      alarmMessage: state.broadcast.alarmMessage,
      alarmState: state.broadcast.alarmState,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (alarmMessage === 'S200') {
      dispatch(globalActions.change_toast_message('알람을 설정하였습니다.'));
      dispatch(broadcastActions.change_alarm_message_init());
    } else if (alarmMessage === 'S201') {
      dispatch(globalActions.change_toast_message('알람을 취소하였습니다.'));
      dispatch(broadcastActions.change_alarm_message_init());
    }
  }, [alarmMessage]);

  // 해당 요일에 라이브 예고 일정 없을 시
  const LivePreviewDayNotFound = () => {
    return (
      <View alignItems={'center'} bgDarkNavy height={'100%'}>
        <Text ftWhite fontSize={20} bold marginTop={100}>
          죄송합니다.
        </Text>
        <Text ftWhite marginTop={15} fontSize={16}>
          라이브 예정 방송이 없습니다.
        </Text>
        <Image marginTop={50} source={cryFaceIcon} width={180} height={180} />
      </View>
    );
  };

  // 알림 취소 버튼 이벤트
  const onPressDeleteAlarm = (data) => {
    console.log('알람해제', data[0], data[1]);
    let param = {
      jwtToken: jwtToken,
      broadcastId: data[0],
    };
    dispatch(broadcastActions.update_broadcast_preview_alarm_state(data[1]));
    dispatch(broadcastActions.delete_broadcast_preview_alarm(param));
  };

  // 알람 받기 버튼 이벤트
  const onPressRequestAlarm = (data) => {
    // 알람 받기 시
    let param = {
      jwtToken: jwtToken,
      assignedType: 'broadcast',
      assignedId: data[0],
    };
    console.log('알람받기', data[0], data[1]);
    dispatch(broadcastActions.update_broadcast_preview_alarm_state(data[1]));
    dispatch(broadcastActions.request_broadcast_preview_alarm(param));
  };

  // 미리댓글 페이지 이동
  const onPressAlreadyComment = (id) => {
    Actions.alreadyCommentScreen(id);
  };

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

  return (
    <View>
      {props.data &&
      props.data[props.day] &&
      alarmState[props.day] &&
      props.data[props.day].length !== 0 ? (
        <ScrollView marginBottom={57}>
          {props.data[props.day].map((item, index) => (
            <View key={index}>
              <LivePreview
                id={item._id}
                imagePath={item.productInfo.productImages[0].path}
                sellerNickName={item.userInfo.nickName}
                alarmStatus={alarmState[props.day][index]}
                profilePath={item.userInfo.profileImageUrl}
                status={false}
                detail
                time={Moment(item.expectedStartTime).format('A hh:mm')}
                day={dayOfTheWeek(Moment(item.expectedStartTime).day())}
                date={Moment(item.expectedStartTime).format('M월 D일')}
                height={{height: 250}}
                onPressDeleteAlarm={onPressDeleteAlarm}
                onPressRequestAlarm={onPressRequestAlarm}
                onPress={() =>
                  onPressDetail({
                    broadcastId: item._id,
                    productId: item.productId,
                  })
                }
              />
              <ViewRow
                bgDarkNavy
                alignItems={'center'}
                paddingTop={15}
                paddingBottom={15}
                paddingLeft={15}
                paddingRight={15}>
                <View width={'75%'}>
                  <Text ftWhite>{item.productInfo.productName}</Text>
                </View>
                <View width={'25%'}>
                  <ButtonBorderRadius
                    bgTheme
                    borderRadius={100}
                    onPress={() => onPressAlreadyComment(item._id)}>
                    <Text ftWhite bold>
                      미리댓글
                    </Text>
                  </ButtonBorderRadius>
                </View>
              </ViewRow>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FF8469', '#e6427a']}>
                <View height={10} width={'100%'} />
              </LinearGradient>
            </View>
          ))}
        </ScrollView>
      ) : (
        <LivePreviewDayNotFound />
      )}
    </View>
  );
};

export default LivePreviewDay;
