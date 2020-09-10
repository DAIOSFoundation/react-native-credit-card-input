import RNFetchBlob from 'rn-fetch-blob';
import {headers, urls} from '../reqConf';

// 셀러 구매한 샘플 목록 조회
export const getSampleHistories = async (token) => {
  try {
    console.log('getSampleHistories input => ', token);
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('GET', urls.sampleOrderHistories, headers(token));
    console.log('getSampleHistories result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getSampleHistories error => ', error);
  }
};

// 셀러 구매 확정
export const patchProductsConfirm = async (params) => {
  try {
    console.log('patchProductsConfirm params => ', params);
    const token = params.token;
    const sampleOrderHistoryId = params.sampleOrderHistoryId;
    const _id = params._id;
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      `${urls.sampleOrderHistories}/${sampleOrderHistoryId}/products/${_id}/confirm`,
      headers(token),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('patchProductsConfirm error => ', error);
  }
};
