import React from 'react';
import {Text} from '../styled/Text';
import {ViewRow, View} from '../styled/View';
import {ButtonBorderRadius, Button} from '../styled/Button';
import {Image} from '../styled/Image';
import SellerProfile from './SellerProfile';

// 추천 라이브 셀러와 셀러 프로필
// id : 구분 id onPress , onPressFollow 리턴에 포함
// userName : 유저이름
// userDecription : 유저설명
// urlPath : 이미지 경로
// onPress : 카드 터치 리턴 받을 함수
// onPressFollow : 팔로우 터치 리턴 받을 함수

{
  /* <RecommendProfile
    id={'unikey'}
    userName={'최상호'}
    urlPath={''}
    userDecription={'안녕하세요'}
    onPress={onPressRecommend}
    onPressFollow={onPressFollow}/> 
*/
}
const RecommendProfile = (props) => {
  const onPress = () => {
    props.onPress(props.id);
  };

  const onPressFollow = () => {
    props.onPressFollow(props.id);
  };
  return (
    <ButtonBorderRadius
      height={80}
      bgLightNavy
      marginTop={5}
      marginBottom={5}
      paddingLeft={15}
      paddingRight={15}
      width={'100%'}
      justifyContent={'space-between'}
      borderRadius={10}
      onPress={onPress}>
      <ViewRow>
        <SellerProfile size={58} url={props.urlPath} disabled />
        <View
          marginLeft={10}
          marginTop={10}
          marginBottom={10}
          justifyContent={'space-between'}>
          <Text ftWhite>{props.userName}</Text>
          <Text ftLightGray bold ftSmall>
            {props.userDecription}
          </Text>
        </View>
      </ViewRow>
      <View width={50} justifyContent={'center'} alignItems={'flex-end'}>
        <Button onPress={onPressFollow}>
          <Image
            width={25}
            height={25}
            resizeMode={'stretch'}
            source={require('../../assets/profile/icon_follow_normal.png')}
          />
        </Button>
      </View>
    </ButtonBorderRadius>
  );
};

export default RecommendProfile;
