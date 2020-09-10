import React, {useEffect} from 'react';
import {View, Container} from '../../../components/styled/View';
import {Text} from '../../../components/styled/Text';
import SellerProfile from '../../../components/profiles/SellerProfile';
import {ButtonRadius} from '../../../components/styled/Button';
import {Actions} from 'react-native-router-flux';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {isEmpty} from '../../../utils/functions';
import * as userActions from '../../../store/modules/user/actions';
import AsyncStorage from '@react-native-community/async-storage';

//셀러 회원가입 성공 화면
const SellerSignUpSuccessScreen = () => {
  const dispatch = useDispatch();

  const {nickName, profileImage, sellerCode, jwtToken, userId} = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      nickName: state.user.nickName,
      profileImage: state.user.profileImage,
      sellerCode: state.user.sellerCode,
    }),
  );

  const onPressMain = () => {
    Actions.reset('tabBar');
  };

  const onPressRecommend = () => {
    Actions.reset('tabBar');
    Actions.replace('myInfoScreen');
    Actions.recommendScreen();
    dispatch(userActions.change_init_seller_activate());
  };

  useEffect(() => {
    return async () => {
      let param = null;
      if (jwtToken && userId) {
        param = {
          jwtToken: jwtToken,
          userId: userId,
        };
      } else {
        const value = await AsyncStorage.multiGet(['jwtToken', 'userId']);
        param = {
          jwtToken: value[0][1],
          userId: value[1][1],
        };
      }

      await AsyncStorage.setItem('activate', '1');
      dispatch(userActions.request_user_seller_activate_check(param));
    };
  }, []);

  return (
    <Container bgDarkNavy justifyContent={'space-between'}>
      <View
        width={'100%'}
        marginTop={110}
        marginBottom={50}
        justifyContent={'center'}
        alignItems={'center'}>
        <Text ftWhite fontSize={22} bold>
          가입을 환영합니다!
        </Text>
        <Text ftIceBlue textAlign={'center'} marginTop={15} marginBottom={15}>
          셀러 승인이 완료 되었습니다.{'\n'}라이브 방송을 할 추천상품을
          만나보세요
        </Text>
        <SellerProfile
          size={140}
          outLine={true}
          disabled={true}
          urlPath={isEmpty(profileImage) ? null : profileImage.path}
        />
        <Text ftIceBlue marginTop={10}>
          셀러 코드 SV{sellerCode}
        </Text>
        <Text ftWhite ftLarge bold>
          {nickName}
        </Text>
      </View>
      <View width={'100%'} paddingLeft={50} marginRight={50} marginBottom={50}>
        <ButtonRadius
          bgNavy
          height={55}
          borderRadius={8}
          onPress={onPressRecommend}>
          <Text ftWhite>추천상품 만나보기</Text>
        </ButtonRadius>
        <ButtonRadius
          marginTop={15}
          bgTheme
          height={55}
          borderRadius={8}
          onPress={onPressMain}>
          <Text ftWhite>메인으로</Text>
        </ButtonRadius>
      </View>
    </Container>
  );
};

export default SellerSignUpSuccessScreen;
