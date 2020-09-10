import React, {useEffect} from 'react';
// Styled Component
import {
  Container,
  SafeAreaView,
  ScrollView,
  View,
  ViewBorder,
  ViewRow,
} from '../../../components/styled/View';
import {Image} from '../../../components/styled/Image';
import {Text} from '../../../components/styled/Text';
import LiveProfile from '../../../components/profiles/LiveProfile';
import LoadingBar from '../../../components/loadingBar/LoadingBar';
// Component Import
import SliderView from './SliderView';
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Topbar from '../../../components/bar/Topbar';
import {Actions} from 'react-native-router-flux';
import SelectProfile from '../../../components/profiles/SelectProfile';
import BuyProduct from '../../../components/products/BuyProduct';

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const onPressClose = () => {
    Actions.pop();
  };
  const onPress = () => {
    console.log('onPress');
  };

  return (
    <>
      <SafeAreaView bgDarkNavy>
        <Topbar
          bgColor={{bgDarkNavy: true}}
          titleColor={{ftWhite: true}}
          onPressLeft={onPressClose}
          isLeftButton={true}
          leftButtonColor={'white'}
          title={'즐겨찾기 셀러'}
          isLine={true}
          lineColor={{bgLightNavy: true}}
        />
        <ScrollView bgDarkNavy marginBottom={50}>
          {/*라이브일 경우*/}
          <SelectProfile
            urlPath={'https://i.picsum.photos/id/237/100/100.jpg'}
            isLive
            bgColor={{bgDarkNavy: true}}
            onPress={() => onPress}
            userName={'생활반장TV'}
            userDecription={'생활 제품의 모든 것 ! 자취생들 필수템만 모았다!'}
          />
          <ViewBorder width={'100%'} borderTopWidth={1} brLightNavy />

          {/*라이브 아닐 경우*/}
          <SelectProfile
            outBorderColor={{brLightNavy: true}}
            urlPath={'https://i.picsum.photos/id/237/100/100.jpg'}
            bgColor={{bgDarkNavy: true}}
            onPress={() => onPress}
            userName={'생활반장TV'}
            userDecription={'생활 제품의 모든 것 ! 자취생들 필수템만 모았다!'}
          />
          <ViewBorder width={'100%'} borderTopWidth={1} brLightNavy />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default FavoritesScreen;
