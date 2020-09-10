import React, {useState, useEffect} from 'react';
// NPM Module
import Clipboard from '@react-native-community/clipboard';
// Styled Component
import {View} from '../../../../../../../components/styled/View';
import {Text} from '../../../../../../../components/styled/Text';
import Topbar from '../../../../../../../components/bar/Topbar';
import BottomButton from '../../../../../../../components/buttons/BottomButton';
import LoadingBar from '../../../../../../../components/loadingBar/LoadingBar';
import BasicTextInput from '../../../../../../../components/input/BasicTextInput';
import {Button} from '../../../../../../../components/styled/Button';
// NPM Module
import {Actions} from 'react-native-router-flux';
// Redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as customModalActions from '../../../../../../../store/modules/modal/customModal/actions';
import * as live4StepActions from '../../../../../../../store/modules/myinfo/live4Step/actions';

const IgtvLinkInputScreen = () => {
  const dispatch = useDispatch();

  const {
    jwtToken,
    selectedBroadcastId,
    errorMsg,
    successMsg,
    loading,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      selectedBroadcastId: state.live4Step.selectedBroadcastId,
      errorMsg: state.live4Step.errorMsg,
      successMsg: state.live4Step.successMsg,
      loading: state.loading['live4Step/POST_BROADCAST_UPLOAD'],
    }),
    shallowEqual,
  );

  const [igtvLink, setIgtvLink] = useState('');

  useEffect(() => {
    if (errorMsg === 'uploadError') {
      dispatch(customModalActions.change_modal_message('잘못된 요청입니다'));
    } else if (successMsg === 'uploadSuccess') {
      Actions.broadcastUploadSuccessScreen();
    }
    dispatch(live4StepActions.reset_msg());
  }, [errorMsg, successMsg]);

  // 클립보드 복사 기능
  const clipBoardCopy = async () => {
    const copyText = await Clipboard.getString();
    setIgtvLink(copyText);
  };

  // 확인버튼 기능
  const onPressButton = () => {
    let param = {
      jwtToken: jwtToken,
      broadcastId: selectedBroadcastId,
      igtvUrl: igtvLink,
    };

    dispatch(live4StepActions.post_broadcast_upload(param));
  };

  const onPressBack = () => {
    Actions.pop();
  };

  if (loading) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}} />
      </View>
    );
  }

  return (
    <View bgDarkNavy height={'100%'} justifyContent={'space-between'}>
      <View>
        <Topbar
          bgColor={{bgDarkNavy: true}}
          titleColor={{ftWhite: true}}
          lineColor={{brLightNavyGray: true}}
          leftButtonColor={'white'}
          isLine
          title={'IGTV 링크 입력'}
          isLeftButton
          onPressLeft={onPressBack}
        />
        <View paddingLeft={15} paddingRight={15}>
          <Text fontSize={22} bold ftWhite marginTop={30}>
            IGTV 링크 입력
          </Text>
          <Text ftIceBlue style={{lineHeight: 20}} marginTop={20}>
            인스타그램에서 복사한 IGTV 영상 링크를 입력하셔야 셀러비전 앱에서
            방송을 다시 보기 할 수 있습니다.
          </Text>
          <Text ftIceBlue textDecorationLine={'underline'}>
            입력하지 않을 시 셀러 수익이 발생하지 않습니다.
          </Text>
          <Text ftWhite bold marginTop={50}>
            라이브 방송 IGTV 링크
          </Text>
          <View marginTop={15}>
            <BasicTextInput
              height={50}
              editable={false}
              brColor={'#cbced5'}
              placeholder={'복사한 라이브 방송 IGTV 링크를 입력하세요.'}
              placeholderTextColor={'#8f9499'}
              valueColor={'#ffffff'}
              value={igtvLink}
            />
          </View>
          <View marginTop={20}>
            <Button
              justifyContent={'flex-start'}
              width={'auto'}
              height={'auto'}
              onPress={clipBoardCopy}>
              <Text ftGold textDecorationLine={'underline'}>
                클립보드에 붙여넣기
              </Text>
            </Button>
          </View>
        </View>
      </View>
      <BottomButton onPress={onPressButton} text={'확인'} textSize={20} />
    </View>
  );
};

export default IgtvLinkInputScreen;
