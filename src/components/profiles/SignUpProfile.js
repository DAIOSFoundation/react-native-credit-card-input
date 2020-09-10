import React from 'react';
import {Text} from '../styled/Text';
import {View, ViewBorderRadius} from '../styled/View';
import {ImageCirclePreview, ImageAbsolute} from '../styled/Image';
import {isEmpty} from '../../utils/functions';
import SellerProfile from './SellerProfile';

// 회원가입 확인 프로필
// urlPath : 이미지 경로
// userName : 하단 유저 이름
// sellerCode : 셀로 코드

{
  /* <SignUpProfile
    urlPath={''}
    userName={'최상호'}
    sellerCode={'#121212'}/> */
}
const SignUpProfile = (props) => {
  return (
    <>
      <SellerProfile
        outLine={true}
        size={130}
        borderWidth={2}
        url={props.urlPath}
        disabled
      />
      {props.sellerCode ? (
        <Text ftWhite marginTop={10} textAlign={'center'}>
          {props.sellerCode}
        </Text>
      ) : null}
      <Text ftWhite ftLarge bold marginTop={10} textAlign={'center'}>
        {props.userName}
      </Text>
    </>
  );
};

export default SignUpProfile;
