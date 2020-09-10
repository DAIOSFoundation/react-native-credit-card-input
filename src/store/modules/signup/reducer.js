import {handleActions} from 'redux-actions';
import {produce, createDraft, finishDraft} from 'immer';
import * as SIGNUP from './actions';
import {checkResponseError} from '../../../utils/functions';

const initialState = {
  type: null,
  statebar: 1,
  agreePrivacy: false,
  agreeMarketing: false,
  agreeALL: false,
  agreeContentsUtil: false,
  agreeBroadcast: false,
  nickName: '',
  shoppingPlace: [],
  shoppingAmount: [],
  productOfInterest: [],
  name: '',
  birth: '',
  birth2: '',
  gender: null,
  phoneCarrier: null,
  phone: '',
  email: '',
  profileImage: null,
  broadcastExperience: null,
  numOfLive: 0,
  sellingExperience: null,
  sellingPrice: null,
  sellingCategory: [],
  channelName: '',
  channelPk: null,
  channelProfile: null,
  followerCount: 0,
  mediaCount: 0,
  numOfUpload: 0,
  channelGenderRatio: 50,
  channelAgeRange: [],
  appearance: null,
  voice: null,
  preLiveInfo: null,
  sellingType: null,
  desiredIncome: 0,
  errorMsg: '',
  isValid: true,
  isValidBirth: true,
  isValidPhone: true,
  isValidNickName: true,
  isValidEmail: true,
  isValidNumOfLive: true,
  isValidDesiredIncome: true,
  checkedNickName: null,
  selectedChannelPk: null,
  channelInputName: '',
  errorMessage: '',
  authNumber: null,
  phoneAuthId: null,
  phoneAuthMessage: null,
  phoneAuthInfo: null, // ARS 인증 전화 받기 중 정보 임시 저장
  broadcastItemSellStatus: false,
  broadcastExperienceIndex: [], // 라이브 방송을 해보셨나요? 선택한 인덱스
  broadcastItemSellIndex: [], // 라이브 방송으로 아이템을 판매 해보셨나요? 선택한 인덱스
  sellingPriceIndex: [], // 판매한 상품의 개당 판매 금액은 얼마인가요? 선택한 인덱스
  sellItemsIndex: [], // 판매한 상품 선택(최대 3가지 선택기능) 선택한 인덱스
  channelAgeRangeIndex: [], // 나의 채널 주요 연령 선택한 인덱스
  interestItemsIndex: [], // 관심 있는 상품 선택 인덱스
  whereShopIndex: [], // 주로 어디에서 쇼핑을 하시나요 ? 인덱스
  averageAmountIndex: [], // 쇼핑 1회에 소비하는 평균 금액은 얼마인가요 ? 인덱스
  voiceIndex: [], // 나의 외모는 어떤 유형인가요 ? 인덱스
  appearanceIndex: [], // 나의 목소리는 어떤 유형인가요 ? 인덱스
  scopeIndex: [], // 희망하는 셀러 활동 범위 인덱스
};

const signup = handleActions(
  {
    [SIGNUP.CHANGE_CHECKED_CHANNELPK]: (state, action) => {
      console.log('CHANGE_CHECKED_CHANNELPK:', action.payload);
      return produce(state, (draft) => {
        draft.selectedChannelPk = action.payload;
      });
    },
    [SIGNUP.CHANGE_USER_TYPE]: (state, action) => {
      console.log('CHANGE_USER_TYPE:', action.payload);
      return produce(state, (draft) => {
        draft.type = action.payload;
      });
    },
    [SIGNUP.CHANGE_STATEBAR]: (state, action) => {
      console.log('CHANGE_STATEBAR:', action.payload);
      return produce(state, (draft) => {
        draft.statebar = action.payload;
      });
    },
    [SIGNUP.CHANGE_AGREE_PRIVACY]: (state, action) => {
      console.log('CHANGE_AGREE_PRIVACY:', action.payload);
      return produce(state, (draft) => {
        draft.agreePrivacy = action.payload;
      });
    },
    [SIGNUP.CHANGE_AGREE_MARKETING]: (state, action) => {
      console.log('CHANGE_AGREE_MARKETING:', action.payload);
      return produce(state, (draft) => {
        draft.agreeMarketing = action.payload;
      });
    },
    [SIGNUP.CHANGE_AGREE_CONTENTS]: (state, action) => {
      console.log('CHANGE_AGREE_CONTENTS:', action.payload);
      return produce(state, (draft) => {
        draft.agreeContentsUtil = action.payload;
      });
    },
    [SIGNUP.CHANGE_AGREE_BROADCAST]: (state, action) => {
      console.log('CHANGE_AGREE_BROADCAST:', action.payload);
      return produce(state, (draft) => {
        draft.agreeBroadcast = action.payload;
      });
    },
    [SIGNUP.CHANGE_AGREE_ALL]: (state, action) => {
      return produce(state, (draft) => {
        draft.agreePrivacy = action.payload;
        draft.agreeMarketing = action.payload;
        draft.agreeContentsUtil = action.payload;
        draft.agreeBroadcast = action.payload;
        draft.agreeALL = action.payload;
      });
    },
    [SIGNUP.CHANGE_ONLY_AGREE_ALL]: (state, action) => {
      return produce(state, (draft) => {
        draft.agreeALL = action.payload;
      });
    },
    [SIGNUP.CHANGE_NICK_NAME]: (state, action) => {
      console.log('CHANGE_NICK_NAME:', action.payload);
      return produce(state, (draft) => {
        draft.nickName = action.payload;
      });
    },
    [SIGNUP.CHANGE_SHOPPING_PLACE]: (state, action) => {
      console.log('CHANGE_SHOPPING_PLACE:', action.payload);
      return produce(state, (draft) => {
        draft.shoppingPlace = action.payload;
        // draft.whereShopIndex = [action.payload.index];
      });
    },
    [SIGNUP.CHANGE_SHOPPING_AMOUNT]: (state, action) => {
      console.log('CHANGE_SHOPPING_AMOUNT:', action.payload);
      return produce(state, (draft) => {
        draft.shoppingAmount = action.payload;
        // draft.averageAmountIndex = [action.payload.index];
      });
    },
    [SIGNUP.CHANGE_NAME]: (state, action) => {
      console.log('CHANGE_NAME:', action.payload);
      return produce(state, (draft) => {
        draft.name = action.payload;
      });
    },
    [SIGNUP.CHANGE_BIRTH]: (state, action) => {
      console.log('CHANGE_BIRTH:', action.payload);
      return produce(state, (draft) => {
        draft.birth = action.payload;
      });
    },
    [SIGNUP.CHANGE_BIRTH2]: (state, action) => {
      console.log('CHANGE_BIRTH2:', action.payload);
      return produce(state, (draft) => {
        draft.birth2 = action.payload;
        draft.gender = action.payload.charAt(0);
      });
    },
    [SIGNUP.CHANGE_PHONE]: (state, action) => {
      console.log('CHANGE_PHONE:', action.payload);
      return produce(state, (draft) => {
        draft.phone = action.payload;
      });
    },
    [SIGNUP.CHANGE_PHONE_CARRIER]: (state, action) => {
      console.log('CHANGE_PHONE_CARRIER:', action.payload);
      return produce(state, (draft) => {
        draft.phoneCarrier = action.payload;
      });
    },
    [SIGNUP.CHANGE_EMAIL]: (state, action) => {
      console.log('CHANGE_EMAIL:', action.payload);
      return produce(state, (draft) => {
        draft.email = action.payload;
      });
    },
    [SIGNUP.CHANGE_PROFILE_IMAGE]: (state, action) => {
      console.log('CHANGE_PROFILE_IMAGE:', action.payload);
      return produce(state, (draft) => {
        draft.profileImage = action.payload;
      });
    },
    [SIGNUP.CHANGE_BROADCAST_EXPERIENCE]: (state, action) => {
      console.log('CHANGE_BROADCAST_EXPERIENCE:', action.payload);
      return produce(state, (draft) => {
        if (action.payload.name === '아니요') {
          draft.numOfLive = 0;
          draft.broadcastItemSellIndex = [];
          draft.sellingCategory = [];
          draft.sellingPrice = '';
          draft.sellingPriceIndex = [];
          draft.sellItemsIndex = [];
        }

        draft.broadcastExperienceIndex = [action.payload.index];
        // if (draft.broadcastExperienceIndex.length !== 0){
        //   for (let i = 0; i < draft.broadcastExperienceIndex.length; i++) {
        //     if (!draft.broadcastExperienceIndex.includes(action.payload.index)) {
        //       draft.broadcastExperienceIndex.push(action.payload.index)
        //     }
        //   }
        // }else{
        //   draft.broadcastExperienceIndex.push(action.payload.index)
        // }
        draft.broadcastExperience = action.payload.name;
      });
    },
    [SIGNUP.CHANGE_NUM_OF_LIVE]: (state, action) => {
      console.log('CHANGE_NUM_OF_LIVE:', action.payload);
      return produce(state, (draft) => {
        draft.numOfLive = action.payload;
      });
    },
    [SIGNUP.CHANGE_SELLING_EXPERIENCE]: (state, action) => {
      console.log('CHANGE_SELLING_EXPERIENCE:', action.payload);
      return produce(state, (draft) => {
        if (action.payload.name === '아니요') {
          draft.sellingCategory = [];
          draft.sellingPrice = '';
          draft.sellingPriceIndex = [];
          draft.sellItemsIndex = [];
        }

        draft.broadcastItemSellIndex = [action.payload.index];
        draft.sellingExperience = action.payload.name;
      });
    },
    [SIGNUP.CHANGE_SELLING_PRICE]: (state, action) => {
      console.log('CHANGE_SELLING_PRICE:', action.payload);
      return produce(state, (draft) => {
        draft.sellingPrice = action.payload.name;
        draft.sellingPriceIndex = [action.payload.index];
      });
    },
    [SIGNUP.CHANGE_SELLING_CATEGORY]: (state, action) => {
      console.log('CHANGE_SELLING_CATEGORY:', action.payload);
      return produce(state, (draft) => {
        draft.sellingCategory = [];
        draft.sellItemsIndex = [];
        for (let i = 0; i < action.payload.length; i++) {
          draft.sellingCategory.push(action.payload[i].name);
          draft.sellItemsIndex.push(action.payload[i].index);
        }
      });
    },
    [SIGNUP.CHANGE_CHANNEL_NAME]: (state, action) => {
      console.log('CHANGE_CHANNEL_NAME:', action.payload);
      return produce(state, (draft) => {
        draft.channelInputName = action.payload;
      });
    },
    [SIGNUP.CHANGE_NUM_OF_UPLOAD]: (state, action) => {
      console.log('CHANGE_NUM_OF_UPLOAD:', action.payload);
      return produce(state, (draft) => {
        draft.numOfUpload = action.payload;
      });
    },
    [SIGNUP.CHANGE_CHANNEL_GENDER_RATIO]: (state, action) => {
      console.log('CHANGE_CHANNEL_GENDER_RATIO:', action.payload);
      return produce(state, (draft) => {
        draft.channelGenderRatio = action.payload;
      });
    },
    [SIGNUP.CHANGE_CHANNEL_AGE_RANGE]: (state, action) => {
      console.log('CHANGE_CHANNEL_AGE_RANGE:', action.payload);
      return produce(state, (draft) => {
        draft.channelAgeRange = [];
        draft.channelAgeRangeIndex = [];
        for (let i = 0; i < action.payload.length; i++) {
          draft.channelAgeRange.push(action.payload[i].name);
          draft.channelAgeRangeIndex.push(action.payload[i].index);
        }
      });
    },
    [SIGNUP.CHANGE_APPEARANCE]: (state, action) => {
      console.log('CHANGE_APPEARANCE:', action.payload);
      return produce(state, (draft) => {
        draft.appearance = action.payload.name;
        draft.appearanceIndex = [action.payload.index];
      });
    },
    [SIGNUP.CHANGE_VOICE]: (state, action) => {
      console.log('CHANGE_VOICE:', action.payload);
      return produce(state, (draft) => {
        draft.voice = action.payload.name;
        draft.voiceIndex = [action.payload.index];
      });
    },
    [SIGNUP.CHANGE_PREV_LIVE_INFO]: (state, action) => {
      console.log('CHANGE_PREV_LIVE_INFO:', action.payload);
      return produce(state, (draft) => {
        draft.preLiveInfo = action.payload;
      });
    },
    [SIGNUP.CHANGE_SELLING_TYPE]: (state, action) => {
      console.log('CHANGE_SELLING_TYPE:', action.payload);
      return produce(state, (draft) => {
        draft.sellingType = action.payload.name;
        draft.scopeIndex = [action.payload.index];
      });
    },
    [SIGNUP.CHANGE_DESIRED_INCOME]: (state, action) => {
      console.log('CHANGE_DESIRED_INCOME:', action.payload);
      return produce(state, (draft) => {
        draft.desiredIncome = action.payload;
      });
    },
    [SIGNUP.CHANGE_PRODUCT_INTEREST]: (state, action) => {
      console.log('CHANGE_PRODUCT_INTEREST:', action.payload);
      return produce(state, (draft) => {
        draft.productOfInterest = [];
        draft.interestItemsIndex = [];
        for (let i = 0; i < action.payload.length; i++) {
          draft.productOfInterest.push(action.payload[i].index);
          draft.interestItemsIndex.push(action.payload[i].index);
        }
      });
    },
    [SIGNUP.CHANGE_ERROR_MSG]: (state, action) => {
      console.log('CHANGE_ERROR_MSG', action.payload);
      return produce(state, (draft) => {
        draft.errorMsg = action.payload;
      });
    },
    [SIGNUP.CHANGE_IS_VALID]: (state, action) => {
      console.log('CHANGE_IS_VALID', action.payload);
      return produce(state, (draft) => {
        draft.isValid = action.payload;
      });
    },
    [SIGNUP.CHANGE_IS_VALID_BIRTH]: (state, action) => {
      return produce(state, (draft) => {
        draft.isValidBirth = action.payload;
      });
    },
    [SIGNUP.CHANGE_IS_VALID_PHONE]: (state, action) => {
      return produce(state, (draft) => {
        draft.isValidPhone = action.payload;
      });
    },
    [SIGNUP.CHANGE_IS_VALID_NICKNAME]: (state, action) => {
      return produce(state, (draft) => {
        draft.isValidNickName = action.payload;
      });
    },
    [SIGNUP.CHANGE_IS_VALID_EMAIL]: (state, action) => {
      return produce(state, (draft) => {
        draft.isValidEmail = action.payload;
      });
    },
    [SIGNUP.CHANGE_IS_VALID_NUM_OF_LIVE]: (state, action) => {
      return produce(state, (draft) => {
        draft.isValidNumOfLive = action.payload;
      });
    },
    [SIGNUP.CHANGE_IS_VALID_DESIRED_INCOME]: (state, action) => {
      return produce(state, (draft) => {
        draft.isValidDesiredIncome = action.payload;
      });
    },

    [SIGNUP.REQUEST_CHECK_NICK_SUCCESS]: (state, action) => {
      console.log('REQUEST_CHECK_NICK_SUCCESS', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          draft.errorMsg = '사용 할 수 없는 닉네임입니다.';

          draft.checkedNickName = '';
        } else {
          draft.errorMsg = '사용할 수 있는 닉네임입니다.';
          draft.checkedNickName = draft.nickName;
        }
      });
    },
    [SIGNUP.REQUEST_CHECK_NICK_FAILED]: (state, action) => {
      console.log('REQUEST_CHECK_NICK_FAILED', action.payload);
      return produce(state, (draft) => {});
    },
    [SIGNUP.CHANGE_IS_CHECK_NICK]: (state, action) => {
      console.log('CHANGE_IS_CHECK_NICK', action.payload);
      return produce(state, (draft) => {
        draft.isCheckNick = action.payload;
      });
    },

    [SIGNUP.CHANGE_CHANNEL_PK]: (state, action) => {
      console.log('CHANGE_CHANNEL_PK', action.payload);
      return produce(state, (draft) => {
        draft.channelPk = '';
      });
    },

    [SIGNUP.REQUEST_IG_USER_NAME_SUCCESS]: (state, action) => {
      console.log(
        'REQUEST_IG_USER_NAME_SUCCESS',
        action.payload.responseMessage,
      );
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          draft.channelPk = '';
          draft.channelProfile = null;
          draft.followerCount = 0;
          draft.mediaCount = 0;
          draft.errorMsg = action.payload.responseMessage;
          draft.selectedChannelPk = '';
        } else {
          draft.channelPk = action.payload.data.channelPk;
          draft.channelProfile = action.payload.data.channelProfile;
          draft.followerCount = action.payload.data.followerCount;
          draft.mediaCount = action.payload.data.mediaCount;
          draft.errorMsg = '';
          draft.selectedChannelPk = '';
          draft.channelName = action.payload.data.channelName;
          // draft.errorMsg = '인스타 아이디를 조회 할 수 없습니다.';
        }
      });
    },
    [SIGNUP.REQUEST_IG_USER_NAME_FAILED]: (state, action) => {
      console.log('REQUEST_IG_USER_NAME_FAILED', action.payload);
      return produce(state, (draft) => {});
    },
    [SIGNUP.CHANGE_ERROR_MESSAGE]: (state, action) => {
      console.log('CHANGE_ERROR_MESSAGE', action.payload);
      return produce(state, (draft) => {
        draft.errorMessage = action.payload;
      });
    },
    [SIGNUP.CHANGE_PHONE_AUTH_ONE_SUCCESS]: (state, action) => {
      console.log('CHANGE_PHONE_AUTH_ONE_SUCCESS', action.payload);
      return produce(state, (draft) => {
        if (action.payload.responseStatus === 400) {
          draft.phoneAuthMessage = 'E1026';
        } else {
          draft.authNumber = action.payload.data.authNumber;
          draft.phoneAuthId = action.payload.data._id;
        }
      });
    },
    [SIGNUP.CHANGE_PHONE_AUTH_ONE_FAILED]: (state, action) => {
      console.log('CHANGE_PHONE_AUTH_ONE_FAILED', action.payload);
      return produce(state, (draft) => {});
    },
    [SIGNUP.CHANGE_PHONE_AUTH_MESSAGE_INIT]: (state, action) => {
      console.log('CHANGE_PHONE_AUTH_MESSAGE_INIT', action.payload);
      return produce(state, (draft) => {
        draft.phoneAuthMessage = null;
      });
    },
    [SIGNUP.CHANGE_PHONE_AUTH_INFO_TEMPORARY_STORAGE]: (state, action) => {
      console.log('CHANGE_PHONE_AUTH_INFO_TEMPORARY_STORAGE', action.payload);
      return produce(state, (draft) => {
        draft.phoneAuthInfo = action.payload;
      });
    },
    [SIGNUP.CHANGE_PHONE_AUTH_TWO_SUCCESS]: (state, action) => {
      console.log('CHANGE_PHONE_AUTH_TWO_SUCCESS', action.payload);
      return produce(state, (draft) => {
        if (action.payload.responseStatus === 200) {
          draft.phoneAuthMessage = '200';
        } else if (action.payload.responseStatus === 403) {
          draft.phoneAuthMessage = '403';
        }
      });
    },
    [SIGNUP.CHANGE_PHONE_AUTH_TWO_FAILED]: (state, action) => {
      console.log('CHANGE_PHONE_AUTH_TWO_FAILED', action.payload);
      return produce(state, (draft) => {});
    },
    [SIGNUP.CHANGE_INIT_STATE]: (state, action) => {
      const draft = createDraft(initialState);
      return finishDraft(draft);
    },
    [SIGNUP.ARS_AUTH_NUMBER_INIT]: (state, action) => {
      return produce(state, (draft) => {
        draft.authNumber = null;
      });
    },
    [SIGNUP.ARS_PHONE_AUTH_ID_INIT]: (state, action) => {
      return produce(state, (draft) => {
        draft.phoneAuthId = null;
      });
    },
    [SIGNUP.BROADCAST_ITEM_SELL_STATUS]: (state, action) => {
      return produce(state, (draft) => {
        draft.broadcastItemSellStatus = action.payload;
      });
    },
  },
  initialState,
);

export default signup;
