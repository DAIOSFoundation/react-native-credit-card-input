import React, {useEffect, useState} from 'react';
// Styled Component
import {
  View,
  ViewAbsolute,
  ScrollView,
  ViewRow,
  ViewRadiusCustom,
  ViewBorderRadius,
} from '../../../components/styled/View';
import {Image} from '../../../components/styled/Image';
import Topbar from '../../../components/bar/Topbar';
import {Text} from '../../../components/styled/Text';
import Profile from '../common/Profile';
import SellerIdentityVerification from '../common/SellerIdentityVerification';
import {
  GestureButtonBorderRadius,
  Button,
  GestureButton,
} from '../../../components/styled/Button';
import BottomModal from '../../../components/modal/BottomModal';
import {screenHeight} from '../../../components/styled/ScreenSize';
import ConnectProfile from '../../../components/profiles/ConnectProfile';
import SelectCheckBoxes from '../../../components/checkboxes/SelectCheckBoxes';
import ToastMessage from '../../../components/toast/ToastMessage';
import CustomModal from '../../../components/modal/CustomModal';
// Screen Component
import LiveChannel from './sellerSignUp/LiveChannel';
import Scope from './sellerSignUp/Scope';
import Information from './sellerSignUp/Information';
import LiveExperience from './sellerSignUp/LiveExperience';
import IdSearch from './sellerSignUp/IdSearch';
import Style from './sellerSignUp/Style';
import Terms from './sellerSignUp/Terms';
// Redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import * as signupActions from '../../../store/modules/signup/actions';
import * as customModalActions from '../../../store/modules/modal/customModal/actions';
import * as globalActions from '../../../store/modules/global/actions';
// utils
import {
  checkBoxArray,
  interestItems,
  sellItems,
} from '../../../utils/constants';
import {isEmpty, multiSet} from '../../../utils/functions';

//셀러 회원가입 화면
const SellerSignUpScreen = () => {
  const [snapPoints, setSnapPoints] = useState([0]);
  const [tmpInterestItems, setTmpInterestItems] = useState([]);

  const dispatch = useDispatch();

  const {
    jwtToken,
    userId,
    type,
    statebar,
    errorMsg,
    channelName,
    channelPk,
    channelProfile,
    isVisible,
    isOneButton,
    isFull,
    message,
    onPressOK,
    size,
    elements,
    buttonHeight,
    scrollJustifyContent,
    channelInputName,
    errorMessage,
    sellItemsIndex,
    interestItemsIndex,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      type: state.user.type,
      statebar: state.signup.statebar,
      errorMsg: state.signup.errorMsg,
      channelName: state.signup.channelName,
      channelPk: state.signup.channelPk,
      channelProfile: state.signup.channelProfile,
      isVisible: state.customModal.isVisible,
      isOneButton: state.customModal.isOneButton,
      isFull: state.customModal.isFull,
      message: state.customModal.message,
      onPressOK: state.customModal.onPressOK,
      size: state.customModal.size,
      elements: state.customModal.elements,
      buttonHeight: state.customModal.buttonHeight,
      scrollJustifyContent: state.customModal.scrollJustifyContent,
      channelInputName: state.signup.channelInputName,
      errorMessage: state.signup.errorMessage,
      sellItemsIndex: state.signup.sellItemsIndex,
      interestItemsIndex: state.signup.interestItemsIndex,
    }),
    shallowEqual,
  );

  // 뒤로가기 버튼
  const onPressClose = () => {
    if (statebar === 1) {
      Actions.pop();
    } else {
      dispatch(signupActions.change_statebar(statebar - 1));
    }
  };

  //에러처리
  useEffect(() => {
    if (errorMsg) {
      switch (errorMsg.substring(0, 5)) {
        // 아마 가입한 회원
        case 'E1017':
          break;
        case 'E1022':
          dispatch(
            signupActions.change_error_message(
              '이미 가입된 인스타 아이디입니다.',
            ),
          );
          break;
        case 'E2003':
          dispatch(
            signupActions.change_error_message(
              '존재 하지 않는 인스타그램 아이디입니다.',
            ),
          );
          break;

        default:
          dispatch(customModalActions.change_modal_message(errorMsg));
      }
      dispatch(signupActions.change_error_msg(''));
    }
  }, [errorMsg]);

  // 인스타 아이디 검색
  const igSearch = async () => {
    if (channelInputName) {
      dispatch(
        signupActions.request_ig_user_name({
          platform: 'ig',
          channelName: channelInputName,
        }),
      );
      setSnapPoints(['50%']);
    } else {
      dispatch(globalActions.change_toast_message('아이디를 입력해주세요'));
    }
  };

  const onPressSelectID = () => {
    dispatch(signupActions.change_checked_channelpk(channelPk));
    setSnapPoints([0]);
  };

  // 인스타 검색 아이디 변경
  const onChangeChannelName = (name) => {
    dispatch(signupActions.change_channel_name(name));
  };

  const onPressBottomModalInstagram = async () => {
    await igSearch();
  };

  // 바텀 모달 열기
  const onPressBottomModalOpen = () => {
    if (statebar === 2) {
      setSnapPoints([screenHeight / 2.3]);
    } else {
      setSnapPoints([screenHeight / 1.7]);
    }
  };

  // 바텀 모달 닫기
  const onPressBottomModalClose = () => {
    let pressedData = [];

    switch (statebar) {
      case 4:
        for (let i = 0; i < tmpInterestItems.length; i++) {
          if (tmpInterestItems[i]) {
            pressedData.push({
              name: sellItems[i],
              index: i,
            });
          }
        }
        dispatch(signupActions.change_selling_category(pressedData));
        break;
      case 5:
        dispatch(signupActions.change_channel_pk(''));
        break;
      case 7:
        for (let i = 0; i < tmpInterestItems.length; i++) {
          if (tmpInterestItems[i]) {
            pressedData.push({
              name: interestItems[i],
              index: i,
            });
          }
        }
        dispatch(signupActions.change_product_interest(pressedData));
        break;
    }

    setSnapPoints([0]);
  };

  // 체크된 아이템
  const onPressCheckedItems = (items) => {
    setTmpInterestItems(items);
  };

  // 선택한 통신사
  const onPressTeleCom = (data) => {
    dispatch(signupActions.change_phone_carrier(data));
    setSnapPoints([0]);
  };

  // 스탭 별 보여질 뷰
  const renderView = () => {
    switch (statebar) {
      case 1:
        return <Terms />;
      case 2:
        return (
          <SellerIdentityVerification
            onPressBottomModalOpen={onPressBottomModalOpen}
          />
        );
      case 3:
        return <Profile />;
      case 4:
        return (
          <LiveExperience
            snapPoints={snapPoints}
            onPressBottomModalClose={onPressBottomModalClose}
            onPressBottomModalOpen={onPressBottomModalOpen}
          />
        );
      case 5:
        return (
          <IdSearch
            snapPoints={snapPoints}
            onPressBottomModalOpen={onPressBottomModalInstagram}
          />
        );
      case 6:
        return (
          <LiveChannel onPressBottomModalOpen={onPressBottomModalInstagram} />
        );
      case 7:
        return (
          <Information
            snapPoints={snapPoints}
            onPressBottomModalOpen={onPressBottomModalOpen}
          />
        );
      case 8:
        return <Style />;
      case 9:
        return <Scope />;
    }
  };
  // console.log(igUser.user.hd_profile_pic_versions[0])

  //바텀 모달 활성화 시 배경 알파 검은색 뷰
  const renderAlphaBackGround = () => {
    if (snapPoints[0] !== 0) {
      return (
        <ViewAbsolute width={'100%'} height={'100%'} zIndex={10} bgBlackAlpha>
          <Button
            width={'100%'}
            height={'100%'}
            onPress={() => setSnapPoints([0])}
          />
        </ViewAbsolute>
      );
    }
  };

  //각 스탭 별 바텀 모발에 보여질 뷰
  const renderModalViewContents = () => {
    switch (statebar) {
      case 2: // 통신사 선택
        return (
          <ViewRadiusCustom
            bgWhite
            height={'100%'}
            borderWidth={1}
            borderTopLeftRadius={15}
            borderTopRightRadius={15}
            brLightGray>
            <ViewRow
              justifyContent={'space-between'}
              marginTop={20}
              marginBottom={20}
              marginLeft={20}
              marginRight={20}>
              <Text ftDarkNavy bold ftLarge>
                통신사 선택
              </Text>
              <GestureButton
                width={24}
                height={24}
                onPress={(data) => onPressBottomModalClose(data)}>
                <Image
                  source={require('../../../assets/common/icon_cancel_black.png')}
                />
              </GestureButton>
            </ViewRow>

            <GestureButton
              justifyContent={'flex-start'}
              onPress={() => onPressTeleCom('01')}>
              <Text ftLarge ftDarkNavy marginLeft={20}>
                SKT
              </Text>
            </GestureButton>
            <GestureButton
              justifyContent={'flex-start'}
              onPress={() => onPressTeleCom('02')}>
              <Text ftLarge ftDarkNavy marginLeft={20}>
                KT
              </Text>
            </GestureButton>
            <GestureButton
              justifyContent={'flex-start'}
              onPress={() => onPressTeleCom('03')}>
              <Text ftLarge ftDarkNavy marginLeft={20}>
                LG U+
              </Text>
            </GestureButton>
            <GestureButton
              justifyContent={'flex-start'}
              onPress={() => onPressTeleCom('04')}>
              <Text ftLarge ftDarkNavy marginLeft={20}>
                SKT 알뜰폰
              </Text>
            </GestureButton>
            <GestureButton
              justifyContent={'flex-start'}
              onPress={() => onPressTeleCom('05')}>
              <Text ftLarge ftDarkNavy marginLeft={20}>
                KT 알뜰폰
              </Text>
            </GestureButton>
            <GestureButton
              justifyContent={'flex-start'}
              onPress={() => onPressTeleCom('06')}>
              <Text ftLarge ftDarkNavy marginLeft={20}>
                LGU 알뜰폰
              </Text>
            </GestureButton>
          </ViewRadiusCustom>
        );

      case 4: // 판매해본 아이템
      case 7: // 주로구매 관심 아이템
        return (
          <ViewRadiusCustom
            bgWhite
            height={'100%'}
            borderWidth={1}
            borderTopLeftRadius={15}
            borderTopRightRadius={15}
            brLightGray
            bgDarkWhite>
            <View
              alignItems={'center'}
              marginTop={20}
              marginBottom={20}
              marginRight={20}
              marginLeft={20}
              height={20}>
              <Text ftDarkNavy bold ftLarge>
                {statebar === 4
                  ? '판매한 상품 선택(최대 3가지 선택 가능)'
                  : '관심있는 상품 선택(최대 3가지 선택 가능)'}
              </Text>
            </View>
            <ScrollView>
              <View height={'100%'}>
                {statebar === 4 ? (
                  <SelectCheckBoxes
                    isRight={true}
                    data={checkBoxArray(sellItems)}
                    selectCount={3}
                    onPress={(data) => onPressCheckedItems(data)}
                    selectedIndex={sellItemsIndex}
                  />
                ) : (
                  <SelectCheckBoxes
                    isRight={true}
                    data={checkBoxArray(interestItems)}
                    selectCount={3}
                    onPress={(data) => onPressCheckedItems(data)}
                    selectedIndex={interestItemsIndex}
                  />
                )}
              </View>
            </ScrollView>
            <View
              marginLeft={20}
              marginRight={20}
              marginTop={10}
              marginBottom={10}>
              <GestureButtonBorderRadius
                paddingTop={10}
                paddingBottom={10}
                height={50}
                bgTheme
                onPress={() => onPressBottomModalClose()}>
                <Text ftWhite ftLarge>
                  선택완료
                </Text>
              </GestureButtonBorderRadius>
            </View>
          </ViewRadiusCustom>
        );
      case 5: //인스타아이디 검색
      case 6:
        return (
          <ViewBorderRadius
            bgWhite
            height={'100%'}
            borderTopWidth={1}
            borderTopLeftRadius={15}
            borderTopRightRadius={15}
            brLightGray>
            <View
              marginTop={20}
              marginLeft={20}
              marginRight={20}
              marginBottom={20}>
              <ViewRow justifyContent={'space-between'} marginBottom={20}>
                <Text ftDarkNavy bold ftLarge>
                  아이디 조회
                </Text>
                <GestureButton
                  width={24}
                  height={24}
                  onPress={onPressBottomModalClose}>
                  <Image
                    source={require('../../../assets/common/icon_cancel_black.png')}
                  />
                </GestureButton>
              </ViewRow>

              {/*<ViewRow marginBottom={20} justifyContent="space-between">*/}
              {/*  <NBInput*/}
              {/*    paddingLeft={10}*/}
              {/*    bgIceBlue*/}
              {/*    onChangeText={onChangeChannelName}*/}
              {/*  />*/}

              {/*  <View width={50} bgIceBlue>*/}
              {/*    <GestureButton onPress={() => igSearch()}>*/}
              {/*      <Image*/}
              {/*        width={22}*/}
              {/*        height={22}*/}
              {/*        justify={'center'}*/}
              {/*        source={require('../../../assets/common/icon_search_navy.png')}*/}
              {/*      />*/}
              {/*    </GestureButton>*/}
              {/*  </View>*/}
              {/*</ViewRow>*/}
              {!isEmpty(channelPk) ? (
                <ConnectProfile
                  name={channelName}
                  urlPath={channelProfile.url}
                  onPress={onPressSelectID}
                />
              ) : (
                <Text ftTheme>{errorMessage}</Text>
              )}
            </View>
          </ViewBorderRadius>
        );
    }
  };

  //뒤로가기시 리덕스 초기화
  useEffect(() => {
    return () => {
      dispatch(signupActions.change_init_state());
    };
  }, []);

  //로그인 시도 성공시
  useEffect(() => {
    if (jwtToken !== null && userId !== null && type !== null) {
      multiSet(jwtToken, userId, type).then(() =>
        Actions.replace('sellerSuccessApplyScreen'),
      );
    }
  }, [jwtToken, userId]);

  return (
    <>
      {renderAlphaBackGround()}
      <ToastMessage />
      <Topbar
        onPressLeft={onPressClose}
        isLeftButton={true}
        title={'셀러 회원가입'}
        isLine={true}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View height={'100%'} width={'100%'} paddingTop={20}>
          {renderView()}
        </View>
      </ScrollView>

      <BottomModal
        // snapPoints={[screenHeight/1.7, 0]}
        // snapTo={snap}
        snapPoints={snapPoints}
        contentGesture={false}
        initialSnap={0}
        view={renderModalViewContents()}
      />
      <CustomModal
        isVisible={isVisible}
        isOneButton={isOneButton}
        isFull={isFull}
        message={message}
        onPressOK={onPressOK}
        size={size}
        elements={elements}
        buttonHeight={buttonHeight}
        scrollJustifyContent={scrollJustifyContent}
        currentScene={'sellerSignUpScreen'}
      />
    </>
  );
};

export default SellerSignUpScreen;
