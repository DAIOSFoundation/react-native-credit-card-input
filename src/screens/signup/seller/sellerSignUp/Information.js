import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
// Styled Component
import {View, ViewBorderRow} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import {Button} from '../../../../components/styled/Button';
import {Image} from '../../../../components/styled/Image';
import SelectButtons from '../../../../components/buttons/SelectButtons';
import BottomButton from '../../../../components/buttons/BottomButton';
// utils Import
import {
  interestItems,
  whereShop,
  averageAmount,
  checkBoxArray,
} from '../../../../utils/constants';
// Redux
import * as signupActions from '../../../../store/modules/signup/actions';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as customModalActions from '../../../../store/modules/modal/customModal/actions';

const Information = (props) => {
  const dispatch = useDispatch();

  const {
    productOfInterest,
    shoppingPlace,
    shoppingAmount,
    statebar,
    whereShopIndex,
    averageAmountIndex,
  } = useSelector(
    (state) => ({
      productOfInterest: state.signup.productOfInterest,
      shoppingPlace: state.signup.shoppingPlace,
      shoppingAmount: state.signup.shoppingAmount,
      statebar: state.signup.statebar,
      whereShopIndex: state.signup.whereShopIndex,
      averageAmountIndex: state.signup.averageAmountIndex,
    }),
    shallowEqual,
  );

  // 기기 뒤로가기 버튼 기능 {s}
  const backAndroid = () => {
    if (props.snapPoints[0] !== 0) {
      return true;
    } else {
      dispatch(signupActions.change_statebar(statebar - 1));
      return true;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAndroid);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAndroid);
    };
  }, [backAndroid]);
  // 기기 뒤로가기 버튼 기능 {e}

  // 쇼핑 위치F
  const onPressPlace = (data) => {
    dispatch(signupActions.change_shopping_place(data[0]));
  };

  // 1회 소비하는 평균 금액
  const onPressAmount = (data) => {
    dispatch(signupActions.change_shopping_amount(data[0]));
  };

  // 관심있는 상품 선택
  const renderInterest = () => {
    let pressedData = [];
    if (!productOfInterest) {
      return '카테고리 선택하기';
    } else {
      for (let i = 0; i < productOfInterest.length; i++) {
        pressedData.push(
          interestItems[productOfInterest[i]].replace(/\n/g, '') + '\t',
        );
      }
      return pressedData;
    }
  };

  // 다음 버튼
  const onPressNext = () => {
    if (
      productOfInterest.length === 0 ||
      shoppingPlace.length === 0 ||
      shoppingAmount.length === 0
    ) {
      dispatch(
        customModalActions.change_modal_message('모든 항목를 선택해 주세요'),
      );
      return;
    }

    dispatch(signupActions.change_statebar(statebar + 1));
  };

  return (
    <View height={'100%'} justifyContent={'space-between'}>
      <View justifyContent={'flex-start'} marginLeft={20} marginRight={20}>
        <Text ftLarge ftTheme bold>
          03 셀러 정보
        </Text>
        <View marginTop={30}>
          <Text ftDarkNavy bold>
            주로 구매하거나 관심있는 상품은 무엇인가요?
          </Text>
          <ViewBorderRow
            borderLeftWidth={'0'}
            borderRightWidth={'0'}
            borderTopWidth={'0'}
            justifyContent={'space-between'}
            alignItems={'center'}
            brLightGray
            width={'100%'}>
            <Button
              width={'100%'}
              justifyContent={'space-between'}
              onPress={props.onPressBottomModalOpen}>
              <Text textAlign={'right'} ftLightGray>
                {renderInterest()}
              </Text>
              <Image
                width={8}
                height={8}
                source={require('../../../../assets/common/black_triangle.png')}
              />
            </Button>
          </ViewBorderRow>

          <Text ftDarkNavy bold marginTop={30}>
            주로 어디에서 쇼핑을 하시나요?
          </Text>
          <View width={'100%'} marginTop={15}>
            <SelectButtons
              data={checkBoxArray(whereShop)}
              lineCnt={4}
              isOnlyOne={true}
              onPress={onPressPlace}
              selectedIndex={whereShopIndex}
            />
          </View>

          <Text ftDarkNavy bold marginTop={30}>
            쇼핑 1회에 소비하는 평균 금액은 얼마인가요?
          </Text>
          <View width={'100%'} marginTop={15}>
            <SelectButtons
              data={checkBoxArray(averageAmount)}
              lineCnt={4}
              isOnlyOne={true}
              onPress={onPressAmount}
              selectedIndex={averageAmountIndex}
            />
          </View>
        </View>
      </View>
      <BottomButton onPress={() => onPressNext()} text={'다음'} />
    </View>
  );
};

export default Information;
