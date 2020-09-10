import {handleActions} from 'redux-actions';
import produce from 'immer';
import * as QNAWRITE from './actions';

const initialState = {
  agreeInquiry: false, // 비공개 문의 동의 / 비동의
  agreeAnswerAlarm: false, // 알림받기 동의 / 비동의
};

const qnaWrite = handleActions(
  {
    [QNAWRITE.CHANGE_AGREE_INQUIRY]: (state, action) => {
      console.log('CHANGE_AGREE_INQUIRY : ', action.payload);
      return produce(state, (draft) => {
        draft.agreeInquiry = action.payload;
      });
    },
    [QNAWRITE.CHANGE_AGREE_ANSWER_ALARM]: (state, action) => {
      console.log('CHANGE_AGREE_ANSWER_ALARM : ', action.payload);
      return produce(state, (draft) => {
        draft.agreeAnswerAlarm = action.payload;
      });
    },
  },
  initialState,
);

export default qnaWrite;
