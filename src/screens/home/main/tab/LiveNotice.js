import React, {useEffect} from 'react';
import {
  ScrollView,
  View,
  ViewBorder,
  ViewBorderRow,
  ViewRow,
  ViewRowBorderRadius,
} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import {Image, ImageBorder} from '../../../../components/styled/Image';
import {ButtonBorderRadius} from '../../../../components/styled/Button';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Moment from 'moment';
import {dayToText} from '../../../../utils/functions';
import * as broadcastActions from '../../../../store/modules/broadcast/actions';
import {Actions} from 'react-native-router-flux';
import {TouchableOpacity} from 'react-native';
import * as productDetailActions from '../../../../store/modules/productDetail/actions';
import SelectProfile from '../../../../components/profiles/SelectProfile';
import SellerProfile from '../../../../components/profiles/SellerProfile';

const LiveNotice = (props) => {
  const comment = require('../../../../assets/common/icon_comment_1616.png');
  const clock = require('../../../../assets/myinfo/icon_clock_small_pink.png');

  const dispatch = useDispatch();
  const {LiveNotice, jwtToken, tabLocation} = useSelector(
    (state) => ({
      LiveNotice: state.broadcast.LiveNotice,
      jwtToken: state.user.jwtToken,
      tabLocation: state.global.tabLocation,
    }),
    shallowEqual,
  );

  // 알람 받기 버튼 이벤트
  const onPressAlarmButton = (data, index) => {
    // 알람 받기 시
    let param = {
      jwtToken: jwtToken,
      assignedType: 'broadcast',
      assignedId: data,
    };
    let paramTwo = {
      index,
      state: true,
    };
    dispatch(broadcastActions.update_seller_page_alarm_state(paramTwo));
    dispatch(broadcastActions.request_broadcast_preview_alarm(param));
  };

  //알림 해제 버튼
  const onPressDeleteAlarm = (data, index) => {
    let param = {
      jwtToken: jwtToken,
      broadcastId: data,
    };
    let paramTwo = {
      index,
      state: false,
    };
    dispatch(broadcastActions.update_seller_page_alarm_state(paramTwo));
    dispatch(broadcastActions.delete_broadcast_preview_alarm(param));
  };

  const onPressPrevComment = (id) => {
    if (tabLocation === 'Main') {
      Actions.alreadyCommentScreen(id);
    } else if (tabLocation === 'Search') {
      Actions.searchAlreadyCommentScreen(id);
    }
  };
  const onPress = (data) => {
    const param = {
      broadcastId: data.broadcastId,
      productId: data.productId,
    };
    dispatch(productDetailActions.request_product_detail(param));
    Actions.searchProductDetailScreen([
      data.broadcastId,
      data.productId,
      'main',
    ]);
  };
  return (
    <View marginLeft={15} marginRight={15} marginTop={10}>
      <ViewBorderRow>
        <Text bold fontSize={15} paddingRight={5} marginBottom={5}>
          라이브 예고
        </Text>
        <Text fontSize={15} bold ftTheme>
          {LiveNotice.length}
        </Text>
      </ViewBorderRow>
      {LiveNotice && props.sellerPageAlarm ? (
        LiveNotice.map((item, index) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() =>
                  onPress({broadcastId: item._id, productId: item.productId})
                }>
                <View bgDarkWhite height={2} />
                <ViewBorderRow marginTop={12}>
                  <ImageBorder
                    height={70}
                    width={70}
                    source={{uri: item.productImageUrl}}
                  />
                  <View width={'80%'} marginLeft={10}>
                    <ViewRowBorderRadius alignItems={'center'}>
                      <Image
                        width={17}
                        height={17}
                        marginRight={5}
                        source={clock}
                      />
                      <ViewRowBorderRadius>
                        <Text fontSize={14} ftTheme bold>
                          {Moment(item.expectedStartTime).format('M.DD')}
                        </Text>
                        <Text fontSize={14} ftTheme bold>
                          (
                          {dayToText(
                            new Date(item.expectedStartTime).getDay(),
                          ).slice(0, 1)}
                          )
                        </Text>
                        <Text fontSize={14} ftTheme bold marginLeft={4}>
                          {Moment(item.expectedStartTime).format('HH:mm')}
                        </Text>
                        <Text fontSize={14} ftTheme bold marginLeft={4}>
                          ~
                        </Text>
                        <Text fontSize={14} ftTheme bold marginLeft={4}>
                          {Moment(item.expectedEndTime).format('HH:mm')}
                        </Text>
                        <Text fontSize={14} ftTheme bold marginLeft={4}>
                          방송
                        </Text>
                      </ViewRowBorderRadius>
                    </ViewRowBorderRadius>
                    <ViewRow
                      marginTop={5}
                      marginBottom={5}
                      alignItems={'center'}>
                      <Text ftDarkNavy fontSize={16} marginRight={3}>
                        {item.productName}
                      </Text>
                    </ViewRow>
                  </View>
                </ViewBorderRow>
              </TouchableOpacity>
              <ViewBorderRow
                justifyContent={'space-between'}
                marginTop={10}
                marginBottom={10}>
                {props.sellerPageAlarm[index] ? (
                  <ButtonBorderRadius
                    width={'47%'}
                    height={35}
                    bgTheme
                    onPress={() => onPressDeleteAlarm(item._id, index)}>
                    <Image
                      width={17}
                      height={17}
                      source={require('../../../../assets/common/icon_alarm_1616_pressed.png')}
                    />
                    <Text fontSize={14} paddingLeft={3} ftWhite>
                      알림 해제
                    </Text>
                  </ButtonBorderRadius>
                ) : (
                  <ButtonBorderRadius
                    brTheme
                    width={'47%'}
                    height={35}
                    onPress={() => onPressAlarmButton(item._id, index)}>
                    <Image
                      width={17}
                      height={17}
                      source={require('../../../../assets/common/icon_alarm_1616_normal.png')}
                    />
                    <Text fontSize={14} paddingLeft={3} ftTheme>
                      알림 등록
                    </Text>
                  </ButtonBorderRadius>
                )}
                <ButtonBorderRadius
                  brNavy
                  width={'47%'}
                  height={35}
                  justifyContent={'center'}
                  alignItems={'center'}
                  onPress={() => onPressPrevComment(item._id)}>
                  <Image width={17} height={17} source={comment} />
                  <Text fontSize={14} paddingLeft={3} ftNavy>
                    미리댓글
                  </Text>
                </ButtonBorderRadius>
              </ViewBorderRow>
            </View>
          );
        })
      ) : (
        <></>
      )}
    </View>
  );
};
export default LiveNotice;
