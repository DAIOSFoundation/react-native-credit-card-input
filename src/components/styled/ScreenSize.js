import {Dimensions} from 'react-native';

// 렌더링을 위한 스크린 사이즈를 받아옴
export const screenWidth = Dimensions.get('window').width; //full width
export const screenHeight = Dimensions.get('window').height; //full height
let longerSize;
screenWidth - screenHeight > 0
  ? (longerSize = screenHeight)
  : (longerSize = screenWidth);
export const screenSize = longerSize;
