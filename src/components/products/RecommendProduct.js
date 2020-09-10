import React from 'react';
import {TouchableOpacity} from 'react-native'
// Styled Component
import {Text} from '../styled/Text';
import {ViewRow, View} from '../styled/View';
import {Button, ButtonBorderRadius} from '../styled/Button';
import {screenWidth} from '../styled/ScreenSize';
import {Image} from '../styled/Image';
// utils Component
import {isEmpty, LocaleString} from '../../utils/functions';

// 나만의 맟춤 추천 상품
// productId : 구분 id onPressAdd , onPressOther 리턴에 포함
// productName : 상품명
// samplePrice : 샘플구매가 or 대여가 값이 0 이면 무상제공
// normalPrice : 정상 판매가
// productImages : 이미지 경로
// onPressAdd : 샘플 담기 터치 리턴 받을 함수
// textLine : 텍스트 라인 제한(몇 줄 허용할지..)
// active : 샘플을 담았을 시 활성화된 버튼 디자인
// isLend : 대여여부 true(대여) / false(구매)
// item: 하나의 상품 정보

{
  /* <RecommendProduct
productId={'unikey'}
productName={'최상호'}
productImages={''}
samplePrice={1000000}
onPressAdd={onPressRecommend}
/> */
}

const RecommendProduct = (props) => {
  const onPressAdd = () => {
    props.onPressAdd(props.productId);
  };

  const onPressOther = () => {
    props.onPressOther(props.productId);
  };

  const samplePriceName = () => {
    if (props.samplePrice === 0) {
      return '무상제공';
    } else {
      if (props.isLend === true) {
        return '대여가';
      } else {
        return '구매가';
      }
    }
  };

  const onPressDetail = () => {
    props.onPressDetail(props.productId);
  };

  return (
    <View width={'100%'} height={125} bgWhite>
      <ViewRow
        marginTop={10}
        marginBottom={10}
        justifyContent={'space-between'}
        paddingLeft={15}
        paddingRight={15}>
        <Button width={'auto'} height={'auto'} onPress={onPressDetail}>
          <Image
            width={100}
            height={100}
            source={
              isEmpty(props.productImages)
                ? require('../../assets/profile/icon_person_profile.png')
                : {uri: props.productImages}
            }
          />
        </Button>
        <View
          marginLeft={15}
          width={screenWidth - 155}
          marginRight={15}
          justifyContent={'space-between'}>
          <TouchableOpacity onPress={onPressDetail}>
            <Text ftDarkNavy fontSize={17} numberOfLines={props.textLine}>
              {props.productName}
            </Text>
            <ViewRow alignItems={'center'}>
              <Text ftGray marginRight={5}>
                판매가
              </Text>
              <Text ftGray bold paddingBottom={1}>
                {LocaleString(props.normalPrice)} 원
              </Text>
            </ViewRow>
            <ViewRow>
              <Text ftTheme bold fontSize={17} marginRight={5}>
                {samplePriceName()}
              </Text>
              <Text ftDarkNavy fontSize={17} bold>
                {LocaleString(props.samplePrice)} 원
              </Text>
            </ViewRow>
          </TouchableOpacity>
          <ViewRow justifyContent={'flex-end'} marginTop={5}>
            {props.active ? (
              <ButtonBorderRadius
                bgTheme
                borderRadius={5}
                brWhite
                width={100}
                height={30}
                onPress={onPressAdd}>
                <Text ftWhite ftSmall bold>
                  ㅡ 샘플담기
                </Text>
              </ButtonBorderRadius>
            ) : (
              <ButtonBorderRadius
                alignItmes={'center'}
                jusitfyContent={'center'}
                borderRadius={5}
                brTheme
                width={100}
                height={30}
                onPress={onPressAdd}>
                <Text fontSize={16} ftTheme bold marginRight={3}>
                  +
                </Text>
                <Text ftTheme ftSmall bold>
                  샘플담기
                </Text>
              </ButtonBorderRadius>
            )}
          </ViewRow>
        </View>
      </ViewRow>
    </View>
  );
};

export default RecommendProduct;
