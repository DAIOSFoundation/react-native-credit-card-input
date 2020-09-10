import React from 'react';
// Styled Component
import {View, ViewBorderRadius, ViewRow} from '../styled/View';
import {ItemPreview} from '../styled/Image';
import {Text} from '../styled/Text';
// utils Import
import {LocaleString} from '../../utils/functions';

// *** 주문하기 페이지 상품정보 ***
// productId : 제품 id
// productImages : 제품 이미지
// productName : 제품 이름
// productAmount : 제품 수량
// productPrice : 제품 가격
// status : 라이브 여부
// hasItem : 제품 옵션 여부 (true,false)
// textLine : 텍스트 라인 제한(몇 줄 허용할지..)
// sellerNickName : 셀러 닉네임

const OrderProduct = (props) => {
  //  라이브 & 녹방 상품 옵션 여부
  const hasItem = (check) => {
    if (check) {
      return (
        <View width={'80%'}>
          {props.items.map((item, index) => (
            <ViewRow alignItems={'center'} marginTop={5} key={index}>
              <Text ftGray fontSize={12}>
                옵션 : {item.itemName}
              </Text>
              <View
                bgGray
                width={1}
                height={12}
                marginRight={5}
                marginLeft={5}
              />
              <Text ftGray fontSize={12}>
                수량 {item.itemAmount}개
              </Text>
            </ViewRow>
          ))}
        </View>
      );
    } else {
      return props.items.map((item, index) => (
        <ViewRow width={'80%'} alignItems={'center'} key={index}>
          <Text ftGray fontSize={12}>
            수량 {item.itemAmount}개
          </Text>
        </ViewRow>
      ));
    }
  };

  // 추천상품페이지 or 라이브 & 녹방 - 가격 분기처리
  const priceQuarter = () => {
    if (props.items) {
      // 라이브 & 녹방
      let result = 0;

      props.items.map(
        (item, index) => (result += item.itemPrice * item.itemAmount),
      );
      return result;
    } else {
      // 추천상품페이지
      return LocaleString(props.productPrice);
    }
  };

  return (
    <View>
      <ViewRow alignItems={'center'}>
        <View width={'20%'} alignItems={'center'}>
          <ItemPreview size={58} source={{uri: props.productImages}} />
        </View>
        <View width={'80%'}>
          <Text fontSize={14} ftDarkNavy>
            {props.productName}
          </Text>
          <ViewRow alignItems={'center'}>
            <Text fontSize={16} bold ftDarkNavy marginRight={5}>
              {priceQuarter()}원
            </Text>
            {props.status === 5 ? (
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
                  라이브할인가
                </Text>
              </ViewBorderRadius>
            ) : null}
          </ViewRow>
        </View>
      </ViewRow>
      <ViewRow marginTop={5}>
        <View width={'20%'} />
        {props.hasItem !== undefined ? ( //  추천상품페이지 or 라이브 & 녹방 분기 처리
          hasItem(props.hasItem)
        ) : (
          <View>
            <Text ftGray fontSize={12}>
              수량 {props.productAmount} 개
            </Text>
          </View>
        )}
      </ViewRow>
    </View>
  );
};

export default OrderProduct;
