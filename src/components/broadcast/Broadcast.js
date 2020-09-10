import {Text} from '../styled/Text';
import {Button, ButtonBorderRadius} from '../styled/Button';
import React from 'react';
import {
  ScrollView,
  View,
  ViewBorderRadius,
  ViewRow,
  ViewSelf,
} from '../styled/View';
import {Image, ImageAbsolute, ItemPreview} from '../styled/Image';
import {screenWidth} from '../styled/ScreenSize';
import BuyProduct from '../products/BuyProduct';
import {LocaleString} from '../../utils/functions';
import {dayToText} from '../../utils/functions';

export const Broadcast = (props) => {
  //asset
  const clock = require('../../assets/myinfo/icon_clock_small_pink.png');
  const comment = require('../../assets/myinfo/icon_comment_more.png');
  const rightTriangle = require('../../assets/common/navy_triangle_02.png');

  const onPressPreComment = (id) => {
    props.onPressPrevComment(id);
  };
  return (
    <View>
      <View
        bgWhite
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
              <Button
                alignSelf={'center'}
                width={24}
                height={24}
                onPress={props.onPressBroadcastSetting}>
                <Image source={comment} />
              </Button>
            </ViewRow>
            <View marginBottom={3}>
              <Text ftDarkNavy fontSize={15} numberOfLines={1}>
                {props.productName}
              </Text>
            </View>
            <ViewRow marginBottom={5}>
              <Button
                justifyContent={'flex-start'}
                onPress={() => onPressPreComment(props.id)}>
                <Text ftNavy marginRight={5} fontSize={13} bold>
                  미리댓글 {props.prevCommentCount}
                </Text>
                <Image width={5} height={5} source={rightTriangle} />
              </Button>
            </ViewRow>
          </View>
        </ViewRow>
      </View>
    </View>
  );
};

export default Broadcast;
