import {Platform} from 'react-native';
import {NaverLogin} from '@react-native-seoul/naver-login';

const naverAppKeys = {
  kConsumerKey: 'rge24yrfgm1zJJOFPheP',
  kConsumerSecret: '02wDFrEtnB',
  kServiceAppName: 'SellerVision',
}

const androidKeys = {...naverAppKeys};
const iosKeys = {
  ...naverAppKeys,
  kServiceAppUrlScheme: 'naversellervision' // only for iOS
};

export const initials = Platform.OS === 'ios' ? iosKeys : androidKeys;

export const naverLogin = async () => {
  return new Promise((resolve, reject) => {
    NaverLogin.login(initials, (err, token) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(token);
    });
  });
};

export const naverLogout = () => {
  NaverLogin.logout();
};
