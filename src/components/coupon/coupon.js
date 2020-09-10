import React from 'react';
import {Text} from '../styled/Text';
import {ViewRadiusCustom, ViewBorderRow, View} from '../styled/View';
import {screenWidth} from '../styled/ScreenSize';
import {ImageCirclePreview} from '../styled/Image';
import Moment from 'moment';

const Coupon = (props) => {
  return props.coupons.map((item, index) => (
    <ViewBorderRow
      marginLeft={15}
      marginRight={15}
      width={screenWidth - 30}
      height={160}
      marginBottom={7}>
      <ViewRadiusCustom
        borderColor={'brDarkGray'}
        bgWhite
        width={screenWidth - 130}
        brIceBlue
        borderWidth={1}>
        <View marginLeft={14} marginRight={14} marginTop={13}>
          <ViewBorderRow marginBottom={5}>
            <Text fontSize={30} ftTheme>
              {item.couponValue}
            </Text>
            {item.couponType === 'fixed' ? (
              <Text fontSize={18} ftTheme paddingTop={10}>
                원 할인
              </Text>
            ) : (
              <Text fontSize={18} ftTheme paddingTop={10}>
                % 할인
              </Text>
            )}
          </ViewBorderRow>
          <Text fontSize={16} marginBottom={10}>
            {item.couponName}
          </Text>
          <Text fontSize={13} marginBottom={3} ftLightWhiteGray>
            {item.broadcastInfo !== undefined &&
            item.broadcastInfo.productName !== undefined
              ? '해당 상품 :' + item.broadcastInfo.productName
              : '모든 상품 적용'}
          </Text>
          <Text fontSize={13} ftLightWhiteGray>
            유효 기간 : {Moment(item.endedAt).format(' ~ YY/MM/DD HH시 MM분')}
          </Text>
        </View>
      </ViewRadiusCustom>
      <View
        bgDarkGrayBlue
        width={screenWidth - 313}
        justifyContent={'center'}
        alignItems={'center'}>
        <ImageCirclePreview
          size={40}
          brTheme
          borderWidth={1}
          source={
            item.sellerInfo !== undefined &&
            item.sellerInfo.profileImageUrl !== undefined
              ? {uri: item.sellerInfo.profileImageUrl}
              : require('../../assets/myinfo/mimi.png')
          }
          marginBottom={4}
        />
        <Text bold ftWhite fontSize={13}>
          {item.sellerInfo !== undefined &&
          item.sellerInfo.nickName !== undefined
            ? item.sellerInfo.nickName
            : '셀러비전'}
        </Text>
      </View>
    </ViewBorderRow>
  ));
};
export default Coupon;
