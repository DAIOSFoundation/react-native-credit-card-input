import React from 'react';
// Styled Component
import {View} from '../../components/styled/View';
import LiveProfile from '../../components/profiles/LiveProfile';
import {Button} from '../../components/styled/Button';
// utils Import
import {isEmpty} from '../../utils/functions';

// 즐겨찾기 셀러 컴포넌트
const MainSubBroadcastForm = (props) => {
  const onPressRecordVideo = (data) => {
    if (!isEmpty(props.onPressSubBroadcastVideo)) {
      props.onPressSubBroadcastVideo(data);
    }
  };

  return (
    <View marginTop={20} marginBottom={20} marginLeft={10} marginRight={10}>
      <Button
        width={'auto'}
        height={'auto'}
        onPress={() => onPressRecordVideo(props.subBroadcasetInfo)}>
        {props.subBroadcasetInfo.status === 5 ? (
          <LiveProfile
            disabled
            isLive
            urlPath={props.subBroadcasetInfo.userInfo.profileImageUrl}
            userName={props.subBroadcasetInfo.userInfo.nickName}
          />
        ) : (
          <LiveProfile
            disabled
            urlPath={props.subBroadcasetInfo.userInfo.profileImageUrl}
            userName={props.subBroadcasetInfo.userInfo.nickName}
          />
        )}
      </Button>
    </View>
  );
};

export default MainSubBroadcastForm;
