import RNFetchBlob from 'rn-fetch-blob';
import {headers, urls} from '../reqConf';

// 신용카드 정보 받기
export const getCreditCardInfo = async (params) => {
  console.log('params ===> ', params)
  const jwtToken = params.jwtToken
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      `${urls.users}billCards/search`,
      headers(jwtToken)
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getCreditCardInfo error => ', error);
  }
};

// 정기결제 신용카드 정보 등록 요청
export const postCreditCard = async ({params}) => {
  console.log('reg params ===> ', params)
  const jwtToken = params.jwtToken
  body = {
    card_number: params.card_number,
    pwd_2digit: params.pwd_2digit,
    expiry: params.expiry,
    birth: params.birth,
  }
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'POST',
      `${urls.users}billCards`,
      headers(jwtToken),
      JSON.stringify(body)
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('postCreditCard error => ', error);
  }
};

// 정기결제 요청 (결제)
export const postRegularPayment = async (params) => {
  console.log('reg params ===> ', params)
  const jwtToken = params.jwtToken
  body = {
    orderHistoryId: params.orderHistoryId,
    productId: params.productId,
    billCardId: params.billCardId,
    month: params.month,
  }
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'POST',
      `${urls.users}billCards/recurringBilling`,
      headers(jwtToken),
      JSON.stringify(body)
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('postRegularPayment error => ', error);
  }
};

// 정기결제 신용카드 정보 삭제
export const deleteCreditCard = async (params) => {
  console.log('reg params ===> ', params);
  const jwtToken = params.jwtToken;
  const billCardId = params.billCardId;

  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'DELETE',
      `${urls.users}billCards/${billCardId}`,
      headers(jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('deleteCreditCard error => ', error);
  }
};