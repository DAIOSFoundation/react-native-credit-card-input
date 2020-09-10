import {handleActions} from 'redux-actions';
import produce, {createDraft, finishDraft} from 'immer';
import * as SEARCH from './actions';

const initialState = {
  searchWord: '',
  searchInfo: null, // 검색 결과값
  searchText: '', // 검색 텍스트(검색결과, 셀러)
};

const search = handleActions(
  {
    [SEARCH.CHANGE_SEARCH_WORD]: (state, action) => {
      return produce(state, (draft) => {
        draft.searchWord = action.payload;
      });
    },
    [SEARCH.REQUEST_SEARCH_SELLER_INFO_SUCCESS]: (state, action) => {
      console.log('REQUEST_SEARCH_SELLER_INFO_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        draft.searchInfo = action.payload.data;
      });
    },
    [SEARCH.REQUEST_SEARCH_SELLER_INFO_FAILED]: (state, action) => {
      console.log('REQUEST_SEARCH_SELLER_INFO_FAILED : ', action.payload);
      return produce(state, (draft) => {});
    },
    [SEARCH.CHANGE_INIT_STATE]: (state, action) => {
      // Redux 초기화
      const draft = createDraft(initialState);
      return finishDraft(draft);
    },
    [SEARCH.CHANGE_SEARCH_TEXT]: (state, action) => {
      return produce(state, (draft) => {
        draft.searchText = action.payload;
      });
    },
  },
  initialState,
);

export default search;
