import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

//즐겨찾기
export const FAVORITE_BUTTON = 'sellerPageForViewer/FAVORITE_BUTTON';
export const favorite_button = createAction(FAVORITE_BUTTON);

//시청자가 보는 셀러 마이페이지
export const CHANGE_SELLER_PAGE_FOR_VIEWER_MENU =
  'sellerPageForViewer/CHANGE_SELLER_PAGE_FOR_VIEWER_MENU';
export const change_seller_page_for_viewer_menu = createAction(
  CHANGE_SELLER_PAGE_FOR_VIEWER_MENU,
);
