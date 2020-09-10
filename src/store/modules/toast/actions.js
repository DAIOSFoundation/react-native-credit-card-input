import {createAction} from 'redux-actions';

// 잠시 떳다 사라지는 toast msg
export const SET_MY_INFO_TOAST_MSG = 'toast/SET_MY_INFO_TOAST_MSG';
export const set_my_info_toast_msg = createAction(SET_MY_INFO_TOAST_MSG);

// toast msg 삭제
export const RESET_INITIAL_STATE = 'toast/RESET_INITIAL_STATE';
export const reset_initial_state = createAction(RESET_INITIAL_STATE);
