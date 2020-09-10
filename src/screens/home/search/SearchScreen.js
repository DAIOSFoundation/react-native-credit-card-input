import React, {useEffect} from 'react';
// Styled Component
import {ScrollView, View} from '../../../components/styled/View';
import LoadingBar from '../../../components/loadingBar/LoadingBar';
// Screen Import
import Search from './Search';
import * as globalActions from '../../../store/modules/global/actions';
import SearchInfo from './SearchInfo';
// Redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import CustomModal from '../../../components/modal/CustomModal';
import * as searchActions from '../../../store/modules/search/actions';

const SearchScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(globalActions.change_tab_location('Search'));
  }, []);

  const {
    loading,
    successMsg,
    isVisible,
    isOneButton,
    jwtToken,
    message,
    searchWord,
    onPressOK,
  } = useSelector(
    (state) => ({
      loading: state.loading['search/REQUEST_SEARCH_SELLER_INFO'],
      successMsg: state.user.successMsg,
      isVisible: state.customModal.isVisible,
      isOneButton: state.customModal.isOneButton,
      message: state.customModal.message,
      searchWord: state.search.searchWord,
      jwtToken: state.user.jwtToken,
      onPressOK: state.customModal.onPressOK,
    }),
    shallowEqual,
  );

  useEffect(() => {
    let param = {
      jwtToken: jwtToken,
      nickName: searchWord,
    };
    dispatch(searchActions.request_search_seller_info(param));
    dispatch(searchActions.change_search_text('셀러'));
  }, []);

  if (loading) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}} />
      </View>
    );
  }

  return (
    <View bgDarkGrayBlue height={'100%'}>
      <Search />
      <SearchInfo />
      <CustomModal
        onPressOK={onPressOK}
        isVisible={isVisible}
        isOneButton={isOneButton}
        message={message}
        currentScene={'Search'}
      />
    </View>
  );
};

export default SearchScreen;
