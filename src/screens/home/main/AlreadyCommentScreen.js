import React, {useEffect, useCallback, useState, useRef} from 'react';
import {TextInput} from 'react-native';
// Styled Component
import {
  SafeAreaView,
  ScrollView,
  View,
  ViewRow,
  ViewRowBorderRadius,
  ViewRowRadiusCustom,
} from '../../../components/styled/View';
import Topbar from '../../../components/bar/Topbar';
import {Text} from '../../../components/styled/Text';
import {Image} from '../../../components/styled/Image';
import AlreadyCommentProduct from '../../../components/alreadyComment/alreadyCommentProduct';
import AlreadyCommentList from '../../../components/alreadyComment/alreadyCommentList';
import {screenHeight} from '../../../components/styled/ScreenSize';
import {NBInputBorderRadius} from '../../../components/styled/Input';
import {Button, ButtonHighlightRadius} from '../../../components/styled/Button';
import LoadingBar from '../../../components/loadingBar/LoadingBar';
import * as Common from '../../../components/styled/Common';
// NPM Module
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// redux
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as broadcastActions from '../../../store/modules/broadcast/actions';
import * as customModalActions from '../../../store/modules/modal/customModal/actions';
import * as globalActions from '../../../store/modules/global/actions';
// utils Import
import {disRate} from '../../../utils/functions';
// assets Image
const couponIcon = require('../../../assets/coupon/icon_coupon_small.png');

// 미리댓글 스크린
const AlreadyCommentScreen = (props) => {
  // redux
  const dispatch = useDispatch();

  const {
    prevCommentsData,
    commentText,
    rendering,
    jwtToken,
    userId,
    loading,
    scrollToY,
  } = useSelector(
    (state) => ({
      prevCommentsData: state.broadcast.prevCommentsData,
      commentText: state.broadcast.commentText,
      rendering: state.broadcast.rendering,
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      loading:
        state.loading['broadcast/REQUEST_PREVIEW_BROADCAST_PREV_COMMENTS'],
      scrollToY: state.global.scrollToY,
    }),
    shallowEqual,
  );

  const inputRef = useRef(null);

  const scrollViewRef = useRef(null);

  // 인풋값 분기 처리 ex) false - 상품에 대한 인풋값  true - 유저에 대한 댓글 인풋값
  const [commentStatus, setCommentStatus] = useState(false);
  // 답변 주인 닉네임
  const [userName, setUserName] = useState('');
  // 인풋값 상태에 따른 분기 처리
  const [inputStatus, setInputStatus] = useState(false);
  // 대댓글을 작성하기위한 댓글 식별 ID
  const [prevCommentId, setPrevCommentId] = useState(null);
  const [currentY, setCurrentY] = useState(0);

  useEffect(() => {
    let param = {
      broadcastId: props.data,
    };
    dispatch(broadcastActions.request_preview_broadcast_prev_comments(param));
  }, [rendering]);

  useEffect(() => {
    if (inputStatus) {
      inputRef.current.focus();
      setInputStatus(false);
    }
  }, [inputStatus]);

  // useEffect(() => { todo 랜더링 시 현재 위치 좌표값 추후 수정 예정
  //   if (scrollToY) {
  //     console.log("scrollToY", scrollToY)
  //     scrollViewRef.current.scrollTo({x: 0, y: 500, animated: true})
  //   }
  // }, [scrollToY]);

  // 뒤로 가기 버튼
  const onPressBack = () => {
    Actions.pop();
  };

  // 미리 댓글 - 댓글 텍스트 값 변경
  const onChangeComment = (text) => {
    dispatch(broadcastActions.change_preview_product_comment(text));
  };

  // 미리 댓글 - 상품에 대한 댓글 등록
  const onPressProductComment = useCallback(() => {
    let param = {
      jwtToken: jwtToken,
      content: commentText,
      broadcastId: prevCommentsData._id,
    };

    dispatch(broadcastActions.insert_preview_product_comment(param));
  }, [commentText, jwtToken, prevCommentsData]);

  // 미리 댓글 - 상품에 대한 대댓글 등록
  const onPressProductSubComment = useCallback(() => {
    let param = {
      jwtToken: jwtToken,
      content: commentText,
      broadcastId: prevCommentsData._id,
      prevCommentId: prevCommentId,
    };

    dispatch(broadcastActions.insert_preview_product_sub_comment(param));
    setCommentStatus(false);
  }, [commentText, jwtToken, prevCommentsData]);

  // 상품에 대한 댓글 삭제 확인
  const onPressPrevCommentsDeleteOK = (param) => {
    dispatch(broadcastActions.delete_preview_product_comment(param));
  };
  // 상품에 대한 댓글 삭제
  const onPressPrevCommentsDelete = (id) => {
    let param = {
      jwtToken: jwtToken,
      broadcastId: prevCommentsData._id,
      prevCommentId: id,
    };

    dispatch(
      customModalActions.change_modal_message(
        '선택하신 댓글을 삭제 하시겠습니까 ?',
      ),
    );
    dispatch(customModalActions.change_modal_onebutton(false));
    dispatch(
      customModalActions.change_modal_onpress_ok(() =>
        onPressPrevCommentsDeleteOK(param),
      ),
    );
  };

  // 상품에 대한 대댓글 삭제 확인
  const onPressPrevSubCommentsDeleteOK = (param) => {
    dispatch(broadcastActions.delete_preview_product_sub_comment(param));
  };
  // 상품에 대한 대댓글 삭제
  const onPressPrevSubCommentsDelete = (data) => {
    let param = {
      jwtToken: jwtToken,
      broadcastId: prevCommentsData._id,
      prevCommentId: data.prevCommentId,
      subCommentId: data.subCommentId,
    };

    dispatch(
      customModalActions.change_modal_message(
        '선택하신 댓글을 삭제 하시겠습니까 ?',
      ),
    );
    dispatch(customModalActions.change_modal_onebutton(false));
    dispatch(
      customModalActions.change_modal_onpress_ok(() =>
        onPressPrevSubCommentsDeleteOK(param),
      ),
    );
  };

  // 답글 쓰기 버튼 클릭 시 이벤트
  const onPressCommentWrite = (data) => {
    if (jwtToken && userId) {
      setUserName(data.userName);
      setPrevCommentId(data.prevCommentsId);
      setCommentStatus(true);
      setInputStatus(true);
    } else {
      dispatch(
        customModalActions.change_modal_message(
          '로그인 후 작성하실 수 있습니다.',
        ),
      );
    }
  };

  // 답글 쓰기 취소 버튼
  const onPressCommentCancel = () => {
    setCommentStatus(false);
  };

  // 상태값에 따른 하단 인풋
  const statusInput = () => {
    return commentStatus ? (
      <View>
        <ViewRow width={'100%'} bgDarkWhite paddingLeft={10} marginBottom={10}>
          <Text ftGray>{userName} 님에게 답글 남기는중...</Text>
          <Button
            width={'auto'}
            height={'auto'}
            marginLeft={10}
            onPress={onPressCommentCancel}>
            <Text textDecorationLine={'underline'} ftDarkNavy>
              취소
            </Text>
          </Button>
        </ViewRow>
        <ViewRow width={'100%'}>
          <ViewRowBorderRadius
            width={'80%'}
            brIceBlue
            style={{overflow: 'hidden'}}>
            <ViewRowRadiusCustom
              paddingLeft={10}
              bgWhite
              alignItems={'center'}
              justifyContent={'center'}>
              <Text
                ftTheme
                bgLightPink
                paddingTop={5}
                paddingLeft={5}
                paddingBottom={5}
                paddingRight={5}>
                {userName}
              </Text>
            </ViewRowRadiusCustom>
            <TextInput
              ref={inputRef}
              style={{
                width: '70%',
                height: 40,
                flex: 1,
                paddingLeft: 10,
                backgroundColor: '#ffffff',
              }}
              onChangeText={onChangeComment}
            />
          </ViewRowBorderRadius>
          <ButtonHighlightRadius
            width={'20%'}
            height={40}
            bgTheme
            onPress={onPressProductSubComment}>
            <Text ftWhite>등록</Text>
          </ButtonHighlightRadius>
        </ViewRow>
      </View>
    ) : (
      <ViewRow width={'100%'}>
        <NBInputBorderRadius
          style={{flex: 1}}
          width={'70%'}
          paddingLeft={10}
          bgWhite
          brIceBlue
          placeholderTextColor={Common.colors.LIGHT_BLUE_GRAY}
          onChangeText={onChangeComment}
          placeholder="미리 댓글을 달고 5% 할인 받기"
        />
        <ButtonHighlightRadius
          width={'20%'}
          height={40}
          bgTheme
          onPress={onPressProductComment}>
          <Text ftWhite>등록</Text>
        </ButtonHighlightRadius>
      </ViewRow>
    );
  };

  // 실시간 스크롤 좌표값 Y
  const onScrollCurrentY = (e) => {
    setCurrentY(e.nativeEvent.contentOffset.y);
  };

  return (
    <View height={screenHeight} style={{flex: 1}}>
      <Topbar
        isLine
        title={'미리 댓글'}
        onPressLeft={onPressBack}
        isLeftButton={true}
      />
      {loading ? (
        <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
        </View>
      ) : (
        <SafeAreaView>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FF8469', '#e6427a']}>
            <ViewRow
              alignItems={'center'}
              justifyContent={'center'}
              paddingTop={20}
              paddingBottom={20}>
              <Image
                width={38}
                height={20}
                marginRight={5}
                source={couponIcon}
              />
              <Text ftWhite marginRight={5} fontSize={16}>
                미리댓글만 달아도
              </Text>
              <Text fontSize={20} ftWhite bold>
                5% 추가 할인 쿠폰
              </Text>
            </ViewRow>
          </LinearGradient>
          <View
            paddingLeft={15}
            paddingRight={15}
            paddingTop={15}
            paddingBottom={15}>
            {prevCommentsData ? (
              <AlreadyCommentProduct
                productName={prevCommentsData.productInfo.productName}
                sellerName={prevCommentsData.sellerInfo.nickName}
                discount={disRate(
                  prevCommentsData.productInfo.normalPrice,
                  prevCommentsData.productInfo.sellerLivePrice,
                )}
                price={prevCommentsData.productInfo.sellerLivePrice}
                productImage={
                  prevCommentsData.productInfo.productImages[0].path
                }
              />
            ) : null}
          </View>
          <Text width={'100%'} height={1} bgDarkWhite />
          <ScrollView style={{flex: 1}} ref={scrollViewRef}>
            <View>
              {prevCommentsData &&
              prevCommentsData.prevComments &&
              prevCommentsData.prevComments.length !== 0
                ? prevCommentsData.prevComments.map((item, index) => (
                    <AlreadyCommentList
                      userProfile={item.profileImageUrl}
                      content={item.content}
                      createdDate={item.createdAt}
                      nickName={item.nickName}
                      subComments={item.subComments}
                      productUserId={item.userId}
                      currentUserId={userId}
                      prevCommentsId={item._id}
                      deleteStatus={item.deleted}
                      onPressPrevCommentsDelete={onPressPrevCommentsDelete}
                      onPressPrevSubCommentsDelete={
                        onPressPrevSubCommentsDelete
                      }
                      onPressCommentWrite={onPressCommentWrite}
                    />
                  ))
                : null}
            </View>
          </ScrollView>
          <View
            justifyContent={'center'}
            bgDarkWhite
            alignItems={'center'}
            paddingTop={10}
            paddingBottom={10}
            paddingLeft={15}
            paddingRight={15}>
            {jwtToken && userId ? (
              statusInput()
            ) : (
              <View paddingTop={5} paddingBottom={5}>
                <Text ftDarkNavy fontSize={15}>
                  로그인 후 댓글을 작성하실 수 있습니다.
                </Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default AlreadyCommentScreen;
