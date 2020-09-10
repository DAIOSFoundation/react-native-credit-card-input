import React from 'react';
import {
  View,
  ViewBorderRadius,
  ViewBorderRow,
  ViewRadiusCustom,
  ViewRow,
} from '../styled/View';
import {Image, ItemPreview} from '../styled/Image';
import {Text} from '../styled/Text';
import {dayToText, LocaleString} from '../../utils/functions';
import {Button} from '../styled/Button';

const TabCalendarBroadcast = (props) => {
  const clock = require('../../assets/myinfo/icon_clock_small_pink.png');

  const onPressCalendarAlreadyComment = (data) => {
    props.onPressCalendarAlreadyComment(data);
  };

  return (
    <ViewBorderRow>
      <View>
        <View
          bgDarkNavy
          paddingLeft={15}
          paddingRight={15}
          paddingTop={5}
          paddingBottom={15}>
          <ViewRow>
            <View width={'20%'} marginRight={'5%'} justifyContent={'center'}>
              <ItemPreview size={78} source={{uri: props.productImageUrl}} />
            </View>
            <View width={'75%'}>
              <ViewRow
                marginTop={5}
                marginBottom={3}
                justifyContent={'space-between'}>
                <ViewRow alignSelf={'center'}>
                  <Image
                    marginRight={5}
                    alignSelf={'center'}
                    width={15}
                    height={15}
                    source={clock}
                  />
                  <Text ftTheme bold fontSize={15}>
                    {props.date}({dayToText(props.day).slice(0, 1)}){' '}
                    {props.expectedBroadcastStartTime} ~{' '}
                    {props.expectedBroadcastEndTime}
                  </Text>
                </ViewRow>
              </ViewRow>
              <ViewRow
                marginBottom={3}
                justifyContent={'space-between'}
                width={'100%'}>
                <View width={'90%'}>
                  <Text ftWhite fontSize={15} numberOfLines={1}>
                    {props.productName}
                  </Text>
                </View>
                <Button
                  alignSelf={'center'}
                  width={24}
                  height={24}
                  onPress={() =>
                    onPressCalendarAlreadyComment({
                      id: props.id,
                      status: props.status,
                      productId: props.productId,
                    })
                  }>
                  <Image
                    width={20}
                    height={20}
                    source={require('../../assets/common/icon_small_right_white.png')}
                  />
                </Button>
              </ViewRow>
              <ViewRow marginBottom={5}>
                <ViewBorderRadius>
                  <Text ftGold fontSize={12}>
                    {props.sellerNickName}
                  </Text>
                  <ViewRow alignItems={'center'}>
                    <ViewRow alignItems={'center'} marginRight={5}>
                      <Text ftTheme bold fontSize={12} marginRight={5}>
                        {props.priceInfo ? props.priceInfo.discountPrice : 0}%
                      </Text>
                      <Text ftWhite bold fontSize={16}>
                        {LocaleString(
                          props.priceInfo ? props.priceInfo.salePrice : 0,
                        )}
                        원
                      </Text>
                    </ViewRow>
                    {props.priceInfo && props.priceInfo.statusTitle !== '' ? (
                      <ViewBorderRadius
                        justifyContent={'center'}
                        alignItems={'center'}
                        borderRadius={100}
                        bgLightPink
                        paddingLeft={5}
                        paddingRight={5}
                        paddingTop={5}
                        paddingBottom={5}>
                        <Text ftTheme fontSize={10} bold>
                          {props.priceInfo.statusTitle.length !== 0 &&
                          props.priceInfo
                            ? props.priceInfo.statusTitle
                            : ''}
                        </Text>
                      </ViewBorderRadius>
                    ) : (
                      <></>
                    )}
                  </ViewRow>
                </ViewBorderRadius>
              </ViewRow>
            </View>
          </ViewRow>
          <View bgDarkGrayBlue height={0.5} />
        </View>
      </View>
    </ViewBorderRow>
  );
};
export default TabCalendarBroadcast;
