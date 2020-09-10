import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
// Styled Component
import {View} from '../../../../../../../components/styled/View';
import {Image} from '../../../../../../../components/styled/Image';
import {Text} from '../../../../../../../components/styled/Text';
import BottomButton from '../../../../../../../components/buttons/BottomButton';
// NPM Module
import {Actions} from 'react-native-router-flux';
// assets Image
const checkPink = require('../../../../../../../assets/broadcastManual/icon_check_05_pink.png');

const BroadcastUploadSuccessScreen = () => {
  // 기기 뒤로가기 버튼 기능 {s}
  const backAndroid = () => {
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAndroid);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAndroid);
    };
  }, [backAndroid]);
  // 기기 뒤로가기 버튼 기능 {e}

  // 메인으로 가는 버튼 기능
  const onPressButton = () => {
    Actions.reset('tabBar');
  };

  return (
    <View
      bgDarkNavy
      height={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <View marginTop={150} alignItems={'center'}>
        <Image width={62} height={62} source={checkPink} />
        <Text ftWhite bold fontSize={22} marginTop={30}>
          라이브 방송 업로드 완료!
        </Text>
        <Text fontSize={16} ftWhite marginTop={20}>
          라이브 방송 한 번만으로 매달 내 통장에
        </Text>
        <Text fontSize={16} ftWhite marginTop={5}>
          쌓이는 수익금을 확인해 보세요.
        </Text>
      </View>
      <BottomButton onPress={onPressButton} text={'메인으로'} />
    </View>
  );
};

export default BroadcastUploadSuccessScreen;
