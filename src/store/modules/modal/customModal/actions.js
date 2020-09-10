import {createAction} from 'redux-actions';

// 모달 보여짐 변경
export const CHANGE_MODAL_VISIBLE = 'customModal/CHANGE_MODAL_VISIBLE';
export const change_modal_visible = createAction(CHANGE_MODAL_VISIBLE);

// 원버튼 투버튼 변경
export const CHANGE_MODAL_ONEBUTTON = 'customModal/CHANGE_MODAL_ONEBUTTON';
export const change_modal_onebutton = createAction(CHANGE_MODAL_ONEBUTTON);

// 모달 속성 변경
export const CHANGE_MODAL_ATTR = 'customModal/CHANGE_MODAL_ATTR';
export const change_modal_attr = createAction(CHANGE_MODAL_ATTR);

// 모달 메세지 변경
export const CHANGE_MODAL_MESSAGE = 'customModal/CHANGE_MODAL_MESSAGE';
export const change_modal_message = createAction(CHANGE_MODAL_MESSAGE);

// 확인 리턴 함수 변경
export const CHANGE_MODAL_ONPRESS_OK =
  'customModal/CHANGE_MODAL_RETURN_FUNCTION';
export const change_modal_onpress_ok = createAction(CHANGE_MODAL_ONPRESS_OK);

// 모달 내용 초기화
export const CHANGE_MODAL_CLEAR = 'customModal/CHANGE_MODAL_CLEAR';
export const change_modal_clear = createAction(CHANGE_MODAL_CLEAR);
