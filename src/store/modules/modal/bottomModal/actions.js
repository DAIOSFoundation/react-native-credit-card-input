import {createAction} from 'redux-actions';

// snap points 변경
export const CHANGE_BOTTOM_MODAL_SNAP_POINTS =
  'modal/CHANGE_BOTTOM_MODAL_SNAP_POINTS';
export const change_bottom_modal_snap_points = createAction(
  CHANGE_BOTTOM_MODAL_SNAP_POINTS,
);

// snap to 변경
export const CHANGE_BOTTOM_MODAL_SNAP_TO = 'modal/CHANGE_BOTTOM_MODAL_SNAP_TO';
export const change_bottom_modal_snap_to = createAction(
  CHANGE_BOTTOM_MODAL_SNAP_TO,
);

// header view 변경
export const CHANGE_BOTTOM_MODAL_HEADER_VIEW =
  'modal/CHANGE_BOTTOM_MODAL_HEADER_VIEW';
export const change_bottom_modal_header_view = createAction(
  CHANGE_BOTTOM_MODAL_HEADER_VIEW,
);

// body view 변경
export const CHANBGE_BOTTOM_MODAL_BODY_VIEW =
  'modal/CHANBGE_BOTTOM_MODAL_BODY_VIEW';
export const change_bottom_modal_body_view = createAction(
  CHANBGE_BOTTOM_MODAL_BODY_VIEW,
);
