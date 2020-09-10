import RNFetchBlob from 'rn-fetch-blob';
import {headers, urls} from '../reqConf';

export const requestAddDelivery = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      urls.users + `${param.userId}/addresses`,
      headers(param.jwtToken),
      JSON.stringify(param.param),
    );
    console.log('requestAddDelivery result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestAddDelivery error => ', error);
  }
};

export const requestGetUserAddresses = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.users + `${param.userId}/addresses`,
      headers(param.jwtToken),
    );
    console.log('requestGetUserAddresses result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestGetUserAddresses error => ', error);
  }
};

export const getIsLandCheck = async (param) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.users + `${param.userId}/addresses/zipCodes/${param.zipCode}`,
      headers(param.jwtToken),
    );
    console.log('getIsLandCheckNewInput result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getIsLandCheckNewInput error => ', error);
  }
};
