/*
 * Copyright (c) 2020.2
 * Written by kj <ace@daiblab.com>
 *
 * This file is part of SellerVision-RN
 * Desc - 로그인이 되어있는지 확인하는 라우터 페이지입니다.
 */

import React, {useEffect, useState} from 'react';
//redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as broadcastActions from '../../store/modules/broadcast/actions';

import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {Container, Content, Spinner} from 'native-base';
import {Dimensions, Linking} from 'react-native';
import * as userActions from '../../store/modules/user/actions';

import LoadingBar from '../../components/loadingBar/LoadingBar';
import {View} from '../../components/styled/View';

const LoginRouterScreen = (index) => {
  const dispatch = useDispatch();

  const {jwtToken, userId, type, activateCheck, status} = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      type: state.user.type,
      activateCheck: state.user.activateCheck,
      status: state.user.status,
    }),
  );

  const goToScreen = async (jwtToken) => {
    console.log('goToScreen', jwtToken);
    if (jwtToken) {
      //로그인 되어 있는 상태

      switch (index.title) {
        case 'CalendarLoginRouter':
          console.log('CalendarLoginRouter');
          Actions.replace('calendarScreen', {Screentitle: 'Calendar'});
          break;
        case 'SearchLoginRouter':
          console.log('SearchLoginRouter');
          Actions.replace('searchScreen', {Screentitle: 'Search'});
          break;
        case 'MyInfoLoginRouter':
          console.log('MyInfoLoginRouter');
          Actions.replace('myInfoScreen', {Screentitle: 'MyInfo'});
          break;
        default:
          console.log('default');
          Actions.replace('mainScreen', {Screentitle: 'Main'});
          break;
      }
    } else {
      //로그인 안되어 있는 상태
      //탭 라우팅 처리
      Actions.pop();
      dispatch(broadcastActions.change_autoplay(false));
      Actions.push('SignUp');

      //todo - 상세 페이지에서 라우팅 처리
    }
  };

  const loginCheckStorage = async () => {
    console.log('loginCheckStorage', jwtToken);
    try {
      const value = await AsyncStorage.multiGet([
        'jwtToken',
        'userId',
        'type',
        'activate',
      ]);
      dispatch(userActions.change_login_info(value));
      console.log('loginCheckStorage value', value[3][1]);
      if (value[2][1] === 'seller' && value[3][1] === null) {
        let param = {
          jwtToken: value[0][1],
          userId: value[1][1],
        };
        dispatch(userActions.request_user_seller_activate(param));
        return;
      }
      goToScreen(value[0][1]);
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const loginCheckRedux = async () => {
    console.log('loginCheckRedux');
    if (type === 'seller') {
      const value = await AsyncStorage.getItem('activate');
      console.log('loginCheckRedux value', value);
      if (value === null) {
        let param = {
          jwtToken: jwtToken,
          userId: userId,
        };
        dispatch(userActions.request_user_seller_activate(param));
        return;
      }
    }
    goToScreen(jwtToken);
  };

  const tokenTest = async () => {
    if (jwtToken === null) {
      const value = await AsyncStorage.getItem('activate');
      goToScreen(value);
    }
    goToScreen(jwtToken);
  };

  useEffect(() => {
    if (type === 'seller') {
      switch (status) {
        case 0: // 비활성 상태
          Actions.replace('sellerSuccessApplyScreen');
          break;
        case 1: // 활성 상태
          // const value = await AsyncStorage.getItem('activate');
          // if (!value || activateCheck) {
          if (activateCheck) {
            Actions.replace('sellerSignUpSucessScreen');
          } else {
            tokenTest();
          }
          break;
        case 2: // 거절
          Actions.replace('sellerSignUpFailScreen');
          break;
      }
    }
  }, [activateCheck, status]);

  useEffect(() => {
    console.log('activateCheck', activateCheck);
    console.log('status=>', status);
    dispatch(userActions.change_init_seller_activate());
    // const storageCheck = async () => {

    if (jwtToken === null) {
      loginCheckStorage();
    } else {
      loginCheckRedux();
    }

    // };
    // storageCheck();

    return () => {
      // dispatch(userActions.change_init_seller_activate());
    };
  }, [index]);

  return (
    <View style={{position: 'absolute', zIndex: 0}}>
      <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}} />
    </View>
  );
};

export default LoginRouterScreen;
