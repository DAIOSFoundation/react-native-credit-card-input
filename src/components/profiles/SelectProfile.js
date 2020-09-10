import React from 'react';
import {Text} from '../styled/Text';
import {ViewRow, View} from '../styled/View';
import {ButtonBorderRadius, Button} from '../styled/Button';
import {Image} from '../styled/Image';
import SellerProfile from './SellerProfile';
import LiveProfile from './LiveProfile';

// 추천 라이브 셀러와 셀러 프로필
// id : 구분 id onPress , onPressFollow 리턴에 포함
// userName : 유저이름
// userDecription : 유저설명
// urlPath : 이미지 경로
// onPress : 카드 터치 리턴 받을 함수
// onPressFollow : 팔로우 터치 리턴 받을 함수

{
  /* <SelectProfile
    id={'unikey'}
    userName={'최상호'}
    urlPath={''}
    userDecription={'안녕하세요'}
    onPress={onPressRecommend}
    onPressFollow={onPressFollow}/>
*/
}

const SelectProfile = (props) => {
  const onPress = (data) => {
    props.onPress(data);
  };

  const bgColor = props.bgColor || {bgDarkNavy: true};

  return (
    <ButtonBorderRadius
      height={70}
      {...bgColor}
      paddingLeft={15}
      paddingRight={15}
      width={'100%'}
      justifyContent={'space-between'}
      onPress={(data) => onPress(data)}>
      <ViewRow alignItems={'center'}>
        {!props.isLive ? (
          <SellerProfile
            width={'15%'}
            size={50}
            outLine={true}
            outBorderColor={props.outBorderColor}
            urlPath={props.urlPath}
            disabled
          />
        ) : (
          <LiveProfile urlPath={props.urlPath} size={50} isLive />
        )}

        <View
          width={'78%'}
          marginLeft={10}
          marginTop={10}
          marginBottom={10}
          justifyContent={'space-between'}>
          <Text bold ftWhite>
            {props.userName}
          </Text>
          <Text ftLightGray bold ftSmall numberOfLines={1}>
            {props.userDecription}
          </Text>
        </View>
        <View width={'7%'} justifyContent={'center'} alignSelf={'center'}>
          <Image
            width={18}
            height={18}
            resizeMode={'stretch'}
            source={require('../../assets/profile/icon_small_more_grey.png')}
          />
        </View>
      </ViewRow>
    </ButtonBorderRadius>
  );
};

export default SelectProfile;
