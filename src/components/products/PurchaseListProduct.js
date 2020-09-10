import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
// Styled Component
import {View, ViewBorderRadius, ViewRow} from '../styled/View';
import {ItemPreview} from '../styled/Image';
import {ButtonBorderRadius} from '../styled/Button';
import {Text} from '../styled/Text';
// utils Import
import {isEmpty, LocaleString} from '../../utils/functions';
import {deliveryState} from '../../utils/deliveryState';

// urlPath : 제품 이미지 경로
// size : 제품 이미지 사이즈
// productName : 상품명
// price : 제품 가격
// state : 제품상태
// date : 날짜
// detail : 상세 내역 분기처리
// hasItem : 상품 옵션 여부
// itemInfo : 아이템 정보

// options : 구매 상품에 속하는 옵션들

// onPressLeftText: 왼쪽 버튼 텍스트
// onPressLeftButton : 왼쪽 버튼 이벤트
// onPressRightText : 오른쪽 버튼 텍스트
// onPressRightButton : 오른쪽 버튼 이벤트

// 구매 내역 상품
const PurchaseListProduct = (props) => {
  const onPressLeftButton = () => {
    if (!isEmpty(props.onPressLeftButton)) props.onPressLeftButton();
  };

  const onPressRightButton = () => {
    if (!isEmpty(props.onPressRightButton)) props.onPressRightButton();
  };

  return (
    <View>
      {!props.detail ? (
        <ViewRow
          paddingLeft={15}
          paddingTop={15}
          paddingBottom={10}
          bgDarkWhite>
          <ViewBorderRadius
            bgSoftGray
            paddingTop={5}
            paddingLeft={10}
            paddingRight={10}
            paddingBottom={5}
            borderRadius={20}
            style={{flexDirection: 'row'}}>
            <Text ftGray>{props.date}</Text>
          </ViewBorderRadius>
        </ViewRow>
      ) : null}

      <View
        bgWhite
        paddingLeft={15}
        paddingRight={15}
        paddingTop={5}
        paddingBottom={15}>
        <ViewRow>
          <View marginRight={'5%'} justifyContent={'center'}>
            <ItemPreview size={props.size} source={{uri: props.urlPath}} />
          </View>
          <View width={'75%'}>
            <ViewRow
              marginTop={5}
              marginBottom={5}
              justifyContent={'space-between'}>
              <Text ftGray>{props.date}</Text>
              <Text ftTheme bold>
                {props.state}
              </Text>
            </ViewRow>
            <View>
              <Text ftDarkNavy>{props.productName}</Text>
            </View>
            <ViewRow marginTop={5} marginBottom={5} alignItems={'center'}>
              <Text ftTheme ftLarge marginRight={5}>
                결제금액
              </Text>
              <Text ftDarkNavy ftLarge bold marginRight={3}>
                {LocaleString(props.price)}
              </Text>
              <Text ftFunNavy ftLarge>
                원
              </Text>
            </ViewRow>
          </View>
        </ViewRow>
        {props.hasItem ? (
          <ViewRow marginTop={3} width={'100%'}>
            <Text bold ftDarkNavy marginRight={15}>
              구매옵션
            </Text>
            <View>
              {props.itemInfo.map((item, index) => {
                return (
                  <ViewRow justifyContent={'space-between'} key={index}>
                    <Text ftDarkNavy marginRight={15}>
                      {item.itemInfo.items[0].itemName}
                    </Text>
                    <Text ftTheme>{deliveryState(item.itemStatus)}</Text>
                  </ViewRow>
                );
              })}
            </View>
          </ViewRow>
        ) : null}
        {!props.detail ? (
          <View marginTop={10}>
            <ViewRow justifyContent={'space-between'}>
              {props.onPressLeftText ? (
                <ButtonBorderRadius
                  brTheme
                  width={'45%'}
                  borderRadius={10}
                  onPress={onPressLeftButton}>
                  <Text ftTheme>{props.onPressLeftText}</Text>
                </ButtonBorderRadius>
              ) : (
                <View Width={'45%'} />
              )}
              <ButtonBorderRadius
                brNavy
                width={'45%'}
                borderRadius={10}
                onPress={onPressRightButton}>
                <Text ftNavy>{props.onPressRightText}</Text>
              </ButtonBorderRadius>
            </ViewRow>
          </View>
        ) : null}
      </View>
      {!props.detail ? <View bgDarkWhite height={1} /> : null}
    </View>
  );
};

export default PurchaseListProduct;
