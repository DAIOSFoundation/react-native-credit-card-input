import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
// Styled Component
import {
  ViewBorderRow,
  ViewRadiusCustom,
  View,
  ViewRow,
} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import SellerProfile from '../../../../components/profiles/SellerProfile';
import TextAndInputBottomLine from '../../../../components/input/TextAndInputBottomLine';
import {Image} from '../../../../components/styled/Image';
import SelectButtons from '../../../../components/buttons/SelectButtons';
import BottomButton from '../../../../components/buttons/BottomButton';
// utils Import
import {myViewerAge, checkBoxArray} from '../../../../utils/constants';
import {isEmpty} from '../../../../utils/functions';
// Redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as signupActions from '../../../../store/modules/signup/actions';
import * as customModalActions from '../../../../store/modules/modal/customModal/actions';

const LiveChannel = () => {
  const dispatch = useDispatch();

  const {
    numOfUpload,
    channelGenderRatio,
    channelAgeRange,
    channelAgeRangeIndex,
    channelPk,
    channelName,
    channelProfile,
    followerCount,
    mediaCount,
    selectedChannelPk,
    statebar,
  } = useSelector(
    (state) => ({
      numOfUpload: state.signup.numOfUpload,
      channelGenderRatio: state.signup.channelGenderRatio,
      channelAgeRange: state.signup.channelAgeRange,
      channelAgeRangeIndex: state.signup.channelAgeRangeIndex,
      channelName: state.signup.channelName,
      channelPk: state.signup.channelPk,
      channelProfile: state.signup.channelProfile,
      followerCount: state.signup.followerCount,
      mediaCount: state.signup.mediaCount,
      selectedChannelPk: state.signup.selectedChannelPk,
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

  // 게시물 업로드 횟수
  const onChangeTextNumOfUpload = (num) => {
    dispatch(signupActions.change_num_of_upload(num));
  };

  // 주용 연령 선택
  const onPressChannelAgeRange = (ages) => {
    dispatch(signupActions.change_channel_age_range(ages));
  };

  // 남녀 성비 변경
  const onValueChangeGender = (gender) => {
    dispatch(signupActions.change_channel_gender_ratio(gender));
  };

  // 다음 버튼
  const onPressNext = () => {
    if (!selectedChannelPk) {
      dispatch(
        customModalActions.change_modal_message('인스타 아이디를 입력해주세요'),
      );
      return;
    }

    if (channelAgeRange.length === 0) {
      dispatch(
        customModalActions.change_modal_message('주요 연령을 선택해주세요'),
      );
      return;
    }

    dispatch(signupActions.change_statebar(statebar + 1));
  };

  return (
    <View height={'100%'} justifyContent={'space-between'}>
      <View justifyContent={'flex-start'} marginLeft={20} marginRight={20}>
        <Text ftLarge ftTheme bold>
          02 라이브 방송 운영 채널
        </Text>

        <View marginTop={30}>
          <Text ftDarkNavy bold>
            나의 SNS게시물 업로드 횟수
          </Text>
          <ViewBorderRow height={66} width={'100%'} marginTop={15}>
            <ViewRadiusCustom
              bgFunNavy
              width={'30%'}
              borderTopLeftRadius={20}
              borderBottomLeftRadius={20}
              justifyContent={'center'}
              alignItems={'center'}>
              <SellerProfile
                size={38}
                urlPath={!isEmpty(channelProfile) ? channelProfile.url : null}
              />
              <Text ftWhite ftSmall>
                {channelName}
              </Text>
            </ViewRadiusCustom>
            <ViewRadiusCustom
              bgNavy
              width={'70%'}
              borderTopRightRadius={20}
              justifyContent={'center'}
              borderBottomRightRadius={20}>
              <ViewRow justifyContent={'space-between'} marginTop={5}>
                <View
                  width={'50%'}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <Text ftWhite ftSmall bold>
                    팔로워
                  </Text>
                  <Text ftWhite ftLarge bold>
                    {followerCount}
                  </Text>
                </View>
                <View
                  width={'50%'}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <Text ftWhite ftSmall bold>
                    게시물
                  </Text>
                  <Text ftWhite ftLarge bold>
                    {mediaCount}
                  </Text>
                </View>
                {/*<View justifyContent={'center'} height={'100%'} width={'20%'}>*/}
                {/*  <ButtonRadius*/}
                {/*    width={40}*/}
                {/*    borderRadius={20}*/}
                {/*    height={40}*/}
                {/*    bgLightNavyGray>*/}
                {/*    <Image*/}
                {/*      width={20}*/}
                {/*      height={20}*/}
                {/*      source={require('../../../../assets/common/icon_search_white.png')}*/}
                {/*    />*/}
                {/*  </ButtonRadius>*/}
                {/*</View>*/}
              </ViewRow>
            </ViewRadiusCustom>
          </ViewBorderRow>
        </View>

        <View marginTop={30}>
          <ViewRow width={'100%'} marginTop={10}>
            <TextAndInputBottomLine
              title={'SNS 게시물 업로드 횟수(1주)'}
              maxLength={10}
              value={numOfUpload}
              onChangeText={onChangeTextNumOfUpload}
              isOnlyNumber={true}
              isBottomLine={true}
              width={'50%'}
            />
            <View justifyContent={'flex-end'} paddingBottom={20}>
              <Text>회</Text>
            </View>
          </ViewRow>
        </View>

        <View marginTop={30}>
          <Text ftDarkNavy bold>
            {' '}
            나의 SNS 채널 성비
          </Text>
          <ViewRow justifyContent={'space-between'} marginTop={20}>
            <Image
              width={30}
              height={30}
              source={require('../../../../assets/signup/man.png')}
            />
            <Text ftNavy>
              남성{channelGenderRatio}% 여성{100 - channelGenderRatio}%
            </Text>
            <Image
              width={30}
              height={30}
              source={require('../../../../assets/signup/wom.png')}
            />
          </ViewRow>
          <Slider
            animateTransition
            minimumTrackTintColor="#ff8373"
            maximumTrackTintColor="#ff8373"
            minimumValue={0}
            maximumValue={100}
            value={channelGenderRatio}
            step={10}
            onValueChange={onValueChangeGender}
            thumbStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#9a9a9a',
              borderRadius: 8,
              borderWidth: 1,
              height: 20,
              width: 30,
            }}
            trackStyle={{
              borderRadius: 5,
              height: 8,
            }}
          />

          <View marginTop={30}>
            <Text ftDarkNavy bold>
              나의 채널 주요 연령(최대 3가지 선택 가능)
            </Text>
            <View width={'100%'} marginTop={15}>
              <SelectButtons
                data={checkBoxArray(myViewerAge)}
                lineCnt={4}
                selectCount={3}
                onPress={onPressChannelAgeRange}
                selectedIndex={channelAgeRangeIndex}
              />
            </View>
          </View>
        </View>
      </View>
      <BottomButton onPress={() => onPressNext()} text={'다음'} />
    </View>
  );
};

export default LiveChannel;
