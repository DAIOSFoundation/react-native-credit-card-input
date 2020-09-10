import React, {useEffect} from 'react';
import {ViewSelf, View, ViewRow} from '../../../components/styled/View';
import {Text} from '../../../components/styled/Text';
import PickProfile from '../../../components/profiles/PickProfile';
import {ButtonRadius} from '../../../components/styled/Button';
import TextAndInputBottomLine from '../../../components/input/TextAndInputBottomLine';
import {screenWidth} from '../../../components/styled/ScreenSize';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as signupActions from '../../../store/modules/signup/actions';
import * as userActions from '../../../store/modules/user/actions';
import * as customModalActions from '../../../store/modules/modal/customModal/actions';
import {regEmail} from '../../../utils/functions';
import {Button} from '../../../components/styled/Button';
import {Actions} from 'react-native-router-flux';
import BottomButton from '../../../components/buttons/BottomButton';
import {BackHandler} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

// 프로필
const Profile = () => {
  const dispatch = useDispatch();

  const {
    nickName,
    email,
    isValidNickName,
    isValidEmail,
    statebar,
    checkedNickName,
    profileImage,
  } = useSelector(
    (state) => ({
      nickName: state.signup.nickName,
      email: state.signup.email,
      isValidNickName: state.signup.isValidNickName,
      isValidEmail: state.signup.isValidEmail,
      statebar: state.signup.statebar,
      checkedNickName: state.signup.checkedNickName,
      profileImage: state.signup.profileImage,
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

  //이메일 리덕스 변경
  const onChangeEmail = (email, isValid) => {
    dispatch(signupActions.change_is_valid_email(isValid));
    dispatch(signupActions.change_email(email));
  };

  //닉네임 리덕스 변경
  const onChangeNickName = (nick, isValid) => {
    dispatch(signupActions.change_is_valid_nickname(isValid));
    dispatch(signupActions.change_nick_name(nick));
  };

  // 중복검사
  const onPressOverlap = () => {
    if (isValidNickName && nickName) {
      dispatch(signupActions.request_check_nick(encodeURI(nickName)));
      dispatch(userActions.change_nick(nickName));
    }
  };

  //닉네임 문자열 길이 검사
  const checkValid = (v) => {
    if (v.length <= 1) {
      return false;
    }
    return true;
  };

  //다음 버튼
  const onPressNext = () => {
    console.log('nickName', nickName);
    console.log('checkedNickName', checkedNickName);
    if (!nickName || !isValidNickName) {
      dispatch(
        customModalActions.change_modal_message('닉네임을 입력해주세요'),
      );
      return;
    } else if (!checkedNickName || checkedNickName !== nickName) {
      dispatch(
        customModalActions.change_modal_message('닉네임 중복 검사를 해주세요'),
      );
      return;
    } else if (!isValidEmail || !email) {
      dispatch(
        customModalActions.change_modal_message('이메일을 입력해 주세요'),
      );
      return;
    }
    dispatch(signupActions.change_statebar(statebar + 1));
  };

  // 프로필 이미지 변경
  // 이미지 picker
  const onPressPick = () => {
    ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      cropping: true,
    }).then((image) => {
      dispatch(signupActions.change_profile_image(image));
      dispatch(userActions.change_profile_image(image));
    });
  };

  return (
    <View height={'100%'} justifyContent={'space-between'}>
      <View justifyContent={'flex-start'} marginLeft={20} marginRight={20}>
        <ViewSelf alignItems={'center'}>
          <PickProfile
            isIcon={true}
            onPressPick={onPressPick}
            urlPath={profileImage}
          />
        </ViewSelf>
        <ViewRow marginTop={50} alignItems={'flex-end'}>
          <TextAndInputBottomLine
            title={'채팅에 표시될 나의 닉네임'}
            placeholderText={'닉네임을 20자 이하 입력해주세요'}
            maxLength={20}
            isBottomLine={true}
            value={nickName}
            valid={checkValid}
            onChangeText={(nickName, isValid) =>
              onChangeNickName(nickName, isValid)
            }
            width={screenWidth - 140}
            errorText={'사용할 수 있는 닉네임은 2~20 글자 입니다.'}
          />
          <View paddingLeft={10} paddingBottom={15}>
            <ButtonRadius
              bgTheme
              width={95}
              height={35}
              borderRadius={8}
              paddingLeft={20}
              paddingRight={20}
              onPress={onPressOverlap}>
              <Text ftWhite bold>
                중복확인
              </Text>
            </ButtonRadius>
          </View>
        </ViewRow>
        <View marginTop={20}>
          <TextAndInputBottomLine
            title={'이메일 주소'}
            placeholderText={'이메일 주소를 입력해주세요'}
            errorText={'이메일을 정확히 입력해주세요'}
            value={email}
            valid={regEmail}
            maxLength={30}
            isBottomLine={true}
            onChangeText={(email, isValid) =>
              onChangeEmail(email.trim(), isValid)
            }
          />
        </View>
      </View>
      <BottomButton onPress={() => onPressNext()} text={'다음'} />
      {/* <ViewRow marginTop={30} alignItems={'flex-end'}>
        <TextAndInputBottomLine
          title={'주민등록번호'}
          placeholderText={'앞자리 여섯숫자'}
          maxLength={6}
          isBottomLine={true}
          onChangeText={onPress}
          isOnlyNumber={true}
          width={screenWidth / 2 - 30}
        />
        <Text ftLarge paddingBottom={5} paddingLeft={10} paddingRight={10}>
          {' '}
          -{' '}
        </Text>
        <ViewRow alignItems={'flex-end'}>
          <TextAndInputBottomLine
            maxLength={1}
            isBottomLine={true}
            onChangeText={onPress}
            width={25}
            isOnlyNumber={true}
          />
          <Text ftLarge> * * * * * * </Text>
        </ViewRow>
      </ViewRow>
      <View marginTop={30}>
        <TextAndInputBottomLine
          title={'이메일 주소'}
          placeholderText={'이메일 주소를 입력해주세요'}
          maxLength={30}
          isBottomLine={true}
          onChangeText={onPress}
        />
      </View> */}
    </View>
  );
};

export default Profile;
