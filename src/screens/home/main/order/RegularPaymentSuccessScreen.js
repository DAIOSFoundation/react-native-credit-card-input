import React, {useEffect} from 'react';
import {Content, Spinner} from 'native-base';
import {
  SafeAreaView,
  ScrollView,
  ViewRow,
} from '../../../../components/styled/View';
import {Image} from '../../../../components/styled/Image';
import {Text} from '../../../../components/styled/Text';
import {Actions} from 'react-native-router-flux';
import BottomButton from '../../../../components/buttons/BottomButton';
import {screenHeight, screenWidth} from '../../../../components/styled/ScreenSize';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as paymentActions from '../../../../store/modules/payment/actions';

const RegularPaymentSuccessScreen = (props) => {
  const dispatch = useDispatch();
  const {} = useSelector((state) => ({}), shallowEqual);

  useEffect(() => {
    return () => {
      console.log('reset_initial_state');
      dispatch(paymentActions.reset_initial_state());
    };
  }, []);

  const textChange = () => {
    return props.loading ? '결제 중입니다' : '결제가 완료 되었습니다';
  }

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
            {textChange()}
          </Text>
        <ViewRow
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Content>
            <Spinner
              color={props.color}
            />
          </Content>
        </ViewRow>
      </ScrollView>
      {!props.loading ? (
        <BottomButton
          onPress={() => Actions.reset('tabBar')}
          text={'메인으로 이동'}
        />
      ) : (
        null
      )}
    </SafeAreaView>
  );
};

export default RegularPaymentSuccessScreen;
