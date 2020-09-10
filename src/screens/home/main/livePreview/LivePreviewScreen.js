import React, {useState, useEffect} from 'react';
// Styled Component
import {View} from '../../../../components/styled/View';
import Topbar from '../../../../components/bar/Topbar';
import {screenWidth} from '../../../../components/styled/ScreenSize';
import ToastMessage from '../../../../components/toast/ToastMessage';
// NPM Module
import {Actions} from 'react-native-router-flux';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Moment from 'moment';
// utils Import
import {dayOfTheWeek} from '../../../../utils/functions';
// TabView Import
import LivePreviewDay from './tabView/LivePreviewDay';
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as broadcastActions from '../../../../store/modules/broadcast/actions';

// 라이브 예고 스크린
const LivePreviewScreen = () => {
  // redux
  const dispatch = useDispatch();

  const {jwtToken, broadcastsPreviewDetail, rendering} = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      broadcastsPreviewDetail: state.broadcast.broadcastsPreviewDetail,
      rendering: state.broadcast.rendering,
    }),
    shallowEqual,
  );

  const initialLayout = {width: screenWidth};

  const [index, setIndex] = useState(0);

  const [routes, setRoutes] = useState([
    {key: 'livePreviewSunDay', title: '일'},
    {key: 'livePreviewMonDay', title: '월'},
    {key: 'livePreviewTuesDay', title: '화'},
    {key: 'livePreviewWednesDay', title: '수'},
    {key: 'livePreviewThursDay', title: '목'},
    {key: 'livePreviewFirDay', title: '금'},
    {key: 'livePreviewSaturDay', title: '토'},
  ]);

  useEffect(() => {
    let beforeDay = []; // 현재요일기준 일요일까지의 요일 ex) 오늘 요일이 수요일일때 수 -> 목금토일 <-
    let afterDay = []; // 현재요일기준 일요일 후 다시 되돌아오는 요일  ex) 오늘 요일이 수요일일때 수목금토일 -> 월화 <-
    let resultDay;

    let check = false;

    // 현재 날짜 요일구하기
    const nowDay = dayOfTheWeek(Moment(new Date()).day());

    for (let i = 0; i < 7; i++) {
      if (routes[i].title === nowDay || check) {
        beforeDay.push(routes[i]);
        check = true;
      } else {
        afterDay.push(routes[i]);
      }
    }

    resultDay = [...beforeDay, ...afterDay];

    setRoutes(resultDay);

    let param = {
      jwtToken: jwtToken,
      timezoneOffset: new Date().getTimezoneOffset() / 60,
    };

    dispatch(broadcastActions.get_broadcast_preview_detail(param));
  }, []);

  useEffect(() => {
    if (broadcastsPreviewDetail) {
      let result = [];
      let param = [];

      for (let i = 0; i < broadcastsPreviewDetail.length; i++) {
        param = [];
        if (broadcastsPreviewDetail.length !== 0) {
          for (let j = 0; j < broadcastsPreviewDetail[i].length; j++) {
            if (broadcastsPreviewDetail[i][j].pushNotificationInfo) {
              param.push({
                status: true,
                i: i,
                j: j,
              });
            } else {
              param.push({
                status: false,
                i: i,
                j: j,
              });
            }
          }
        } else {
          param.push(false);
        }
        result.push(param);
      }

      dispatch(broadcastActions.change_broadcast_preview_alarm_state(result));
    }
  }, [rendering]);

  // 뒤로가기 버튼
  const onPressBack = () => {
    Actions.pop();
  };

  const livePreviewSunDayRoute = () => {
    let day = routes.findIndex((item) => item.title === '일');

    if (index === day) {
      return <LivePreviewDay data={broadcastsPreviewDetail} day={day} />;
    } else {
      return null;
    }
  };
  const livePreviewMonDayRoute = () => {
    let day = routes.findIndex((item) => item.title === '월');

    if (index === day) {
      return <LivePreviewDay data={broadcastsPreviewDetail} day={day} />;
    } else {
      return null;
    }
  };
  const livePreviewTuesDayRoute = () => {
    let day = routes.findIndex((item) => item.title === '화');

    if (index === day) {
      return <LivePreviewDay data={broadcastsPreviewDetail} day={day} />;
    } else {
      return null;
    }
  };
  const livePreviewWednesDayRoute = () => {
    let day = routes.findIndex((item) => item.title === '수');

    if (index === day) {
      return <LivePreviewDay data={broadcastsPreviewDetail} day={day} />;
    } else {
      return null;
    }
  };
  const livePreviewThursDayRoute = () => {
    let day = routes.findIndex((item) => item.title === '목');

    if (index === day) {
      return <LivePreviewDay data={broadcastsPreviewDetail} day={day} />;
    } else {
      return null;
    }
  };
  const livePreviewFirDayRoute = () => {
    let day = routes.findIndex((item) => item.title === '금');

    if (index === day) {
      return <LivePreviewDay data={broadcastsPreviewDetail} day={day} />;
    } else {
      return null;
    }
  };
  const livePreviewSaturDayRoute = () => {
    let day = routes.findIndex((item) => item.title === '토');

    if (index === day) {
      return <LivePreviewDay data={broadcastsPreviewDetail} day={day} />;
    } else {
      return null;
    }
  };

  const renderScene = SceneMap({
    livePreviewSunDay: livePreviewSunDayRoute,
    livePreviewMonDay: livePreviewMonDayRoute,
    livePreviewTuesDay: livePreviewTuesDayRoute,
    livePreviewWednesDay: livePreviewWednesDayRoute,
    livePreviewThursDay: livePreviewThursDayRoute,
    livePreviewFirDay: livePreviewFirDayRoute,
    livePreviewSaturDay: livePreviewSaturDayRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor="#e6427a"
      inactiveColor="#aeb9d3"
      labelStyle={{fontWeight: 'bold'}}
      indicatorStyle={{backgroundColor: '#e6427a'}}
      style={{backgroundColor: '#162037'}}
    />
  );

  return (
    <View height={'100%'}>
      <Topbar
        bgColor={{bgDarkNavy: true}}
        titleColor={{ftWhite: true}}
        leftButtonColor={'white'}
        isLine
        title={'라이브 예고'}
        onPressLeft={onPressBack}
        isLeftButton={true}
        lineColor={{bgDarkGrayBlue: true}}
      />
      <View height={'100%'} bgDarkNavy>
        <ToastMessage />
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </View>
    </View>
  );
};

export default LivePreviewScreen;
