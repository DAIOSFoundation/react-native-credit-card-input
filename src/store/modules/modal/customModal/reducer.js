import {handleActions} from 'redux-actions';
import {produce, createDraft, finishDraft} from 'immer';
import * as MODAL from './actions';

const initialState = {
  isVisible: false,
  isOneButton: true,
  isFull: false,
  message: null,
  elements: null,
  size: null,
  onPressOK: null,
  currentScene: null,
  buttonHeight: null,
  scrollJustifyContent: null,
  bgColor: null,
};

const customModal = handleActions(
  {
    [MODAL.CHANGE_MODAL_CLEAR]: (state, action) => {
      console.log('CHANGE_MODAL_CLEAR');
      const draft = createDraft(initialState);
      return finishDraft(draft);
    },
    [MODAL.CHANGE_MODAL_VISIBLE]: (state, action) => {
      console.log('CHANGE_MODAL_VISIBLE => ', action.payload);
      return produce(state, (draft) => {
        draft.isVisible = action.payload;
      });
    },
    [MODAL.CHANGE_MODAL_ONEBUTTON]: (state, action) => {
      return produce(state, (draft) => {
        draft.isOneButton = action.payload;
      });
    },
    // 리턴 함수 설정
    [MODAL.CHANGE_MODAL_ONPRESS_OK]: (state, action) => {
      console.log('CHANGE_MODAL_ONPRESS_OK', action.payload);
      return produce(state, (draft) => {
        draft.onPressOK = action.payload;
      });
    },
    // 모달 속성 변경
    [MODAL.CHANGE_MODAL_ATTR]: (state, action) => {
      console.log('CHANGE_MODAL_ATTR', action.payload);
      return produce(state, (draft) => {
        draft.isOneButton = action.payload.isOneButton;
        draft.size = action.payload.size;
        draft.buttonHeight = action.payload.buttonHeight;
        draft.scrollJustifyContent = action.payload.scrollJustifyContent;
        draft.elements = action.payload.elements;
        draft.isVisible = action.payload;
      });
    },
    // 모달 메세지 변경
    [MODAL.CHANGE_MODAL_MESSAGE]: (state, action) => {
      console.log('CHANGE_MODAL_MESSAGE', action.payload);
      return produce(state, (draft) => {
        draft.message = action.payload;
        draft.isVisible = true;
      });
    },
  },
  initialState,
);

export default customModal;
