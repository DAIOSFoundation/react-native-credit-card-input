import React, {useEffect} from 'react';
// Styled Component
import {View} from '../../../../../../components/styled/View';
import UserChat from '../../../../../../components/live/UserChat';
// Redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as broadcastActions from '../../../../../../store/modules/broadcast/actions';
import * as viewerBroadcastActions from '../../../../../../store/modules/viewerBroadcast/actions';

// 라이브 스트리밍 댓글
const Comment = (props) => {
  //redux
  const dispatch = useDispatch();

  const {
    broadcastComments,
    channelInfo,
  } = useSelector(
    (state) => ({
      broadcastComments: state.broadcast.broadcastComments,
      channelInfo: state.user.channelInfo,
    }),
    shallowEqual
  );

  const keepCallingComments = () => {
    const refreshIntervalId = setInterval(() => {
      console.log('keepCallingComments => ', props.broadcastId);
      dispatch(broadcastActions.get_broadcast_comments(props.broadcastId));
      channelInfo && dispatch(viewerBroadcastActions.get_viewer_broadcast_info({channelPk: channelInfo.channelPk}));
    }, 3000);
    dispatch(broadcastActions.change_interval_id(refreshIntervalId));
  };

  useEffect(() => {
    keepCallingComments();
  }, []);

  return (
    <View>
      <UserChat
        urlPath={props.sellerProfile}
        nickName={props.sellerName}
        chat={'어서오세요 환영합니다 ~ '}
      />
      {broadcastComments.map((item, index) => (
        <UserChat
          key={index}
          urlPath={item.user.profile_pic_url}
          nickName={item.user.username}
          chat={item.text}
        />
      ))}
    </View>
  );
};

export default Comment;
