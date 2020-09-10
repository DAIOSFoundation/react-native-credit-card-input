// 메인화면 방송리스트 요청
import RNFetchBlob from 'rn-fetch-blob';
import {headers, urls} from '../reqConf';

// 검색 기능 - (type seller nickName)
export const getSearchSellerInfo = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.search + `?name=${param.nickName}`,
      headers(param.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getSearchSellerInfo error => ', error);
  }
};
