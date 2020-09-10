import React, {useEffect} from 'react';
import Topbar from '../../../../../components/bar/Topbar';
import {
  ScrollView,
  View,
  ViewBorderRow,
} from '../../../../../components/styled/View';
import {Actions} from 'react-native-router-flux';
import Coupon from '../../../../../components/coupon/coupon';
import {Text} from '../../../../../components/styled/Text';

//redux
import * as couponActions from '../../../../../store/modules/coupon/actions';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {Image} from '../../../../../components/styled/Image';
import LoadingBar from '../../../../../components/loadingBar/LoadingBar';
import {percentHeight} from '../../../../../utils/functions';
//쿠폰 스크린
const ViewerCouponScreen = () => {
  const dispatch = useDispatch();

  const {userId, jwtToken, loading, coupons} = useSelector(
    (state) => ({
      userId: state.user.userId,
      jwtToken: state.user.jwtToken,
      loading: state.loading['coupon/REQUEST_GET_COUPON'],
      coupons: state.coupon.coupons,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(
      couponActions.request_get_coupon({
        userId,
        jwtToken,
      }),
    );
  }, []);

  // 뒤로가기 버튼
  const onPressBack = () => {
    Actions.pop();
  };

  return (
    <>
      <Topbar
        isLine
        title={'쿠폰'}
        onPressLeft={onPressBack}
        isLeftButton={true}
      />
      <ScrollView bgDarkWhite>
        {loading ? (
          <View style={{position: 'absolute', zIndex: 0}}>
            <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
          </View>
        ) : (
          <></>
        )}
        {coupons && coupons.length !== 0 ? (
          <View>
            <ViewBorderRow marginTop={18} marginBottom={10}>
              <Text fontSize={14} bold marginRight={4} marginLeft={15}>
                사용 가능한 쿠폰
              </Text>
              <Text fontSize={14} bold ftTheme>
                {coupons.length}
              </Text>
            </ViewBorderRow>
            <Coupon coupons={coupons} />
          </View>
        ) : (
          <View>
            <View alignItems={'center'} height={percentHeight(60)}>
              <Text fontSize={20} bold marginTop={50}>
                죄송합니다
              </Text>
              <Text marginTop={15} fontSize={16}>
                사용 가능한 쿠폰이 없습니다.
              </Text>
              <Image
                marginTop={50}
                source={require('../../../../../assets/signup/cry_face.png')}
                width={180}
                height={180}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};
export default ViewerCouponScreen;
