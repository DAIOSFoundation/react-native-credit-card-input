import React, {useEffect} from 'react';
import {disabledArrowColor} from 'react-native-calendars/src/style';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import Topbar from '../../../../../../../components/bar/Topbar';
import UploadVideoBar from '../../../../../../../components/bar/UploadVideoBar';
import BottomButton from '../../../../../../../components/buttons/BottomButton';
import {Button} from '../../../../../../../components/styled/Button';
import {screenWidth} from '../../../../../../../components/styled/ScreenSize';
import {Text} from '../../../../../../../components/styled/Text';
import {
  SafeAreaView,
  View,
  ViewRow,
} from '../../../../../../../components/styled/View';
import ToastMessage from '../../../../../../../components/toast/ToastMessage';
import * as globalActions from '../../../../../../../store/modules/global/actions';
import * as uploadActions from '../../../../../../../store/modules/loading/upload/actions';
import * as live4StepActions from '../../../../../../../store/modules/myinfo/live4Step/actions';

const VideoUploadScreen = () => {
  const dispatch = useDispatch();

  const {
    jwtToken,
    sellerRecordedVideo,
    selectedBroadcastId,
    videoUploadPercent,
    sellerRecordedVideoUploadSuccessMessage,
  } = useSelector((state) => ({
    jwtToken: state.user.jwtToken,
    sellerRecordedVideo: state.live4Step.sellerRecordedVideo,
    selectedBroadcastId: state.live4Step.selectedBroadcastId,
    videoUploadPercent: state.upload.videoUploadPercent,
    sellerRecordedVideoUploadSuccessMessage:
      state.live4Step.sellerRecordedVideoUploadSuccessMessage,
  }));

  // 셀러의 저장된 동영상 가져오기
  useEffect(() => {
    if (jwtToken && selectedBroadcastId) {
      const params = {
        jwtToken,
        selectedBroadcastId,
      };
      dispatch(live4StepActions.get_seller_recorded_video(params));
    }
  }, [jwtToken, selectedBroadcastId]);

  useEffect(() => {
    if (jwtToken && selectedBroadcastId) {
      const params = {
        jwtToken,
        selectedBroadcastId,
      };
      dispatch(live4StepActions.get_seller_recorded_video(params));
    }
    dispatch(uploadActions.change_video_upload_percent([0, 0]));
  }, []);

  useEffect(() => {
    if (
      sellerRecordedVideo.length > 0 &&
      (videoUploadPercent[0] === 1 || videoUploadPercent[0] === undefined) &&
      sellerRecordedVideoUploadSuccessMessage === 'success'
    ) {
      const params = {
        pk: selectedBroadcastId,
        recordedVideoUrl: sellerRecordedVideo[0].data.recordedVideoGcp[0].path,
      };
      const paramsTwo = {
        broadcastId: selectedBroadcastId,
        jwtToken,
      };
      dispatch(live4StepActions.patch_seller_broadcast_status(paramsTwo));
      dispatch(live4StepActions.post_seller_recorded_video(params));
    }
  }, [sellerRecordedVideoUploadSuccessMessage]);

  // useEffect(() => {
  // }, [sellerRecordedVideo]);

  const onPressBack = () => {
    dispatch(live4StepActions.change_seller_broadcast_video_success_message());
    dispatch(live4StepActions.change_delete_seller_recorded_video());

    Actions.reset('tabBar');
  };

  // 동영상 선택
  const onPressVideoPick = (data) => {
    const params = {
      jwtToken,
      broadcastId: selectedBroadcastId,
      video: {video: data},
      dispatch: dispatch,
      actions: uploadActions.change_video_upload_percent, // 퍼센트를 지속적으로 업데이트
      idx: sellerRecordedVideo.length,
    };
    dispatch(live4StepActions.change_seller_broadcast_video(data));
    // dispatch(live4StepActions.request_scenario_video(params));
    dispatch(live4StepActions.patch_seller_recorded_video(params));
  };

  // 비디오 삭제
  const onPressVideoDelete = (recordedBroadcastGcpId) => {
    if (recordedBroadcastGcpId) {
      dispatch(live4StepActions.change_delete_seller_recorded_video());
      const params = {
        jwtToken,
        selectedBroadcastId,
        recordedBroadcastGcpId: recordedBroadcastGcpId,
      };
      dispatch(uploadActions.change_video_upload_percent([0, 0]));
      dispatch(
        live4StepActions.change_seller_broadcast_video_success_message(),
      );
      dispatch(live4StepActions.delete_seller_recorded_video(params));
    } else {
      dispatch(
        globalActions.change_toast_message('동영상 업로드가 진행중 입니다.'),
      );
    }
  };

  const displayError = (e) => {
    dispatch(globalActions.change_toast_message(e));
    dispatch(live4StepActions.reset_toast_msg(''));
  };
  return (
    <View bgDarkNavy height={'100%'} justifyContent={'space-between'}>
      <View>
        <Topbar
          bgColor={{bgDarkNavy: true}}
          titleColor={{ftWhite: true}}
          lineColor={{brLightNavyGray: true}}
          leftButtonColor={'white'}
          isLine
          title={'라이브방송 동영상 업로드'}
          // isLeftButton
          onPressLeft={onPressBack}
        />

        <View marginTop={30} alignItems={'center'}>
          <View paddingLeft={15} paddingRight={15}>
            <Text ftWhite bold fontSize={18}>
              라이브방송 동영상 업로드
            </Text>
            <View marginBottom={30}>
              <Text ftWhite>저장한 라이브방송 동영상 파일을 업로드하셔야</Text>
              <Text ftWhite>
                셀러비전 앱에서 방송을 다시 보기 할 수 있습니다.
              </Text>
              <Text ftWhite textDecorationLine={'underline'}>
                업로드하지 않을 시 추가적인 수익이 발생하지 않습니다.
              </Text>
            </View>
          </View>
          <UploadVideoBar
            onPressPick={(video) => onPressVideoPick(video)}
            onPressDelete={(reviewVideoId) => onPressVideoDelete(reviewVideoId)}
            items={sellerRecordedVideo}
            percent={videoUploadPercent}
            videoError={displayError}
            sellerVideo
            height={screenWidth / 1.4}
            width={screenWidth / 2}
            bgColor
            noBorderRadius
          />
        </View>
        <View alignItems={'center'} justifyContent={'center'} marginTop={30}>
          {videoUploadPercent[0] > 0 &&
          videoUploadPercent[0] < 1 &&
          sellerRecordedVideoUploadSuccessMessage === null ? (
            <View>
              <Text ftWhite fontSize={15}>
                동영상 업로드 완료까지 1~2분의 시간이 소요됩니다.
              </Text>
            </View>
          ) : videoUploadPercent[0] === 1 ? (
            <Text ftGold bold fontSize={15}>
              동영상 업로드 완료
            </Text>
          ) : null}
        </View>
      </View>
      {(videoUploadPercent[0] > 0 && videoUploadPercent[0] < 1) ||
      videoUploadPercent[0] === 0 ? (
        <BottomButton bgColor={{bgNavy: true}} text={'확인'} textSize={20} />
      ) : (
        <BottomButton
          onPress={() => onPressBack()}
          text={'확인'}
          textSize={20}
        />
      )}
      <ToastMessage />
    </View>
  );
};

export default VideoUploadScreen;
