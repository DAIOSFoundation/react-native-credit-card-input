import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
// Styled Component
import {View} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import SelectButtons from '../../../../components/buttons/SelectButtons';
import BottomButton from '../../../../components/buttons/BottomButton';
// utils Import
import {
  checkBoxArray,
  myFaceStyle,
  myVoiceStyle,
} from '../../../../utils/constants';
import {isEmptyDataArray} from '../../../../utils/functions';
// Redux
import * as signupActions from '../../../../store/modules/signup/actions';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as customModalActions from '../../../../store/modules/modal/customModal/actions';

const Style = () => {
  const dispatch = useDispatch();

  const {
    voice,
    voiceIndex,
    appearance,
    appearanceIndex,
    preLiveInfo,
    statebar,
  } = useSelector(
    (state) => ({
      voice: state.signup.voice,
      voiceIndex: state.signup.voiceIndex,
      appearance: state.signup.appearance,
      appearanceIndex: state.signup.appearanceIndex,
      preLiveInfo: state.signup.preLiveInfo,
      statebar: state.signup.statebar,
    }),
    shallowEqual,
  );

  // 기기 뒤로가기 버튼 기능 {s}
  const backAndroid = () => {
    dispatch(signupActions.change_statebar(statebar - 1));
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAndroid);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAndroid);
    };
  }, [backAndroid]);
  // 기기 뒤로가기 버튼 기능 {e}

  // const onPressVideo = () => {
  //   ImagePicker.openPicker({
  //     mediaType: 'video',
  //   })
  //     .then(video => {
  //       dispatch(signupActions.change_prev_live_info(video));
  //     })
  //     .catch(e => {});
  // };

  // 외모 유형 변경
  const onPressAppearance = (data) => {
    dispatch(signupActions.change_appearance(data[0]));
  };

  // 목소리 변경
  const onPressVoice = (data) => {
    dispatch(signupActions.change_voice(data[0]));
  };

  // 다음 버튼
  const onPressNext = () => {
    // if (isEmptyDataArray([appearance, voice])) {
    if (isEmptyDataArray([appearance, voice])) {
      dispatch(
        customModalActions.change_modal_message('모든 항목를 선택해 주세요'),
      );
      return;
    }

    dispatch(signupActions.change_statebar(statebar + 1));
  };

  return (
    <View height={'100%'} justifyContent={'space-between'}>
      <View justifyContent={'flex-start'} marginLeft={20} marginRight={20}>
        <Text ftLarge ftTheme bold>
          04 스타일
        </Text>
        <View marginTop={30}>
          <Text ftDarkNavy bold>
            나의 외모는 어떤 유형인가요?
          </Text>
          <View width={'100%'} marginTop={15}>
            <SelectButtons
              data={checkBoxArray(myFaceStyle)}
              lineCnt={4}
              isOnlyOne={true}
              onPress={onPressAppearance}
              selectedIndex={appearanceIndex}
            />
          </View>

          <Text ftDarkNavy bold marginTop={30}>
            나의 목소리는 어떤 유형인가요?
          </Text>
          <View width={'100%'} marginTop={15}>
            <SelectButtons
              data={checkBoxArray(myVoiceStyle)}
              lineCnt={4}
              isOnlyOne={true}
              onPress={onPressVoice}
              selectedIndex={voiceIndex}
            />
          </View>
        </View>
        {/* <View marginTop={30} justifyContent={'center'}>
        <ViewRow>
          <Text ftDarkNavy bold marginRight={5}>
            라방 연습하기
          </Text>
          <ButtonBorderRadius width={80} height={23} brTheme>
            <Text ftTheme>예시보기</Text>
          </ButtonBorderRadius>
        </ViewRow>
         <View
          width={'100%'}
          marginTop={20}
          justifyContent={'center'}
          alignItems={'center'}>
          <View>
            <ButtonRadius
              flexDirection={'column'}
              bgIceBlue
              width={162}
              height={244}
              onPress={onPressVideo}>
              {isEmpty(preLiveInfo) ? (
                <>
                  <Image
                    width={46}
                    height={46}
                    source={require('../../../../assets/signup/icon_video_upload.png')}
                  /> 10 - > < -
                  <Text marginTop={10} textAlign={'center'} ftNavy>
                    동영상 업로드를 위해 여기를 눌러주세요
                  </Text>
                </>
              ) : (
                <Image
                  width={162}
                  height={244}
                  source={{uri: preLiveInfo.path}}
                />
              )}
            </ButtonRadius>
          </View>
          <Text marginTop={5} ftDarkNavy>
            리허설은 3~5분 이내로 촬영해주세요
          </Text>
        </View>
      </View>*/}
      </View>
      <BottomButton onPress={() => onPressNext()} text={'다음'} />
    </View>
  );
};

export default Style;
