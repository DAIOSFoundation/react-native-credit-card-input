import React, {useEffect} from 'react';
import SellerMyinfoScreen from './seller/SellerMyinfoScreen';
import ViewerMyinfoScreen from './viewer/ViewerMyinfoScreen';
import {Actions} from 'react-native-router-flux';

import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {Spinner} from 'native-base';
import {Dimensions} from 'react-native';
import * as userActions from '../../../store/modules/user/actions';
import {Text} from '../../../components/styled/Text';
import {View, ViewAbsolute} from '../../../components/styled/View';
import CustomModal from '../../../components/modal/CustomModal';
import ListButton from '../../../components/buttons/ListButton';
import * as customModalActions from '../../../store/modules/modal/customModal/actions';
import * as toastActions from '../../../store/modules/toast/actions';
import LoadingBar from '../../../components/loadingBar/LoadingBar';
import ToastMessage from '../../../components/toast/ToastMessage';
import * as globalActions from '../../../store/modules/global/actions';

const MyInfo = () => {
  const dispatch = useDispatch();
  const {
    oAuthToken,
    jwtToken,
    userId,
    type,
    platform,
    errorMsg,
    successMsg,
    isVisible,
    isOneButton,
    isFull,
    message,
    onPressOK,
    size,
    nickName,
    userInfo,
    elements,
    buttonHeight,
    scrollJustifyContent,
    myInfoToastMsg,
  } = useSelector(
    (state) => ({
      oAuthToken: state.user.oAuthToken,
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      type: state.user.type,
      platform: state.user.platform,
      errorMsg: state.user.errorMsg,
      successMsg: state.user.successMsg,
      nickName: state.user.nickName,
      userInfo: state.user.userInfo,
      isVisible: state.customModal.isVisible,
      isOneButton: state.customModal.isOneButton,
      isFull: state.customModal.isFull,
      message: state.customModal.message,
      onPressOK: state.customModal.onPressOK,
      size: state.customModal.size,
      elements: state.customModal.elements,
      buttonHeight: state.customModal.buttonHeight,
      scrollJustifyContent: state.customModal.scrollJustifyContent,
      myInfoToastMsg: state.toast.myInfoToastMsg,
    }),
    shallowEqual,
  );

  // 성공처리
  useEffect(() => {
    if (successMsg !== '') {
      dispatch(customModalActions.change_modal_message(successMsg));
    }
  }, [successMsg]);

  useEffect(() => {
    const param = {
      userId,
      jwtToken,
    };
    if (userId && jwtToken) {
      dispatch(userActions.request_user_myinfo(param));
    }
  }, [userId, jwtToken]);

  useEffect(() => {
    dispatch(globalActions.change_tab_location('MyInfo'));
  }, []);

  console.log('isVisible? => ', isVisible);
  const render = () => {
    if (!userInfo) {
      return (
        <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}} />
        </View>
      );
    } else if (type === 'seller') {
      return <SellerMyinfoScreen />;
    } else if (type === 'viewer') {
      return <ViewerMyinfoScreen />;
    } else {
      console.log('userType error');
    }
  };

  useEffect(() => {
    if (myInfoToastMsg) {
      dispatch(globalActions.change_toast_message(myInfoToastMsg));
      dispatch(toastActions.reset_initial_state());
    }
  }, [myInfoToastMsg]);

  return (
    <>
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
        currentScene={'MyInfo'}
      />
      {render()}
    </>
  );
};

export default MyInfo;
