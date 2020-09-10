import RNFetchBlob from 'rn-fetch-blob';

const host = 'https://dev-api.sellervision.net/v1';
// const host = 'http://192.168.0.101:80/v1'
// https://dev-api.sellervision.net/v1/imp/webHook
// const host = 'https://localhost/v1';
// https://192.168.1.19:443/v1 갤10 테스트폰 전용 포트
// http://192.168.0.77:80/v1' - 강혁 전용 아이피 지우지 말것 !!!

export const urls = {
  //oauth to jwt
  authsJWT: host + '/auths/jwt',
  authsNick: host + '/auths/nickName/',
  usersViewer: host + '/users/viewer',
  usersSeller: host + '/users/seller',
  authChannelUserName: host + '/auths/channels/',
  impConfirm: host + '/imp/confirm',
  broadcasts: host + '/broadcasts',
  usersBroadcasts: host + '/users/broadcasts',
  users: host + '/users/',
  productsSamples: host + '/products/samples',
  productsSamplesDetail: host + '/products',
  sampleOrderHistories: host + '/sampleOrderHistories',
  adminSampleOrderHistories: host + '/admins/sampleOrderHistories',
  orderHistories: host + '/orderHistories',
  broadcastsPreview: host + '/broadcasts/livePreviews/mains',
  broadcastsPreviewDetail: host + '/broadcasts/livePreviews/details',
  pushNotifications: host + '/pushNotifications',
  phoneAuthOne: host + '/auths/phones/possesses',
  phoneAuthTwo: host + '/auths/phones/occupancies',
  search: host + '/users/seller/search',
  youtube: 'http://ig.sellervision.net/v1/youtube/videos/',
  dplePayment: host + '/dple/payment',
  viewerBroadcast: 'http://ig.sellervision.net/v1/user-id/',
};

export const headers = (token) => {
  return {
    'Content-Type': 'application/json',
    'x-access-token': token,
  };
};

// export const tokenAndAuth = (token, authorization) => {
//   return {
//     'Content-Type': 'application/json',
//     'x-access-token': token,
//     authorization,
//   };
// };

export const imgHeaders = (token) => {
  return {
    'Content-Type': 'multipart/form-data',
    'x-access-token': token,
  };
};

export const objToQueryString = (obj) => {
  const keys = [];
  for (const key in obj) {
    keys.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keys.join('&');
};

export const objToFormData = (obj) => {
  const keys = [];
  for (const key in obj) {
    if (obj[key] !== null && typeof obj[key] !== undefined) {
      if (Array.isArray(obj[key])) {
        if (!obj[key].length) continue;
        keys.push({name: key, data: JSON.stringify(obj[key])});
      } else if (
        typeof obj[key] === 'object' &&
        obj[key].path !== undefined
      ) {
        keys.push({
          name: key,
          filename: obj[key].path.replace(/^.*[\\\/]/, ''),
          type: obj[key].mime,
          data: RNFetchBlob.wrap(obj[key].path),
        });
      } else {
        keys.push({name: key, data: String(obj[key])});
      }
    }
  }
  return keys;
};
