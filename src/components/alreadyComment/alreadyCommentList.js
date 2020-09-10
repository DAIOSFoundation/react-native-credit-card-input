import React from 'react';
// Styled Component
import {
  View,
  ViewRowAbsolute,
  ViewBorder,
  ViewBorderRow,
  ViewRow,
} from '../styled/View';
import {Image, ImageCirclePreview} from '../styled/Image';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';
// NPM Module
import Moment from 'moment';
import {isEmpty} from '../../utils/functions';
// assets Image
const pathGray = require('../../assets/comment/path_grey.png');

// *** 상품에 대한 미리 댓글 ***
// userProfile = 유저 프로필
// content : 댓글 내용
// createdDate : 작성 시간
// nickName : 닉네임
// productUserId : 상품에 대한 댓글을 단 유저 아이디
// currentUserId : 현재 유저 아이디
// prevCommentsId : 상품에 대한 댓글 삭제
// deleteStatus : 댓글 상태

const AlreadyCommentList = (props) => {
  const iconPersonProfile = require('../../assets/profile/icon_person_profile.png');
  const iconCancelBlack = require('../../assets/common/icon_item_cancel.png');

  const onPressPrevCommentsDelete = (id) => {
    if (!isEmpty(props.onPressPrevCommentsDelete))
      props.onPressPrevCommentsDelete(id);
  };

  const onPressPrevSubCommentsDelete = (data) => {
    if (!isEmpty(props.onPressPrevSubCommentsDelete))
      props.onPressPrevSubCommentsDelete(data);
  };

  const onPressCommentWrite = (name) => {
    if (!isEmpty(props.onPressCommentWrite)) props.onPressCommentWrite(name);
  };

  return (
    <View>
      <ViewBorderRow
        width={'100%'}
        paddingLeft={15}
        paddingTop={15}
        paddingBottom={15}>
        <View width={'20%'} justifyContent={'center'} alignItems={'center'}>
          {props.userProfile ? (
            <ImageCirclePreview size={40} source={{uri: props.userProfile}} />
          ) : (
            <ImageCirclePreview size={40} source={iconPersonProfile} />
          )}
        </View>
        <ViewBorder width={'75%'}>
          <ViewBorderRow justifyContent={'space-between'}>
            <ViewBorderRow>
              <Text bold>{props.nickName}</Text>
              <Text ftLightGray marginLeft={10}>
                {Moment(props.createdDate).format('MM월 DD일 a h시 mm분')}
              </Text>
            </ViewBorderRow>
            {props.productUserId === props.currentUserId &&
            !props.deleteStatus ? (
              <Button
                width={17}
                height={17}
                onPress={() => onPressPrevCommentsDelete(props.prevCommentsId)}>
                <Image source={iconCancelBlack} />
              </Button>
            ) : null}
          </ViewBorderRow>
          <ViewBorderRow width={250}>
            {props.deleteStatus ? (
              <Text ftGray>삭제된 댓글입니다.</Text>
            ) : (
              <Text>{props.content}</Text>
            )}
          </ViewBorderRow>
          <Button
            width={60}
            height={10}
            marginTop={8}
            onPress={() =>
              onPressCommentWrite({
                userName: props.nickName,
                prevCommentsId: props.prevCommentsId,
              })
            }>
            <Text ftLightGray>답글 쓰기</Text>
          </Button>
        </ViewBorder>
      </ViewBorderRow>
      <Text width={'100%'} height={1} bgDarkWhite />
      <ViewRowAbsolute alignSelf={'flex-end'} bgDarkWhite />
      {props.subComments
        ? props.subComments.map((item, index) => (
            <ViewBorderRow
              width={'100%'}
              key={index}
              bgDarkWhite
              paddingLeft={15}
              paddingTop={15}
              paddingBottom={15}>
              <ViewRow
                width={'20%'}
                justifyContent={'center'}
                alignItems={'center'}>
                {
                  <Image
                    width={12}
                    height={21}
                    source={pathGray}
                    marginRight={10}
                  />
                }
                {item.profileImageUrl ? (
                  <ImageCirclePreview
                    size={40}
                    source={{uri: item.profileImageUrl}}
                  />
                ) : (
                  <ImageCirclePreview size={40} source={iconPersonProfile} />
                )}
              </ViewRow>
              <ViewBorder width={'75%'}>
                <ViewBorderRow justifyContent={'space-between'}>
                  <ViewBorderRow>
                    <Text bold>{item.nickName}</Text>
                    <Text ftLightGray marginLeft={10}>
                      {Moment(item.createdDate).format('MM월 DD일 a h시 mm분')}
                    </Text>
                  </ViewBorderRow>
                  {props.currentUserId === item.userId && !item.deleted ? (
                    <Button
                      width={17}
                      height={17}
                      onPress={() =>
                        onPressPrevSubCommentsDelete({
                          prevCommentId: props.prevCommentsId,
                          subCommentId: item._id,
                        })
                      }>
                      <Image source={iconCancelBlack} />
                    </Button>
                  ) : null}
                </ViewBorderRow>
                <ViewBorderRow width={250}>
                  {item.deleted ? (
                    <Text ftGray>삭제된 댓글입니다.</Text>
                  ) : (
                    <Text>{item.content}</Text>
                  )}
                </ViewBorderRow>
              </ViewBorder>
            </ViewBorderRow>
          ))
        : null}
    </View>
  );
};
export default AlreadyCommentList;
