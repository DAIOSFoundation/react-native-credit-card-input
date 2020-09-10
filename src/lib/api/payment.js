import RNFetchBlob from 'rn-fetch-blob';
import {headers, urls} from '../reqConf';

// todo 아임포트 결제내역 확인요청, jwt 헤더 넣어서 검증 추가할지 고려해볼것
export const iAmPortConfirm = async (body) => {
  try {
    const resp = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'POST',
      urls.impConfirm,
      headers(body.jwtToken),
      JSON.stringify(body.response),
    );
    console.log('response => ', JSON.parse(resp.data));
    return JSON.parse(resp.data);
  } catch (error) {
    console.log('iAmPortConfirm error => ', iAmPortConfirm);
  }
};
