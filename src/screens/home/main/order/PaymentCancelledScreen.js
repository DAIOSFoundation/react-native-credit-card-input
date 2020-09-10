import React from 'react';
// Styled Component
import {SafeAreaView, ScrollView} from '../../../../components/styled/View';
import {Image} from '../../../../components/styled/Image';
import {Text} from '../../../../components/styled/Text';
import BottomButton from '../../../../components/buttons/BottomButton';
// NPM Module
import {Actions} from 'react-native-router-flux';

const PaymentCancelledScreen = () => {
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
          고객에 의해 결제가 취소되었습니다.
        </Text>
      </ScrollView>
      <BottomButton onPress={() => Actions.pop()} text={'확인'} />
    </SafeAreaView>
  );
};

export default PaymentCancelledScreen;
