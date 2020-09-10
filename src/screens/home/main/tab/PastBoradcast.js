import React from 'react';
import {Text} from '../../../../components/styled/Text';
import {
  View,
  ViewBorderRow,
  ViewRadiusCustom,
  ViewRow,
} from '../../../../components/styled/View';
import {Image, ImageBorder} from '../../../../components/styled/Image';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Moment from 'moment';
import {dayOfTheWeek} from '../../../../utils/functions';
import {TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as broadcastActions from '../../../../store/modules/broadcast/actions';

const PastBroadcast = (props) => {
  const dispatch = useDispatch();

  const onPress = (data) => {
    const param = {
      broadcastId: data.broadcastId,
      productId: data.productId,
    };

    dispatch(broadcastActions.get_broadcast_detail_info(data.broadcastId));
    Actions.searchYoutubeFullScreen(param);
  };

  return (
    <View marginLeft={15} marginRight={15} marginTop={10}>
      <ViewBorderRow>
        <Text bold fontSize={15} paddingRight={5} marginBottom={5}>
          지난방송
        </Text>
        <Text fontSize={15} bold ftTheme>
          {props.passedBroadcasts.length !== 0
            ? props.passedBroadcasts.length
            : 0}
        </Text>
      </ViewBorderRow>
      {props.passedBroadcasts.map((item, index) => {
        return (
          <View>
            <View bgDarkWhite height={2} />
            <TouchableOpacity
              onPress={() =>
                onPress({broadcastId: item._id, productId: item.productId})
              }>
              <ViewBorderRow marginTop={20} marginBottom={20}>
                <View>
                  <View width={85} height={130}>
                    <Image
                      width={'100%'}
                      height={'100%'}
                      source={{
                        uri:
                          'https://img.youtube.com/vi/' +
                          `${item.videoId}` +
                          '/hqdefault.jpg',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 5,
                      bottom: 7,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Text ftWhite>
                      {/*유튜브 방송 시간 길이 수정 해야함 */}
                      {item.recordedDuration !== 0
                        ? Moment(item.recordedDuration).format('HH:MM')
                        : null}
                    </Text>
                  </View>
                </View>
                <View
                  width={'80%'}
                  marginLeft={10}
                  paddingLeft={10}
                  paddingRight={10}>
                  <View>
                    <Text ftDarkNavy fontSize={17} marginRight={3}>
                      {item.productName}
                    </Text>
                    <ViewRow>
                      {item.tags.map((item, index) => {
                        return (
                          <Text
                            ftNavy
                            fontSize={15}
                            marginTop={5}
                            marginRight={4}>
                            #{item}
                          </Text>
                        );
                      })}
                    </ViewRow>
                    <ViewRow marginTop={10} alignItems={'center'}>
                      <Text ftGray fontSize={13}>
                        {Moment(item.expectedStartTime).format('YYYY.MM.DD')}(
                        {dayOfTheWeek(
                          new Date(item.expectedStartTime).getDay(),
                        )}
                        )
                      </Text>
                      <Text ftGray fontSize={13} marginLeft={4}>
                        {Moment(item.expectedStartTime).format('HH:MM')}
                      </Text>
                      <Text
                        bgLightBlueGray
                        height={10}
                        width={1}
                        marginTop={5}
                        marginLeft={5}
                        marginRight={5}
                      />
                      <Text ftGray fontSize={14}>
                        리뷰 {item.prevComments.length}
                      </Text>
                    </ViewRow>
                  </View>
                </View>
              </ViewBorderRow>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};
export default PastBroadcast;
