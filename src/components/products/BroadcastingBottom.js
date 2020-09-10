import React from 'react';
// Styled Component
import {SafeAreaView, View, ViewRadiusCustom, ViewRow} from '../styled/View';
import {Text} from '../styled/Text';
import {ItemPreview} from '../styled/Image';
import {ButtonBorderRadius, ButtonRadius} from '../styled/Button';
// utils Import
import {isEmpty, LocaleString} from '../../utils/functions';

// *** 라이브스트리밍/녹화방송 하단 제품 상세정보 ***
// urlPath : 제품 이미지 경로
// size : 제품 이미지 사이즈
// title : 제품에 대한 간략한 소개
// discount : 할인율
// price : 가격
// hashTag : 해쉬태그
// textLine : 텍스트 라인 제한(몇 줄 허용할지..)
// fullScreen : full 스크린 분기처리(전체화면인지 아닌지...)
// buttonText : 버튼 텍스트
// onPressButton : 버튼 이벤트
// token : 토큰

const BroadcastingBottom = (props) => {
  const onPressButton = () => {
    if (!isEmpty(props.onPressButton)) props.onPressButton();
  };

  return props.fullScreen ? ( // 전체화면 영상일 때 보여지는 Bottom 디자인
    <ButtonBorderRadius
      width={'auto'}
      height={'auto'}
      bgWhite
      paddingTop={10}
      paddingBottom={10}
      paddingLeft={10}
      paddingRight={10}
      onPress={onPressButton}>
      <ViewRow>
        {props.urlPath ? (
          <ItemPreview source={{uri: props.urlPath}} size={props.size} />
        ) : null}
        <SafeAreaView>
          <Text
            bold
            ftDarkGray
            marginLeft={5}
            marginRight={5}
            numberOfLines={props.textLine}>
            {props.title}
          </Text>
          <ViewRow alignItems={'center'}>
            {props.discount ? (
              <Text bold ftTheme marginLeft={5}>
                {props.discount}%
              </Text>
            ) : null}
            {props.price ? (
              <>
                <Text ftDarkNavy bold ftLarge marginLeft={3}>
                  {LocaleString(props.price)}
                </Text>
                <Text>원</Text>
              </>
            ) : null}
          </ViewRow>
          {!props.token ? (
            <ViewRow alignSelf={'flex-end'} marginRight={10}>
              <Text ftTheme>로그인 후 이용 가능합니다.</Text>
            </ViewRow>
          ) : null}
        </SafeAreaView>
      </ViewRow>
    </ButtonBorderRadius>
  ) : (
    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ //
    <ViewRadiusCustom // 메인화면에서 보는 영상일 때 보여지는 Bottom 디자인
      paddingTop={5}
      paddingBottom={5}
      paddingLeft={10}
      paddingRight={10}
      borderBottomLeftRadius={10}
      borderBottomRightRadius={10}
      bgWhite>
      <ViewRow>
        {props.urlPath ? (
          <ItemPreview source={{uri: props.urlPath}} size={props.size} />
        ) : null}
        <SafeAreaView>
          <Text
            bold
            marginLeft={5}
            marginRight={5}
            ftDarkGray
            numberOfLines={props.textLine}>
            {props.title}
          </Text>
          <ViewRow alignItems={'center'}>
            {props.discount ? (
              <Text ftTheme bold marginLeft={5}>
                {props.discount}%
              </Text>
            ) : null}
            {props.price ? (
              <>
                <Text ftDarkNavy bold ftLarge marginLeft={3}>
                  {LocaleString(props.price)}
                </Text>
                <Text>원</Text>
              </>
            ) : null}
          </ViewRow>
        </SafeAreaView>
        <ButtonRadius
          bgTheme
          width={'auto'}
          borderRadius={100}
          paddingLeft={20}
          paddingRight={20}
          onPress={onPressButton}>
          <Text ftWhite bold>
            {props.buttonText}
          </Text>
        </ButtonRadius>
      </ViewRow>
      {props.hashTag ? (
        <>
          {/* Line */}
          <View
            width={'100%'}
            bgIceBlue
            height={1}
            marginTop={5}
            marginBottom={5}
          />
          <Text ftDarkGray numberOfLines={1}>
            {props.hashTag}
          </Text>
        </>
      ) : null}
    </ViewRadiusCustom>
  );
};

export default BroadcastingBottom;
