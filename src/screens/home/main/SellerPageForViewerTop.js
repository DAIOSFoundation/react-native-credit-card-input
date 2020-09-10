import React, {useState} from 'react';
import {
  View,
  ViewBorder,
  ViewBorderRow,
  ViewRow,
} from '../../../components/styled/View';
import PickProfile from '../../../components/profiles/PickProfile';
import {Text} from '../../../components/styled/Text';
import {Button, ButtonBorderRadius} from '../../../components/styled/Button';
import {Image, ImageCirclePreview} from '../../../components/styled/Image';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as sellerPageForViewerActions from '../../../store/modules/sellerPageForViewer/actions';
import SellerProfile from '../../../components/profiles/SellerProfile';
import LiveProfile from '../../../components/profiles/LiveProfile';
import * as broadcastActions from '../../../store/modules/broadcast/actions';
import {Actions} from 'react-native-router-flux';

const starIcon = require('../../../assets/common/icon_star_navy.png');

const SellerPageForViewerTop = (props) => {
  // const {
  //   favorite,
  // } = useSelector(
  //   state => ({
  //     favorite: state.sellerPageForViewer.favorite,
  //   }),
  //   shallowEqual,
  // );
  //
  // // const [button, setButton] = useState(false);
  //
  // const favoriteButtonClick = () => {
  //   if (favorite === false) {
  //     dispatch(sellerPageForViewerActions.favorite_button(true));
  //
  //   } else {
  //     dispatch(sellerPageForViewerActions.favorite_button(false));
  //   }
  // };
  const dispatch = useDispatch();

  const onPressChannel = (channelAddress) => {
    props.onPressChannel(channelAddress);
  };

  const onPress = () => {
    let param = {
      broadcastId: props.sellerInfo.nowBroadcast._id,
      productId: props.sellerInfo.nowBroadcast.productId,
    };
    if (props.previewScreen === 'YoutubeFullScreen') {
      dispatch(
        broadcastActions.get_broadcast_detail_info(
          props.sellerInfo.nowBroadcast._id,
        ),
      );
      Actions.videoFullScreen(param);
    } else if (props.previewScreen === 'SearchInfo') {
      dispatch(
        broadcastActions.get_broadcast_detail_info(
          props.sellerInfo.nowBroadcast._id,
        ),
      );
      Actions.searchVideoFullScreen(param);
    }
  };

  return (
    <View bgDarkNavy paddingLeft={15} paddingRight={15}>
      <ViewRow justifyContent={'space-between'}>
        <ViewRow>
          {props.sellerInfo.nowBroadcast ? (
            <LiveProfile
              size={72}
              onPress={onPress}
              urlPath={props.sellerInfo.sellerInfo.profileImageUrl}
              isLive
            />
          ) : (
            <ImageCirclePreview
              size={72}
              source={
                props.sellerInfo.sellerInfo.profileImageUrl
                  ? {uri: props.sellerInfo.sellerInfo.profileImageUrl}
                  : require('../../../assets/profile/icon_person_profile.png')
              }
            />
          )}
          <View justifyContent={'center'} marginLeft={10}>
            <Text ftWhite bold fontSize={22} marginBottom={5}>
              {props.sellerInfo.sellerInfo.nickName}
            </Text>
            <Button
              justifyContent={'flex-start'}
              onPress={() =>
                onPressChannel(props.sellerInfo.channelInfo.channelAddress)
              }>
              <Text ftIceBlue>@{props.sellerInfo.channelInfo.channelName}</Text>
            </Button>
          </View>
        </ViewRow>
        {/*{favorite?*/}
        {/*  (*/}
        {/*    <ButtonBorderRadius width={'auto'} brGold borderRadius={25} width={85} height={30} marginTop={25} onPress={favoriteButtonClick}>*/}
        {/*      <Image width={10} height={10} source={require('../../../assets/common/icon_check_gold.png')} marginRight={5}/>*/}
        {/*      <Text fontSize={12} ftGold bold>즐겨찾기</Text>*/}
        {/*    </ButtonBorderRadius>*/}
        {/*  ):*/}
        {/*  (*/}
        {/*    <ButtonBorderRadius width={'auto'} brWhite borderRadius={25} width={85} height={30} marginTop={25} onPress={favoriteButtonClick}>*/}
        {/*      /!*<Image width={10} height={10} source={plusIcon} marginRight={5}/>*!/*/}
        {/*      <Text fontSize={12} ftWhite bold>+ 즐겨찾기</Text>*/}
        {/*    </ButtonBorderRadius>*/}
        {/*  )*/}
        {/*}*/}
      </ViewRow>
      <View>
        <ViewRow
          marginTop={20}
          marginBottom={20}
          width={'100%'}
          justifyContent={'space-between'}>
          <ViewBorderRow width={'33%'}>
            <ViewBorderRow alignItems={'center'}>
              <ViewBorder bgTheme borderRadius={4}>
                <Text ftDarkNavy paddingLeft={5} bold paddingRight={5}>
                  누적
                </Text>
              </ViewBorder>
              <Text ftTheme marginLeft={2} marginRight={2}>
                방송 횟수
              </Text>
              {props.sellerInfo.accumulatedBroadcastCount ? (
                <Text ftWhite bold>
                  {props.sellerInfo.accumulatedBroadcastCount}회
                </Text>
              ) : null}
            </ViewBorderRow>
            <ViewBorderRow alignItems={'center'} marginLeft={40}>
              <ViewBorder bgTheme borderRadius={4}>
                <Text ftDarkNavy paddingLeft={5} bold paddingRight={5}>
                  누적
                </Text>
              </ViewBorder>
              <Text ftTheme marginLeft={2} marginRight={2}>
                방송 시간
              </Text>
              {props.sellerInfo.accumulatedTime ? (
                <Text ftWhite bold>
                  {Math.round(props.sellerInfo.accumulatedTime / 60)}시간
                </Text>
              ) : null}
            </ViewBorderRow>
          </ViewBorderRow>
        </ViewRow>
        <ViewRow bgDarkNavy alignItems={'center'} marginBottom={5}>
          <Image width={8} height={8} source={starIcon} marginRight={3} />
          <Text bold ftWhite>
            샐러의 관심 태그
          </Text>
        </ViewRow>
        <ViewRow>
          {props.sellerInfo.additionalInfo.sellingCategory.length !== 0 ? (
            props.sellerInfo.additionalInfo.sellingCategory.map(
              (item, index) => {
                return (
                  <Text
                    marginBottom={20}
                    fontSize={13}
                    ftLightGray
                    marginRight={4}>
                    #{item}
                  </Text>
                );
              },
            )
          ) : (
            <></>
          )}
        </ViewRow>
      </View>
    </View>
  );
};
export default SellerPageForViewerTop;
