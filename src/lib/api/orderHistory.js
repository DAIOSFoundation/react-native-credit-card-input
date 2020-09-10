import RNFetchBlob from 'rn-fetch-blob';
import {headers, urls} from '../reqConf';

export const requestGetOrderHistory = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.sampleOrderHistories +
        `/${params._id}/sampleProducts/${params.productId}`,
      headers(params.jwtToken),
    );
    console.log('requestGetOrderHistory =>', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestGetOrderHistory error => ', error);
  }
};

export const requestGetViewerOrderList = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('GET', urls.orderHistories, headers(params));
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestGetViewerOrderList error => ', error);
  }
};

export const requestOrderProductConfirm = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'PATCH',
      urls.orderHistories +
        `/${params.orderHistoryId}/orderDetailId/${params.orderDetailId}/itemStatus/${params.status}/confirm`,
      headers(params.jwtToken),
    );
  } catch (error) {
    console.log('requestOrderProductConfirm error => ', error);
  }
};

export const requestViewerOrderDetail = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.orderHistories +
        `/${params.orderHistoryId}/detailId/${params.detailId}`,
      headers(params.jwtToken),
    );
    return JSON.parse(result.data);
  } catch (error) {
    console.log('requestViewerOderDetail error => ', error);
  }
};
