import React, {useEffect, useState} from 'react';
import {Clipboard} from 'react-native';
// Styled Component
import {ButtonRadius} from '../../../../../../components/styled/Button';
import {
  View,
  ViewRow,
  ViewBorderRadius,
} from '../../../../../../components/styled/View';
import {Text} from '../../../../../../components/styled/Text';
import {Image} from '../../../../../../components/styled/Image';
import {screenWidth} from '../../../../../../components/styled/ScreenSize';
// Screen Import
import Live4StepStateBar from './Live4StepStateBar';
// NPM Module
import {Actions} from 'react-native-router-flux';
// redux
import * as live4StepActions from '../../../../../../store/modules/myinfo/live4Step/actions';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as customModalActions from '../../../../../../store/modules/modal/customModal/actions';
import * as globalActions from '../../../../../../store/modules/global/actions';
import * as uploadActions from '../../../../../../store/modules/loading/upload/actions';

// 방송 예정시간 전 block
import ToastMessage from '../../../../../../components/toast/ToastMessage';
import Moment from 'moment';

const Live4StepExplanation = (props) => {
  const broadcastId = props.broadcastId;
  const dispatch = useDispatch();

  const {
    jwtToken,
    email,
    successMsg,
    errorMsg,
    selectedBroadcastId,
    blockBeforeStartTime,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      email: state.user.email,
      successMsg: state.live4Step.successMsg,
      errorMsg: state.live4Step.errorMsg,
      selectedBroadcastId: state.live4Step.selectedBroadcastId,
      blockBeforeStartTime: state.live4Step.blockBeforeStartTime,
    }),
    shallowEqual,
  );

  // 스탭별 상단 내용
  const renderStepTitle = () => {
    switch (props.step) {
      case 0:
        return '';
      case 1:
        return 'Step 01 방송 시나리오 작성';
      case 2:
        return 'Step 02 방송일 등록';
      case 3:
        return 'Step 03 라이브방송 홍보하기';
      case 4:
        return 'Step 04 라이브 방송 시작';
      case 5:
        return 'Step 05 라이브 방송 중';
      case 6:
        return 'Step 06 라이브 방송 종료';
    }
  };

  // 스탭별 미미 내용
  const renderMimiContents = () => {
    if (props.step === 2 && props.requestContractEmail === true) {
      return '24시간 이내 관리자가 승인할 예정이니 조금만 기다려 주세요!';
    }
    if (props.step === 2 && props.changeConfirmText) {
      return '24시간 이내 관리자가 승인할 예정이니 조금만 기다려 주세요!';
    }
    switch (props.step) {
      // case 0:
      //   return '만나서 반갑습니다!\n라이브방송 가이드를 도와드릴 미미 입니다.\n샘플 상품을 수령하셨다면 샘플 수령 확인 버튼을 눌러주세요.';
      case 1:
        return '만나서 반갑습니다!\n라이브방송 가이드를 도와드릴 미미입니다.\n샘플을 잘 사용해 보셨나요?\n방송 가이드를 보고 방송 시나리오와 일정을 등록해주세요.';
      case 2:
        return `<모두사인>으로 방송계약이 진행됩니다. 셀러의 이메일(${email})로 방송 계약서를 전달해드립니다. 추후 승인시 메일로 알려드립니다.`;
      case 3:
        return `하단의 방송 구매코드를 복사 후 홍보해주세요.\n방송 시작일까지 2일 남았습니다. \n방송시작일이 되면 다음버튼이 활성화됩니다.`;
      case 4:
        return '인스타그램으로 라이브방송을 시작해봅시다!';
      case 5:
        return '현재 라이브방송 중입니다.';
      case 6:
        return '라이브 방송이 종료되었습니다.';
    }
  };

  // 스탭별 버튼 내용
  const renderLeftButtonText = () => {
    if (props.step === 2 && props.requestContractEmail === true) {
      return '승인 대기중';
    }
    if (props.step === 2 && props.changeConfirmText) {
      return '승인 대기중';
    }
    switch (props.step) {
      case 1:
        return '방송 시나리오 작성';
      case 2:
        return '방송 계약서 요청';
      case 3:
        return '구매코드 복사';
      case 4:
        return '라이브 방송 시작하기';
      case 5:
        return '방송중인 라이브방송';
      case 6:
        return '라이브 영상 업로드';
    }
  };
  // todo - 구매 url 통신 후 추가 해야함
  const copyToClipboard = () => {
    Clipboard.setString(
      `https://dev-api.sellervision.net/v1/broadcasts/${props.broadcastId}/products/${props.productId}/link`,
    );
    dispatch(globalActions.change_toast_message('구매 url이 복사되었습니다'));
  };

  // step4 라이브 방송 시작하기 버튼 클릭시 방송 예정 시간 이후에만 방송 가능하도록 구현
  const onlyLiveTime = () => {
    const currentTime = Number(Moment(new Date()).format('YYYYMMDDHHMM'));
    const startTime = Number(blockBeforeStartTime);

    if (currentTime < startTime) {
      // 테스트를 위해 주석처리.
      // dispatch(globalActions.change_toast_message('아직 방송 시간이 아닙니다'));
      Actions.noticeScreen();
    } else {
      Actions.noticeScreen();
    }
  };

  // 스탭별 왼쪽 버튼 이벤트
  const onPressLeft = () => {
    dispatch(live4StepActions.change_selected_broadcast_id(broadcastId));
    if (props.step === 2 && props.requestContractEmail === true) {
      dispatch(live4StepActions.request_broadcast(jwtToken));
      return '방송 계약서를 요청했습니다.';
    }
    const form = {
      jwtToken,
      broadcastId,
    };
    switch (props.step) {
      case 1:
        Actions.live4StepScenarioScreen();
        break;
      case 2:
        dispatch(live4StepActions.request_contract_email(form));
        dispatch(globalActions.change_toast_message('승인 요청 되었습니다.'));
        props.clickCheck();
        break;
      case 3:
        copyToClipboard();
        break;
      case 4:
        onlyLiveTime();
        break;
      case 5:
        Actions.live4StepActivateScreen();
        break;
      case 6:
        // Actions.igtvLinkInputScreen();
        Actions.videoUploadScreen();
        break;
    }
  };

  console.log('props.step', props.step);

  // 스탭별 오른쪽 버튼 이벤트
  const onPressRight = () => {
    switch (props.step) {
      case 1:
        break;
      case 3:
        const form = {
          jwtToken,
          broadcastId,
        };
        dispatch(live4StepActions.request_broadcast_ready(form));
        break;
      case 4:
        break;
    }
  };

  // 스탭별 오른쪽 버튼 내용
  const renderRightButtonText = () => {
    switch (props.step) {
      case 0:
        return '상품을 받지 못했습니다';
      case 3:
        return '다음';
    }
  };

  // 작성완료 확인 버튼
  const patchReviewAndPopOK = () => {
    Actions.pop();
  };

  // 확인버튼 클릭 시 새로고침
  const actionsRefreshOk = () => {
    Actions.refresh({key: 'MyInfo'});
  };

  useEffect(() => {
    const params = {
      jwtToken,
      selectedBroadcastId,
    };

    if (successMsg !== '') {
      if (successMsg === 'storeSuccess') {
        dispatch(
          customModalActions.change_modal_message('작성 완료되었습니다.'),
        );
        dispatch(
          customModalActions.change_modal_onpress_ok(patchReviewAndPopOK),
        );
      } else if (successMsg === 'prepareSuccess') {
        dispatch(customModalActions.change_modal_message('방송준비 완료'));
        dispatch(customModalActions.change_modal_onpress_ok(actionsRefreshOk));
      }
      dispatch(live4StepActions.reset_msg(''));
      dispatch(live4StepActions.reset_toast_msg(''));
      dispatch(live4StepActions.request_broadcast_by_id(params));
    }
  }, [successMsg]);

  // useEffect(() => {
  //   if (errorMsg !== '') {
  //     dispatch(
  //       globalActions.change_toast_message(
  //         `잠시 후 다시 시도해주세요\n${errorMsg}`,
  //       ),
  //     );
  //     dispatch(live4StepActions.reset_toast_msg(''));
  //     dispatch(live4StepActions.reset_msg(''));
  //   }
  // }, [errorMsg]);

  return (
    <View
      paddingLeft={20}
      paddingRight={20}
      marginBottom={20}
      width={screenWidth}>
      <Text ftDarkNavy bold ftLarge>
        {renderStepTitle()}
      </Text>

      {props.step !== 0 ? (
        <Live4StepStateBar
          key={props.broadcastId}
          state={props.step}
          data={['Step 01', 'Step 02', 'Step 03', 'Step 04']}
        />
      ) : null}

      <ViewRow>
        <Image
          width={50}
          height={40}
          resizeMode={'stretch'}
          source={require('../../../../../../assets/myinfo/mimi.png')}
        />
        <View>
          <ViewBorderRadius
            width={screenWidth - 100}
            marginLeft={10}
            marginRight={20}
            paddingLeft={10}
            paddingRight={10}
            paddingTop={10}
            paddingBottom={10}
            borderRadius={10}
            brIceBlue
            bgDarkWhite>
            <Text ftDarkNavy>{renderMimiContents()}</Text>
          </ViewBorderRadius>
          <ViewRow
            paddingLeft={10}
            width={screenWidth - 100}
            alignItems={'center'}>
            {props.step < 7 ? (
              <ButtonRadius
                bgTheme
                marginRight={10}
                marginTop={10}
                height={30}
                width={props.step === 0 ? '40%' : '60%'}
                onPress={() => onPressLeft()}>
                <Text ftWhite ftSize={13}>
                  {renderLeftButtonText()}
                </Text>
              </ButtonRadius>
            ) : null}
            {props.step === 3 ? (
              <ButtonRadius
                bgGray
                marginTop={10}
                height={30}
                width={props.step === 0 ? '60%' : '40%'}
                onPress={() => onPressRight()}>
                <Text ftWhite ftSize={13}>
                  {renderRightButtonText()}
                </Text>
              </ButtonRadius>
            ) : null}
          </ViewRow>
        </View>
      </ViewRow>
    </View>
  );
};

export default Live4StepExplanation;
