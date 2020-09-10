import React, {useEffect, useState, useCallback} from 'react';
// Styled Component
import {
  SafeAreaView,
  ScrollView,
  View,
  ViewBorderRadius,
} from '../../../../components/styled/View';
import Topbar from '../../../../components/bar/Topbar';
import {Text} from '../../../../components/styled/Text';
import {Button} from '../../../../components/styled/Button';
import BottomButton from '../../../../components/buttons/BottomButton';
import {screenWidth} from '../../../../components/styled/ScreenSize';
import LoadingBar from '../../../../components/loadingBar/LoadingBar';
import ToastMessage from '../../../../components/toast/ToastMessage';
// NPM Module
import {Actions} from 'react-native-router-flux';
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as regularPaymentActions from '../../../../store/modules/regularPayment/actions';
import * as globalActions from '../../../../store/modules/global/actions';
// utils Import
import {LocaleString, percentWidth} from '../../../../utils/functions';
// TabView Import
import DeliveryAreaRoute from './tabView/deliveryAreaRoute';
import NewInputRoute from './tabView/newInputRoute';
import CustomModal from '../../../../components/modal/CustomModal';

// card slider
import SliderCardImage from '../../../../components/carousel/SliderCardImage';
import {SliderCardView} from '../../../CreditCard'

// 구매할 제품 리스트 확인 후 구매
const RegularPaymentScreen = () => {
  // redux
  const dispatch = useDispatch();

  const {
    userId,
    jwtToken,
    loading,
    creditCardInfo,
    postCreditCardStatus,
  } = useSelector(
    (state) => ({
      userId: state.user.userId,
      jwtToken: state.user.jwtToken,
      loading: state.loading['pay/GET_USER_ADDRESS'],
      creditCardInfo: state.regularPayment.creditCardInfo,
      postCreditCardStatus: state.regularPayment.postCreditCardStatus,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(regularPaymentActions.get_credit_card_info({jwtToken}))
  }, [postCreditCardStatus])

  if (loading) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}} />
      </View>
    );
  }

  return (
    <>
      <ToastMessage />
      <SafeAreaView>
       <Topbar
          isLine
          title={'정기결제'}
          onPressLeft={() => Actions.pop()}
          isLeftButton={true}
        />
        <ScrollView marginTop={15}>
          <View>
            <Text marginLeft={35} marginBottom={10}>
              결제하실 카드를 선택하세요
            </Text>
          </View>
          <ViewBorderRadius>
            {/* 카드 정보 슬라이더 */}
           <SliderCardImage
              data={creditCardInfo}
              sliderWidth={screenWidth}
              itemWidth={percentWidth(72)}
              pagination
            />
            {/* 카드 삭제 버튼 */}
            <ViewBorderRadius 
              bgTheme
              marginTop={20}
              marginLeft={20}
              marginRight={310}
            >
              <Button onPress={() => Actions.addCardScreen()}>
                <Text ftWhite>
                  카드삭제
                </Text>
              </Button>
            </ViewBorderRadius>
         </ViewBorderRadius>
       </ScrollView>
        <BottomButton textSize={16} text={'해당 카드로 결제'} />
      </SafeAreaView>
    </>
  );
};

export default RegularPaymentScreen;
