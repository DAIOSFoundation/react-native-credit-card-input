import RNFetchBlob from 'rn-fetch-blob';
import {urls, headers} from '../reqConf';

// 나만의 맞춤 추천 상품 조회
export const recommendProducts = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('GET', urls.productsSamples, headers(param));
    console.log('recommendProducts result => ', result);
    return JSON.parse(result.data);
  } catch (e) {
    console.log('recommendProducts error => ', e);
  }
};

// 나만의 맞춤 추천 상품 상세 조회
export const recommendProductsDetail = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.productsSamplesDetail + `/${param.productId}`,
      headers(param.jwtToken),
    );
    console.log('recommendProductsDetail result => ', result);
    return JSON.parse(result.data);
  } catch (e) {
    console.log('recommendProductsDetail error => ', e);
  }
};
