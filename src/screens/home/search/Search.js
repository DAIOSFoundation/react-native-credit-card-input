/*
 * Copyright (c) 2020.3
 * Written by kj <ace@daiblab.com>
 *
 * This file is part of SellerVision-RN
 * Desc - 검색하는 부분
 */
import React, {useCallback} from 'react';
// Styled Component
import {View, ViewRow} from '../../../components/styled/View';
import TextAndInputBottomLine from '../../../components/input/TextAndInputBottomLine';
import {Image} from '../../../components/styled/Image';
import {Button} from '../../../components/styled/Button';
// Redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as searchActions from '../../../store/modules/search/actions';

const Search = () => {
  const dispatch = useDispatch();

  const {jwtToken, searchWord} = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      searchWord: state.search.searchWord,
    }),
    shallowEqual,
  );

  const searchIcon = require('../../../assets/search/icon_search_white.png');

  const onChangeText = (text) => {
    dispatch(searchActions.change_search_word(text));
  };

  // 검색 버튼
  const onPressSearch = useCallback(() => {
    let param = {
      jwtToken: jwtToken,
      nickName: searchWord,
    };

    dispatch(searchActions.request_search_seller_info(param));
    dispatch(searchActions.change_search_text('검색 결과'));
  }, [searchWord]);

  return (
    <View>
      <ViewRow
        marginRight={10}
        marginLeft={10}
        justifyContent={'space-between'}>
        <TextAndInputBottomLine
          ftColor={{ftWhite: true}}
          placeholderText={'검색하실 셀러를 입력하세요'}
          maxLength={10}
          isBottomLine={true}
          value={searchWord}
          width={'90%'}
          onChangeText={(text) => onChangeText(text)}
        />
        <Button
          width={'10%'}
          alignSelf={'center'}
          justifyContent={'flex-end'}
          onPress={onPressSearch}>
          <Image
            width={24}
            height={24}
            justifyContent={'center'}
            source={searchIcon}
          />
        </Button>
      </ViewRow>
    </View>
  );
};

export default Search;
