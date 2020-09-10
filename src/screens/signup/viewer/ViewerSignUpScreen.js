import React, {useEffect, useState} from 'react';
import {
  View,
  ViewRadiusCustom,
  ViewBorderRadius,
  ViewRow,
  ViewAbsolute,
  ScrollView,
} from '../../../components/styled/View';
import {
  Button,
  GestureButtonBorderRadius,
  GestureButton,
} from '../../../components/styled/Button';
import Topbar from '../../../components/bar/Topbar';
import Terms from './viewerSignUp/Terms';
import Profile from '../common/Profile';
import Information from './viewerSignUp/Information';
import ViewerIdentityVerification from '../common/ViewerIdentityVerification';
import {Text} from '../../../components/styled/Text';
import {Image} from '../../../components/styled/Image';
import StateBar from './viewerSignUp/common/StateBar';
import * as signupActions from '../../../store/modules/signup/actions';
import * as userActions from '../../../store/modules/user/actions';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {stateItems} from '../../../utils/constants';
import BottomModal from '../../../components/modal/BottomModal';
import {Actions} from 'react-native-router-flux';
import {screenHeight} from '../../../components/styled/ScreenSize';
import {interestItems} from '../../../utils/constants';
import SelectCheckBoxes from '../../../components/checkboxes/SelectCheckBoxes';
import CustomModal from '../../../components/modal/CustomModal';
import * as customModalActions from '../../../store/modules/modal/customModal/actions';
import {isEmptyDataArray, isEmpty, multiSet} from '../../../utils/functions';
import AsyncStorage from '@react-native-community/async-storage';

//시청자 회원가입 화면
const ViewerSignUpScreen = () => {
  // const [snap, setSnap] = useState(1);
  const [snapPoints, setSnapPoints] = useState([0, 0]);
  const [tmpInterestItems, setTmpInterestItems] = useState([]);

  const dispatch = useDispatch();

  const {
    jwtToken,
    userId,
    type,
    statebar,
    errorMsg,
    userErrorMsg,
    isVisible,
    isOneButton,
    isFull,
    message,
    onPressOK,
    size,
    elements,
    buttonHeight,
    scrollJustifyContent,
    firebaseToken,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      type: state.user.type,
      userId: state.user.userId,
      statebar: state.signup.statebar,
      errorMsg: state.signup.errorMsg,
      userErrorMsg: state.user.errorMsg,
      isValid: state.signup.isValid,
      isVisible: state.customModal.isVisible,
      isOneButton: state.customModal.isOneButton,
      isFull: state.customModal.isFull,
      message: state.customModal.message,
      onPressOK: state.customModal.onPressOK,
      size: state.customModal.size,
      elements: state.customModal.elements,
      buttonHeight: state.customModal.buttonHeight,
      scrollJustifyContent: state.customModal.scrollJustifyContent,
      firebaseToken: state.global.firebaseToken,
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

  // 바텀 모달 열기
  const onPressBottomModalOpen = () => {
    // setSnap(0);
    if (statebar === 2) {
      setSnapPoints([screenHeight / 2.3, 0]);
    } else {
      setSnapPoints([screenHeight / 1.7, 0]);
    }
  };

  // 바텀 모달 닫기
  const onPressBottomModalClose = () => {
    let pressedData = [];
    if (statebar === 2) {
    } else {
      for (let i = 0; i < tmpInterestItems.length; i++) {
        if (tmpInterestItems[i]) {
          pressedData.push({
            name: interestItems[i],
            index: i,
          });
        }
      }

      dispatch(signupActions.change_product_interest(pressedData));
    }
    setSnapPoints([0, 0]);
    // setSnap(1);
  };

  // 체크된 아이템
  const onPressInterestCheck = (items) => {
    console.log(items);
    setTmpInterestItems(items);
  };

  // 선택한 통신사
  const onPressTeleCom = (data) => {
    dispatch(signupActions.change_phone_carrier(data));
    setSnapPoints([0, 0]);
  };

  //에러처리
  useEffect(() => {
    if (errorMsg) {
      switch (errorMsg.substring(0, 5)) {
        // 아마 가입한 회원
        case 'E1017':
          return;
        default:
          dispatch(customModalActions.change_modal_message(errorMsg));
      }
      dispatch(signupActions.change_error_msg(null));
    }
  }, [errorMsg]);

  // Information.js 파일에서 회원가입 에러 처리
  useEffect(() => {
    if (userErrorMsg) {
      switch (userErrorMsg.substring(0, 5)) {
        // 아마 가입한 회원
        case 'E1001':
          return;
        case 'E1017':
          return;
        default:
          dispatch(customModalActions.change_modal_message(userErrorMsg));
      }
      dispatch(userActions.change_error_msg(null));
    }
  }, [userErrorMsg]);

  //바텀 모달에 보여질 뷰
  const renderModalViewContents = () => {
    if (statebar === 2) {
      return (
        //통신사 선택

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
    } else {
      //관심있는 아이템
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
              관심있는 아이템 선택(최대 3가지 선택 가능)
            </Text>
          </View>
          <ScrollView>
            <View height={'100%'}>
              <SelectCheckBoxes
                isRight={true}
                data={interestItems}
                selectCount={3}
                onPress={(data) => onPressInterestCheck(data)}
              />
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
    }
  };

  // 각 스탭 뷰
  const renderView = () => {
    switch (statebar) {
      case 1:
        return <Terms />;
      case 2:
        return (
          <ViewerIdentityVerification
            onPressBottomModalOpen={onPressBottomModalOpen}
          />
        );
      case 3:
        return <Profile />;
      case 4:
        return <Information onPressBottomModalOpen={onPressBottomModalOpen} />;
    }
  };

  //바텀 모달 활성화시 배경 알파 검은색 뷰
  const renderAlphaBackGround = () => {
    if (snapPoints[0] !== 0) {
      return (
        <ViewAbsolute width={'100%'} height={'100%'} zIndex={10} bgBlackAlpha>
          <Button
            width={'100%'}
            height={'100%'}
            onPress={() => setSnapPoints([0, 0])}
          />
        </ViewAbsolute>
      );
    }
  };

  //뒤로가기시 리덕스 초기화
  useEffect(() => {
    return () => {
      dispatch(signupActions.change_init_state());
    };
  }, []);

  return (
    <>
      {renderAlphaBackGround()}
      <Topbar
        onPressLeft={onPressClose}
        isLeftButton={true}
        title={'시청자 회원가입'}
        isLine={true}
      />
      <View
        marginRight={40}
        marginLeft={40}
        marginTop={30}
        justifyContent={'center'}>
        <StateBar state={statebar} data={stateItems} />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View height={'100%'} width={'100%'} paddingTop={20}>
          {renderView()}
        </View>
      </ScrollView>

      <BottomModal
        snapPoints={snapPoints}
        contentGesture={false}
        headerGesture={false}
        initialSnap={1}
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
        currentScene={'viewerSignUpScreen'}
      />
    </>
  );
};

export default ViewerSignUpScreen;
