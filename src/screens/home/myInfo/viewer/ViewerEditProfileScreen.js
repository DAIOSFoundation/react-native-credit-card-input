import React, {useEffect} from 'react';
import {
  ScrollView,
  View,
  ViewBorderRadius,
  ViewRow,
} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import BasicTextInput from '../../../../components/input/BasicTextInput';
import {Picker} from 'react-native';
import {banksList, firstNumPhoneItems} from '../../../../utils/constants';
import BottomButton from '../../../../components/buttons/BottomButton';
import Topbar from '../../../../components/bar/Topbar';
import {Actions} from 'react-native-router-flux';
import * as userActions from '../../../../store/modules/user/actions';
import {useDispatch, useSelector} from 'react-redux';
import {changeFirstNumber, regPhone} from '../../../../utils/functions';
import * as adjustmentActions from '../../../../store/modules/adjustment/actions';
import LoadingBar from '../../../../components/loadingBar/LoadingBar';
import * as customModalActions from '../../../../store/modules/modal/customModal/actions';

const ViewerEditProfileScreen = () => {
  const dispatch = useDispatch();

  const {
    jwtToken,
    viewerNickName,
    viewerEmail,
    viewerPhone,
    userId,
    loading,
    profileSuccessMsg,
  } = useSelector((state) => ({
    jwtToken: state.user.jwtToken,
    viewerNickName: state.user.viewerNickName,
    viewerEmail: state.user.viewerEmail,
    viewerPhone: state.user.viewerPhone,
    userId: state.user.userId,
    loading: state.loading['user/REQUEST_VIEWER_INFO'],
    profileSuccessMsg: state.user.profileSuccessMsg,
  }));

  useEffect(() => {
    const param = {
      jwtToken,
      userId,
    };
    dispatch(userActions.request_viewer_info(param));
  }, []);

  useEffect(() => {
    if (profileSuccessMsg) {
      dispatch(
        customModalActions.change_modal_message(
          '프로필 변경이 완료되었습니다.',
        ),
      );
      dispatch(customModalActions.change_modal_onpress_ok(onPressOK));
    }
    return () => {
      dispatch(userActions.change_profile_success_message());
    };
  }, [profileSuccessMsg]);

  const onPressOK = () => {
    Actions.pop();
  };

  const onChangeNickName = (value) => {
    dispatch(userActions.change_viewer_nick_name(value));
  };

  const onChangeViewerEmail = (value) => {
    dispatch(userActions.change_viewer_email(value));
  };

  const onChangeViewerPhone = (value) => {
    dispatch(userActions.change_viewer_phone(value));
  };

  const onPressEdit = () => {
    let viewerChangePhone;
    if (viewerPhone.includes('+82')) {
      viewerChangePhone = viewerPhone;
    } else {
      viewerChangePhone = '+82' + viewerPhone.substring(1);
    }
    console.log('onPressEdit', '+82' + viewerPhone.substring(1));
    const param = {
      userId,
      viewerNickName,
      viewerEmail,
      viewerPhone: viewerChangePhone,
      jwtToken,
    };
    dispatch(userActions.update_viewer_info(param));
  };

  return (
    <View height={'100%'}>
      <Topbar
        isLine
        title={'프로필 수정'}
        isLeftButton
        onPressLeft={() => Actions.pop()}
        isRightButton
      />
      {loading && !viewerPhone ? (
        <View height={'80%'}>
          <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
        </View>
      ) : (
        <ScrollView>
          <View marginLeft={20} marginRight={20} marginTop={30}>
            <ViewRow
              alignItems={'center'}
              justifyContent={'space-between'}
              marginBottom={15}>
              <View width={'20%'}>
                <Text>닉네임</Text>
              </View>
              <BasicTextInput
                width={'80%'}
                height={35}
                brColor={'#cbced5'}
                onChangeText={onChangeNickName}
                value={viewerNickName}
              />
            </ViewRow>
            <ViewRow
              alignItems={'center'}
              justifyContent={'space-between'}
              marginBottom={15}>
              <Text>이메일</Text>
              <BasicTextInput
                width={'80%'}
                height={35}
                brColor={'#cbced5'}
                onChangeText={onChangeViewerEmail}
                value={viewerEmail}
              />
            </ViewRow>
            <ViewRow
              alignItems={'center'}
              justifyContent={'space-between'}
              marginBottom={15}>
              <Text>연락처</Text>
              <BasicTextInput
                width={'80%'}
                height={35}
                brColor={'#cbced5'}
                onChangeText={onChangeViewerPhone}
                value={viewerPhone.replace('+82', '0')}
              />
            </ViewRow>
          </View>
        </ScrollView>
      )}
      <BottomButton textSize={17} onPress={onPressEdit} text={'수정'} />
    </View>
  );
};
export default ViewerEditProfileScreen;
