import React from 'react';
// Styled Component
import {View, ViewRow} from '../styled/View';
import {Image, ImageBorder, ImageCirclePreview} from '../styled/Image';
import {Text} from '../styled/Text';
// NPM Module
import ViewMoreText from 'react-native-view-more-text';
// assets Img
const pinkStar = require('../../assets/review/icon_pink_star.png');
const grayStar = require('../../assets/review/icon_grey_star.png');

// 상품상세정보 - 고객 리뷰
// id : index 값
// nickName : 고객 닉네임
// profilePath : 고객 프로필 경로
// productName : 상품명
// imgPath : 이미지 경로
// content : 리뷰 내용
// reviewPoint : 평점
// date : 작성날짜

const CustomerReview = (props) => {
  // 별점
  let starReview = [];

  for (let i = 0; i < 5; i++) {
    starReview.push(
      i < props.reviewPoint ? ( // 평점 입력
        <Image width={16} height={16} source={pinkStar} />
      ) : (
        <Image width={16} height={16} source={grayStar} />
      ),
    );
  }

  // 텍스트 numberOfLines 값에 따른 더보기 / 숨기기 함수
  const renderViewMore = (onPress) => {
    return (
      <Text
        onPress={onPress}
        ftNavy
        textDecorationLine={'underline'}
        marginTop={5}>
        더보기
      </Text>
    );
  };
  const renderViewLess = (onPress) => {
    return (
      <Text
        onPress={onPress}
        ftNavy
        textDecorationLine={'underline'}
        marginTop={5}>
        숨기기
      </Text>
    );
  };

  return (
    <View>
      <ViewRow>
        <View
          height={'auto'}
          width={'15%'}
          justifyContent={'center'}
          alignItems={'center'}>
          <ImageCirclePreview size={36} source={{uri: props.profilePath}} />
        </View>
        <View width={'85%'} justifyContent={'center'}>
          <ViewRow marginBottom={5} alignItems={'center'}>
            <Text ftDarkNavy bold fontSize={13} marginRight={10}>
              {props.nickName}
            </Text>
            <Text ftGray>{props.date}</Text>
          </ViewRow>
          <Text ftGray marginTop={5} fontSize={13}>
            {props.productName}
          </Text>
        </View>
      </ViewRow>
      <ViewRow>
        <View width={'15%'} />
        <View width={'85%'}>
          <ViewRow marginTop={10} marginBottom={10}>
            {starReview}
          </ViewRow>
          <View marginBottom={10}>
            <ViewMoreText
              numberOfLines={2}
              renderViewMore={renderViewMore}
              renderViewLess={renderViewLess}>
              <Text ftDarkNavy fontSize={13}>
                {props.content}
              </Text>
            </ViewMoreText>
          </View>
          <ImageBorder
            width={'100%'}
            height={170}
            source={{uri: props.imgPath}}
          />
        </View>
      </ViewRow>
    </View>
  );
};

export default CustomerReview;
