import {expectCodeIsEqual} from 'react-native/ReactCommon/hermes/inspector/tools/msggen/src/TestHelpers';
import RNFetchBlob from 'rn-fetch-blob';
import {headers, urls, imgHeaders, objToFormData} from '../reqConf';

//////////////// 일반인의 방송정보 호출 및 수정 ////////////////
// 메인화면 방송리스트 요청
export const getBroadcasts = async () => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('GET', urls.broadcasts);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getBroadcasts error => ', error);
  }
};

// 방송 코멘트 호출
export const getBroadcastsComments = async (broadcastId) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('GET', urls.broadcasts + `/${broadcastId}/igComments`);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getBroadcasts error => ', error);
  }
};

// 셀러 리뷰
export const patchBroadcastsReviews = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      urls.broadcasts + `/${param.broadcastId}/reviews`,
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('patchBroadcastsReviews error => ', error);
  }
};

// 셀러 리뷰 동영상 업로드
export const patchReviewVideo = async (param) => {
  try {
    console.log('patchReviewVidoe->>>>>>>>>', param);
    const result = await RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'PATCH',
        urls.broadcasts + `/${param.broadcastId}/reviewVideos`,
        imgHeaders(param.jwtToken),
        objToFormData(param.video),
      )
      .uploadProgress({interval: 250}, (written, total) => {
        //업로드
        if (
          typeof param.dispatch !== 'undefined' &&
          typeof param.actions !== 'undefined'
        ) {
          param.dispatch(param.actions([param.idx, written / total]));
        }
      })
      .progress({count: 10}, (received, total) => {
        //다운로드??
        if (
          typeof param.dispatch !== 'undefined' &&
          typeof param.actions !== 'undefined'
        ) {
          param.dispatch(param.actions([param.idx, received / total]));
        }
      });
    return JSON.parse(result.data);
  } catch (error) {
    console.log('patchReviewVideo error => ', error);
  }
};

// 셀러 방송 끝나고 동영상 업로드
export const patchSellerBroadcastVideo = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'PATCH',
        urls.broadcasts + `/${param.broadcastId}/recordedBroadcastGcp`,
        imgHeaders(param.jwtToken),
        objToFormData(param.video),
      )
      .uploadProgress({interval: 250}, (written, total) => {
        //업로드
        if (
          typeof param.dispatch !== 'undefined' &&
          typeof param.actions !== 'undefined'
        ) {
          param.dispatch(param.actions([param.idx, written / total]));
        }
      })
      .progress({count: 10}, (received, total) => {
        //다운로드??
        if (
          typeof param.dispatch !== 'undefined' &&
          typeof param.actions !== 'undefined'
        ) {
          param.dispatch(param.actions([param.idx, received / total]));
        }
      });
    return JSON.parse(result.data);
  } catch (error) {
    console.log('patchSellerBroadcastVideo error => ', error);
  }
};

// 셀러 방송 끝나고 동영상 업로드 삭제
export const deleteSellerRecordedVideo = async (params) => {
  console.log('deleteSellerRecordedVidoe', params);
  const jwtToken = params.jwtToken;
  const selectedBroadcastId = params.selectedBroadcastId;
  const recordedBroadcastGcpId = params.recordedBroadcastGcpId;
  const result = await RNFetchBlob.config({
    trusty: true,
  }).fetch(
    'DELETE',
    `${urls.broadcasts}/${selectedBroadcastId}/recordedBroadcastGcp/${recordedBroadcastGcpId}`,
    headers(jwtToken),
  );
  return JSON.parse(result.data);
};

// 셀러 방송 끝나고 업로드한 동영상 가져오기
export const getSellerRecordedVideo = async (params) => {
  const jwtToken = params.jwtToken;
  const result = await RNFetchBlob.config({
    trusty: true,
  }).fetch(
    'GET',
    `${urls.broadcasts}/${params.selectedBroadcastId}/getBroadcastGcp`,
    headers(jwtToken),
  );
  return JSON.parse(result.data);
};

// 셀러 방송 끝나고 업로드 한 동영상 유튜브 업로드
export const postSellerRecordedVideo = async (params) => {
  const jwtToken = params.jwtToken;

  const body = {
    pk: params.pk,
    title: '텍스트 타이틀입니다.',
    description: '테스트 설명입니다.',
    privacyStatus: 'unlisted',
    recordedVideoUrl: params.recordedVideoUrl,
    callBackUrl: urls.broadcasts + `/${params.pk}/uploaded`,
  };
  const result = await RNFetchBlob.config({
    trusty: true,
  }).fetch('POST', urls.youtube, headers(jwtToken), JSON.stringify(body));
  return JSON.parse(result.data);
};

// 유튜브에 업로드한 방송 status 7로 변경
export const patchSellerBroadcastStatus = async (params) => {
  const jwtToken = params.jwtToken;
  const result = await RNFetchBlob.config({
    trusty: true,
  }).fetch(
    'PATCH',
    urls.broadcasts + `/${params.broadcastId}/uploadingVideo`,
    headers(jwtToken),
  );
  return JSON.parse(result.data);
};

// 셀러 리뷰 동영상 삭제
export const deleteReviewVideo = async (params) => {
  const jwtToken = params.jwtToken;
  const selectedBroadcastId = params.selectedBroadcastId;
  const reviewVideoId = params.reviewVideoId;
  const result = await RNFetchBlob.config({
    trusty: true,
  }).fetch(
    'DELETE',
    `${urls.broadcasts}/${selectedBroadcastId}/reviewVideos/${reviewVideoId}`,
    headers(jwtToken),
  );
  return JSON.parse(result.data);
};

// 셀러 리뷰 사진 업로드
export const patchReviewPhoto = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'PATCH',
        urls.broadcasts + `/${param.broadcastId}/reviewImages`,
        imgHeaders(param.jwtToken),
        objToFormData(param.image),
      )
      .uploadProgress({interval: 250}, (written, total) => {
        //업로드
        if (
          typeof param.dispatch !== 'undefined' &&
          typeof param.actions !== 'undefined'
        ) {
          param.dispatch(param.actions([param.idx, written / total]));
        }
      })
      .progress({count: 10}, (received, total) => {
        //다운로드??
        if (
          typeof param.dispatch !== 'undefined' &&
          typeof param.actions !== 'undefined'
        ) {
          param.dispatch(param.actions([param.idx, received / total]));
        }
      });
    return JSON.parse(result.data);
  } catch (error) {
    console.log('patchReviewPhoto error => ', error);
  }
};

// 셀러 리뷰 사진 삭제
export const deleteReviewPhoto = async (params) => {
  const jwtToken = params.jwtToken;
  const selectedBroadcastId = params.selectedBroadcastId;
  const reviewImageId = params.reviewImageId;
  const result = await RNFetchBlob.config({
    trusty: true,
  }).fetch(
    'DELETE',
    `${urls.broadcasts}/${selectedBroadcastId}/reviewImages/${reviewImageId}`,
    headers(jwtToken),
  );
  console.log('result.data => ', result.data);
  return JSON.parse(result.data);
};

// 셀러의 라방 시나리오 임시 저장
export const patchTempScenario = async (params) => {
  console.log('patchTempScenario => ', params);
  try {
    let jwtToken;
    let selectedBroadcastId;
    let rest;
    ({jwtToken, selectedBroadcastId, ...rest} = {...params});
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      urls.broadcasts + `/${selectedBroadcastId}/tempReviews`,
      headers(jwtToken),
      JSON.stringify(rest),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('patchScenario error => ', error);
  }
};

// 셀러의 라방 시나리오 저장
export const patchScenario = async (params) => {
  try {
    let jwtToken;
    let selectedBroadcastId;
    let rest;
    ({jwtToken, selectedBroadcastId, ...rest} = {...params});
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      urls.broadcasts + `/${selectedBroadcastId}/reviews`,
      headers(jwtToken),
      JSON.stringify(rest),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('patchScenario error => ', error);
  }
};

// 방송중 구매 정보 요청
export const getBroadcastsProduct = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcasts +
        `/${params.broadcastId}/products` +
        `/${params.productId}/buys`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getBroadcasts error => ', error);
  }
};

//////////////// 셀러의 방송정보 생성 및 수정 ////////////////
export const postBroadcast = async (params) => {
  try {
    const body = {
      productId: params.productId,
    };
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'POST',
      urls.broadcasts,
      headers(params.token),
      JSON.stringify(body),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('postBroadcast error => ', error);
  }
};

export const getUsersBroadcasts = async (token) => {
  try {
    console.log('getUsersBroadcasts => ', token);
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('GET', urls.usersBroadcasts, headers(token));
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getUserBroadcasts error => ', error);
  }
};

export const getUsersBroadcastsById = async (params) => {
  try {
    console.log('getUsersBroadcastsById => ', params);
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      `${urls.usersBroadcasts}/${params.selectedBroadcastId}`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getUsersBroadcastsById error => ', error);
  }
};

export const getUsersBroadcastsByIdStatus = async (params) => {
  try {
    console.log('getUsersBroadcastsByIdStatus => ', params);
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      `${urls.usersBroadcasts}/${params.selectedBroadcastId}/status`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getUsersBroadcastsByIdStatus error => ', error);
  }
};

export const patchContractEmail = async (params) => {
  try {
    console.log('patchContractEmail => ', params);
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      `${urls.broadcasts}/${params.broadcastId}/email`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('patchContractEmail error => ', error);
  }
};

export const patchReady = async (params) => {
  try {
    console.log('patchReady => ', params);
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      `${urls.broadcasts}/${params.broadcastId}/ready`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('patchReady error => ', error);
  }
};

export const patchIg = async (params) => {
  try {
    console.log('patchIg => ', params);
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      `${urls.broadcasts}/${params.selectedBroadcastId}/ig`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('patchIg error => ', error);
  }
};

// 메인화면 라이브 예고 정보
export const getBroadcastsPreview = async () => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('GET', urls.broadcastsPreview);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getBroadcastsPreview error => ', error);
  }
};

// 메인화면 라이브 예고 상세 정보
export const getBroadcastsPreviewDetail = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcastsPreviewDetail + `/${param.timezoneOffset}`,
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getBroadcastsPreviewDetail error => ', error);
  }
};

// 라이브 예고 알람 요청
export const requestBroadcastsPreviewAlarm = async (param) => {
  try {
    const body = {
      assignedType: param.assignedType,
      assignedId: param.assignedId,
    };

    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'POST',
      urls.pushNotifications,
      headers(param.jwtToken),
      JSON.stringify(body),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getBroadcastsPreviewRequestAlarm error => ', error);
  }
};

// 라이브 예고 알람 취소
export const deleteBroadcastsPreviewAlarm = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'DELETE',
      urls.pushNotifications + `/broadcasts/${param.broadcastId}`,
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('deleteBroadcastsPreviewAlarm error => ', error);
  }
};

// 라이브 예고 방송 미리댓글 호출
export const getBroadcastsPrevComments = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcasts + `/${param.broadcastId}/prevComments`,
      headers(''),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getBroadcastsPrevComments error => ', error);
  }
};

// 미리 댓글 페이지 - 상품에 대한 댓글 등록
export const insertPreviewProductComment = async (param) => {
  try {
    const body = {
      content: param.content,
    };
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'POST',
      urls.broadcasts + `/${param.broadcastId}/prevComments`,
      headers(param.jwtToken),
      JSON.stringify(body),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('insertPreviewProductComment error => ', error);
  }
};

// 미리 댓글 페이지 - 상품에 대한 대댓글 등록
export const insertPreviewProductSubComment = async (param) => {
  try {
    const body = {
      content: param.content,
      prevCommentId: param.prevCommentId,
    };
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'POST',
      urls.broadcasts + `/${param.broadcastId}/prevComments`,
      headers(param.jwtToken),
      JSON.stringify(body),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('insertPreviewProductSubComment error => ', error);
  }
};

// 미리 댓글 페이지 - 상품에 대한 댓글 삭제
export const deletePreviewProductComment = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      urls.broadcasts +
        `/${param.broadcastId}/prevComments/${param.prevCommentId}`,
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('deletePreviewProductComment error => ', error);
  }
};

// 미리 댓글 페이지 - 상품에 대한 대댓글 삭제
export const deletePreviewProductSubComment = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      urls.broadcasts +
        `/${param.broadcastId}/prevComments/${param.prevCommentId}/subComments/${param.subCommentId}`,
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('deletePreviewProductSubComment error => ', error);
  }
};

// 방송 전체화면 진입 시 해당하는 방송 정보 가져오기
export const getBroadcastDetailInfo = async (id) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('GET', urls.broadcasts + `/${id}/detail`, headers(''));
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getBroadcastDetailInfo error => ', error);
  }
};

// 이달 방송 데이터
export const requestThisMonthBroadcast = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcasts +
        `/liveSchedules/date/${params.changeTimeStamp}/timezoneOffset/${params.timezoneOffset}`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestThisMonthBroadcast error =>', error);
  }
};

// 특정 달 방송 데이터
export const requestSpecificMonthBroadcast = async (paramsForSpecific) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcasts +
        `/liveSchedules/month/${paramsForSpecific.changeTimeStamp}`,
      headers(paramsForSpecific.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestSpecificMonthBroadcast error =>', error);
  }
};

//특정 일 방송 데이터
export const requestSpecificDayBroadcast = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcasts +
        `/liveSchedules/day/${params.timeStamp}/timezoneOffset/${params.timezoneOffset}`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestSpecificDayBroadcast error =>', error);
  }
};

export const requestThisMonthAllBroadcast = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcasts +
        `/allLiveSchedules/date/${params.timeStamp}/timezoneOffset/${params.timezoneOffset}`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestThisMonthAllBroadcast error =>', error);
  }
};

export const requestSpecificMonthAllBroadcast = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcasts + `/allLiveSchedules/month/${params.timeStamp}`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestSpecificMonthAllBroadcast error =>', error);
  }
};

export const requestSpecificDayAllBroadcast = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcasts +
        `/allLiveSchedules/day/${params.timeStamp}/timezoneOffset/${params.timezoneOffset}`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestSpecificDayAllBroadcast error =>', error);
  }
};

export const requestSellerThisWeekBroadcast = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcasts + `/thisWeekLiveSchedules/date/${params.date}`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestSellerThisWeekBroadcast error =>', error);
  }
};

export const deleteStepOneTowBroadcast = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'DELETE',
      urls.broadcasts + `/broadcastId/${params.broadcastId}`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('deleteStepOneTowBroadcast error =>', error);
  }
};

export const requestSellerInfoForViewer = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcasts + `/sellerPageForViewer/sellerId/${params.sellerId}`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestSellerInfoForViewer error =>', error);
  }
};

export const requestSellerPageAlarm = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcasts + `/sellerPageAlarm/sellerId/${params.sellerId}`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestSellerPageAlarm error => ', error);
  }
};

export const requestSellerPagePassedBroadcast = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcasts +
        `/sellerPageForViewerPassedBroadcast/sellerId/${params.sellerId}`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestSellerPagePassedBroadcast error => ', error);
  }
};

export const requestSellerPageProducts = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcasts +
        `/sellerPageForViewerAllProduct/sellerID/${params.sellerId}`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestSellerPageProducts error =>', error);
  }
};

// 라이브 영상 업로드
export const postBroadcastUpload = async (params) => {
  try {
    const body = {
      igtvUrl: params.igtvUrl,
    };

    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      urls.broadcasts + `/${params.broadcastId}/igtvUrl`,
      headers(params.jwtToken),
      JSON.stringify(body),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestSellerPageProducts error =>', error);
  }
};
