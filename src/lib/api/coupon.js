import RNFetchBlob from 'rn-fetch-blob';
import {headers, urls} from '../reqConf';

export const requestGetCoupon = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.users + `${param.userId}/coupons`,
      headers(param.jwtToken),
    );
    console.log('requestGetCoupon result=>', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestGetCoupon error => ', error);
  }
};
