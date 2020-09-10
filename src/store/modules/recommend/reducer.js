import {handleActions} from 'redux-actions';
import produce, {createDraft, finishDraft} from 'immer';
import * as RECOMMEND from './actions';

const initialState = {
  toggleCategoryList: false, // 카테고리 리스트 토글
  toggleSamplePut: [], // 샘플담기 버튼 토글
  recommendItems: [], // 나만의 맞춤 추천 상품들
  putSampleItems: [], // 담겨져있는 샘플 상품들
  totalPrice: 0, // 상품 총액
  deliveryCharge: 0, // 배송비
  productInformationNotices: null, // 추천상품 고시정보
  productImages: null, // 추천상품 이미지
  productName: null, // 추천상품 이름
  productDeliveryCharge: null, // 추천상품 배송비
  productIsExtraCharge: null, // 제주 / 도서 배송여부
  productExtraCharge: null, // 제주 / 도서 배송비
  productDeliveryCompany: null, // 택배사
  samplePrice: null, // 샘플가
  normalPrice: null, // 기본가
  isLend: null, // 대여여부
  productCategory: null, // 상품 카테고리
};

const recommend = handleActions(
  {
    [RECOMMEND.TOGGLE_CATEGORY_LIST]: (state, action) => {
      console.log('TOGGLE_CATEGORY_LIST : ', action.payload);

      return produce(state, (draft) => {
        draft.toggleCategoryList = !draft.toggleCategoryList;
      });
    },
    [RECOMMEND.TOGGLE_SAMPLE_PUT]: (state, action) => {
      console.log('TOGGLE_SAMPLE_PUT : ', action.payload);

      return produce(state, (draft) => {
        const index = draft.toggleSamplePut.findIndex(
          (item) => item.id === action.payload,
        );

        draft.toggleSamplePut[index].state = !draft.toggleSamplePut[index]
          .state;
      });
    },
    [RECOMMEND.REQUEST_RECOMMEND_PRODUCT_SUCCESS]: (state, action) => {
      console.log('REQUEST_RECOMMEND_PRODUCT_SUCCESS : ', action.payload.data);
      return produce(state, (draft) => {
        draft.recommendItems = action.payload.data;
        for (let i = 0; i < draft.recommendItems.length; i++) {
          let check = draft.toggleSamplePut.find(
            (item) => item.id === draft.recommendItems[i]._id,
          );

          if (check === undefined) {
            draft.toggleSamplePut.push({
              state: false,
              id: draft.recommendItems[i]._id,
            });
          }
        }
      });
    },
    [RECOMMEND.REQUEST_RECOMMEND_PRODUCT_FAILED]: (state, action) => {
      console.log('REQUEST_RECOMMEND_PRODUCT_FAILED : ', action.payload);

      return produce(state, (draft) => {
        draft.recommendItems = '';
      });
    },
    [RECOMMEND.CHANGE_SAMPLE_PUT]: (state, action) => {
      console.log('CHANGE_SAMPLE_PUT : ', action.payload);

      return produce(state, (draft) => {
        draft.putSampleItems.push({
          productId: action.payload[0],
          productAmount: 1,
          productPrice: action.payload[1],
          productName: action.payload[2],
          productImages: action.payload[3],
          productDeliveryCharge: action.payload[4],
          isExtraCharge: action.payload[5],
          extraCharge: action.payload[6],
        });

        draft.totalPrice += action.payload[1];
        draft.deliveryCharge += action.payload[4];
      });
    },
    [RECOMMEND.CHANGE_SAMPLE_DELETE]: (state, action) => {
      console.log('CHANGE_SAMPLE_DELETE : ', action.payload);

      return produce(state, (draft) => {
        const index = draft.putSampleItems.findIndex(
          (item) => item.productId === action.payload,
        );

        draft.totalPrice -=
          draft.putSampleItems[index].productPrice *
          draft.putSampleItems[index].productAmount;
        draft.deliveryCharge -=
          draft.putSampleItems[index].productDeliveryCharge;
        draft.putSampleItems.splice(index, 1);
      });
    },
    [RECOMMEND.CHANGE_SAMPLE_AMOUNT_INCREASE]: (state, action) => {
      console.log('CHANGE_SAMPLE_AMOUNT_INCREASE : ', action.payload);

      return produce(state, (draft) => {
        const index = draft.putSampleItems.findIndex(
          (item) => item.productId === action.payload,
        );

        draft.putSampleItems[index].productAmount++;
        draft.totalPrice += draft.putSampleItems[index].productPrice;
      });
    },
    [RECOMMEND.CHANGE_SAMPLE_AMOUNT_DECREASE]: (state, action) => {
      console.log('CHANGE_SAMPLE_AMOUNT_DECREASE : ', action.payload);

      return produce(state, (draft) => {
        const index = draft.putSampleItems.findIndex(
          (item) => item.productId === action.payload,
        );

        if (draft.putSampleItems[index].productAmount > 1) {
          draft.putSampleItems[index].productAmount--;
          draft.totalPrice -= draft.putSampleItems[index].productPrice;
        } else {
          draft.putSampleItems[index].productAmount = 1;
        }
      });
    },
    [RECOMMEND.CHANGE_INIT_STATE]: (state, action) => {
      const draft = createDraft(initialState);
      return finishDraft(draft);
    },
    [RECOMMEND.REQUEST_RECOMMEND_PRODUCT_DETAIL_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.productInformationNotices =
          action.payload.data.informationNotices;
        draft.productImages = action.payload.data.productImages;
        draft.productName = action.payload.data.productName;
        draft.productDeliveryCharge = action.payload.data.sampleDeliveryCharge;
        draft.productIsExtraCharge = action.payload.data.isExtraCharge;
        draft.productExtraCharge = action.payload.data.extraCharge;
        draft.productDeliveryCompany = action.payload.data.deliveryCompany;
        draft.normalPrice = action.payload.data.normalPrice;
        draft.isLend = action.payload.data.isLend;
        draft.samplePrice = action.payload.data.samplePrice;
        draft.productCategory = action.payload.data.productCategory;
        draft.isReturnCharge = action.payload.data.isReturnCharge;
        draft.returnCharge = action.payload.data.returnCharge;
        draft.isExchangeCharge = action.payload.data.isExchangeCharge;
        draft.exchangeCharge = action.payload.data.exchangeCharge;
      });
    },
    [RECOMMEND.REQUEST_RECOMMEND_PRODUCT_DETAIL_FAILED]: (state, action) => {
      console.log('REQUEST_RECOMMEND_PRODUCT_DETAIL_FAILED : ', action.payload);
      return produce(state, (draft) => {});
    },
  },
  initialState,
);

export default recommend;
