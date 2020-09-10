import React, {useEffect} from 'react';
import {ViewRow, View, Container} from '../../components/styled/View';
import {Text} from '../../components/styled/Text';
import {Image} from '../../components/styled/Image';
import {screenWidth} from '../../components/styled/ScreenSize';
import PreventDoubleClick from '../../components/buttons/PreventDoubleClick';
import OnPressStyleButton from '../../components/buttons/OnPressStyleButton';
import Topbar from '../../components/bar/Topbar';
import {useDispatch} from 'react-redux';
import * as signupActions from '../../store/modules/signup/actions';
import {Actions} from 'react-native-router-flux';
import * as userActions from '../../store/modules/user/actions';

const TouchableWithoutFeedbackDoubleClick = PreventDoubleClick(
  OnPressStyleButton,
);
const SelectViewerORSellerScreen = () => {
  const dispatch = useDispatch();

  //닫기 버튼
  const onPressClose = () => {
    Actions.pop();
  };

  //시청자 가입 버튼
  const onPressViewer = () => {
    dispatch(signupActions.change_user_type('viewer'));
    Actions.push('viewerSignUpScreen');
  };

  //셀러 가입 버튼
  const onPressSeller = () => {
    dispatch(signupActions.change_user_type('seller'));
    Actions.push('sellerSignUpScreen');
  };

  useEffect(() => {
    return () => {
      dispatch(userActions.change_init_state());
    };
  });

  return (
    <>
      <Topbar
        isRightButton={true}
        onPressRight={onPressClose}
        title={'dddd'}
        bgColor={{bgDarkNavy: true}}
      />
      <Container bgDarkNavy paddingLeft={20} paddingRight={20}>
        <View
          width={'100%'}
          marginTop={50}
          marginBottom={50}
          justifyContent={'flex-start'}>
          <Text ftWhite ftLarge bold>
            안녕하세요?
          </Text>
          <Text ftWhite ftLarge bold marginTop={5}>
            회원가입을 위해 선택해주세요.
          </Text>
        </View>

        <ViewRow width={'100%'} justifyContent={'space-between'}>
          {/* 시청자로 가입하기 버튼 */}
          <TouchableWithoutFeedbackDoubleClick
            onPress={onPressViewer}
            showButtonProps={{
              brWhite: true,
              height: 255,
              borderRadius: 8,
              width: screenWidth / 2 - 30,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
            hideButtonProps={{
              brTheme: true,
              height: 255,
              borderRadius: 8,
              width: screenWidth / 2 - 30,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
            showBody={
              <View
                height={215}
                justifyContent={'space-between'}
                marginTop={20}
                marginBottom={20}
                marginLeft={15}>
                <View>
                  <Text ftWhite fontSize={20}>
                    셀러의 방송을
                  </Text>
                  <Text ftWhite fontSize={20}>
                    보고 싶어요
                  </Text>
                </View>
                <Image
                  marginTop={50}
                  width={50}
                  height={50}
                  resizeMode={'cover'}
                  source={require('../../assets/signup/pic_viewer.png')}
                />
                <ViewRow alignItems={'center'}>
                  <Text ftWhite bold>
                    시청자 가입
                  </Text>
                  <Image
                    width={24}
                    height={24}
                    resizeMode={'cover'}
                    source={require('../../assets/signup/icon_more_arrow.png')}
                  />
                </ViewRow>
              </View>
            }
            hideBody={
              <View
                height={215}
                justifyContent={'space-between'}
                marginTop={20}
                marginBottom={20}
                marginLeft={15}>
                <View>
                  <Text ftWhite fontSize={20}>
                    셀러의 방송을
                  </Text>
                  <Text ftWhite fontSize={20}>
                    보고 싶어요
                  </Text>
                </View>
                <Image
                  marginTop={50}
                  width={50}
                  height={50}
                  resizeMode={'cover'}
                  source={require('../../assets/signup/pic_viewer.png')}
                />
                <ViewRow alignItems={'center'}>
                  <Text ftWhite bold>
                    시청자 가입
                  </Text>
                  <Image
                    width={24}
                    height={24}
                    resizeMode={'cover'}
                    source={require('../../assets/signup/icon_more_arrow_pink.png')}
                  />
                </ViewRow>
              </View>
            }
          />

          {/* 셀러로 가입하기 버튼 */}
          <TouchableWithoutFeedbackDoubleClick
            onPress={onPressSeller}
            showButtonProps={{
              brWhite: true,
              height: 255,
              width: screenWidth / 2 - 30,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
            hideButtonProps={{
              brTheme: true,
              height: 255,
              width: screenWidth / 2 - 30,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
            showBody={
              <View
                height={215}
                justifyContent={'space-between'}
                marginTop={20}
                marginBottom={20}
                marginLeft={15}>
                <View>
                  <Text ftWhite fontSize={20}>
                    셀러로 방송을
                  </Text>
                  <Text ftWhite fontSize={20}>
                    하고 싶어요
                  </Text>
                </View>
                <Image
                  marginTop={50}
                  width={50}
                  height={50}
                  resizeMode={'cover'}
                  source={require('../../assets/signup/pic_seller.png')}
                />
                <ViewRow alignItems={'center'}>
                  <Text ftWhite bold>
                    셀러 가입
                  </Text>
                  <Image
                    width={24}
                    height={24}
                    resizeMode={'cover'}
                    source={require('../../assets/signup/icon_more_arrow.png')}
                  />
                </ViewRow>
              </View>
            }
            hideBody={
              <View
                height={215}
                justifyContent={'space-between'}
                marginTop={20}
                marginBottom={20}
                marginLeft={15}>
                <View>
                  <Text ftWhite fontSize={20}>
                    셀러로 방송을
                  </Text>
                  <Text ftWhite fontSize={20}>
                    하고 싶어요
                  </Text>
                </View>
                <Image
                  marginTop={50}
                  width={50}
                  height={50}
                  resizeMode={'cover'}
                  source={require('../../assets/signup/pic_seller.png')}
                />
                <ViewRow alignItems={'center'}>
                  <Text ftWhite bold>
                    셀러 가입
                  </Text>
                  <Image
                    width={24}
                    height={24}
                    resizeMode={'cover'}
                    source={require('../../assets/signup/icon_more_arrow_pink.png')}
                  />
                </ViewRow>
              </View>
            }
          />
        </ViewRow>
      </Container>
    </>
  );
};

export default SelectViewerORSellerScreen;
