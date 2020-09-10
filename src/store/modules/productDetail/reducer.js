import {handleActions} from 'redux-actions';
import produce from 'immer';
import * as PRODUCT from './actions';
import {CHANGE_BOTTOM_MODAL_POSITION_VALUE} from './actions';

const initialState = {
  productName: null, // 상품 상세 정보 - 상품명
  productImages: null, // 상품 상세 정보 - 상품이미지
  productStatus: null, // 상품 라이브 유무
  productLivePrice: 0, // 상품 라이브 가격
  productFeedPrice: 0, // 상품 녹방 가격
  productNormalPrice: 0, // 상품 노말 가격
  productDeliveryCompany: null, // 상품 택배사
  productDeliveryCharge: 0, // 상품 배송비
  productIsExtraCharge: null, // 제주 / 도서 배송여부
  productExtraCharge: 0, // 제주 / 도서 배송비
  productPlayer: null,
  productSellerInfo: null, // 셀러 정보
  productSellerReview: null, // 셀러 리뷰
  productSellerReviewImages: null, // 셀러 리뷰 작성 이미지
  productSellerReviewVideos: null, // 셀러 리뷰 작성 동영상
  broadcastId: null, // id 값
  expectedStartTime: null, // 방송 시작 시간
  expectedEndTime: null, // 방송 종료 시간
  productCategory: null, // 정보고시 카테고리 ex) 0 ~ 36
  informationNotices: null, // 정보 고시 정보
  deliveryChargeAmount: null, // 묶음 배송 갯수
  bottomModalPositionValue: [0], // 바텀 모달 포지션 위치 값
  isReturnCharge: null, // 반품비 있는지 여부
  returnCharge: 0, // 반품 금액
  isExchangeCharge: null, // 교환비 있는지 여부
  exchangeCharge: 0, // 교환금액
  isExtraCharge: null, // 제주/도서 배송 여부
  extraCharge: 0, // 제주 / 도서 배송비
  productDescription: null, // 웹 기술서
  paymentType: null, // 정기결제 타입 (period, normal)
  productId: null, // 상품 ID
};

const productDetail = handleActions(
  {
    [PRODUCT.REQUEST_PRODUCT_DETAIL_SUCCESS]: (state, action) => {
      console.log('REQUEST_PRODUCT_DETAIL_SUCCESS => ', action.payload);

      return produce(state, (draft) => {
        draft.broadcastId = action.payload.data._id;
        draft.productName = action.payload.data.productInfo.productName;
        draft.productImages = action.payload.data.productInfo.productImages;
        draft.productDescription =
          action.payload.data.productInfo.productDescription;
        draft.productStatus = action.payload.data.status;
        draft.expectedStartTime = action.payload.data.expectedStartTime;
        draft.expectedEndTime = action.payload.data.expectedEndTime;
        draft.productLivePrice =
          action.payload.data.productInfo.sellerLivePrice;
        draft.productFeedPrice =
          action.payload.data.productInfo.sellerFeedPrice;
        draft.productNormalPrice = action.payload.data.productInfo.normalPrice;
        draft.productDeliveryCompany =
          action.payload.data.productInfo.deliveryCompany;
        draft.productDeliveryCharge =
          action.payload.data.productInfo.deliveryCharge;
        draft.productIsExtraCharge =
          action.payload.data.productInfo.isExtraCharge;
        draft.productExtraCharge = action.payload.data.productInfo.extraCharge;
        draft.productPlayer = action.payload.data.dash_playback_url;
        draft.productSellerInfo = action.payload.data.sellerInfo;
        draft.productSellerReview = action.payload.data.review;
        draft.productSellerReviewImages = action.payload.data.reviewImages;
        draft.productSellerReviewVideos = action.payload.data.reviewVideos;
        draft.productCategory = action.payload.data.productInfo.productCategory;
        draft.informationNotices =
          action.payload.data.productInfo.informationNotices;
        draft.deliveryChargeAmount =
          action.payload.data.productInfo.deliveryChargeAmount;
        draft.isReturnCharge = action.payload.data.productInfo.isReturnCharge;
        draft.returnCharge = action.payload.data.productInfo.returnCharge;
        draft.isExchangeCharge =
          action.payload.data.productInfo.isExchangeCharge;
        draft.exchangeCharge = action.payload.data.productInfo.exchangeCharge;
        draft.isExtraCharge = action.payload.data.productInfo.isExtraCharge;
        draft.extraCharge = action.payload.data.productInfo.extraCharge;
        draft.paymentType = action.payload.data.productInfo.paymentType;
        draft.productId = action.payload.data.productId;
      });
    },
    [PRODUCT.REQUEST_PRODUCT_DETAIL_FAILED]: (state, action) => {
      console.log('REQUEST_PRODUCT_DETAIL_FAILED => ', action.payload);
      return produce(state, (draft) => {});
    },
    [PRODUCT.CHANGE_BOTTOM_MODAL_POSITION_VALUE]: (state, action) => {
      console.log('CHANGE_BOTTOM_MODAL_TOGGLE => ', action.payload);
      return produce(state, (draft) => {
        draft.bottomModalPositionValue = action.payload;
      });
    },
  },
  initialState,
);

export default productDetail;
