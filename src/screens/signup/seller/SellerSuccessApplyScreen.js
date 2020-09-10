import React from 'react';
import {View, Container} from '../../../components/styled/View';
import {Text} from '../../../components/styled/Text';
import SellerProfile from '../../../components/profiles/SellerProfile';
import {Button} from '../../../components/styled/Button';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {isEmpty} from '../../../utils/functions';
import {Actions} from 'react-native-router-flux';
import * as signupActions from '../../../store/modules/signup/actions';

//셀러 가입신청
const SellerSuccessApplyScreen = () => {
  const dispatch = useDispatch();
  const {nickName, profileImage} = useSelector(
    (state) => ({
      nickName: state.user.nickName,
      profileImage: state.user.profileImage,
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
            셀러 가입신청 완료!
          </Text>
          <Text ftIceBlue marginTop={15} marginBottom={15}>
            24시간 내 셀러코드가 발급됩니다.
          </Text>
          <SellerProfile
            size={140}
            outLine={true}
            disabled={true}
            urlPath={isEmpty(profileImage) ? null : profileImage.path}
          />
          <Text ftWhite ftLarge bold marginTop={10}>
            {nickName}
          </Text>

          <Text ftIceBlue textAlign={'center'} marginTop={40}>
            라이브 방송 한 번만으로 매달 내 통장에{'\n'}쌓이는 수익금을 확인 할
            수 있습니다.
          </Text>
        </View>
        <View width={'100%'} bgWhite>
          <Button bgTheme height={55} onPress={onPressNext}>
            <Text ftWhite>메인으로 이동</Text>
          </Button>
        </View>
      </Container>
    </>
  );
};

export default SellerSuccessApplyScreen;
