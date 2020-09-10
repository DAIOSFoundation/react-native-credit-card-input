import React from 'react';

// utils Import
import {isEmpty, LocaleString} from '../../utils/functions';

// Styled Component
import {View, ViewBorderRadius, ViewRow} from '../styled/View';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';
import {Image} from '../styled/Image';

// assets Img
const cancelIcon = require('../../assets/common/icon_item_cancel.png');
const minIcon = require('../../assets/common/icon_item_minus.png');
const plusIcon = require('../../assets/common/icon_item_plus.png');

// *** 추천상품페이지 상품 담기 ***
// productId : 구분 id
// onPressIncrease : 개수 증가 이벤트
// onPressDecrease : 개수 감소 이벤트
// onPressCanCel : 상품 취소 이벤트
// textLine : 텍스트 라인 제한(몇 줄 허용할지..)
// productName : 제품 이름
// productAmount : 제품 수량
// productPrice : 제품 가격

const PutProduct = (props) => {
  const onPressIncrease = () => {
    if (!isEmpty(props.onPressIncrease)) props.onPressIncrease();
  };

  const onPressDecrease = () => {
    if (!isEmpty(props.onPressDecrease)) props.onPressDecrease();
  };

  const onPressCanCel = () => {
    if (!isEmpty(props.onPressCanCel)) props.onPressCanCel();
  };

  return (
    <View>
      <ViewRow marginBottom={15}>
        <Text style={{flex: 1}} numberOfLines={props.textLine}>
          {props.productName}
        </Text>
        <Button width={16} height={16} onPress={onPressCanCel}>
          <Image source={cancelIcon} />
        </Button>
      </ViewRow>
      <ViewRow justifyContent={'space-between'}>
        <ViewRow alignItems={'center'}>
          <View>
            <Button width={30} height={28} onPress={onPressDecrease}>
              <Image source={minIcon} />
            </Button>
          </View>
          <ViewBorderRadius
            height={28}
            justifyContent={'center'}
            brIceBlue
            marginRight={10}
            marginLeft={10}>
            <Text paddingLeft={20} paddingRight={20}>
              {props.productAmount}
            </Text>
          </ViewBorderRadius>
          <View>
            <Button width={30} height={28} onPress={onPressIncrease}>
              <Image source={plusIcon} />
            </Button>
          </View>
        </ViewRow>
        <ViewRow alignItems={'center'}>
          <Text ftLarge bold>
            {LocaleString(props.productPrice)}
          </Text>
          <Text ftLarge marginLeft={5}>
            원
          </Text>
        </ViewRow>
      </ViewRow>
    </View>
  );
};

export default PutProduct;
