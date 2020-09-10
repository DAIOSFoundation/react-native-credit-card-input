import {createAction} from 'redux-actions';

// Q&A 작성 페이지 - 비공개 문의 동의 / 비동의
export const CHANGE_AGREE_INQUIRY = 'qnaWrite/CHANGE_AGREE_INQUIRY';
export const change_agree_inquiry = createAction(CHANGE_AGREE_INQUIRY);

// Q&A 작성 페이지 - 답변완료 시 알림받기 동의 / 비동의
export const CHANGE_AGREE_ANSWER_ALARM = 'qnaWrite/CHANGE_AGREE_ANSWER_ALARM';
export const change_agree_answer_alarm = createAction(
  CHANGE_AGREE_ANSWER_ALARM,
);
