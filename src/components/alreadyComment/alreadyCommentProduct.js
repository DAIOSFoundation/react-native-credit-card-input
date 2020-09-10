import React from 'react';
// Styled Component
import {
  View,
  ViewBorder,
  ViewBorderRadius,
  ViewBorderRow,
} from '../styled/View';
import {ImageBorder} from '../styled/Image';
import {Text} from '../styled/Text';
import {LocaleString} from '../../utils/functions';

// *** 미리 댓글 상품 정보 ***
// productName : 상품명
// sellerName : 셀러명
// discount : 할인율
// price : 가격
// productImage : 상품 이미지
const AlreadyCommentProduct = (props) => {
  return (
    <View>
      <ViewBorderRow>
        <ImageBorder
          width={70}
          height={70}
          marginRight={10}
          source={{uri: props.productImage}}
        />
        <ViewBorder>
          <Text fontSize={15} marginBottom={6}>
            {props.productName}
          </Text>
          <Text ftGray fontSize={13}>
            {props.sellerName}
          </Text>
          <ViewBorderRow>
            <Text ftTheme bold fontSize={12} marginTop={6} marginRight={3}>
              {props.discount}%
            </Text>
            <Text bold ftDarkNavy fontSize={18}>
              {LocaleString(props.price)}
            </Text>
            <Text fontSize={18}>원</Text>
            <ViewBorderRadius
              alignSelf={'flex-start'}
              marginLeft={10}
              paddingTop={3}
              paddingBottom={3}
              paddingLeft={5}
              paddingRight={5}
              bgTheme
              borderRadius={100}>
              <Text ftWhite ftSmall bold>
                라이브할인가
              </Text>
            </ViewBorderRadius>
          </ViewBorderRow>
        </ViewBorder>
      </ViewBorderRow>
    </View>
  );
};

export default AlreadyCommentProduct;
