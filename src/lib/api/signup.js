import RNFetchBlob from 'rn-fetch-blob';
import {headers, urls, imgHeaders, objToFormData} from '../reqConf';

//닉네임 조회
export const checkNick = async (nick) => {
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('GET', urls.authsNick + nick, headers(''));
    console.log('checkNick result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('checkNick error => ', error);
  }
};

// 시청자 회원가입 요청
export const signupViewer = async (body) => {
  // console.log('body',body)
  console.log(objToFormData(body));
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('POST', urls.usersViewer, imgHeaders(''), objToFormData(body));
    console.log('signupViewer result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('signupViewer error => ', error);
  }
};

// 셀러 회원가입 요청
export const signupSeller = async (body) => {
  // console.log('body',body)
  console.log(objToFormData(body));
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('POST', urls.usersSeller, imgHeaders(''), objToFormData(body));
    console.log('signupSeller result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('signupSeller error => ', error);
  }
};

//인스타그램 아이디 조회
export const igUserName = async (params) => {
  console.log(params);
  try {
    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch(
      'GET',
      urls.authChannelUserName +
        params.platform +
        '/username/' +
        params.channelName,
      headers(''),
    );
    console.log('igUserName result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('igUserName error => ', error);
  }
};

// 회원가입 ARS 휴대폰 본인인증 1
export const phoneAuthOne = async (params) => {
  console.log('phoneAuthOne params => ', params);
  try {
    const body = {
      name: params.name,
      birthday: params.birthday,
      phoneNumber: params.phoneNumber,
      gender: params.gender,
      nation: params.nation,
      telecomCode: params.telecomCode,
    };

    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('POST', urls.phoneAuthOne, headers(''), JSON.stringify(body));
    console.log('phoneAuthOne result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('phoneAuthOne error => ', error);
  }
};

// 회원가입 ARS 휴대폰 본인인증 2
export const phoneAuthTwo = async (params) => {
  console.log('phoneAuthTWO params => ', params);
  try {
    const body = {
      name: params.name,
      birthday: params.birthday,
      phoneNumber: params.phoneNumber,
      gender: params.gender,
      nation: params.nation,
      telecomCode: params.telecomCode,
      authNumber: params.authNumber,
      phoneAuthId: params.phoneAuthId,
    };

    const result = await RNFetchBlob.config({
      trusty: true,
    }).fetch('POST', urls.phoneAuthTwo, headers(''), JSON.stringify(body));
    console.log('phoneAuthTWO result => ', result);
    return JSON.parse(result.data);
  } catch (error) {
    console.log('phoneAuthTWO error => ', error);
  }
};
