import React from 'react';
import {View, Container} from '../../../components/styled/View';
import {Text} from '../../../components/styled/Text';
import SellerProfile from '../../../components/profiles/SellerProfile';
import {Button} from '../../../components/styled/Button';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import * as signupActions from '../../../store/modules/signup/actions';
import {Actions} from 'react-native-router-flux';
import {isEmpty} from '../../../utils/functions';
import BottomButton from '../../../components/buttons/BottomButton';
//시청자 회원가입 성공 화면
const ViewerSignUpSuccessScreen = () => {
  const dispatch = useDispatch();
  const {nickName, profileImage} = useSelector(
    (state) => ({
      nickName: state.signup.nickName,
      profileImage: state.signup.profileImage,
    }),
    shallowEqual,
  );

  const onPressNext = () => {
    dispatch(signupActions.change_init_state());
    Actions.reset('tabBar');
  };

  return (
    <>
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
          <Text ftIceBlue bold marginTop={15} marginBottom={15}>
            이제 셀러비전에서 라이브방송을 즐기세요!
          </Text>
          <SellerProfile
            urlPath={isEmpty(profileImage) ? null : profileImage.path}
            size={140}
            outLine={true}
            disabled={true}
          />
          <Text ftWhite ftLarge bold marginTop={10}>
            {nickName}
          </Text>
        </View>
        <BottomButton onPress={() => onPressNext()} text={'메인으로 이동'} />
      </Container>
    </>
  );
};

export default ViewerSignUpSuccessScreen;
