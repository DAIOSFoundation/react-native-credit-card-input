import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

// 메세지 초기화
export const CHANGE_MENU = 'myInfo/RESET_MSG';
export const change_menu = createAction(CHANGE_MENU);
