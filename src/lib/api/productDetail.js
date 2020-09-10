import RNFetchBlob from 'rn-fetch-blob';
import {headers, urls} from '../reqConf';

// 상품 상세정보 가져오기
export const getProductDetail = async (param) => {
  try {
    console.log('getProductDetail => ', param);
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.broadcasts + `/${param.broadcastId}/products/${param.productId}`,
      headers(''),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getProductDetail error => ', error);
  }
};
