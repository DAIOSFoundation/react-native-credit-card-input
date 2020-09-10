import {createAction} from 'redux-actions';

// 비디오 업로드 퍼센트
export const CHANGE_VIDEO_UPLOAD_PERCENT = 'upload/CHANGE_VIDEO_UPLOAD_PERCENT';
export const change_video_upload_percent = createAction(
  CHANGE_VIDEO_UPLOAD_PERCENT,
);

// 사진 업로드 퍼센트
export const CHANGE_PHOTO_UPLOAD_PERCENT = 'upload/CHANGE_PHOTO_UPLOAD_PERCENT';
export const change_photo_upload_percent = createAction(
  CHANGE_PHOTO_UPLOAD_PERCENT,
);

// 리덕스 초기화
export const CHANGE_UPLOAD_INIT = 'upload/CHANGE_UPLOAD_PERCENT';
export const change_upload_init = createAction(CHANGE_UPLOAD_INIT);
