import RNFetchBlob from 'rn-fetch-blob';
import {headers, urls} from '../reqConf';

// Dple 결제 요청
export const postDplePayment = async (param) => {
  const body = {
    productName: param.productName,
    productPrice: param.productPrice,
    payPrice: param.payPrice,
    userId: param.userId,
  };

  const result = await RNFetchBlob.config({
    trusty: true,
  }).fetch(
    'POST',
    urls.dplePayment,
    headers(param.jwtToken),
    JSON.stringify(body),
  );

  return JSON.parse(result.data);
};
