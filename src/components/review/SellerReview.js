import React from 'react';
// Styled Component
import {View, ViewAbsolute, ViewBorderRadius, ViewRow} from '../styled/View';
import {Image, ImageBorder, ImageCirclePreview} from '../styled/Image';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';
// assets Img
const videoStopIcon = require('../../assets/video/bt_play_white_big.png');
// Npm Module
import {Actions} from 'react-native-router-flux';

// 상품상세정보 - 셀러 리뷰
// id : index 값
// nickName : 셀러 닉네임
// profilePath : 셀러 프로필 경로
// productName : 상품명
// videoPath : 동영상 경로
// productImgPath : 상품 이미지 경로
// content : 리뷰 내용

const SellerReview = (props) => {
  // 셀러 리뷰 작성 시 비디오 뷰
  const sellerReviewVideos = () => {
    if (props.videoPath && props.videoPath.length > 0) {
      return (
        <Button
          activeOpacity={1}
          width={'100%'}
          height={200}
          onPress={() => Actions.productDetailPlayer(props.videoPath[0].path)}>
          <ViewBorderRadius
            bgBlack
            width={'100%'}
            height={'100%'}
            borderRadius={15}
          />
          <ViewAbsolute
            width={'100%'}
            height={'100%'}
            justifyContent={'center'}
            alignItems={'center'}>
            <Image width={46} height={46} source={videoStopIcon} />
          </ViewAbsolute>
        </Button>
      );
    }
  };

  // 셀러 리뷰 작성 시 이미지 뷰
  const sellerReviewImages = () => {
    if (props.productImgPath && props.productImgPath.length > 0) {
      return (
        <ImageBorder
          marginTop={15}
          borderRadius={10}
          height={200}
          source={{uri: props.productImgPath[0].path}}
        />
      );
    }
  };

  return (
    <View>
      <ViewRow paddingTop={15} paddingBottom={15}>
        <View
          height={'auto'}
          width={'15%'}
          justifyContent={'center'}
          alignItems={'center'}>
          <ImageCirclePreview size={36} source={{uri: props.profilePath}} />
        </View>
        <View width={'85%'} justifyContent={'center'}>
          <ViewRow width={'100%'} justifyContent={'space-between'}>
            <Text ftDarkNavy bold fontSize={13} marginBottom={5}>
              {props.nickName}
            </Text>
          </ViewRow>
          <Text ftTheme fontSize={13}>
            {props.productName}
          </Text>
        </View>
      </ViewRow>
      <ViewRow marginBottom={15}>
        <View width={'8%'} />
        <View width={'85%'}>
          {sellerReviewVideos()}
          {sellerReviewImages()}
          <Text
            ftDarkNavy
            fontSize={13}
            marginTop={10}
            style={{lineHeight: 20}}>
            {props.content}
          </Text>
        </View>
      </ViewRow>
    </View>
  );
};

export default SellerReview;
