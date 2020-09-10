import React from 'react';
// Styled Component
import {
  SafeAreaView,
  View,
  ViewAbsolute,
} from '../../../components/styled/View';
import {ImageCirclePreview} from '../../../components/styled/Image';
import {Text} from '../../../components/styled/Text';
import Topbar from '../../../components/bar/Topbar';
// NPM Module
import {Actions} from 'react-native-router-flux';
// assets Image
const sellervisionLogo = require('../../../assets/main/sellervisionLogo.png');

const VersionInfoScreen = () => {
  const onPressBack = () => {
    Actions.pop();
  };

  return (
    <SafeAreaView>
      <View zIndex={10000}>
        <Topbar
          isLine
          title={'버전정보'}
          onPressLeft={onPressBack}
          isLeftButton={true}
        />
      </View>
      <ViewAbsolute
        width={'100%'}
        height={'100%'}
        justifyContent={'center'}
        alignItems={'center'}>
        <ImageCirclePreview size={70} source={sellervisionLogo} />
        <Text ftDarkNavy ftLarge marginTop={15}>
          현재 버전 1.0.11
        </Text>
      </ViewAbsolute>
    </SafeAreaView>
  );
};

export default VersionInfoScreen;
