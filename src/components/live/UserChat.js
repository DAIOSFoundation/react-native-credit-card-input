import React from 'react';

// Styled Component
import {ScrollView, ViewRow} from '../styled/View';
import {Image} from '../styled/Image';
import {Text} from '../styled/Text';

// 라이브 유저 채팅
// urlPath : 유저 이미지 경로
// nickName : 유저 닉네임
// chat : 유저 채팅

const UserChat = (props) => {
  return (
    <ViewRow marginTop={5} marginBottom={5}>
      <Image
        width={20}
        height={20}
        marginRight={10}
        source={{uri: props.urlPath}}
      />
      <Text ftWhite marginRight={10}>
        {props.nickName}
      </Text>
      <Text ftWhite bold style={{flex: 1, flexWrap: 'wrap'}}>
        {props.chat}
      </Text>
    </ViewRow>
  );
};

export default UserChat;
