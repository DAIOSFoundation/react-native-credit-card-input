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

const PaymentSuccessScreen = (props) => {
  const dispatch = useDispatch();
  const {} = useSelector((state) => ({}), shallowEqual);

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
          width={158}
          height={132}
          source={require('../../../../assets/main/pic_pay_success.png')}
        />
        <Text textAlign={'center'} marginTop={40} bold ftLarge>
          결제가 완료 되었습니다
        </Text>
        <ViewRow
          justifyContent={'center'}
          alignItems={'center'}
          style={{alignItems: 'center'}}>
          <CountDown
            digitTxtStyle={{color: 'red'}}
            timeLabels={{m: null, s: null}}
            until={5}
            onFinish={() => Actions.reset('tabBar')}
            timeToShow={['S']}
            digitStyle={{
              backgroundColor: 'transport',
            }}
            style={{marginTop: 12}}
          />
          <Text textAlign={'center'} marginTop={15}>
            초 후 메인으로 이동합니다
          </Text>
        </ViewRow>
      </ScrollView>
      <BottomButton
        onPress={() => Actions.reset('tabBar')}
        text={'메인으로 이동'}
      />
    </SafeAreaView>
  );
};

export default PaymentSuccessScreen;
