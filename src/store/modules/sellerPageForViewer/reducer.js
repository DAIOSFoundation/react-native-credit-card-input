import {handleActions} from 'redux-actions';
import produce from 'immer';
import * as SELLERPAGEFORVIEWER from './actions';

const initialState = {
  menu: 'liveNotice',
  favorite: false,
};

const sellerPageForViewer = handleActions(
  {
    [SELLERPAGEFORVIEWER.CHANGE_SELLER_PAGE_FOR_VIEWER_MENU]: (
      state,
      action,
    ) => {
      return produce(state, (draft) => {
        draft.menu = action.payload;
      });
    },
    [SELLERPAGEFORVIEWER.FAVORITE_BUTTON]: (state, action) => {
      return produce(state, (draft) => {
        draft.favorite = action.payload;
      });
    },
  },
  initialState,
);

export default sellerPageForViewer;
