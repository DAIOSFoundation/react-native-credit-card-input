import {handleActions} from 'redux-actions';
import produce, {createDraft, finishDraft} from 'immer';
import * as UPLOAD from './actions';

const initialState = {
  videoUploadPercent: [],
  photoUploadPercent: [],
};

const upload = handleActions(
  {
    [UPLOAD.CHANGE_VIDEO_UPLOAD_PERCENT]: (state, action) => {
      console.log('CHANGE_VIDEO_UPLOAD_PERCENT : ', action.payload);
      return produce(state, (draft) => {
        // draft.photoUploadPercent = action.payload;
        draft.videoUploadPercent[action.payload[0]] = action.payload[1];
      });
    },
    [UPLOAD.CHANGE_PHOTO_UPLOAD_PERCENT]: (state, action) => {
      console.log('CHANGE_PHOTO_UPLOAD_PERCENT : ', action.payload);
      return produce(state, (draft) => {
        // draft.photoUploadPercent = action.payload;
        draft.photoUploadPercent[action.payload[0]] = action.payload[1];
      });
    },
    // todo 아래 수정필요
    [UPLOAD.CHANGE_DELETE_PERCENT]: (state, action) => {
      console.log('CHANGE_DELETE_PERCENT : ', action.payload);
      return produce(state, (draft) => {
        // draft.photoUploadPercent = action.payload;
        draft.photoUploadPercent.splice(action.payload, 1);
      });
    },
    [UPLOAD.CHANGE_UPLOAD_INIT]: (state, action) => {
      const draft = createDraft(initialState);
      return finishDraft(draft);
    },
  },
  initialState,
);

export default upload;
