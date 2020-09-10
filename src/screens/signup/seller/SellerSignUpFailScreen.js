import React from 'react';
import {View, Container} from '../../../components/styled/View';
import {Text} from '../../../components/styled/Text';
import {Image} from '../../../components/styled/Image';
import SellerProfile from '../../../components/profiles/SellerProfile';
import {ButtonRadius} from '../../../components/styled/Button';
import SelectCheckBoxes from '../../../components/checkboxes/SelectCheckBoxes';
import {interestItems} from '../../../utils/constants';
import {Actions} from 'react-native-router-flux';

//셀러 회원가입 실패
const SellerSignUpFailScreen = () => {
  const onPressMain = () => {
    Actions.reset('tabBar');
  };

  const onPressReason = () => {
    Actions.push('sellerSignUpFailReasonScreen');
  };

  return (
    <>
      <Container bgDarkNavy justifyContent={'space-between'}>
        <View
          width={'100%'}
          marginTop={110}
          marginBottom={50}
          justifyContent={'center'}
          alignItems={'center'}>
          <Text ftWhite fontSize={22} bold>
            죄송합니다
          </Text>
          <Text ftIceBlue marginTop={15} marginBottom={15}>
            아쉽게도 셀러 승인이 되지 않았습니다.
          </Text>
          <Image
            width={180}
            height={180}
            source={require('../../../assets/signup/cry_face.png')}
          />
          <Text ftIceBlue marginTop={40} textAlign={'center'}>
            승인 거절의 사레를 알아보고{'\n'}셀러에 다시 도전해보세요
          </Text>
        </View>
        <View
          width={'100%'}
          paddingLeft={50}
          marginRight={50}
          marginBottom={50}>
          <ButtonRadius
            bgTheme
            height={55}
            borderRadius={8}
            onPress={onPressMain}>
            <Text ftWhite>메인으로</Text>
          </ButtonRadius>
          <ButtonRadius
            marginTop={15}
            height={55}
            borderRadius={8}
            onPress={onPressReason}>
            <Text ftWhite textDecorationLine={'underline'}>
              승인보류
            </Text>
            <Image
              width={15}
              height={15}
              source={require('../../../assets/signup/icon_questionmark_dark.png')}
            />
          </ButtonRadius>
        </View>
      </Container>
    </>
  );
};

export default SellerSignUpFailScreen;
