import RNFetchBlob from 'rn-fetch-blob';
import {headers, urls, imgHeaders, objToFormData} from '../reqConf';

// userStory info 저장
export const getViewerBroadcastInfo = async (params) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('GET', `${urls.viewerBroadcast}${params.channelPk}/story`);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('getViewerBroadcasts error => ', error);
  }
};

