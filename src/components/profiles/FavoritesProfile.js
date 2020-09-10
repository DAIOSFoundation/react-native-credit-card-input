import React from 'react';
import {Text} from '../styled/Text';
import {ViewRow, View, ViewBorder} from '../styled/View';
import {Button} from '../styled/Button';
import {Image} from '../styled/Image';
import LiveProfile from './LiveProfile';

// 즐겨찾기 셀러와 셀러 프로필
// id : 구분 id onPress , onPressFollow 리턴에 포함
// userName : 유저이름
// userDecription : 유저설명
// urlPath : 이미지 경로
// onPress : 카드 터치 리턴 받을 함수
// isLive : 라이즈 중 여부 true, false

{
  /* <FavoritesProfile
id={'unikey'}
userName={'최상호'}
urlPath={''}
userDecription={'안녕하세요'}
onPress={onPress}
isLive={true}
/> */
}
const FavoritesProfile = (props) => {
  const onPress = () => {
    props.onPress(props.id);
  };
  return (
    <>
      <View width={'100%'}>
        <Button
          height={68}
          marginTop={5}
          justifyContent="space-between"
          marginBottom={5}
          paddingLeft={10}
          paddingRight={5}
          borderRadius={10}
          onPress={onPress}>
          <ViewRow>
            <LiveProfile
              id={props.id}
              urlPath={props.urlPath}
              isLive={props.isLive}
              size={50}
              disabled
            />
            <View
              marginLeft={10}
              marginTop={8}
              marginBottom={8}
              justifyContent="space-between">
              <Text ftWhite>{props.userName}</Text>
              <Text ftLightGray bold ftSmall>
                {props.userDecription}
              </Text>
            </View>
          </ViewRow>
          <View width={50}>
            <Image
              width={25}
              height={25}
              resizeMode={'stretch'}
              source={require('../../assets/profile/icon_small_more_grey.png')}
            />
          </View>
        </Button>
        <ViewBorder
          marginLeft={20}
          marginRight={20}
          borderTopWidth={2}
          brLightNavy
        />
      </View>
    </>
  );
};

export default FavoritesProfile;
