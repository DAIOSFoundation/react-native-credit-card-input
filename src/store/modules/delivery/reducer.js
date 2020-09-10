import {handleActions} from 'redux-actions';
import produce, {createDraft, finishDraft} from 'immer';
import * as DELIVERY from './actions';
import {CHANGE_BACK_PHONE} from './actions';
import {checkResponseError} from '../../../utils/functions';

const initialState = {
  userId: null,
  jwtToken: null,
  userAddress: null,
  name: null,
  zipCode: null,
  address: null,
  detailAddress: null,
  frontPhone: '010',
  middlePhone: null,
  backPhone: null,
  modalMsg: null,
  isLandCheckNewInput: false, // 신규입력 탭뷰에서 사용하는 도서산간 확인 여부
  isLandCheckBasic: false, // 배송지 선택 탭뷰 에서 사용하는 도서산간 확인 여부
};

const delivery = handleActions(
  {
    [DELIVERY.CHANGE_NAME]: (state, action) => {
      return produce(state, (draft) => {
        draft.name = action.payload;
      });
    },
    [DELIVERY.CHANGE_ZIPCODE]: (state, action) => {
      return produce(state, (draft) => {
        draft.zipCode = action.payload;
      });
    },
    [DELIVERY.CHANGE_ADDRESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.address = action.payload;
      });
    },
    [DELIVERY.CHANGE_DETAIL_ADDRESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.detailAddress = action.payload;
      });
    },
    [DELIVERY.CHANGE_FRONT_PHONE]: (state, action) => {
      return produce(state, (draft) => {
        draft.frontPhone = action.payload;
      });
    },
    [DELIVERY.CHANGE_MIDDLE_PHONE]: (state, action) => {
      return produce(state, (draft) => {
        draft.middlePhone = action.payload;
      });
    },
    [DELIVERY.CHANGE_BACK_PHONE]: (state, action) => {
      return produce(state, (draft) => {
        draft.backPhone = action.payload;
      });
    },
    [DELIVERY.REQUEST_ADD_DELIVERY_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        if (action.payload) {
          const draft = createDraft(initialState);
          return finishDraft(draft);
        }
      });
    },
    [DELIVERY.REQUEST_ADD_DELIVERY_FAILED]: (state, action) => {
      return produce(state, (draft) => {});
    },
    [DELIVERY.REQUEST_GET_USER_ADDRESSES_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        if (action.payload) {
          draft.userAddress = action.payload.data.addressInfo;
        }
      });
    },
    [DELIVERY.REQUEST_GET_USER_ADDRESSES_FAILED]: (state, action) => {
      return produce(state, (draft) => {});
    },
    [DELIVERY.GET_ISLAND_CHECK_NEW_INPUT_SUCCESS]: (state, action) => {
      console.log('GET_ISLAND_CHECK_NEW_INPUT_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
        } else if (action.payload.data === null) {
          draft.isLandCheckNewInput = false;
        } else {
          draft.isLandCheckNewInput = true;
          draft.modalMsg = 'isLand';
        }
      });
    },
    [DELIVERY.GET_ISLAND_CHECK_BASIC_SUCCESS]: (state, action) => {
      console.log('GET_ISLAND_CHECK_BASIC_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
        } else if (action.payload.data === null) {
          draft.isLandCheckBasic = false;
        } else {
          draft.isLandCheckBasic = true;
          draft.modalMsg = 'isLand';
        }
      });
    },
    [DELIVERY.CHANGE_MODAL_STATUS]: (state, action) => {
      console.log('CHANGE_MODAL_STATUS : ', action.payload);
      return produce(state, (draft) => {
        draft.modalMsg = action.payload;
      });
    },
    [DELIVERY.CHANGE_ISLAND_CHECK_NEW_INPUT_INIT]: (state, action) => {
      console.log('CHANGE_ISLAND_CHECK_NEW_INPUT_INIT : ', action.payload);
      return produce(state, (draft) => {
        draft.isLandCheckNewInput = false;
      });
    },
  },
  initialState,
);

export default delivery;
