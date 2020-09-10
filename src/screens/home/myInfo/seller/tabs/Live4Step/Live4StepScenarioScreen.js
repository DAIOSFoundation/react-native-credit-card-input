import React, {useEffect, useState, useCallback, useMemo} from 'react';
import ModalSelector from 'react-native-modal-selector';
import DatePicker from 'react-native-date-picker';
// Styled Component
import {
  View,
  ScrollView,
  Container,
  ViewAbsolute,
  ViewRow,
  SafeAreaView,
  ViewRadiusCustom,
} from '../../../../../../components/styled/View';
import SelectBorderButton from '../../../../../../components/buttons/SelectBorderButton';
import {Text} from '../../../../../../components/styled/Text';
import UploadVideoBar from '../../../../../../components/bar/UploadVideoBar';
import * as Common from '../../../../../../components/styled/Common';
import {Image} from '../../../../../../components/styled/Image';
import UploadPhotoBar from '../../../../../../components/bar/UploadPhotoBar';
import ToastMessage from '../../../../../../components/toast/ToastMessage';
import {
  Button,
  GestureButtonBorderRadius,
} from '../../../../../../components/styled/Button';
import BottomButton from '../../../../../../components/buttons/BottomButton';
import {
  NBInputBorderRadius,
  NBTextareaRadius,
} from '../../../../../../components/styled/Input';
import BottomModal from '../../../../../../components/modal/BottomModal';
import BasicCalendar from '../../../../../../components/calendar/BasicCalendar';
import Topbar from '../../../../../../components/bar/Topbar';
// NPM Module
import {Actions} from 'react-native-router-flux';
import Moment from 'moment';
// Redux
import * as live4StepActions from '../../../../../../store/modules/myinfo/live4Step/actions';
import * as globalActions from '../../../../../../store/modules/global/actions';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as uploadActions from '../../../../../../store/modules/loading/upload/actions';
import * as customModalActions from '../../../../../../store/modules/modal/customModal/actions';
// utils Import
import {
  stringToArrayByComma,
  arrayToStringByComma,
  yymmdd,
} from '../../../../../../utils/functions';

const Live4StepScenarioScreen = (props) => {
  const dispatch = useDispatch();
  const periodArray = [10, 20, 30, 40, 50, 60];
  const {
    jwtToken,
    videoUploadPercent,
    photoUploadPercent,
    reviewVideos,
    reviewImages,
    title,
    description,
    tags,
    review,
    goalAmount,
    scenario,
    expectedDate,
    expectedStartTime,
    expectedPeriod,
    selectedBroadcastId,
    successMsg,
    errorMsg,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      videoUploadPercent: state.upload.videoUploadPercent,
      photoUploadPercent: state.upload.photoUploadPercent,
      reviewVideos: state.live4Step.reviewVideos,
      reviewImages: state.live4Step.reviewImages,
      title: state.live4Step.title,
      description: state.live4Step.description,
      tags: state.live4Step.tags,
      review: state.live4Step.review,
      goalAmount: state.live4Step.goalAmount,
      scenario: state.live4Step.scenario,
      expectedDate: state.live4Step.expectedDate,
      expectedStartTime: state.live4Step.expectedStartTime,
      expectedPeriod: state.live4Step.expectedPeriod,
      selectedBroadcastId: state.live4Step.selectedBroadcastId,
      successMsg: state.live4Step.successMsg,
      errorMsg: state.live4Step.errorMsg,
    }),
    shallowEqual,
  );

  const [snapPoints, setSnapPoints] = useState([0]);
  const [time, setTime] = useState(new Date());

  // const nowDate = formatDate();
  const markDate = {
    // [nowDate]: {broadcastInfo: 'info정보 이런식으로 넣을 것'},
    // '2020-03-31': {broadcastInfo: 'info정보 이런식으로 넣을 것'},
    [expectedDate]: {broadcastInfo: 'info정보 이런식으로 넣을 것'},
  };

  const onPressClose = () => {
    Actions.pop();
  };

  // 리덕스 제목 변경
  const onChangeTextTitle = (text) => {
    dispatch(live4StepActions.change_scenario_title(text));
  };

  // 리덕스 방송 설명 변경
  const onChangeTextDescription = (text) => {
    dispatch(live4StepActions.change_scenario_description(text));
  };

  // 리덕스 셀러리뷰 변경
  const onChangeTextReviews = (text) => {
    dispatch(live4StepActions.change_scenario_reviews(text));
  };

  // 리덕스 태그 변경
  const onChangeTextTags = (text) => {
    const newArray = stringToArrayByComma(text);
    dispatch(live4StepActions.change_scenario_tags(newArray));
  };

  // 리덕스 판매 목표 변경
  const onChangeNumberAmount = (number) => {
    const toIntNumber = parseInt(number.replace(/[^0-9.]/g, ''));
    dispatch(live4StepActions.change_scenario_goal_amount(toIntNumber));
  };

  // 리덕스 시나리오 변경
  const onChangeTextScenario = (text) => {
    dispatch(live4StepActions.change_scenario_scenario(text));
  };

  // 리덕스 라이브방송 날짜 변경
  const onPressDate = (date) => {
    console.log('onPressDate => ', date);

    // 선택한 날짜
    let selectDay = date.dateString.replace(/-/gi, '');

    // 현재 날짜
    let today = yymmdd();

    if (today > selectDay) {
      dispatch(
        customModalActions.change_modal_message(
          '오늘 이전 날짜는 선택하실 수 없습니다.',
        ),
      );
    } else {
      dispatch(live4StepActions.change_live_broadcast_date(date.dateString));
    }
  };

  // 달력 확인 버튼
  const onPressCalendarOK = () => {
    setSnapPoints([0]);
  };

  // 라이브방송 예상 진행 시간
  const changeExpectedPeriod = (period) => {
    console.log('expected period => ', period);
    dispatch(live4StepActions.change_expected_period(period));
  };

  // 라이브방송 시간 확인 버튼
  const onPressTimeOK = () => {
    setSnapPoints([0]);

    const param = Moment(time).format('HH:mm');

    dispatch(live4StepActions.change_live_broadcast_time(param));
  };

  // 동영상 선택
  const onPressVideoPick = (data) => {
    const params = {
      jwtToken,
      broadcastId: selectedBroadcastId,
      video: {video: data},
      dispatch: dispatch,
      actions: uploadActions.change_video_upload_percent, // 퍼센트를 지속적으로 업데이트
      idx: reviewVideos.length,
    };
    dispatch(live4StepActions.change_add_videos(data));
    dispatch(live4StepActions.request_scenario_video(params));
    dispatch(uploadActions.change_video_upload_percent([0, 0]));
  };

  // 이미지 선택
  const onPressImagePick = (data) => {
    const params = {
      jwtToken,
      broadcastId: selectedBroadcastId,
      image: {image: data},
      dispatch: dispatch,
      actions: uploadActions.change_photo_upload_percent, // 퍼센트를 지속적으로 업데이트
      idx: reviewImages.length,
    };
    dispatch(live4StepActions.change_add_images(data));
    dispatch(live4StepActions.request_scenario_image(params));
  };
  const modifiedGoalAmount = useMemo(() => {
    if (goalAmount) {
      return parseInt(goalAmount.toString().replace(/[^0-9.]/g, ''));
    }
  }, [goalAmount]);

  // 비디오 삭제
  const onPressVideoDelete = (reviewVideoId) => {
    console.log('delete video reviewVideoId => ', reviewVideoId);
    dispatch(live4StepActions.change_delete_videos(reviewVideoId));
    const params = {
      jwtToken,
      selectedBroadcastId,
      reviewVideoId,
    };
    dispatch(live4StepActions.delete_review_video(params));
  };

  // 이미지 삭제
  const onPressImageDelete = (reviewImageId) => {
    console.log('delete image reviewImageId => ', reviewImageId);
    const params = {
      jwtToken,
      selectedBroadcastId,
      reviewImageId,
    };
    dispatch(live4StepActions.request_delete_image(params));
    // 아래는 자동으로 리랜더링해서 필요없는듯?
    // dispatch(live4StepActions.change_delete_images(reviewImageId));
  };

  //하단 모달 열기
  const onPressBottomModalOpen = (size) => {
    setSnapPoints([size]);
  };

  // 셀러의 단일방송정보 호출
  useEffect(() => {
    if (jwtToken && selectedBroadcastId) {
      const params = {
        jwtToken,
        selectedBroadcastId,
      };
      dispatch(live4StepActions.request_broadcast_by_id(params));
    }
  }, [jwtToken, selectedBroadcastId, successMsg]);

  useEffect(() => {
    if (successMsg === 'uploadScenarioVideoSuccess') {
      dispatch(
        globalActions.change_toast_message('비디오가 업로드 되었습니다'),
      );
      dispatch(uploadActions.change_video_upload_percent([0, 1]));
    } else if (successMsg === 'uploadScenarioImageSuccess') {
      dispatch(
        globalActions.change_toast_message('이미지가 업로드 되었습니다'),
      );
      dispatch(uploadActions.change_photo_upload_percent([0, 1]));
    } else if (successMsg === 'deleteVideoSuccess') {
      dispatch(globalActions.change_toast_message('비디오가 삭제되었습니다.'));
    } else if (successMsg === 'deleteImageSuccess') {
      dispatch(globalActions.change_toast_message('이미지가 삭제되었습니다.'));
    } else if (successMsg === 'tempStoreSuccess') {
      dispatch(globalActions.change_toast_message('임시 저장 완료'));
    }
    dispatch(live4StepActions.reset_toast_msg(''));
  }, [successMsg]);

  useEffect(() => {
    if (errorMsg !== '') {
      dispatch(globalActions.change_toast_message(`잠시 후 다시 시도해주세요`));
      dispatch(live4StepActions.reset_toast_msg(''));
      dispatch(live4StepActions.reset_msg(''));
    }
  }, [errorMsg]);

  // 화면 종료시 리덕스 초기화
  useEffect(() => {
    return () => dispatch(live4StepActions.reset_live4step());
  }, []);

  const tagsToString = useMemo(() => {
    if (tags.length > 0) {
      return arrayToStringByComma(tags);
    }
  }, [tags]);

  const patchForm = {
    jwtToken,
    selectedBroadcastId,
    title,
    description,
    tags,
    review,
    goalAmount,
    scenario,
    expectedDate,
    expectedStartTime,
    expectedPeriod,
  };

  const patchReviewAndPopOK = () => {
    Actions.pop();
  };
  // 임시 저장 완료
  const patchTempScenario = useCallback(() => {
    if (props.data) {
      patchReviewAndPop();
    } else {
      dispatch(
        live4StepActions.request_patch_temp_scenario({
          ...patchForm,
          expectedStartTime: new Date(
            expectedDate.replace(/-/gi, '/') + ' ' + expectedStartTime,
          ).getTime(),
        }),
      );
      dispatch(customModalActions.change_modal_message('저장되었습니다'));
      dispatch(customModalActions.change_modal_visible(true));
      dispatch(customModalActions.change_modal_onpress_ok(patchReviewAndPopOK));
    }
  }, [{patchForm}]);

  // 작성 완료
  const patchReviewAndPop = useCallback(() => {
    if (
      reviewImages.length !== 0 &&
      title !== '' &&
      description !== '' &&
      tags.length !== 0 &&
      goalAmount !== 0 &&
      scenario !== '' &&
      expectedDate !== '' &&
      expectedStartTime !== ''
    ) {
      dispatch(
        live4StepActions.request_patch_scenario({
          ...patchForm,
          expectedStartTime: new Date(
            expectedDate.replace(/-/gi, '/') + ' ' + expectedStartTime,
          ).getTime(),
        }),
      );
      dispatch(customModalActions.change_modal_message('저장되었습니다'));
      dispatch(customModalActions.change_modal_visible(true));
      dispatch(customModalActions.change_modal_onpress_ok(patchReviewAndPopOK));
    } else {
      dispatch(
        customModalActions.change_modal_message(
          '작성되지 않은 항목이 있습니다',
        ),
      );
      dispatch(customModalActions.change_modal_visible(true));
    }
  }, [{patchForm}]);

  const displayError = (e) => {
    dispatch(globalActions.change_toast_message(e));
    dispatch(live4StepActions.reset_toast_msg(''));
  };

  const GuideScenario = () => {
    return (
      <View width={'100%'} marginTop={50}>
        <ViewRow
          width={'100%'}
          height={40}
          bgDarkWhite
          paddingRight={15}
          paddingLeft={15}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <ViewRow>
            <Image
              width={18}
              height={18}
              source={require('../../../../../../assets/myinfo/icon_questionmark_grey.png')}
            />
            <Text marginLeft={5} ftDarkNavy>
              방송시나리오를 읽어주세요
            </Text>
          </ViewRow>
          <View width={16} justifyContent={'center'}>
            <Button width={16} height={16}>
              <Image
                width={18}
                height={18}
                source={require('../../../../../../assets/common/icon_small_more_grey.png')}
              />
            </Button>
          </View>
        </ViewRow>
      </View>
    );
  };

  //하단 달력 랜더
  const renderView = () => {
    if (snapPoints[0] === 450) {
      return (
        <ViewRadiusCustom
          bgWhite
          height={'100%'}
          borderWidth={1}
          borderTopLeftRadius={15}
          borderTopRightRadius={15}
          brLightGray>
          <View marginTop={15}>
            <BasicCalendar
              backgroundColor={Common.colors.WHITE}
              monthTextColor={Common.colors.DARK_GRAY_BLUE}
              dayTextColor={Common.colors.DARK_GRAY_BLUE}
              dateTextColor={Common.colors.DARK_GRAY_BLUE}
              arrowColor={Common.colors.NAVY}
              todayCircleColor={Common.colors.THEME}
              todayTextColor={Common.colors.WHITE}
              onPress={onPressDate}
              markDate={markDate}
            />
          </View>
          <View marginLeft={20} marginRight={20} marginBottom={30}>
            <GestureButtonBorderRadius
              bgTheme
              height={50}
              onPress={() => onPressCalendarOK()}>
              <Text ftWhite>확인</Text>
            </GestureButtonBorderRadius>
          </View>
        </ViewRadiusCustom>
      );
    } else {
      return (
        <ViewRadiusCustom
          bgWhite
          height={'100%'}
          borderWidth={1}
          borderTopLeftRadius={15}
          borderTopRightRadius={15}
          brLightGray>
          <Text marginTop={20} marginLeft={20} ftDarkNavy fontSize={18} bold>
            방송시간 선택
          </Text>
          <View width={'100%'} alignItems={'center'}>
            <DatePicker
              mode="time"
              date={new Date(time)}
              locale="ko"
              onDateChange={setTime}
            />
          </View>
          <View
            marginLeft={20}
            marginRight={20}
            marginTop={10}
            paddingBottom={10}>
            <GestureButtonBorderRadius
              bgTheme
              height={50}
              onPress={() => onPressTimeOK()}>
              <Text ftWhite>확인</Text>
            </GestureButtonBorderRadius>
          </View>
        </ViewRadiusCustom>
      );
    }
  };

  return (
    <SafeAreaView>
      <Topbar
        onPressLeft={onPressClose}
        isLeftButton={true}
        title={'라방 시나리오 작성'}
        isLine={true}
      />
      <ToastMessage position={'top'} />
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <Container justifyContent={'space-between'}>
          <View width={'100%'} paddingLeft={15} paddingRight={15}>
            {/*셀러 리뷰 항목*/}
            <Text ftTheme fontSize={16} bold marginTop={25}>
              셀러 리뷰
            </Text>
            <Text marginTop={10} ftGray fontSize={13}>
              상품에 대해 시청자에게 소개 할 정보를 기입해주세요. 기입한 해당
              정보는 셀러 리뷰와 판매 정보로 노출 됩니다.
            </Text>
            {/* 동영상 등록 */}
            <View width={'100%'} marginTop={25} justifyContent={'flex-start'}>
              <Text marginBottom={7} ftDarkNavy bold>
                동영상 등록 (최대 1개)
              </Text>
              <Text ftGray fontSize={13}>
                동영상 업로드 시 먼저 임시 저장을 눌러 내용을 보존해 주세요.
              </Text>
              <Text marginBottom={5} ftGray fontSize={13}>
                네트워크 환경이 원활한 곳에서 진행해주세요.
              </Text>
              <UploadVideoBar
                onPressPick={(video) => onPressVideoPick(video)}
                onPressDelete={(reviewVideoId) =>
                  onPressVideoDelete(reviewVideoId)
                }
                items={reviewVideos}
                percent={videoUploadPercent}
                videoError={displayError}
              />
            </View>
            {/* 사진 등록 */}
            <View width={'100%'} marginTop={25} justifyContent={'flex-start'}>
              <Text marginBottom={7} ftDarkNavy bold>
                리뷰 사진 등록 (최대 10장)
              </Text>
              {console.log('reviewImages => ', reviewImages)}
              <UploadPhotoBar
                onPressPick={(image) => onPressImagePick(image)}
                onPressDelete={(_id) => onPressImageDelete(_id)}
                items={reviewImages}
                percent={photoUploadPercent}
                imageError={displayError}
              />
            </View>
            {/* 셀러리뷰 */}
            <View width={'100%'} marginTop={25} justifyContent={'flex-start'}>
              <Text marginBottom={7} ftDarkNavy bold>
                셀러 리뷰
              </Text>
              <NBTextareaRadius
                maxLength={500}
                rowSpan={4}
                bordered
                paddingLeft={10}
                paddingRight={10}
                paddingTop={5}
                paddingBottom={5}
                placeholderTextColor={Common.colors.LIGHT_BLUE_GRAY}
                placeholder="상품을 사용해본 후기를 작성해주세요"
                value={review}
                onChangeText={(text) => onChangeTextReviews(text)}
              />
              <ViewAbsolute
                bottom={0}
                right={0}
                paddingRight={10}
                paddingBottom={5}>
                <Text ftGray>0/500</Text>
              </ViewAbsolute>
            </View>
            {/*방송시나리오 항목*/}
            <View width={'100%'} marginTop={25} justifyContent={'flex-start'}>
              <View width={'100%'} marginTop={25}>
                <Text ftTheme fontSize={16} bold>
                  방송시나리오
                </Text>
                <Text marginTop={10} ftGray fontSize={13}>
                  라이브 방송의 컨셉을 정하시고 진행할 시나리오를 자유롭게
                  작성해주세요.
                </Text>
              </View>
              {/* 방송 제목 */}
              <View width={'100%'} marginTop={25} justifyContent={'flex-start'}>
                <Text marginBottom={7} ftDarkNavy bold>
                  방송 제목
                </Text>
                <NBInputBorderRadius
                  brLightGray
                  paddingLeft={10}
                  paddingRight={10}
                  placeholderTextColor={Common.colors.LIGHT_BLUE_GRAY}
                  placeholder="방송 제목을 적어주세요"
                  value={title}
                  onChangeText={(text) => onChangeTextTitle(text)}
                />
              </View>
              {/* 방송 설명 */}
              <View width={'100%'} marginTop={25} justifyContent={'flex-start'}>
                <Text marginBottom={7} ftDarkNavy bold>
                  방송 설명
                </Text>
                <NBInputBorderRadius
                  brLightGray
                  paddingLeft={10}
                  paddingRight={10}
                  placeholderTextColor={Common.colors.LIGHT_BLUE_GRAY}
                  placeholder="방송에대한 설명을 짧게 적어주세요"
                  value={description}
                  onChangeText={(text) => onChangeTextDescription(text)}
                />
              </View>
              {/* 해시태그 */}
              <View width={'100%'} marginTop={25} justifyContent={'flex-start'}>
                <Text marginBottom={7} ftDarkNavy bold>
                  상품 태그 (태그를 , 로 구분하여 작성해주세요)
                </Text>
                <NBInputBorderRadius
                  brLightGray
                  paddingLeft={10}
                  paddingRight={10}
                  placeholderTextColor={Common.colors.LIGHT_BLUE_GRAY}
                  placeholder="예시) 신상, 셀러특가, 한정판매"
                  value={tagsToString}
                  onChangeText={(text) => onChangeTextTags(text)}
                />
              </View>
              {/* 판매 목표 */}
              <View width={'100%'} marginTop={25} justifyContent={'flex-start'}>
                <Text marginBottom={7} ftDarkNavy bold>
                  판매 목표 수량 :{' '}
                  {modifiedGoalAmount ? `${modifiedGoalAmount}` : '0'}개
                </Text>
                <NBInputBorderRadius
                  keyboardType="numeric"
                  brLightGray
                  paddingLeft={10}
                  paddingRight={10}
                  placeholderTextColor={Common.colors.LIGHT_BLUE_GRAY}
                  placeholder="목표 판매 수량을 설정해주세요"
                  value={modifiedGoalAmount ? `${modifiedGoalAmount}` : '0'}
                  onChangeText={(number) => onChangeNumberAmount(number)}
                />
              </View>
              <Text marginTop={25} marginBottom={7} ftDarkNavy bold>
                방송 시나리오
              </Text>
              <NBTextareaRadius
                maxLength={5000}
                rowSpan={6}
                bordered
                placeholderTextColor={Common.colors.LIGHT_BLUE_GRAY}
                paddingLeft={10}
                paddingRight={10}
                paddingTop={5}
                paddingBottom={5}
                value={scenario}
                placeholder="방송 시나리오를 자유롭게 작성해주세요"
                onChangeText={(text) => onChangeTextScenario(text)}
              />
              <ViewAbsolute
                bottom={0}
                right={0}
                paddingRight={10}
                paddingBottom={5}>
                <Text ftGray>0/5000</Text>
              </ViewAbsolute>
            </View>
            <View width={'100%'} marginTop={25}>
              <Text ftTheme fontSize={16} bold>
                방송일정 등록하기
              </Text>
              <Text marginTop={10} ftGray fontSize={13}>
                라이브 방송을 할 날짜와 시간을 등록해주세요.
              </Text>
            </View>
            <Text ftGray fontSize={13} textDecorationLine={'underline'}>
              샘플 수령 확인 후 14일 이내에 방송을 진행하셔야 합니다.
            </Text>
            {/* 라이브 방송 날짜 */}
            <View width={'100%'} marginTop={25} justifyContent={'flex-start'}>
              <Text marginBottom={7} ftDarkNavy bold>
                라이브방송 날짜 선택
              </Text>
              <SelectBorderButton
                title={
                  expectedDate
                    ? expectedDate.toString()
                    : '날짜를 선택해 주세요.'
                }
                onPress={() => onPressBottomModalOpen(450)}
              />
            </View>
            {/* 라이브 방송 시작 시간 */}
            <View width={'100%'} marginTop={25} justifyContent={'flex-start'}>
              <Text marginBottom={7} ftDarkNavy bold>
                라이브방송 시작 시간 선택
              </Text>
              <SelectBorderButton
                title={
                  expectedStartTime
                    ? expectedStartTime
                    : '방송 시작 시간을 선택해주세요'
                }
                onPress={() => onPressBottomModalOpen(300)}
              />
            </View>
            {/*라이브 방송 예상 진행 시간*/}
            <View width={'100%'} marginTop={25} justifyContent={'flex-start'}>
              <Text marginBottom={7} ftDarkNavy bold>
                라이브방송 예상 진행 시간
              </Text>
              <ModalSelector
                data={periodArray.map((item, index) => ({
                  key: index,
                  label: item,
                }))}
                cancelText={"취소"}
                onModalClose={(item) => changeExpectedPeriod(item.label)}
                selectedKey={periodArray.indexOf(expectedPeriod)}
                initValue={"방송 예상 진행 시간을 선택해 주세요"}
              />
              {/* <Picker
                style={{
                  height: 45,
                  width: '100%',
                  zIndex: 100,
                  marginLeft: 10,
                }}
                selectedValue={expectedPeriod}
                onValueChange={changeExpectedPeriod}>
                {periodArray.map((item, index) => (
                  <Picker.Item
                    key={item + index}
                    label={item.toString()}
                    color={Common.colors.DARK_NAVY}
                    value={item}
                  />
                ))}
              </Picker> */}
            </View>
            <Text marginTop={5} ftGray fontSize={12}>
              인스타그램 라이브 방송은 최대 한시간 가능합니다.
            </Text>
          </View>
          <GuideScenario />
        </Container>
      </ScrollView>
      <ViewRow>
        <BottomButton
          bgColor={{bgDarkNavy: true}}
          width={'50%'}
          text={'임시 저장'}
          onPress={patchTempScenario}
        />
        <BottomButton
          width={'50%'}
          text={'작성 완료'}
          onPress={patchReviewAndPop}
        />
      </ViewRow>
      <BottomModal
        headerGesture={false}
        contentGesture={false}
        initialSnap={0}
        snapPoints={snapPoints}
        view={renderView()}
      />
    </SafeAreaView>
  );
};
export default Live4StepScenarioScreen;
