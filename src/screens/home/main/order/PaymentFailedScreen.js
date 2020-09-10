import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ViewRow,
} from '../../../../components/styled/View';
import {Image} from '../../../../components/styled/Image';
import {Text} from '../../../../components/styled/Text';
import CountDown from 'react-native-countdown-component';
import {Actions} from 'react-native-router-flux';
import BottomButton from '../../../../components/buttons/BottomButton';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as paymentActions from '../../../../store/modules/payment/actions';

const PaymentFailedScreen = (props) => {
  const dispatch = useDispatch();
  const {error_code, error_msg} = useSelector(
    (state) => ({
      error_code: state.payment.error_code,
      error_msg: state.payment.error_msg,
    }),
    shallowEqual,
  );

  useEffect(() => {
    return () => {
      console.log('reset_initial_state');
      dispatch(paymentActions.reset_initial_state());
    };
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          alignSelf={'center'}
          marginTop={150}
          width={180}
          height={180}
          source={require('../../../../assets/main/pic_pay_failed.png')}
        />
        <Text textAlign={'center'} marginTop={40} bold ftLarge>
          하단의 이유로 결제가 실패하였습니다.
        </Text>
        <Text marginLeft={20} marginRight={20} marginTop={40} ftLarge>
          에러코드 : {error_code}
        </Text>
        <Text marginLeft={20} marginRight={20} marginTop={3} ftLarge>
          에러메세지 : {error_msg}
        </Text>
        <Text textAlign={'center'} marginTop={40}>
          다시 결제시도를 해보시고 문제가 지속되는 경우 관리자
          sellervision4u@gmail.com 으로 메일을 보내주십시오.
        </Text>
      </ScrollView>
      <BottomButton onPress={() => Actions.pop()} text={'확인'} />
    </SafeAreaView>
  );
};

export default PaymentFailedScreen;
