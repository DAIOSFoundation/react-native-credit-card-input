import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
// Styled Component
import {View, ViewRow, ViewBorderRow} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import {Image} from '../../../../components/styled/Image';
import {Button} from '../../../../components/styled/Button';
import TextAndInputBottomLine from '../../../../components/input/TextAndInputBottomLine';
import SelectButtons from '../../../../components/buttons/SelectButtons';
import BottomButton from '../../../../components/buttons/BottomButton';
import * as customModalActions from '../../../../store/modules/modal/customModal/actions';
// utils Import
import {
  yesOrNo,
  sellAverageAmount,
  checkBoxArray,
} from '../../../../utils/constants';
// Redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as signupActions from '../../../../store/modules/signup/actions';
// utils Import
import {isEmptyDataArray, regNumber} from '../../../../utils/functions';

const LiveExperience = (props) => {
  const dispatch = useDispatch();

  const {
    broadcastExperience,
    broadcastExperienceIndex,
    broadcastItemSellIndex,
    sellingPriceIndex,
    sellingExperience,
    numOfLive,
    isValidNumOfLive,
    sellingPrice,
    sellingCategory,
    statebar,
    broadcastItemSellStatus,
  } = useSelector(
    (state) => ({
      broadcastExperience: state.signup.broadcastExperience,
      broadcastExperienceIndex: state.signup.broadcastExperienceIndex,
      broadcastItemSellIndex: state.signup.broadcastItemSellIndex,
      sellingPriceIndex: state.signup.sellingPriceIndex,
      sellingExperience: state.signup.sellingExperience,
      numOfLive: state.signup.numOfLive,
      isValidNumOfLive: state.signup.isValidNumOfLive,
      sellingPrice: state.signup.sellingPrice,
      sellingCategory: state.signup.sellingCategory,
      statebar: state.signup.statebar,
      broadcastItemSellStatus: state.signup.broadcastItemSellStatus,
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

  // 방송 경험
  const onPressBroadCastExperience = (exp) => {
    dispatch(signupActions.change_broadcast_experience(exp[0]));
  };

  // 판매경험
  const onPressSellingExperience = (exp) => {
    dispatch(signupActions.broadcast_item_sell_status(true));
    dispatch(signupActions.change_selling_experience(exp[0]));
  };

  // 방송횟수
  const onChangeTextLiveOfNum = (numOfLive, isValid) => {
    dispatch(signupActions.change_num_of_live(numOfLive));
    dispatch(signupActions.change_is_valid_num_of_live(isValid));
  };

  // 판매 가격
  const onPressSellingPrice = (price) => {
    dispatch(signupActions.change_selling_price(price[0]));
  };
  // 다음 버튼
  const onPressNext = () => {
    if (!broadcastExperience) {
      dispatch(
        customModalActions.change_modal_message(
          '해당 질문에 답을 선택해주세요',
        ),
      );
      return;
    } else if (
      broadcastExperience === '예' &&
      (numOfLive === 0 || !isValidNumOfLive)
    ) {
      dispatch(
        customModalActions.change_modal_message(
          '라이브 방송 횟수를 입력해주세요',
        ),
      );
      return;
    } else if (!broadcastItemSellStatus && broadcastExperience === '예') {
      dispatch(
        customModalActions.change_modal_message(
          '해당 질문에 답을 선택해주세요',
        ),
      );
      return;
    } else if (
      sellingExperience === '예' &&
      (isEmptyDataArray([sellingPrice]) || sellingCategory.length === 0)
    ) {
      dispatch(
        customModalActions.change_modal_message(
          '판매 금액과 판매 상품을 선택해주세요',
        ),
      );
      return;
    }

    dispatch(signupActions.change_statebar(statebar + 1));
  };
  // 카테고리 출력
  const renderInterest = () => {
    let pressedData = [];
    if (!sellingCategory) {
      return '카테고리 선택하기';
    } else {
      for (let i = 0; i < sellingCategory.length; i++) {
        pressedData.push(sellingCategory[i] + '\t');
      }
      return pressedData;
    }
  };

  return (
    <View height={'100%'} justifyContent={'space-between'}>
      <View justifyContent={'flex-start'} marginLeft={20} marginRight={20}>
        <Text ftLarge ftTheme bold>
          01 라이브 경험
        </Text>

        <View marginTop={30}>
          <Text ftDarkNavy bold>
            SNS 라이브 방송을 해보셨나요?
          </Text>
          <View width={'100%'} marginTop={15}>
            <SelectButtons
              data={checkBoxArray(yesOrNo)}
              lineCnt={2}
              onPress={onPressBroadCastExperience}
              isOnlyOne={true}
              selectedIndex={broadcastExperienceIndex}
            />
          </View>
        </View>

        {broadcastExperience === '예' ? (
          <>
            <View marginTop={30}>
              <ViewRow width={'100%'} marginTop={10}>
                <TextAndInputBottomLine
                  title={'라이브 방송 횟수(누적)'}
                  maxLength={10}
                  errorText={'숫자만 입력이 가능합니다'}
                  onChangeText={(numOfLive, isValid) =>
                    onChangeTextLiveOfNum(numOfLive, isValid)
                  }
                  isOnlyNumber={true}
                  isBottomLine={true}
                  value={numOfLive}
                  valid={regNumber}
                  width={'50%'}
                />
                <View justifyContent={'flex-end'} paddingBottom={20}>
                  <Text>회</Text>
                </View>
              </ViewRow>
            </View>

            <View marginTop={30}>
              <Text ftDarkNavy bold>
                라이브 방송으로 아이템을 판매 해보셨나요?
              </Text>
              <View width={'100%'} marginTop={15}>
                <SelectButtons
                  data={checkBoxArray(yesOrNo)}
                  lineCnt={2}
                  onPress={onPressSellingExperience}
                  isOnlyOne={true}
                  selectedIndex={broadcastItemSellIndex}
                />
              </View>
            </View>
            {sellingExperience === '예' ? (
              <>
                <View marginTop={30}>
                  <Text ftDarkNavy bold>
                    판매한 상품의 개당 판매 금액은 얼마인가요?
                  </Text>
                  <View width={'100%'} marginTop={15}>
                    <SelectButtons
                      data={checkBoxArray(sellAverageAmount)}
                      lineCnt={3}
                      onPress={onPressSellingPrice}
                      value={sellingPrice}
                      isOnlyOne={true}
                      selectedIndex={sellingPriceIndex}
                    />
                  </View>
                </View>

                <View marginTop={30}>
                  <Text ftDarkNavy bold>
                    어떤 아이템을 판매 해보셨나요?(다중 선택 가능)
                  </Text>

                  <ViewBorderRow
                    borderLeftWidth={'0'}
                    borderRightWidth={'0'}
                    borderTopWidth={'0'}
                    width={'100%'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    brLightGray>
                    <Button
                      width={'100%'}
                      justifyContent={'space-between'}
                      onPress={props.onPressBottomModalOpen}>
                      <Text ftLightGray marginRight={11}>
                        {renderInterest()}
                      </Text>
                      <Image
                        width={8}
                        height={8}
                        source={require('../../../../assets/common/black_triangle.png')}
                      />
                    </Button>
                  </ViewBorderRow>
                </View>
              </>
            ) : null}
          </>
        ) : null}
      </View>
      <BottomButton onPress={() => onPressNext()} text={'다음'} />
    </View>
  );
};

export default LiveExperience;
