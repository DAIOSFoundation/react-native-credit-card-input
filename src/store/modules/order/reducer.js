import {handleActions} from 'redux-actions';
import produce, {createDraft, finishDraft} from 'immer';
import * as ORDER from './action';

const initialState = {
  agreePayment: false, // 결제하기 동의 / 비동의
  paymentPlatform: 'iamport', //todo 결제 플랫폼 * 현재 고정값 추후 iamport or dpay 분기 예정
  pg: null, // 결제 수단
  payIndex: null, // 결제 수단 Index 값
  deliveryMessage: null, // 배송 요청 사항 메세지
  isNew: null, // 주소 신규 입력인지 아닌지 분기
  userAddress: null, // 사용자 기본 주소
  newName: null, // 신규 입력 이름
  newZipCode: null, // 신규 우편 번호
  newAddress: null, // 신규 주소
  newDetailAddress: null, // 신규 상세 주소
  newFrontPhone: '010', // 신규 핸드폰 앞 번호
  newMiddlePhone: null, // 신규 핸드폰 중간 번호
  newBackPhone: null, // 신규 핸드폰 뒷 번호
  merchantUid: null, // 샘플 구매 고유 아이디
  paymentProduct: null, // 결제 상품 담아놓을곳
  orderMessage: null, // 주문 오류 메세지
  couponReplaceResult: 0, // 쿠폰을 적용한 총 상품 할인가
  broadcastIdQuarter: null, // 해당 상품에 적용한 쿠폰의 broadcastId 저장
};

const order = handleActions(
  {
    [ORDER.CHANGE_AGREE_PAYMENT]: (state, action) => {
      console.log('CHANGE_AGREE_PAYMENT : ', action.payload);

      return produce(state, (draft) => {
        draft.agreePayment = action.payload;
      });
    },
    [ORDER.CHANGE_PAYMENT_METHOD]: (state, action) => {
      console.log('CHANGE_PAYMENT_METHOD : ', action.payload);

      return produce(state, (draft) => {
        draft.pg = action.payload;
      });
    },
    [ORDER.CHANGE_PAYMENT_INDEX]: (state, action) => {
      console.log('CHANGE_PAYMENT_INDEX : ', action.payload);

      return produce(state, (draft) => {
        draft.payIndex = action.payload;
      });
    },
    [ORDER.CHANGE_DELIVERY_MESSAGE]: (state, action) => {
      console.log('CHANGE_DELIVERY_MESSAGE : ', action.payload);

      return produce(state, (draft) => {
        draft.deliveryMessage = action.payload;
      });
    },
    [ORDER.CHANGE_IS_NEW]: (state, action) => {
      console.log('CHANGE_IS_NEW : ', action.payload);

      return produce(state, (draft) => {
        draft.isNew = action.payload;
      });
    },
    [ORDER.GET_USER_ADDRESS_SUCCESS]: (state, action) => {
      console.log('GET_USER_ADDRESS_SUCCESS : ', action.payload);

      return produce(state, (draft) => {
        draft.userAddress = action.payload.data.addressInfo;
      });
    },
    [ORDER.GET_USER_ADDRESS_FAILED]: (state, action) => {
      console.log('GET_USER_ADDRESS_FAILED : ', action.payload);
      return produce(state, (draft) => {});
    },
    [ORDER.CHANGE_NEW_NAME]: (state, action) => {
      console.log('CHANGE_NEW_NAME : ', action.payload);

      return produce(state, (draft) => {
        draft.newName = action.payload;
      });
    },
    [ORDER.CHANGE_NEW_ZIPCODE]: (state, action) => {
      console.log('CHANGE_NEW_ZIPCODE : ', action.payload);

      return produce(state, (draft) => {
        draft.newZipCode = action.payload;
      });
    },
    [ORDER.CHANGE_NEW_ADDRESS]: (state, action) => {
      console.log('CHANGE_NEW_ADDRESS : ', action.payload);

      return produce(state, (draft) => {
        draft.newAddress = action.payload;
      });
    },
    [ORDER.CHANGE_NEW_DETAIL_ADDRESS]: (state, action) => {
      console.log('CHANGE_NEW_DETAIL_ADDRESS : ', action.payload);

      return produce(state, (draft) => {
        draft.newDetailAddress = action.payload;
      });
    },
    [ORDER.CHANGE_NEW_FRONT_PHONE]: (state, action) => {
      console.log('CHANGE_NEW_FRONT_PHONE : ', action.payload);

      return produce(state, (draft) => {
        draft.newFrontPhone = action.payload;
      });
    },
    [ORDER.CHANGE_NEW_MIDDLE_PHONE]: (state, action) => {
      console.log('CHANGE_NEW_MIDDLE_PHONE : ', action.payload);

      return produce(state, (draft) => {
        draft.newMiddlePhone = action.payload;
      });
    },
    [ORDER.CHANGE_NEW_BACK_PHONE]: (state, action) => {
      console.log('CHANGE_NEW_BACK_PHONE : ', action.payload);

      return produce(state, (draft) => {
        draft.newBackPhone = action.payload;
      });
    },
    [ORDER.REQUEST_RECOMMEND_SAMPLE_PAYMENT_SUCCESS]: (state, action) => {
      console.log(
        'REQUEST_RECOMMEND_SAMPLE_PAYMENT_SUCCESS : ',
        action.payload,
      );

      if (action.payload.responseMessage.includes('E1113')) {
        return produce(state, (draft) => {
          draft.orderMessage = 'E1113';
        });
      }

      if (action.payload.responseMessage.includes('E1106')) {
        return produce(state, (draft) => {
          draft.orderMessage = 'E1106';
        });
      }

      return produce(state, (draft) => {
        draft.merchantUid = action.payload.data.merchant_uid;
      });
    },
    [ORDER.REQUEST_RECOMMEND_SAMPLE_PAYMENT_FAILED]: (state, action) => {
      console.log('REQUEST_RECOMMEND_SAMPLE_PAYMENT_FAILED : ', action.payload);
      return produce(state, (draft) => {});
    },
    [ORDER.REQUEST_BROADCAST_PRODUCT_PAYMENT_SUCCESS]: (state, action) => {
      console.log(
        'REQUEST_BROADCAST_PRODUCT_PAYMENT_SUCCESS : ',
        action.payload,
      );

      if (action.payload.responseMessage.includes('E1113')) {
        return produce(state, (draft) => {
          draft.orderMessage = 'E1113';
        });
      }

      if (action.payload.responseMessage.includes('E1107')) {
        return produce(state, (draft) => {
          draft.orderMessage = 'E1107';
        });
      }

      return produce(state, (draft) => {
        draft.merchantUid = action.payload.data.merchant_uid;
      });
    },
    [ORDER.REQUEST_BROADCAST_PRODUCT_PAYMENT_FAILED]: (state, action) => {
      console.log(
        'REQUEST_BROADCAST_PRODUCT_PAYMENT_FAILED : ',
        action.payload,
      );
      return produce(state, (draft) => {});
    },
    [ORDER.CHANGE_PAYMENT_PRODUCT]: (state, action) => {
      console.log('CHANGE_PAYMENT_PRODUCT : ', action.payload);

      return produce(state, (draft) => {
        draft.paymentProduct = action.payload;
      });
    },
    [ORDER.CHANGE_INIT_STATE]: (state, action) => {
      const draft = createDraft(initialState);
      return finishDraft(draft);
    },
    [ORDER.CHANGE_DELIVERY_LIST]: (state, action) => {
      console.log('CHANGE_DELIVERY_LIST : ', action.payload);

      return produce(state, (draft) => {
        draft.userAddress = action.payload;
      });
    },
    [ORDER.CHANGE_MERCHANTUID_INIT]: (state, action) => {
      //todo test
      console.log('CHANGE_MERCHANTUID_INIT : ', action.payload);
      return produce(state, (draft) => {
        draft.merchantUid = null;
      });
    },
    [ORDER.CHANGE_ORDER_MESSAGE]: (state, action) => {
      console.log('CHANGE_ORDER_MESSAGE : ', action.payload);
      return produce(state, (draft) => {
        draft.orderMessage = action.payload;
      });
    },
    [ORDER.CHANGE_COUPON_REPLACE_RESULT]: (state, action) => {
      console.log('CHANGE_COUPON_REPLACE_RESULT : ', action.payload);
      return produce(state, (draft) => {
        draft.couponReplaceResult = action.payload;
      });
    },
    [ORDER.CHANGE_COUPON_REPLACE_BROADCAST_Id]: (state, action) => {
      console.log('CHANGE_COUPON_REPLACE_BROADCAST_Id : ', action.payload);
      return produce(state, (draft) => {
        draft.broadcastIdQuarter = action.payload;
      });
    },
    [ORDER.CHANGE_NEW_INPUT_ADDRESS_INIT]: (state, action) => {
      console.log('change_new_input_address_init : ', action.payload);
      return produce(state, (draft) => {
        draft.newName = null;
        draft.newAddress = null;
        draft.newZipCode = null;
        draft.newDetailAddress = null;
        draft.newFrontPhone = '010';
        draft.newMiddlePhone = null;
        draft.newBackPhone = null;
      });
    },
  },
  initialState,
);

export default order;
