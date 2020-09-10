import React from 'react';
// Styled Component
import {
  ScrollView,
  View,
  ViewRow,
} from '../../../../../../../components/styled/View';
import Topbar from '../../../../../../../components/bar/Topbar';
import {Text} from '../../../../../../../components/styled/Text';
import {Image} from '../../../../../../../components/styled/Image';
import BottomButton from '../../../../../../../components/buttons/BottomButton';
import {Actions} from 'react-native-router-flux';
// assets Image
const checkPressedGold = require('../../../../../../../assets/broadcastManual/icon_check_pressed_gold.png');
const noticeImage01 = require('../../../../../../../assets/broadcastManual/live_notice_img_01.png');
const noticeImage02 = require('../../../../../../../assets/broadcastManual/live_notice_img_02.png');
const noticeImage03 = require('../../../../../../../assets/broadcastManual/notice_img_03.png');
const noticeImage04 = require('../../../../../../../assets/broadcastManual/notice_img_04.png');
const noticeImage05 = require('../../../../../../../assets/broadcastManual/notice_img_05.png');
const noticeImage06 = require('../../../../../../../assets/broadcastManual/notice_img_06.png');
const moreIcon = require('../../../../../../../assets/broadcastManual/sample_more_icon.png');

const NoticeScreen = () => {
  // 주의사항 확인 버튼 기능
  const onPressButton = () => {
    Actions.live4StepActivateScreen();
  };

  const onPressBack = () => {
    Actions.pop();
  };

  return (
    <View height={'100%'} bgDarkNavy>
      <Topbar
        bgColor={{bgDarkNavy: true}}
        titleColor={{ftWhite: true}}
        lineColor={{brLightNavyGray: true}}
        leftButtonColor={'white'}
        isLine
        title={'라이브 방송 주의사항'}
        isLeftButton
        onPressLeft={onPressBack}
      />
      <ScrollView>
        <View paddingLeft={15} paddingRight={15}>
          <View marginTop={30}>
            <ViewRow>
              <Image width={24} height={24} source={checkPressedGold} />
              <Text ftGold bold>
                라이브 방송 시작 전 반드시 읽어주세요
              </Text>
            </ViewRow>
            <Text ftLarge bold ftWhite marginTop={20}>
              인스타그램 라이브 방송 시 주의사항
            </Text>
            <Text style={{lineHeight: 22}} ftWhite marginTop={15}>
              인스타그램 라이브 방송 종료 후, 아래의 단계를 모두 진행하셔야
              셀러비전 앱에서 방송을 다시 보기 할 수 있습니다.
            </Text>
            <Text
              style={{lineHeight: 22}}
              ftWhite
              marginTop={15}
              bold
              textDecorationLine={'underline'}>
              설명된 과정을 불이행하여 셀러 수익이 발생하지 않는 불이익은
              셀러비전 측에서 책임지지 않습니다.
            </Text>
          </View>
          <View marginTop={50} justifyContent={'center'} alignItems={'center'}>
            <Image
              alignSelf={'center'}
              width={278}
              height={425}
              source={noticeImage01}
            />
            <Text ftWhite marginTop={15}>
              1단계: 라이브 방송 종료 후 ‘동영상 다운로드’ 버튼을 누르세요.
            </Text>
          </View>
          <View marginTop={50} justifyContent={'center'} alignItems={'center'}>
            <Image
              alignSelf={'center'}
              width={300}
              height={600}
              source={noticeImage02}
            />
            <Text
              ftWhite
              marginTop={15}
              marginBottom={50}
              style={{lineHeight: 20}}>
              2단계: 셀러비전 앱으로 돌아와 ‘라이브 방송 종료’ 버튼을 누른 후
              나오는 화면에서 저장했던 라이브 방송 동영상을 업로드합니다.
            </Text>
          </View>
        </View>
        <BottomButton
          onPress={onPressButton}
          text={'주의사항을 확인하였습니다'}
        />
      </ScrollView>
    </View>
  );
};

export default NoticeScreen;
