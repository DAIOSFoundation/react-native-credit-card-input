import RNFetchBlob from 'rn-fetch-blob';
import {headers, urls} from '../reqConf';

// 주문하기 페이지 - 사용자 기본 주소 요청
export const getUserAddress = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.users + `${param.userId}/orders/infos`,
      headers(param.jwtToken),
    );
    console.log('getUserAddress result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getUserAddress error => ', error);
  }
};

// 주문하기 페이지 - 결제하기 요청하기(추천 상품 페이지)
export const requestRecommendSamplePayment = async ({param, jwtToken}) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'POST',
      urls.sampleOrderHistories,
      headers(jwtToken),
      JSON.stringify(param),
    );
    console.log('requestRecommendSamplePayment result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestRecommendSamplePayment error => ', error);
  }
};

// 주문하기 페이지 - 결제하기 요청하기(라이브 & 녹방 시청 중 구매)
export const requestBroadcastProductPayment = async ({param, jwtToken}) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'POST',
      urls.orderHistories,
      headers(jwtToken),
      JSON.stringify(param),
    );
    console.log('requestBroadcastProductPayment result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestBroadcastProductPayment error => ', error);
  }
};
