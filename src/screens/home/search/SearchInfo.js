/*
 * Copyright (c) 2020.3
 * Written by kj <ace@daiblab.com>
 *
 * This file is part of SellerVision-RN
 * Desc - 검색하는 부분
 */

import React, {useEffect} from 'react';
// Styled Component
import {
  SafeAreaView,
  ScrollView,
  View,
  ViewBorder,
} from '../../../components/styled/View';
import {Text} from '../../../components/styled/Text';
import SelectProfile from '../../../components/profiles/SelectProfile';
// Redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// utils Import
import {interestItems} from '../../../utils/constants';
// NPM Module
import {Actions} from 'react-native-router-flux';
import * as searchActions from '../../../store/modules/search/actions';
import {screenHeight} from '../../../components/styled/ScreenSize';

const SearchInfo = () => {
  const dispatch = useDispatch();

  const {searchInfo, searchText} = useSelector(
    (state) => ({
      searchInfo: state.search.searchInfo,
      searchText: state.search.searchText,
    }),
    shallowEqual,
  );

  const onPress = (data) => {
    Actions.searchSellerPageForViewerScreen({data: data, screen: 'SearchInfo'});
  };

  // 셀러 관심있는 상품 파싱
  const parsingSellerTag = (data) => {
    let result = [];

    data.productOfInterest.map((item, index) =>
      result.push(interestItems[item] + ', '),
    );

    return result;
  };

  return (
    <ScrollView bgDarkNavy>
      <View height={30} justifyContent={'flex-end'} marginBottom={10}>
        <Text fontSize={16} bold ftWhite marginLeft={15}>
          {searchText}
        </Text>
      </View>
      <ViewBorder bgDarkGrayBlue borderBottomWidth={1} />
      <View>
        {searchInfo
          ? searchInfo.map((item, index) => (
              <SelectProfile
                onPress={() => onPress(item._id)}
                userName={item.nickName}
                urlPath={
                  item.profileImages[0] ? item.profileImages[0].path : null
                }
                userDecription={parsingSellerTag(item.productTags)}
              />
            ))
          : null}
      </View>
    </ScrollView>
  );
};

export default SearchInfo;
