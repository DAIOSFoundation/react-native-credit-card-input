import {Platform} from 'react-native';
import {screenHeight, screenWidth} from '../components/styled/ScreenSize';
import AsyncStorage from '@react-native-community/async-storage';
import {liveStatus} from './constants';

// 값이 비어있는지 확인 하는 함수
export const isEmpty = (data) => {
  if (
    typeof data === 'undefined' ||
    data === null ||
    data === '' ||
    data === 'NaN'
  ) {
    return true;
  } else {
    return false;
  }
};

//원 단위 미만 절삭, 천단위 콤마 함수
export const LocaleString = (data) => {
  if (!data) return 0;

  let convertData = 0;
  //안드로이드인 경우 toLocaleString() 함수 안됨
  if (Platform.OS === 'ios') {
    convertData = Math.floor(data).toLocaleString();
  } else {
    convertData = Math.floor(data)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  if (convertData === 'NaN') {
    return 0;
  }
  return convertData;
};

// Device 넓이 퍼센트 구하기
export const percentWidth = (percent) =>
  Math.round((percent * screenWidth) / 100);

// Device 높이 퍼센트 구하기
export const percentHeight = (percent) =>
  Math.round((percent * screenHeight) / 100);

// 주민번호 앞자리
export const regBirth = (birth) => {
  const reg = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;
  return reg.test(birth);
};

// 주민번호 뒷자리
export const regBirth2 = (birth2) => {
  const reg = /[1-4][0-9]{6}/;
  return reg.test(birth2);
};

// 폰번호 정규식
export const regPhone = (phone) => {
  const addCountry = '+82' + phone.substring(1);
  const reg = /\+\d{10,17}/;
  return reg.test(addCountry);
};

// 이메일 정규식
export const regEmail = (email) => {
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/m;
  return reg.test(email.trim());
};

// 숫자만 입력
export const regNumber = (number) => {
  const reg = /^[0-9\b]+$/;
  return reg.test(number);
};

// 16자리 문자열 4자리마다 공백 삽입 (카드 번호)
export const addSpace = (string) => {
  if (string) {
    return string.replace(/[^\dA-Z*]/g, '').replace(/(.{4})/g, '$1 ').trim()
  }
}

// 응답을 받을수없거나 S로 시작하지 않으면 에러이며 true 반환
export const checkResponseError = (payload) => {
  if (
    typeof payload.responseMessage === 'undefined' ||
    !payload.responseMessage.startsWith('S')
  ) {
    return true;
  } else {
    return false;
  }
};

export const isEmptyDataArray = (data) => {
  for (var i = 0; i < data.length; i++) {
    if (isEmpty(data[i])) return true;
  }
  return false;
};

//토큰 저장
export const multiSet = async (jwtToken, userId, type, firebaseToken) => {
  const array = [
    ['jwtToken', jwtToken],
    ['userId', userId],
    ['type', type],
    ['firebaseToken', firebaseToken],
  ];

  const filterNullArray = array.filter(el => el[1] !== null)
  
  try {
    console.log('filterNullArray: ', filterNullArray);
    await AsyncStorage.multiSet([...filterNullArray]);
  } catch (e) {
    //save error
    console.log(e)
    console.log('ViewerSignUpScreen multiSet error');
  }
};

// 해시 태그 배열을 String 형태로 반환
export const tagToString = (array) => {
  const stringLine = [];
  for (let i = 0; i < array.length; i++) {
    stringLine.push('#' + array[i]);
  }
  return stringLine.join(' ');
};

// 상품 태그 배열을 콤마와 스트링형태로 변환
// ex) ['치토스', '새우깡'] => '치토스','새우깡'
export const arrayToStringByComma = (array) => {
  const stringLine = [];
  for (let i = 0; i < array.length; i++) {
    if (i !== array.length - 1) {
      stringLine.push(array[i] + ',');
    } else {
      stringLine.push(array[i]);
    }
  }
  return stringLine.join('');
};

// 스트링을 , 기준으로 배열로 반환
// '치토스', '새우깡' => ['치토스', '새우깡']
export const stringToArrayByComma = (string) => {
  return string.split(',');
};

// 할인율 구하기 ex) price - 기본가 dis_price - 할인가
export const disRate = (price, dis_price) => {
  let result = 0;

  result = 100 - (dis_price / price) * 100;

  return Math.round(result);
};

export const formatDate = (date) => {
  const d = date === undefined ? new Date() : new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  const getDate = [year, month, day].join('-');
  return `${getDate}`;
};

export const formatDateAndTime = () => {
  const d = new Date();
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();
  let hour = d.getHours();
  let minutes = d.getMinutes();
  let secounds = d.getSeconds();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  if (hour.toString().length < 2) hour = `0${hour}`;
  if (minutes.toString().length < 2) minutes = `0${minutes}`;
  if (secounds.toString().length < 2) secounds = `0${secounds}`;

  const getDate = [year, month, day].join('-');
  const getTime = [hour, minutes, secounds].join(':');
  return `${getDate} ${getTime}`;
};

// 20191122013101 과 같은 형태로 년도+시간형태를 반환
export const tranDtime = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let secounds = date.getSeconds();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  if (hour.toString().length < 2) hour = `0${hour}`;
  if (minutes.toString().length < 2) minutes = `0${minutes}`;
  if (secounds.toString().length < 2) secounds = `0${secounds}`;

  // const getDate = [year, month, day].join();
  // const getTime = [hour, minutes, secounds].join();
  return year + month + day + hour + minutes + secounds;
};

// 년월일 포맷 - ex) 20200405
export const yymmdd = () => {
  let today = new Date();

  let year = today.getFullYear();
  let month = `${today.getMonth() + 1}`;
  let day = `${today.getDate()}`;

  // year = year.toString().substr(-2);

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return year + month + day;
};

export const formatYesterdayDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;
  const year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let secounds = date.getSeconds();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  if (hour.toString().length < 2) hour = `0${hour}`;
  if (minutes.toString().length < 2) minutes = `0${minutes}`;
  if (secounds.toString().length < 2) secounds = `0${secounds}`;

  const getDate = [year, month, day].join('-');
  const getTime = [hour, minutes, secounds].join(':');
  return `${getDate} ${getTime}`;
};

export const unixTimeStamp = () => Math.floor(Date.now());

// 휴대폰 앞자리 +82 -> 0 치환
export const changeFirstNumber = (data) => {
  return data.replace('+82', '0');
};

//day - 숫자값으로 반환되는 요일을 텍스트로 변경
//ex) 0 > 일요일 , 3 > 수요일
export const dayToText = (day) => {
  let array = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  return array[day];
};

// 요일 구하기
export const dayOfTheWeek = (data) => {
  let day = '';

  switch (data) {
    case 1:
      day = '월';
      break;
    case 2:
      day = '화';
      break;
    case 3:
      day = '수';
      break;
    case 4:
      day = '목';
      break;
    case 5:
      day = '금';
      break;
    case 6:
      day = '토';
      break;
    case 0:
      day = '일';
      break;
  }

  return day;
};

// 메인화면 방송 리스트 시간에 따른 가격 적용
export const timePrice = (startTime, endTime, livePrice, feedPrice, status) => {
  let timeCheck = new Date(new Date(endTime).getTime() + 3600 * 1000);

  if (
    (new Date(startTime) < new Date() && new Date() < timeCheck) ||
    liveStatus.includes(status)
  ) {
    // 라이브 조건 - 방송 시작 시간 < 현재 시간 < 방송 종료시간 + 1시간
    return livePrice;
  } else {
    return feedPrice;
  }
};

export const timeStatus = (startTime, endTime, status) => {
  let timeCheck = new Date(new Date(endTime).getTime() + 3600 * 1000);

  return (
    (new Date(startTime) < new Date() && new Date() < timeCheck) ||
    liveStatus.includes(status)
  );
};

// 캘린더 탭 - 라이브 특가 타이틀 시간에 따라 적용
export const broadcastStatusTitle = (
  startTime,
  endTime,
  livePrice,
  feedPrice,
  status,
) => {
  let timeCheck = new Date(new Date(endTime).getTime() + 3600 * 1000);

  if (
    (new Date(startTime) < new Date() && new Date() < timeCheck) ||
    liveStatus.includes(status)
  ) {
    // 라이브 조건 - 방송 시작 시간 < 현재 시간 < 방송 종료시간 + 1시간
    return true;
  } else {
    return false;
  }
};
