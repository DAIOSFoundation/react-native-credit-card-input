import {handleActions} from 'redux-actions';
import produce, {createDraft, finishDraft} from 'immer';
import * as BROADCAST from './actions';
import {checkResponseError} from '../../../utils/functions';
import 'react-native-get-random-values';

const initialState = {
  broadcasts: [], // 최근 방송 영상 5개 정보
  subBroadcasts: [], // 최근 방송영상 5개를 제외한 나머지 방송 정보들
  broadcastDetail: null, // 전체화면 진입 시 해당 방송 정보
  broadcastComments: [], // 인스타 방송 댓글
  broadcastSystemComments: [], // 인스타 방송 참여자
  keepCallingCommentsIntervalId: null,
  autoplay: true,
  currentProduct: null,
  broadcastProducts: [], // 시청 중 주문페이지로 보낼 상품들
  broadcastsPreview: [], // 메인화면 라이브 예고
  broadcastsPreviewDetail: null, // 메인화면 라이브 예고 상세화면
  alarmMessage: null, // 알람 성공 실패 여부 메세지 ex) S200 - 알람 받기 성공, S201 - 알람 해제 성공
  alarmState: [], // 알람 여부 상태값
  rendering: null, // 배열 랜더링 제어 값
  prevCommentsData: null, // 해당 라이브 예고 방송 미리 댓글 데이터
  commentText: '', // 미리 댓글 페이지 - 텍스트 값
  monthlyBroadcastsMarkedData: [], // 마이페이지-라방 상세 일정(날짜),
  monthlyBroadcastsTodayBroadcast: [], // 마이페이지 - 오늘 라방 정보
  scheduleRendering: null,
  scheduleFirstRendering: true,
  monthlyAllBroadcastsMarkedDate: [], // 캘린더 탭 - 모든 라방 상세 일정(날짜)
  monthlyAllBroadcastsTodayBroadcast: [], // 캘린더 탭 - 오늘의 모든 라방 정보
  priceInfo: null, // 캘린더 탭 - 가격 정보(방송중, 방송후 가격이 상이하므로)
  period: null,
  sellerTabWeekBroadcastsMarkedData: [], //셀러 마이탭 - 이번 주 라방 일정(날짜),
  sellerTabTodayBroadcasts: [], //셀러 마이탭 - 오늘 라방 상세정보
  sellerTabAppointedBroadcasts: [], //셀러 마이탭 - 예정된 라방 상세정보
  deleteStepOneTwoBroadcast: false,
  sellerInfo: [], //시청자가보는 셀러 마이페이지 - 셀러 정보
  LiveNotice: [], // 시청자가 보는 셀러 마이페이지 - 라이브 예고 리스트
  sellerPageAlarm: [], // 시청자가 보는 셀러 마이페이지 알람데이터
  sellerPageAlarmState: [], // 시청저가 보는 셀러 마이페이지 - 라이브 예고 알람 설정 상태
  passedBroadcasts: [], // 시청자가 보는 셀러 마이페이지 - 지난 방송 리스트
  products: [], // 시청자가 보는 셀러 마이페이지 - 상품 리스트
};

const broadcast = handleActions(
  {
    [BROADCAST.CHANGE_AUTOPLAY]: (state, action) => {
      return produce(state, (draft) => {
        draft.autoplay = action.payload;
      });
    },
    [BROADCAST.GET_BROADCAST_INFO_SUCCESS]: (state, action) => {
      // console.log('GET_BROADCAST_INFO_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        draft.broadcasts = action.payload.data.broadcastInfo;
        draft.subBroadcasts = action.payload.data.subBroadcastInfo;
      });
    },
    [BROADCAST.GET_BROADCAST_INFO_FAILED]: (state, action) => {
      console.log('GET_BROADCAST_INFO_FAILED : ', action.payload);
      return produce(state, (draft) => {
        // draft.broadcasts = '';
      });
    },
    [BROADCAST.GET_BROADCAST_COMMENTS_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log(
          'GET_BROADCAST_COMMENTS_SUCCESS : ',
          action.payload.data.comments,
        );
        const respPkArray = [];
        const originPkArray = [];
        const newComments = [];
        for (let i = 0; i < action.payload.data.comments.length; i++) {
          respPkArray.push(action.payload.data.comments[i].pk);
        }
        for (let i = 0; i < draft.broadcastComments.length; i++) {
          originPkArray.push(draft.broadcastComments[i].pk);
        }
        for (let i = 0; i < action.payload.data.comments.length; i++) {
          if (!originPkArray.includes(action.payload.data.comments[i].pk)) {
            newComments.push(action.payload.data.comments[i]);
          }
        }
        for (let i = 0; i < action.payload.data.system_comments.length; i++) {
          respPkArray.push(action.payload.data.system_comments[i].pk);
        }
        for (let i = 0; i < action.payload.data.system_comments.length; i++) {
          if (!originPkArray.includes(action.payload.data.system_comments[i].pk)) {
            newComments.push(action.payload.data.system_comments[i]);
          }
        }
        draft.broadcastComments = draft.broadcastComments.concat(newComments);
      });
    },
    [BROADCAST.CHANGE_INTERVAL_ID]: (state, action) => {
      return produce(state, (draft) => {
        console.log('CHANGE_INTERVAL_ID => ', action.payload);
        draft.keepCallingCommentsIntervalId = action.payload;
      });
    },

    [BROADCAST.REQUEST_BROADCAST_PRODUCT_SUCCESS]: (state, action) => {
      console.log('REQUEST_BROADCAST_PRODUCT_SUCCESS => ', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
        } else {
          draft.currentProduct = action.payload.data;
        }
      });
    },
    [BROADCAST.REQUEST_BROADCAST_PRODUCT_FAILED]: (state, action) => {
      console.log('REQUEST_BROADCAST_PRODUCT_FAILED => ', action.payload);
      return produce(state, (draft) => {
      });
    },
    [BROADCAST.CHANGE_BROADCAST_PRODUCT]: (state, action) => {
      console.log('CHANGE_BROADCAST_PRODUCT => ', action.payload);
      return produce(state, (draft) => {
        draft.broadcastProducts = [];
        draft.broadcastProducts.push(...action.payload);
      });
    },
    [BROADCAST.CHANGE_BROADCAST_PRODUCT_INIT_STATE]: (state, action) => {
      return produce(state, (draft) => {
        draft.broadcastProducts = [];
      });
    },
    [BROADCAST.GET_BROADCAST_PREVIEW_SUCCESS]: (state, action) => {
      console.log('GET_BROADCAST_PREVIEW_SUCCESS =>', action.payload);
      return produce(state, (draft) => {
        draft.broadcastsPreview = action.payload.data;
      });
    },
    [BROADCAST.GET_BROADCAST_PREVIEW_FAILED]: (state, action) => {
      console.log('GET_BROADCAST_PREVIEW_FAILED =>', action.payload);
      return produce(state, (draft) => {
      });
    },
    [BROADCAST.GET_BROADCAST_PREVIEW_DETAIL_SUCCESS]: (state, action) => {
      console.log('GET_BROADCAST_PREVIEW_DETAIL_SUCCESS =>', action.payload);
      return produce(state, (draft) => {
        draft.broadcastsPreviewDetail = action.payload.data;
        draft.rendering = Math.random();
      });
    },
    [BROADCAST.GET_BROADCAST_PREVIEW_DETAIL_FAILED]: (state, action) => {
      console.log('GET_BROADCAST_PREVIEW_DETAIL_FAILED =>', action.payload);
      return produce(state, (draft) => {
      });
    },
    [BROADCAST.REQUEST_BROADCAST_PREVIEW_ALARM_SUCCESS]: (state, action) => {
      console.log('REQUEST_BROADCAST_PREVIEW_ALARM_SUCCESS =>', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          console.log('REQUEST_BROADCAST_PREVIEW_ALARM_SUCCESS 에러 !!!');
        } else {
          draft.alarmMessage = 'S200';
        }
      });
    },
    [BROADCAST.REQUEST_BROADCAST_PREVIEW_ALARM_FAILED]: (state, action) => {
      console.log('REQUEST_BROADCAST_PREVIEW_ALARM_FAILED =>', action.payload);
      return produce(state, (draft) => {
      });
    },
    [BROADCAST.DELETE_BROADCAST_PREVIEW_ALARM_SUCCESS]: (state, action) => {
      console.log('DELETE_BROADCAST_PREVIEW_ALARM_SUCCESS =>', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          console.log('DELETE_BROADCAST_PREVIEW_ALARM_SUCCESS 에러 !!!');
        } else {
          draft.alarmMessage = 'S201';
        }
      });
    },
    [BROADCAST.DELETE_BROADCAST_PREVIEW_ALARM_FAILED]: (state, action) => {
      console.log('DELETE_BROADCAST_PREVIEW_ALARM_FAILED =>', action.payload);
      return produce(state, (draft) => {
      });
    },
    [BROADCAST.CHANGE_ALARM_MESSAGE_INIT]: (state, action) => {
      console.log('CHANGE_ALARM_MESSAGE_INIT =>', action.payload);
      return produce(state, (draft) => {
        draft.alarmMessage = null;
      });
    },
    [BROADCAST.CHANGE_BROADCAST_PREVIEW_ALARM_STATE]: (state, action) => {
      console.log('CHANGE_BROADCAST_PREVIEW_ALARM_STATE =>', action.payload);
      return produce(state, (draft) => {
        draft.alarmState = action.payload;
      });
    },
    [BROADCAST.UPDATE_BROADCAST_PREVIEW_ALARM_STATE]: (state, action) => {
      console.log('UPDATE_BROADCAST_PREVIEW_ALARM_STATE =>', action.payload);
      return produce(state, (draft) => {
        draft.alarmState[action.payload.i][action.payload.j].status = !draft
          .alarmState[action.payload.i][action.payload.j].status;
      });
    },
    [BROADCAST.REQUEST_PREVIEW_BROADCAST_PREV_COMMENTS_SUCCESS]: (
      state,
      action,
    ) => {
      console.log(
        'REQUEST_PREVIEW_BROADCAST_PREV_COMMENTS_SUCCESS =>',
        action.payload,
      );
      return produce(state, (draft) => {
        draft.prevCommentsData = action.payload.data;
      });
    },
    [BROADCAST.REQUEST_PREVIEW_BROADCAST_PREV_COMMENTS_FAILED]: (
      state,
      action,
    ) => {
      console.log(
        'REQUEST_PREVIEW_BROADCAST_PREV_COMMENTS_FAILED =>',
        action.payload,
      );
      return produce(state, (draft) => {
      });
    },
    [BROADCAST.CHANGE_PREVIEW_PRODUCT_COMMENT]: (state, action) => {
      console.log('CHANGE_PREVIEW_PRODUCE_COMMENT =>', action.payload);
      return produce(state, (draft) => {
        draft.commentText = action.payload;
      });
    },
    [BROADCAST.INSERT_PREVIEW_PRODUCT_COMMENT_SUCCESS]: (state, action) => {
      console.log('INSERT_PREVIEW_PRODUCT_COMMENT_SUCCESS =>', action.payload);
      return produce(state, (draft) => {
        draft.rendering = Math.random();
        draft.commentText = '';
      });
    },
    [BROADCAST.INSERT_PREVIEW_PRODUCT_COMMENT_FAILED]: (state, action) => {
      console.log('INSERT_PREVIEW_PRODUCT_COMMENT_FAILED =>', action.payload);
      return produce(state, (draft) => {
      });
    },
    [BROADCAST.DELETE_PREVIEW_PRODUCT_COMMENT]: (state, action) => {
      console.log('DELETE_PREVIEW_PRODUCT_COMMENT =>', action.payload);
      return produce(state, (draft) => {
        draft.rendering = Math.random();
      });
    },
    [BROADCAST.DELETE_PREVIEW_PRODUCT_SUB_COMMENT]: (state, action) => {
      console.log('DELETE_PREVIEW_PRODUCT_SUB_COMMENT =>', action.payload);
      return produce(state, (draft) => {
        draft.rendering = Math.random();
      });
    },
    [BROADCAST.INSERT_PREVIEW_PRODUCT_SUB_COMMENT_SUCCESS]: (state, action) => {
      console.log(
        'INSERT_PREVIEW_PRODUCT_SUB_COMMENT_SUCCESS =>',
        action.payload,
      );
      return produce(state, (draft) => {
        draft.rendering = Math.random();
        draft.commentText = '';
      });
    },
    [BROADCAST.INSERT_PREVIEW_PRODUCT_SUB_COMMENT_FAILED]: (state, action) => {
      console.log(
        'INSERT_PREVIEW_PRODUCT_SUB_COMMENT_FAILED =>',
        action.payload,
      );
      return produce(state, (draft) => {
      });
    },
    [BROADCAST.GET_BROADCAST_DETAIL_INFO_SUCCESS]: (state, action) => {
      console.log('GET_BROADCAST_DETAIL_INFO_SUCCESS =>', action.payload);
      return produce(state, (draft) => {
        draft.broadcastDetail = action.payload.data;
      });
    },
    [BROADCAST.GET_BROADCAST_DETAIL_INFO_FAILED]: (state, action) => {
      console.log('GET_BROADCAST_DETAIL_INFO_FAILED =>', action.payload);
      return produce(state, (draft) => {
      });
    },
    [BROADCAST.REQUEST_THIS_MONTH_BROADCAST_SUCCESS]: (state, action) => {
      console.log('REQUEST_THIS_MONTH_BROADCAST_SUCCESS =>', action.payload);
      return produce(state, (draft) => {
        draft.monthlyBroadcastsMarkedData = action.payload.data.markedData;
        draft.monthlyBroadcastsTodayBroadcast =
          action.payload.data.todayBroadcast;
        draft.scheduleRendering = Math.random();
      });
    },
    [BROADCAST.REQUEST_SPECIFIC_MONTH_BROADCAST_SUCCESS]: (state, action) => {
      console.log('REQUEST_SPECIFIC_MONTH_BROADCAST =>', action.payload.data);
      return produce(state, (draft) => {
        if (action.payload.data) {
          draft.monthlyBroadcastsMarkedData = action.payload.data;
          draft.scheduleRendering = Math.random();
        }
      });
    },
    [BROADCAST.REQUEST_SPECIFIC_DAY_BROADCAST_SUCCESS]: (state, action) => {
      console.log('REQUEST_SPECIFIC_DAY_BROADCAST_SUCCESS =>', action.payload);
      return produce(state, (draft) => {
        draft.monthlyBroadcastsTodayBroadcast = action.payload.data;
        draft.scheduleRendering = Math.random();
      });
    },
    [BROADCAST.REQUEST_THIS_MONTH_ALL_BROADCAST_SUCCESS]: (state, action) => {
      console.log(
        'REQUEST_THIS_MONTH_ALL_BROADCAST_SUCCESS',
        action.payload.data.markedData,
      );
      return produce(state, (draft) => {
        draft.monthlyAllBroadcastsMarkedDate = action.payload.data.markedData;
        if (
          action.payload.data.todayBroadcast &&
          action.payload.data.todayBroadcast.length !== 0
        ) {
          draft.monthlyAllBroadcastsTodayBroadcast =
            action.payload.data.todayBroadcast;
        }
        draft.scheduleFirstRendering = false;
      });
    },
    [BROADCAST.CHANGE_PRODUCT_PRICE]: (state, action) => {
      return produce(state, (draft) => {
        draft.priceInfo = action.payload;
      });
    },
    [BROADCAST.REQUEST_SPECIFIC_MONTH_ALL_BROADCAST_SUCCESS]: (
      state,
      action,
    ) => {
      console.log(
        'REQUEST_SPECIFIC_MONTH_ALL_BROADCAST_SUCCESS=>',
        action.payload.data,
      );
      return produce(state, (draft) => {
        draft.monthlyAllBroadcastsMarkedDate = action.payload.data;
        draft.scheduleRendering = Math.random();
      });
    },
    [BROADCAST.REQUEST_SPECIFIC_DAY_ALL_BROADCAST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        if (action.payload.data.length !== undefined) {
          draft.monthlyAllBroadcastsTodayBroadcast = action.payload.data;
        } else {
          draft.monthlyAllBroadcastsTodayBroadcast = [];
        }
      });
    },
    [BROADCAST.CHANGE_PERIOD]: (state, action) => {
      return produce(state, (draft) => {
        draft.period = action.payload;
      });
    },
    [BROADCAST.REQUEST_SELLER_THIS_WEEK_BROADCAST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.sellerTabWeekBroadcastsMarkedData =
          action.payload.data.markedData;
        draft.sellerTabTodayBroadcasts = action.payload.data.todayBroadcasts;
        draft.sellerTabAppointedBroadcasts =
          action.payload.data.appointedBroadcasts;
      });
    },
    [BROADCAST.DELETE_STEP_ONE_TWO_BROADCAST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.deleteStepOneTwoBroadcast = true;
      });
    },
    [BROADCAST.CHANGE_STATUS]: (state, action) => {
      return produce(state, (draft) => {
        draft.deleteStepOneTwoBroadcast = false;
      });
    },
    [BROADCAST.REQUEST_SELLER_INFO_FOR_VIEWER_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.sellerInfo = action.payload.data;
        draft.LiveNotice = action.payload.data.LiveNotice;
      });
    },
    [BROADCAST.REQUEST_SELLER_PAGE_ALARM_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        for (let i = 0; i < action.payload.data.length; i++) {
          if (action.payload.data[i].length !== 0) {
            draft.sellerPageAlarm[i] = true;
          } else draft.sellerPageAlarm[i] = false;
        }
      });
    },
    [BROADCAST.UPDATE_SELLER_PAGE_ALARM_STATE]: (state, action) => {
      return produce(state, (draft) => {
        draft.sellerPageAlarm[action.payload.index] = action.payload.state;
      });
    },
    [BROADCAST.REQUEST_SELLER_PAGE_PASSED_BROADCAST_SUCCESS]: (
      state,
      action,
    ) => {
      return produce(state, (draft) => {
        draft.passedBroadcasts = action.payload.data;
      });
    },
    [BROADCAST.REQUEST_SELLER_PAGE_PRODUCTS_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.products = action.payload.data;
      });
    },
    [BROADCAST.CHANGE_BROADCAST_COMMENTS]: (state, action) => {
      return produce(state, (draft) => {
        draft.broadcastComments = [];
      });
    },
    [BROADCAST.CHANGE_INIT_STATE]: (state, action) => {
      // Redux 초기화
      const draft = createDraft(initialState);
      return finishDraft(draft);
    },
  },
  initialState,
);

export default broadcast;
