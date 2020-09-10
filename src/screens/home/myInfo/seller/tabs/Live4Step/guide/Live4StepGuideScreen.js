import React, {useState} from 'react';
// Styled Component
import {View} from '../../../../../../../components/styled/View';
import Topbar from '../../../../../../../components/bar/Topbar';
import {Text} from '../../../../../../../components/styled/Text';
// NPM Module
import {Actions} from 'react-native-router-flux';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
// tabView Import
import Step01Route from './tabView/Step01Screen';
import Step02Route from './tabView/Step02Screen';
import Step03Route from './tabView/Step03Screen';
import Step04Route from './tabView/Step04Screen';
import {screenWidth} from '../../../../../../../components/styled/ScreenSize';

const Live4StepGuideScreen = () => {
  // 뒤로가기 버튼
  const onPressBack = () => {
    Actions.pop();
  };

  const [index, setIndex] = useState(0);

  const initialLayout = {width: screenWidth};

  // 탭뷰 - 탭바 스타일
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor="#e6427a"
      inactiveColor="#767b80"
      labelStyle={{fontWeight: 'bold'}}
      indicatorStyle={{backgroundColor: '#e6427a'}}
      style={{backgroundColor: 'white'}}
      getLabelText={({route}) => route.title}
    />
  );

  const [routes] = useState([
    {key: 'step01', title: 'Step 01'},
    {key: 'step02', title: 'Step 02'},
    {key: 'step03', title: 'Step 03'},
    {key: 'step04', title: 'Step 04'},
  ]);

  // Step 01 ~ 04 Step 탭뷰 스크린
  const step01Route = () => {
    if (index === 0) {
      return <Step01Route />;
    } else {
      return null;
    }
  };
  const step02Route = () => {
    if (index === 1) {
      return <Step02Route />;
    } else {
      return null;
    }
  };
  const step03Route = () => {
    if (index === 2) {
      return <Step03Route />;
    } else {
      return null;
    }
  };
  const step04Route = () => {
    if (index === 3) {
      return <Step04Route />;
    } else {
      return null;
    }
  };

  const renderScene = SceneMap({
    step01: step01Route,
    step02: step02Route,
    step03: step03Route,
    step04: step04Route,
  });

  return (
    <View height={'100%'}>
      <Topbar
        isLine
        title={'라방 4Step 가이드'}
        onPressLeft={onPressBack}
        isLeftButton={true}
      />
      <View paddingLeft={15} paddingRight={15} marginTop={30}>
        <Text ftLarge ftDarkGrayBlue bold>
          라이브 방송이 처음이신가요?
        </Text>
        <Text marginTop={30} ftDarkGrayBlue>
          추천 샘플을 받으셨나요 ?{'\n'}
          샘플을 받고 사용해 보신 후 방송 진행을 원하신다면{'\n'}
          지금부터 셀러비전의 ‘라방 4 Step’에 따라 진행하세요.
        </Text>
      </View>
      <View height={7} marginTop={15} bgDarkWhite width={'100%'} />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
};

export default Live4StepGuideScreen;
