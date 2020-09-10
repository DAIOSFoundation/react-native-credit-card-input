import React from 'react';
// Styled Component
import {View, ViewRow} from '../../../../../components/styled/View';
import {Text} from '../../../../../components/styled/Text';
import {Image} from '../../../../../components/styled/Image';
import {Button} from '../../../../../components/styled/Button';
import CustomerReview from '../../../../../components/review/CustomerReview';
// redux
import {useDispatch} from 'react-redux';
import * as customerReviewAction from '../../../../../store/modules/productDetail/tabView/customerReview/actions';
// assets Img
const downTriangleArrow = require('../../../../../assets/common/icon_small_down.png');

// 고객리뷰 탭뷰
const CustomerReviewRoute = () => {
  // redux
  const dispatch = useDispatch();

  const onPressToggleReviewOrder = () => {
    dispatch(customerReviewAction.toggle_review_order());
  };

  return (
    <View>
      <View paddingLeft={15} paddingRight={15} marginBottom={15}>
        <ViewRow
          justifyContent={'space-between'}
          marginTop={20}
          marginBottom={10}>
          <Text bold fontSize={15} ftDarkNavy>
            리뷰 20,251건
          </Text>
          <Button
            width={'auto'}
            height={'auto'}
            onPress={onPressToggleReviewOrder}>
            <Image width={10} height={8} source={downTriangleArrow} />
            <Text ftNavy marginLeft={10}>
              최신순
            </Text>
          </Button>
        </ViewRow>
        <View height={1} bgIceBlue />
      </View>
      <View paddingLeft={15} paddingRight={15}>
        <CustomerReview
          nickName={'hogn1234'}
          profilePath={'https://placeimg.com/100/100/any'}
          productName={'치즈돈까스 4팩+등심돈까스 4팩 마싯져영돈까스'}
          imgPath={'https://picsum.photos/300/300'}
          content={
            '진짜 바삭하고 맛있어요. 치즈도 가득 들어있구요. 저는 집에 에어프라이로 애기들 반찬 순식간에 뚝딱 하고 만들어 주는데 넘 편하고 좋아용 ㅎㅎ 강추^^b'
          }
          reviewPoint={3}
          date={'20.03.03'}
        />
      </View>
      <View height={1} bgIceBlue marginTop={10} marginBottom={10} />

      <View paddingLeft={15} paddingRight={15}>
        <CustomerReview
          nickName={'kanghyeok93'}
          profilePath={'https://picsum.photos/100/100'}
          productName={'치즈돈까스 4팩+등심돈까스 4팩 마싯져영돈까스'}
          imgPath={'https://picsum.photos/300/300'}
          content={
            '안녕하세요 너무 너무 맛있습니다. ~ 또 시켜 먹을거같아요 ㅎㅎ '
          }
          reviewPoint={5}
          date={'20.01.03'}
        />
      </View>
      <View height={1} bgIceBlue marginTop={10} marginBottom={10} />
    </View>
  );
};

export default CustomerReviewRoute;
