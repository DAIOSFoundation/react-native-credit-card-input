import React, {useCallback, useEffect} from 'react';
// Styled Component
import {
  Container,
  ScrollView,
  View,
  ViewBorderRadius,
} from '../../../../../../components/styled/View';
import {Image, ImageBorder} from '../../../../../../components/styled/Image';
import {
  screenHeight,
  screenWidth,
} from '../../../../../../components/styled/ScreenSize';
import BottomButton from '../../../../../../components/buttons/BottomButton';
import {Text} from '../../../../../../components/styled/Text';
import Topbar from '../../../../../../components/bar/Topbar';
// Redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as live4StepActions from '../../../../../../store/modules/myinfo/live4Step/actions';
import * as customModalActions from '../../../../../../store/modules/modal/customModal/actions';
// NPM Module
import {Actions} from 'react-native-router-flux';

const Live4StepActivateScreen = () => {
  const dispatch = useDispatch();

  const {
    jwtToken,
    selectedBroadcast,
    selectedBroadcastId,
    successMsg,
    errorMsg,
    broadcastStatus,
    rendering,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      selectedBroadcast: state.live4Step.selectedBroadcast,
      selectedBroadcastId: state.live4Step.selectedBroadcastId,
      successMsg: state.live4Step.successMsg,
      errorMsg: state.live4Step.errorMsg,
      broadcastStatus: state.live4Step.broadcastStatus,
      rendering: state.live4Step.rendering,
    }),
    shallowEqual,
  );

  // 셀러의 단일방송정보 호출
  useEffect(() => {
    if (jwtToken && selectedBroadcastId) {
      const params = {
        jwtToken,
        selectedBroadcastId,
      };
      dispatch(live4StepActions.request_broadcast_by_id(params));
    }
  }, [jwtToken, selectedBroadcastId]);

  useEffect(() => {
    if (errorMsg === 'E2006' || errorMsg === 'E0000') {
      dispatch(
        customModalActions.change_modal_message('현재 방송중이지 않습니다'),
      );
      dispatch(live4StepActions.reset_msg());
    }

    return () => {
      dispatch(live4StepActions.reset_msg());
    };
  }, [errorMsg]);

  useEffect(() => {
    if (rendering) {
      if (broadcastStatus === 6) {
        // Actions.igtvLinkInputScreen();
        Actions.videoUploadScreen();
      } else if (broadcastStatus === 5) {
        dispatch(
          customModalActions.change_modal_message(
            '인스타 라이브 방송을 먼저 종료해주세요',
          ),
        );
      }
    }

    return () => {
      dispatch(live4StepActions.change_rendering_init());
    };
  }, [rendering]);

  const tryConnectIg = () => {
    const params = {
      jwtToken,
      selectedBroadcastId,
    };
    dispatch(live4StepActions.request_ig(params));
  };

  const broadcastTerminate = () => {
    const params = {
      jwtToken,
      selectedBroadcastId,
    };
    dispatch(live4StepActions.request_broadcast_by_id_status(params));
  };
  // const activateIg = () => {
  //   const attrFrom = {
  //     isOneButton: true,
  //     size: '100%',
  //     buttonHeight: 55,
  //     scrollJustifyContent: 'center',
  //     elements: (
  //       <SafeAreaView width={'100%'}>
  //         <View justifyContent={'center'} bgDarkGrayBlue>
  //           <ViewRow
  //             marginBottom={20}
  //             paddingTop={15}
  //             paddingLeft={15}
  //             paddingRight={15}>
  //             <Image
  //               resizeMode={'cover'}
  //               width={24}
  //               height={24}
  //               source={require('../../../../../../assets/checkbox/icon_check_pressed_02.png')}
  //             />
  //             <Text ftTheme ftLarge bold>
  //               반드시 읽어주세요
  //             </Text>
  //           </ViewRow>
  //           <View paddingLeft={15} paddingRight={15}>
  //             <Text ftWhite ftLarge bold marginBottom={20}>
  //               인스타그램 라이브 방송 시 주의사항
  //             </Text>
  //             <Text ftWhite>
  //               라이브 방송 종류 이후에{' '}
  //               <Text ftWhite bold>
  //                 [스토리에 공유]
  //               </Text>{' '}
  //               버튼을 반드시 누르셔야 셀러비전 앱에서 방송을 다시보기 할 수
  //               있습니다.'
  //             </Text>
  //           </View>
  //           <Image
  //             style={{alignSelf: 'center'}}
  //             width={screenWidth * 0.8}
  //             height={500}
  //             resizeMode={'contain'}
  //             marginTop={20}
  //             marginBottom={20}
  //             // source={require('../../../../../../assets/myinfo/icon_video_upload.png')}
  //             source={require('../../../../../../assets/myinfo/insta_live_notice_image_resize.png')}
  //           />
  //           <Text
  //             textDecorationLine={'underline'}
  //             bold
  //             ftWhite
  //             paddingBottom={10}
  //             paddingLeft={15}
  //             paddingRight={15}>
  //             '스토리 공유'를 하지 않아 셀러 수익이 발생하지 않는 불이익은
  //             셀러비전 측에서 책임지지 않습니다.
  //           </Text>
  //         </View>
  //       </SafeAreaView>
  //     ),
  //   };
  //   dispatch(customModalActions.change_modal_attr(attrFrom));
  //   dispatch(customModalActions.change_modal_onpress_ok(tryConnectIg));
  //   dispatch(customModalActions.change_modal_visible(true));
  // };

  const onPressClose = () => {
    Actions.pop();
  };

  const igBroadcast = useCallback(() => {
    return selectedBroadcast.broadcast_status !== 'active' &&
      selectedBroadcast.broadcast_status !== 'interrupted' ? (
      <>
        <Text ftTheme ftLarge>
          연동되지 않았습니다{'\n'}
        </Text>
        <Text ftWhite>아래 버튼을 눌러 다시시도해주세요</Text>
      </>
    ) : (
      <>
        <Text marginTop={20} ftTheme ftLarge>
          방송이 성공적으로 연동되었습니다
        </Text>
        <Text marginTop={5} ftWhite>
          인스타그램으로 돌아가 라이브 방송을 진행하세요!
        </Text>
        <View marginTop={20}>
          <Text ftWhite>인스타그램 라이브 방송을 마치셨다면 하단의</Text>
          <Text ftWhite>
            ‘라이브 방송 종료’ 버튼을 눌러 다음 단계를 진행하세요.
          </Text>
        </View>
      </>
    );
  }, [selectedBroadcast]);

  const bottomButtonQuarter = useCallback(() => {
    return selectedBroadcast.broadcast_status !== 'active' &&
      selectedBroadcast.broadcast_status !== 'interrupted' ? (
      <BottomButton
        bgTheme
        onPress={tryConnectIg}
        width={'100%'}
        text={'인스타그램 라이브방송 연동'}
      />
    ) : (
      <BottomButton
        bgTheme
        onPress={broadcastTerminate}
        width={'100%'}
        text={'라이브 방송 종료'}
      />
    );
  }, [selectedBroadcast]);

  return (
    <>
      <Topbar
        titleColor={{ftWhite: true}}
        bgColor={{bgDarkNavy: true}}
        lineColor={{brLightNavyGray: true}}
        leftButtonImage={require('../../../../../../assets/common/icon_back_white.png')}
        onPressLeft={onPressClose}
        isLeftButton={true}
        title={'라이브 방송 활성화'}
        isLine={true}
      />
      <ScrollView bgDarkNavy height={screenHeight}>
        <Container
          justifyContent={'space-between'}
          marginLeft={20}
          marginRight={20}>
          <View
            width={'100%'}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            marginBottom={30}>
            <Text ftWhite ftLarge bold marginTop={20} marginBottom={20}>
              인스타그램 라이브 방송 활성화
            </Text>
            <Text ftWhite fontSize={14}>
              인스타그램에서 라이브 방송을 시작 후 셀러비전 앱으로 돌아와 아래
              버튼을 눌러주세요.
            </Text>
            <Text ftWhite fontSize={14}>
              연결 성공시 라이브 방송 화면의 이미지를 미리 볼 수 있습니다.
            </Text>
          </View>
          {selectedBroadcast && selectedBroadcast.cover_frame_url ? (
            <ImageBorder
              width={screenWidth * 0.4}
              height={screenHeight * 0.4}
              resizeMode={'cover'}
              source={{uri: selectedBroadcast.cover_frame_url}}
            />
          ) : (
            <ViewBorderRadius
              bgDarkGrayBlue
              borderRadius={10}
              alignItems={'center'}
              justifyContent={'center'}
              height={screenHeight * 0.4}
              width={screenWidth * 0.4}>
              <Image
                width={46}
                height={44}
                resizeMode={'stretch'}
                source={require('../../../../../../assets/myinfo/icon_video_upload.png')}
              />
            </ViewBorderRadius>
          )}
          {/*<Text ftWhite fontSize={14} marginTop={5}>*/}
          {/*  아래의 라이브 방송 연동 버튼을 눌러주세요.*/}
          {/*</Text>*/}
          {selectedBroadcast ? (
            igBroadcast()
          ) : (
            <Text ftWhite>아래의 라이브방송 연동 버튼을 눌러주세요</Text>
          )}
        </Container>
      </ScrollView>
      {selectedBroadcast ? (
        bottomButtonQuarter()
      ) : (
        <BottomButton
          bgTheme
          onPress={tryConnectIg}
          width={'100%'}
          text={'인스타그램 라이브방송 연동'}
        />
      )}
    </>
  );
};
export default Live4StepActivateScreen;
