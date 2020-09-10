import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
// Styled Component
import {View, ViewRow} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import {ButtonRadius} from '../../../../components/styled/Button';
import TextAndInputBottomLine from '../../../../components/input/TextAndInputBottomLine';
import {screenWidth} from '../../../../components/styled/ScreenSize';
import BottomButton from '../../../../components/buttons/BottomButton';
// Redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as signupActions from '../../../../store/modules/signup/actions';
import * as customModalActions from '../../../../store/modules/modal/customModal/actions';

const IdSearch = (props) => {
  const dispatch = useDispatch();

  const {
    channelName,
    selectedChannelPk,
    statebar,
    channelInputName,
  } = useSelector(
    (state) => ({
      channelName: state.signup.channelName,
      selectedChannelPk: state.signup.selectedChannelPk,
      statebar: state.signup.statebar,
      channelInputName: state.signup.channelInputName,
    }),
    shallowEqual,
  );

  // 기기 뒤로가기 버튼 기능 {s}
  const backAndroid = () => {
    if (props.snapPoints[0] !== 0) {
      return true;
    } else {
      dispatch(signupActions.change_statebar(statebar - 1));
      return true;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAndroid);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAndroid);
    };
  }, [backAndroid]);
  // 기기 뒤로가기 버튼 기능 {e}

  // 채널이름
  const onChangeChannelName = (name) => {
    dispatch(signupActions.change_channel_name(name));
  };

  // 다음 버튼
  const onPressNext = () => {
    if (!selectedChannelPk) {
      dispatch(
        customModalActions.change_modal_message('인스타 아이디를 입력해주세요'),
      );
      return;
    }

    dispatch(signupActions.change_statebar(statebar + 1));
  };

  return (
    <>
      <View height={'100%'} justifyContent={'space-between'}>
        <View justifyContent={'flex-start'} marginLeft={20} marginRight={20}>
          <Text ftLarge ftTheme bold>
            02 라이브 방송 운영 채널
          </Text>

          <ViewRow marginTop={30} alignItems={'flex-end'}>
            <TextAndInputBottomLine
              title={'나의 인스타그램 아이디'}
              maxLength={30}
              isBottomLine={true}
              onChangeText={onChangeChannelName}
              value={channelInputName}
              width={screenWidth - 130}
            />
            <View paddingLeft={10} paddingBottom={15}>
              <ButtonRadius
                bgTheme
                width={85}
                height={30}
                borderRadius={8}
                onPress={props.onPressBottomModalOpen}>
                <Text ftWhite bold>
                  조회
                </Text>
              </ButtonRadius>
            </View>
          </ViewRow>
          {selectedChannelPk ? (
            <Text ftBlueTheme>아이디 선택이 완료되었습니다</Text>
          ) : (
            <Text ftTheme>아이디를 선택해주세요</Text>
          )}
        </View>
        <BottomButton onPress={() => onPressNext()} text={'다음'} />
      </View>
    </>
  );
};

export default IdSearch;
