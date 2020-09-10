import RNKakao from 'rn-kakao-login';

export const kakaoLogin = async () => {
  const kakaoToken = await RNKakao.login();
  return kakaoToken;
};

export const kakaoLogOut = async () => {
  RNKakao.logout();
};
