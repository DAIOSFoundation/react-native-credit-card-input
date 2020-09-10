import RNFetchBlob from 'rn-fetch-blob';
import {headers, imgHeaders, objToFormData, urls} from '../reqConf';

//oauth 로그인 요청
export const loginOauth = async (body) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('POST', urls.authsJWT, headers(''), JSON.stringify(body));
    console.log('loginOauth result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('loginOauth error => ', error);
  }
};

//내 정보 탭 요청
export const usersMyinfo = async (param) => {
  try {
    console.log('usersMyinfo', param);
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('GET', urls.users + param.userId, headers(param.jwtToken));
    console.log('usersMyinfo result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('usersMyinfo error => ', error);
  }
};

export const patchUsersProfileImage = async (params) => {
  try {
    console.log('patchUserProfileImage => ', params);
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      urls.users + params.userId + '/profileImage',
      imgHeaders(params.jwtToken),
      objToFormData(params.image),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('patchUsersProfileImage error => ', error);
  }
};

//셀러 환영 메시지 스크린 호출 여부, 셀러코드 발급 여부 확인
export const getUsersActivateCheck = async (param) => {
  try {
    console.log('getUsersMyActivateCheck', param);
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.users + `${param.userId}/activate-check`,
      headers(param.jwtToken),
    );
    console.log('getUsersMyActivateCheck result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getUsersMyActivateCheck error => ', error);
  }
};

//셀러 환영 메시지 확인
export const patchUsersActivateCheck = async (param) => {
  try {
    console.log('patchUsersActivateCheck', param);
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      urls.users + `${param.userId}/activate-check`,
      headers(param.jwtToken),
    );
    console.log('patchUsersActivateCheck result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('patchUsersActivateCheck error => ', error);
  }
};

//카트에 담기
export const putAddcart = async (param) => {
  try {
    console.log('putAddcart', param);
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PUT',
      urls.users + `/${param.userId}/carts`,
      headers(param.jwtToken),
      JSON.stringify(param.body),
    );
    console.log('putAddcart result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('putAddcart error => ', error);
  }
};

//카트 보기
export const getCart = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.users + `${param.userId}/carts`,
      headers(param.jwtToken),
    );
    console.log('getCart result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getCart error => ', error);
  }
};

// 카트에 담긴 상품 수량 조절
export const getBroadcastsCartProductAmount = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      urls.users + `${param.userId}` + '/carts',
      headers(param.jwtToken),
      JSON.stringify(param.body),
    );
    console.log('result', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getBroadcastsCartProductAmount error => ', error);
  }
};

// 카트에 담긴 상품 부분 제거
export const deleteCartProductPart = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'DELETE',
      urls.users +
      `${param.userId}` +
      '/carts/' +
      `${param.cartDetailId}` +
      '/items/' +
      `${param.itemId}`,
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('deleteBroadcastsCartProductPart error => ', error);
  }
};

// 카트에 담긴 상품 전체 제거
export const deleteCartProductAll = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'DELETE',
      urls.users + `${param.userId}` + '/carts/' + `${param.cartDetailId}`,
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('deleteBroadcastsCartProductAll error => ', error);
  }
};

export const changeFirebaseToken = async (param) => {
  try {
    console.log('changeFirebaseToken jwtToken : ', param.jwtToken);
    console.log(
      'changeFirebaseToken beforeFirebaseToken : ',
      param.beforeFirebaseToken,
    );
    console.log(
      'changeFirebaseToken afterFirebaseToken : ',
      param.afterFirebaseToken,
    );
    const body = {
      beforeFirebaseToken: param.beforeFirebaseToken,
      afterFirebaseToken: param.afterFirebaseToken,
    };
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      urls.users + param.userId + '/firebaseToken',
      headers(param.jwtToken),
      JSON.stringify(body),
    );

    console.log('changeFirebaseToken result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('changeFirebaseToken error => ', error);
  }
};

export const deleteFirebaseToken = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'DELETE',
      urls.users + param.userId + '/firebaseToken/' + param.firebaseToken,
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('deleteFirebaseToken error => ', error);
  }
};

export const getReservationBroadcasts = async (param) => {
  try {
    console.log('getReservationBroadcasts', param);
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.users + param.userId + '/livePreviews',
      headers(param.jwtToken),
    );
    console.log('getReservationBroadcasts result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getReservationBroadcasts error => ', error);
  }
};

// 자신의 정산 계좌 조회
export const getBankInfo = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.users + param.userId + '/adjustments/banks',
      headers(param.jwtToken),
    );
    console.log('getBankInfo result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getBankInfo error => ', error);
  }
};

// 자신의 정산 계좌 업데이트
export const updateBankInfo = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PUT',
      urls.users + param.data.userId + '/adjustments/banks',
      headers(param.data.jwtToken),
      JSON.stringify(param.body),
    );
    console.log('getBankInfo result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('updateBankInfo error => ', error);
  }
};

export const requestViewerInfo = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.users + param.userId + `/profile`,
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestViewerInfo error =>', error);
  }
};

export const updateViewerInfo = async (param) => {
  try {
    const body = {
      nickName: param.viewerNickName,
      email: param.viewerEmail,
      phone: param.viewerPhone,
    };
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      urls.users + param.userId + `/profile`,
      headers(param.jwtToken),
      JSON.stringify(body),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('updateViewerInfo =>', error);
  }
};

// 자신의 라이브 정산 정보 가져오기
export const getOwnLiveAdjustment = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.users + param.userId + '/adjustments/lives',
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getOwnLiveAdjustment error => ', error);
  }
};

// 자신의 1일 정산 정보 가져오기
export const getOwnDayAdjustment = async (param) => {
  console.log('getOwnDayAdjustment param => ', param);
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.users + param.userId + '/adjustments/days',
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getOwnDayAdjustment error => ', error);
  }
};

// 자신의 한달 정산 정보 가져오기
export const getOwnMonthAdjustment = async (param) => {
  console.log('getOwnMonthAdjustment param => ', param);
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.users + param.userId + '/adjustments/month',
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getOwnMonthAdjustment error => ', error);
  }
};

// 자신의 dpleJwtToken 값 가져오기
export const getOwnDpleJwtToken = async (param) => {
  console.log('getOwnDpleJwtToken param => ', param);
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.users + param.userId + '/dpleJwt',
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getOwnDpleJwtToken error => ', error);
  }
};

// 자신의 특정 날짜 정산 내역 가져오기
export const getSpecificDateAdjustment = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.users +
        param.userId +
        `/adjustments/startDate/${param.startDate}/endDate/${param.endDate}`,
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getSpecificDateAdjustment error => ', error);
  }
};
