import {handleActions} from 'redux-actions';
import produce, {createDraft, finishDraft} from 'immer';
import {isNull} from 'redux-actions/lib/utils/isNull';
import * as USER from './actions';
import {checkResponseError} from '../../../utils/functions';
import * as BROADCAST from '../broadcast/actions';
import * as MYINFO from '../myinfo/actions';

const initialState = {
  platform: null,
  oAuthToken: null,
  jwtToken: null,
  errorMsg: '',
  successMsg: '',
  userId: null,
  type: null,
  nickName: null,
  birth: null,
  gender: null,
  email: null,
  profileImage: null,
  channelInfo: null,
  broadcastInfo: null,
  userInfo: null,
  additionalInfo: null,
  firebaseToken: null,
  sellerCode: null,
  activateCheck: -1,
  status: -1,
  carts: null,
  rendering: null,
  toastMsg: null,
  reservationBroadcasts: null,
  viewerNickName: '', // 시청자 마이페이지 - 프로필 수정
  viewerEmail: '', // 시청자 마이페이지 - 프로필 수정
  viewerPhone: '', // 시청자 마이페이지 - 프로필 수정
  profileSuccessMsg: null,
  dpleJwtToken: '',
  broadcastAccumulatedTime: null, // 시청자가 보는 셀러 마이 페이지 방송 누적 시간
  monthlyBroadcastTime: null, // 셀러 마이페이지 월 방송 시간
  monthlyBroadcastCount: null, // 셀러 마이페이지 월 방송 횟수
};

const user = handleActions(
  {
    [USER.SET_FIREBASE_TOKEN]: (state, action) => {
      return produce(state, (draft) => {
        draft.firebaseToken = action.payload;
      });
    },
    [USER.CHANGE_NICK]: (state, action) => {
      return produce(state, (draft) => {
        draft.nickName = action.payload;
      });
    },
    [USER.CHANGE_PROFILE_IMAGE]: (state, action) => {
      return produce(state, (draft) => {
        draft.profileImage = action.payload;
      });
    },
    [USER.UPLOAD_PROFILE_IMAGE_SUCCESS]: (state, action) => {
      console.log('UPLOAD_PROFILE_IMAGE_SUCCESS => ', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          draft.toastMsg = action.payload.responseMessage;
        } else {
          draft.toastMsg = 'SUCCESS';
          draft.profileImage = action.payload.data.profileImages.path;
        }
      });
    },
    [USER.RESET_MSG]: (state, action) => {
      return produce(state, (draft) => {
        draft.successMsg = '';
        draft.errorMsg = '';
        draft.toastMsg = null;
      });
    },
    [USER.UPLOAD_PROFILE_IMAGE_FAILED]: (state, action) => {
      return produce(state, (draft) => {
        console.log('UPLOAD_PROFILE_IMAGE_FAILED...');
      });
    },
    [USER.CHANGE_INIT_STATE]: (state, action) => {
      // Redux 초기화
      const draft = createDraft(initialState);
      return finishDraft(draft);
    },
    [USER.LOGOUT]: (state, action) => {
      console.log('LOGOUT');
      return produce(state, (draft) => {});
    },
    [USER.CHANGE_PLATFORM]: (state, action) => {
      console.log('CHANGE_PLATFORM:', action.payload);
      return produce(state, (draft) => {
        draft.platform = action.payload;
      });
    },
    [USER.CHANGE_OAUTH_TOKEN]: (state, action) => {
      console.log('CHANGE_OAUTH_TOKEN:', action.payload);
      return produce(state, (draft) => {
        draft.oAuthToken = action.payload;
      });
    },
    [USER.REQUEST_LOGIN_OAUTH_SUCCESS]: (state, action) => {
      console.log('REQUEST_LOGIN_OAUTH_SUCCESS', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          draft.errorMsg = action.payload.responseMessage;
        } else {
          draft.successMsg = action.payload.responseMessage;
          draft.jwtToken = action.payload.data.jwt;
          draft.userId = action.payload.data.userId;
          draft.type = action.payload.data.type;
        }
        //   if (typeof action.payload.errorData === 'undefined') {
        //     draft.errorMsg = action.payload.errorData.responseMessage;
        //   } else {
        //     draft.token = action.payload.data.jwt;
        //     draft.userId = action.payload.data.userId;
        //     draft.platform = action.payload.data.platform;
        //   }
      });
    },
    [USER.REQUEST_LOGIN_OAUTH_FAILED]: (state, action) => {
      console.log('REQUEST_LOGIN_OAUTH_FAILED', action.payload);
      return produce(state, (draft) => {});
    },
    [USER.CHANGE_ERROR_MSG]: (state, action) => {
      console.log('CHANGE_ERROR_MSG', action.payload);
      return produce(state, (draft) => {
        draft.errorMsg = action.payload;
      });
    },

    [USER.REQUEST_SIGNUP_VIEWER_SUCCESS]: (state, action) => {
      console.log('REQUEST_SIGNUP_VIEWER_SUCCESS', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          draft.errorMsg = '회원가입 실패 다시 시도해주세요';
        } else {
          draft.jwtToken = action.payload.data.jwt;
          draft.userId = action.payload.data.userId;
          draft.type = action.payload.data.type;
        }
      });
    },

    [USER.CHANGE_LOGIN_INFO]: (state, action) => {
      console.log('CHANGE_LOGIN_INFO', action.payload);
      return produce(state, (draft) => {
        draft.jwtToken = action.payload[0][1];
        draft.userId = action.payload[1][1];
        draft.type = action.payload[2][1];
      });
    },
    [USER.REQUEST_SIGNUP_VIEWER_FAILED]: (state, action) => {
      console.log('REQUEST_SIGNUP_VIEWER_FAILED', action.payload);
      return produce(state, (draft) => {});
    },

    [USER.REQUEST_SIGNUP_SELLER_SUCCESS]: (state, action) => {
      console.log('REQUEST_SIGNUP_SELLER_SUCCESS', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          draft.errorMsg = '회원가입 실패 다시 시도해주세요';
        } else {
          draft.jwtToken = action.payload.data.jwt;
          draft.userId = action.payload.data.userId;
          draft.type = action.payload.data.type;
          draft.successMsg = action.payload.responseMessage;
        }
      });
    },
    [USER.REQUEST_SIGNUP_SELLER_FAILED]: (state, action) => {
      console.log('REQUEST_SIGNUP_SELLER_FAILED', action.payload);
      return produce(state, (draft) => {});
    },

    [USER.REQUEST_USER_MYINFO_SUCCESS]: (state, action) => {
      console.log('REQUEST_USER_MYINFO_SUCCESS', action.payload);

      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          draft.errorMsg = '회원 정보 조회 실패 다시 시도해주세요.';
        } else {
          draft.channelInfo = action.payload.data.channelInfo;
          draft.broadcastInfo = action.payload.data.broadcastInfo;
          draft.userInfo = action.payload.data.userInfo;
          draft.additionalInfo = action.payload.data.additionalInfo;
          draft.userId = action.payload.data.userInfo._id;
          draft.nickName = action.payload.data.userInfo.nickName;
          draft.birth = action.payload.data.userInfo.birth;
          draft.gender = action.payload.data.userInfo.gender;
          draft.email = action.payload.data.userInfo.email;
          draft.platform = action.payload.data.userInfo.platform;
          draft.broadcastAccumulatedTime =
            action.payload.data.broadcastAccumulatedTime;
          draft.monthlyBroadcastTime = action.payload.data.monthlyBroadcastTime;
          draft.monthlyBroadcastCount =
            action.payload.data.monthlyBroadcastCount;
        }
      });
    },
    [USER.REQUEST_USER_MYINFO_FAILED]: (state, action) => {
      console.log('REQUEST_USER_MYINFO_FAILED', action.payload);
      return produce(state, (draft) => {});
    },
    [USER.REQUEST_USER_SELLER_ACTIVATE_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log('REQUEST_USER_SELLER_ACTIVATE_SUCCESS => ', action.payload);
        if (checkResponseError(action.payload)) {
          draft.errorMsg = '셀러 정보 호출 실패 했습니다.';
        } else {
          draft.status = action.payload.data.status;
          draft.activateCheck = action.payload.data.activateCheck;
          draft.nickName = action.payload.data.nickName;
          draft.profileImage = {path: action.payload.data.profileImageUrl};
          draft.sellerCode = action.payload.data.sellerCode;
        }
      });
    },
    [USER.CHANGE_INIT_SELLER_ACTIVATE]: (state, action) => {
      return produce(state, (draft) => {
        console.log('CHANGE_INIT_SELLER_ACTIVATE => ', action.payload);
        draft.status = -1;
        draft.activateCheck = -1;
      });
    },
    [USER.REQUEST_USER_SELLER_ACTIVATE_FAILED]: (state, action) => {
      return produce(state, (draft) => {});
    },
    [USER.REQUEST_USER_SELLER_ACTIVATE_CHECK_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log(
          'REQUEST_USER_SELLER_ACTIVATE_CHECK_SUCCESS => ',
          action.payload,
        );
      });
    },
    [USER.REQUEST_USER_SELLER_ACTIVATE_CHECK_FAILED]: (state, action) => {
      return produce(state, (draft) => {});
    },

    [USER.REQUEST_ADD_CART_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log('REQUEST_ADD_CART_SUCCESS => ', action.payload);
        draft.successMsg = '카트에 담겼습니다.';
      });
    },
    [USER.REQUEST_ADD_CART_FAILED]: (state, action) => {
      return produce(state, (draft) => {});
    },
    [USER.REQUEST_GET_CART_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log('REQUEST_GET_CART_SUCCESS => ', action.payload);

        if (checkResponseError(action.payload)) {
          draft.errorMsg = action.payload.responseMessage;
        } else {
          draft.carts = action.payload.data.cartDetails;
        }
      });
    },
    [USER.REQUEST_GET_CART_FAILED]: (state, action) => {
      return produce(state, (draft) => {});
    },
    [USER.CHANGE_CART_PRODUCT_AMOUNT_SUCCESS]: (state, action) => {
      console.log('CHANGE_CART_PRODUCT_AMOUNT_SUCCESS => ', action.payload);
      return produce(state, (draft) => {
        draft.rendering = Math.random();
      });
    },
    [USER.CHANGE_CART_PRODUCT_AMOUNT_FAILED]: (state, action) => {
      console.log('CHANGE_CART_PRODUCT_AMOUNT_FAILED => ', action.payload);
      return produce(state, (draft) => {});
    },
    [USER.DELETE_CART_PRODUCT_PART_SUCCESS]: (state, action) => {
      console.log('DELETE_CART_PRODUCT_PART_SUCCESS => ', action.payload);
      return produce(state, (draft) => {
        draft.rendering = Math.random();
      });
    },
    [USER.DELETE_CART_PRODUCT_PART_FAILED]: (state, action) => {
      console.log('DELETE_CART_PRODUCT_PART_FAILED => ', action.payload);
      return produce(state, (draft) => {});
    },
    [USER.DELETE_CART_PRODUCT_ALL_SUCCESS]: (state, action) => {
      console.log('DELETE_CART_PRODUCT_ALL_SUCCESS => ', action.payload);
      return produce(state, (draft) => {
        draft.rendering = Math.random();
      });
    },
    [USER.DELETE_CART_PRODUCT_ALL_FAILED]: (state, action) => {
      console.log('DELETE_CART_PRODUCT_ALL_FAILED => ', action.payload);
      return produce(state, (draft) => {});
    },
    [USER.REQUEST_RESERVATION_BROADCASTS_SUCCESS]: (state, action) => {
      console.log('REQUEST_RESERVATION_BROADCASTS_SUCCESS => ', action.payload);
      return produce(state, (draft) => {
        draft.reservationBroadcasts = action.payload.data;
        draft.rendering = Math.random();
      });
    },
    [USER.REQUEST_RESERVATION_BROADCASTS_FAILED]: (state, action) => {
      console.log('REQUEST_RESERVATION_BROADCASTS_FAILED => ', action.payload);
      return produce(state, (draft) => {});
    },
    [USER.REQUEST_VIEWER_INFO_SUCCESS]: (state, action) => {
      console.log('request_viewer_info', action.payload.data);
      return produce(state, (draft) => {
        draft.viewerNickName = action.payload.data.nickName;
        draft.viewerEmail = action.payload.data.email;
        draft.viewerPhone = action.payload.data.phone;
      });
    },
    [USER.CHANGE_VIEWER_NICK_NAME]: (state, action) => {
      return produce(state, (draft) => {
        draft.viewerNickName = action.payload;
      });
    },
    [USER.CHANGE_VIEWER_EMAIL]: (state, action) => {
      return produce(state, (draft) => {
        draft.viewerEmail = action.payload;
      });
    },
    [USER.CHANGE_VIEWER_PHONE]: (state, action) => {
      return produce(state, (draft) => {
        draft.viewerPhone = action.payload;
      });
    },
    [USER.UPDATE_VIEWER_INFO_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log('--------------------');
        console.log('message : ', action.payload);
        console.log('--------------------');
        if (action.payload.responseMessage.startsWith('S')) {
          draft.profileSuccessMsg = 'success';
        }
      });
    },
    [USER.CHANGE_PROFILE_SUCCESS_MESSAGE]: (state, action) => {
      return produce(state, (draft) => {
        draft.profileSuccessMsg = null;
      });
    },
    [USER.GET_VIEWER_IS_DPLE_JWT_SUCCESS]: (state, action) => {
      console.log('GET_VIEWER_IS_DPLE_JWT_SUCCESS => ', action.payload);
      return produce(state, (draft) => {
        let token = action.payload.data.dpleJwt;

        if (token) {
          draft.dpleJwtToken = token;
        } else {
          draft.dpleJwtToken = '';
        }
      });
    },
  },
  initialState,
);

export default user;
