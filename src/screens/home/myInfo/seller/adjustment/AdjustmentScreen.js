import React, {useState, useEffect} from 'react';
// Styled Component
import {
  ScrollView,
  View,
  ViewBorderRow,
} from '../../../../../components/styled/View';
import {Text} from '../../../../../components/styled/Text';
import Topbar from '../../../../../components/bar/Topbar';
import {ImageCirclePreview} from '../../../../../components/styled/Image';
import {ButtonBorderRadius} from '../../../../../components/styled/Button';
import LoadingBar from '../../../../../components/loadingBar/LoadingBar';
import {screenWidth} from '../../../../../components/styled/ScreenSize';
// NPM Module
import {Actions} from 'react-native-router-flux';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
// Screen Import
import LiveBroadcastTab from './LiveBroadcastTab';
import OneDayTab from './OneDayTab';
import MonthTab from './MonthTab';
// Redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as adjustmentActions from '../../../../../store/modules/adjustment/actions';

export const AdjustmentScreen = () => {
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();

  const {
    loading,
    liveAdjustmentInfo,
    dayAdjustmentInfo,
    monthAdjustmentInfo,
    userId,
    jwtToken,
  } = useSelector(
    (state) => ({
      loading: state.loading['adjustment/GET_OWN_LIVE_ADJUSTMENT'],
      liveAdjustmentInfo: state.adjustment.liveAdjustmentInfo,
      dayAdjustmentInfo: state.adjustment.dayAdjustmentInfo,
      monthAdjustmentInfo: state.adjustment.monthAdjustmentInfo,
      userId: state.user.userId,
      jwtToken: state.user.jwtToken,
    }),
    shallowEqual,
  );

  useEffect(() => {
    let param = {
      userId: userId,
      jwtToken: jwtToken,
    };

    dispatch(adjustmentActions.get_own_live_adjustment(param));
    dispatch(adjustmentActions.get_own_day_adjustment(param));
    dispatch(adjustmentActions.get_own_month_adjustment(param));
  }, []);

  const initialLayout = {width: screenWidth};

  const [routes] = useState([
    {key: 'live', title: '라방'},
    {key: 'oneDay', title: '1일'},
    {key: 'month', title: '한달'},
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor="#e6427a"
      inactiveColor="#767b80"
      labelStyle={{fontWeight: 'bold'}}
      indicatorStyle={{backgroundColor: '#e6427a'}}
      style={{backgroundColor: 'white'}}
    />
  );

  const liveBroadcastTab = () => {
    if (index === 0) {
      return <LiveBroadcastTab liveAdjustmentInfo={liveAdjustmentInfo} />;
    } else {
      return null;
    }
  };

  const oneDayTab = () => {
    if (index === 1) {
      return (
        <OneDayTab
          dayAdjustmentInfo={dayAdjustmentInfo}
          broadcastRevenue={'1일 방송 수익'}
          adjustmentProfit={'1일 정산 수익'}
        />
      );
    } else {
      return null;
    }
  };

  const monthTab = () => {
    if (index === 2) {
      return (
        <MonthTab
          monthAdjustmentInfo={monthAdjustmentInfo}
          broadcastRevenue={'한달 방송 수익'}
          adjustmentProfit={'한달 정산 수익'}
        />
      );
    } else {
      return null;
    }
  };

  const renderScene = SceneMap({
    live: liveBroadcastTab,
    oneDay: oneDayTab,
    month: monthTab,
  });

  const onPressChange = () => {
    Actions.registerAccountScreen();
  };

  if (loading) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
      </View>
    );
  }

  return (
    <View height={'100%'}>
      <Topbar
        isLine
        title={'정산 관리'}
        isLeftButton
        onPressLeft={() => Actions.pop()}
        onPressRight={() => Actions.adjustmentHistoryScreen()}
        rightButtonImage={require('../../../../../assets/tabBar/icon_history_black.png')}
        isRightButton
      />
      <ScrollView bgDarkWhite>
        <ViewBorderRow
          height={100}
          justifyContent={'space-between'}
          alignItems={'center'}
          bgWhite>
          <ViewBorderRow marginLeft={15}>
            {liveAdjustmentInfo ? (
              // <ImageCirclePreview
              //   source={{uri:liveAdjustmentInfo.broadcastInfo.profileImage}}
              // />
              <ImageCirclePreview
                source={require('../../../../../assets/profile/icon_pinklive.png')}
              />
            ) : (
              <ImageCirclePreview
                source={require('../../../../../assets/profile/icon_pinklive.png')}
              />
            )}
            {liveAdjustmentInfo && liveAdjustmentInfo.bankInfo.length !== 0 ? (
              <View justifyContent={'center'} marginLeft={10}>
                <Text ftDarkNavy fontSize={17}>
                  {liveAdjustmentInfo.bankInfo[0].name}
                </Text>
                <Text ftNavy bold>
                  {liveAdjustmentInfo.bankInfo[0].bank}{' '}
                  {liveAdjustmentInfo.bankInfo[0].bankAccount}
                </Text>
              </View>
            ) : (
              <View justifyContent={'center'} marginLeft={10}>
                <Text ftDarkNavy fontSize={15}>
                  계좌정보를 등록해주세요.
                </Text>
              </View>
            )}
          </ViewBorderRow>
          <View marginRight={15}>
            <ButtonBorderRadius
              brGray
              borderRadius={20}
              width={65}
              height={30}
              paddingLeft={17}
              paddingRight={17}
              onPress={onPressChange}>
              <Text ftGray>
                {liveAdjustmentInfo && liveAdjustmentInfo.bankInfo.length !== 0
                  ? '변경'
                  : '등록'}
              </Text>
            </ButtonBorderRadius>
          </View>
        </ViewBorderRow>
        <View>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default AdjustmentScreen;
