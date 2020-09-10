import {takeLatest} from 'redux-saga/effects';
import * as USER from './actions';
import * as usersApi from '../../../lib/api/users';
import createRequestSaga from '../../../lib/createRequestSaga';
import * as signupAPI from '../../../lib/api/signup';
import * as BROADCAST from '../broadcast/actions';
import * as broadcastAPI from '../../../lib/api/broadcast';

const requestLoginOauthSaga = createRequestSaga(
  USER.REQUEST_LOGIN_OAUTH,
  usersApi.loginOauth,
);

const requestSignupViewer = createRequestSaga(
  USER.REQUEST_SIGNUP_VIEWER,
  signupAPI.signupViewer,
);

const requestSignupSeller = createRequestSaga(
  USER.REQUEST_SIGNUP_SELLER,
  signupAPI.signupSeller,
);

const requestUsersMyinfo = createRequestSaga(
  USER.REQUEST_USER_MYINFO,
  usersApi.usersMyinfo,
);

const requestUploadProfileImage = createRequestSaga(
  USER.UPLOAD_PROFILE_IMAGE,
  usersApi.patchUsersProfileImage,
);

const requestGetSellerActivate = createRequestSaga(
  USER.REQUEST_USER_SELLER_ACTIVATE,
  usersApi.getUsersActivateCheck,
);

const requestPatchSellerActivate = createRequestSaga(
  USER.REQUEST_USER_SELLER_ACTIVATE_CHECK,
  usersApi.patchUsersActivateCheck,
);

const requestPutAddCart = createRequestSaga(
  USER.REQUEST_ADD_CART,
  usersApi.putAddcart,
);

const requestGetCart = createRequestSaga(
  USER.REQUEST_GET_CART,
  usersApi.getCart,
);

const requestBroadcastCartProductAmountSaga = createRequestSaga(
  USER.CHANGE_CART_PRODUCT_AMOUNT,
  usersApi.getBroadcastsCartProductAmount,
);

const deleteCartProductPartSaga = createRequestSaga(
  USER.DELETE_CART_PRODUCT_PART,
  usersApi.deleteCartProductPart,
);

const deleteCartProductAllSaga = createRequestSaga(
  USER.DELETE_CART_PRODUCT_ALL,
  usersApi.deleteCartProductAll,
);

const requestReservationBroadcastsSaga = createRequestSaga(
  USER.REQUEST_RESERVATION_BROADCASTS,
  usersApi.getReservationBroadcasts,
);

const requestViewerInfo = createRequestSaga(
  USER.REQUEST_VIEWER_INFO,
  usersApi.requestViewerInfo,
);

const updateViewerInfo = createRequestSaga(
  USER.UPDATE_VIEWER_INFO,
  usersApi.updateViewerInfo,
);

const getOwnDpleJwtTokenSaga = createRequestSaga(
  USER.GET_VIEWER_IS_DPLE_JWT,
  usersApi.getOwnDpleJwtToken,
);

export default function* rootSaga() {
  yield [
    yield takeLatest(USER.REQUEST_LOGIN_OAUTH, requestLoginOauthSaga),
    yield takeLatest(USER.REQUEST_SIGNUP_VIEWER, requestSignupViewer),
    yield takeLatest(USER.REQUEST_SIGNUP_SELLER, requestSignupSeller),
    yield takeLatest(USER.REQUEST_USER_MYINFO, requestUsersMyinfo),
    yield takeLatest(USER.UPLOAD_PROFILE_IMAGE, requestUploadProfileImage),
    yield takeLatest(
      USER.REQUEST_USER_SELLER_ACTIVATE,
      requestGetSellerActivate,
    ),
    yield takeLatest(
      USER.REQUEST_USER_SELLER_ACTIVATE_CHECK,
      requestPatchSellerActivate,
    ),
    yield takeLatest(USER.REQUEST_ADD_CART, requestPutAddCart),
    yield takeLatest(USER.REQUEST_GET_CART, requestGetCart),
    yield takeLatest(
      USER.CHANGE_CART_PRODUCT_AMOUNT,
      requestBroadcastCartProductAmountSaga,
    ),
    yield takeLatest(USER.DELETE_CART_PRODUCT_PART, deleteCartProductPartSaga),
    yield takeLatest(USER.DELETE_CART_PRODUCT_ALL, deleteCartProductAllSaga),
    yield takeLatest(
      USER.REQUEST_RESERVATION_BROADCASTS,
      requestReservationBroadcastsSaga,
    ),
    yield takeLatest(USER.REQUEST_VIEWER_INFO, requestViewerInfo),
    yield takeLatest(USER.UPDATE_VIEWER_INFO, updateViewerInfo),
    yield takeLatest(USER.GET_VIEWER_IS_DPLE_JWT, getOwnDpleJwtTokenSaga),
  ];
}
