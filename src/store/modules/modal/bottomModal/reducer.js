import {handleActions} from 'redux-actions';
import produce from 'immer';
import * as MODAL from './actions';

const initialState = {
  snapPoints: [],
  snapTo: 0,
  headerView: null,
  bodyView: null,
};

const bottomModal = handleActions(
  {
    [MODAL.CHANGE_BOTTOM_MODAL_SNAP_POINTS]: (state, action) => {
      console.log('CHANGE_BOTTOM_MODAL_SNAP_POINTS:', action.payload);
      return produce(state, (draft) => {
        draft.snapPoints = action.payload;
      });
    },
    [MODAL.CHANGE_BOTTOM_MODAL_SNAP_TO]: (state, action) => {
      console.log('CHANGE_BOTTOM_MODAL_SNAP_TO:', action.payload);
      return produce(state, (draft) => {
        draft.snapTo = action.payload;
      });
    },
    [MODAL.CHANGE_BOTTOM_MODAL_HEADER_VIEW]: (state, action) => {
      console.log('CHANGE_BOTTOM_MODAL_HEADER_VIEW:', action.payload);
      return produce(state, (draft) => {
        draft.headerView = action.payload;
      });
    },
    [MODAL.CHANBGE_BOTTOM_MODAL_BODY_VIEW]: (state, action) => {
      console.log('CHANBGE_BOTTOM_MODAL_BODY_VIEW:', action.payload);
      return produce(state, (draft) => {
        draft.bodyView = action.payload;
      });
    },
  },
  initialState,
);

export default bottomModal;
