/*
 * Copyright (c) 2020.3
 * Written by kj <ace@daiblab.com>
 *
 * This file is part of SellerVision-RN
 * Desc -
 */

import React, {useEffect, useRef, useState, useMemo} from 'react';
// Styled Component
import {
  SafeAreaView,
  ScrollView,
  View,
  ViewAbsolute,
  ViewAbsoluteRadius,
  ViewBorderRadius,
  ViewRadiusCustom,
  ViewRow,
} from '../../../../../../components/styled/View';
import Topbar from '../../../../../../components/bar/Topbar';
import {Text} from '../../../../../../components/styled/Text';
import {Image} from '../../../../../../components/styled/Image';
import RecommendProduct from '../../../../../../components/products/RecommendProduct';
import {Button, ButtonRadius} from '../../../../../../components/styled/Button';
import BottomModal from '../../../../../../components/modal/BottomModal';
import PutProduct from '../../../../../../components/products/PutProduct';
import CustomModal from '../../../../../../components/modal/CustomModal';
import LoadingBar from '../../../../../../components/loadingBar/LoadingBar';
import {screenWidth} from '../../../../../../components/styled/ScreenSize';
// NPM Module
import Toast from 'react-native-easy-toast';
import {Actions} from 'react-native-router-flux';
import Entypo from 'react-native-vector-icons/Entypo';
// utils Import
import {interestItems} from '../../../../../../utils/constants';
import {LocaleString} from '../../../../../../utils/functions';
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as recommendActions from '../../../../../../store/modules/recommend/actions';
import * as customModalActions from '../../../../../../store/modules/modal/customModal/actions';
// assets Img
const refreshIcon = require('../../../../../../assets/common/icon_refresh.png');
const pinkTriangleArrow = require('../../../../../../assets/common/pink_triangle_arrow.png');
const navyTriangleArrow = require('../../../../../../assets/common/navy_triangle.png');
const toastCart = require('../../../../../../assets/toast/toast_cart.png');
const toastDelete = require('../../../../../../assets/toast/toast_delete.png');
const modalCancel = require('../../../../../../assets/common/icon_cancel_black.png');

// 추천 상품 화면
const RecommendScreen = () => {
  // redux
  const dispatch = useDispatch();

  const {
    toggleCategoryList,
    toggleSamplePut,
    recommendItems,
    putSampleItems,
    totalPrice,
    jwtToken,
    isVisible,
    isOneButton,
    message,
    onPressOK,
    size,
    loading,
    additionalInfo,
  } = useSelector(
    (state) => ({
      toggleCategoryList: state.recommend.toggleCategoryList,
      toggleSamplePut: state.recommend.toggleSamplePut,
      recommendItems: state.recommend.recommendItems,
      putSampleItems: state.recommend.putSampleItems,
      totalPrice: state.recommend.totalPrice,
      jwtToken: state.user.jwtToken,
      isVisible: state.customModal.isVisible,
      isOneButton: state.customModal.isOneButton,
      message: state.customModal.message,
      onPressOK: state.customModal.onPressOK,
      size: state.customModal.size,
      loading: state.loading['recommend/REQUEST_RECOMMEND_PRODUCT'],
      additionalInfo: state.user.additionalInfo,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (jwtToken !== null) {
      dispatch(recommendActions.request_recommend_product(jwtToken));
    }
    return () => {
      dispatch(recommendActions.change_init_state());
    };
  }, [jwtToken]);

  // 토스트 메세지 참조 선언
  const toastRef = useRef(null);

  const [snapPoints, setSnapPoints] = useState([0]);

  const bottomClosed = () => {
    setSnapPoints([0]);
  };
  const bottomOpen = () => {
    setSnapPoints(['60%']);
  };

  const onPressToggleCategoryList = () => {
    dispatch(recommendActions.toggle_category_list());
  };
  const onPressToggleSamplePut = (id) => {
    dispatch(recommendActions.toggle_sample_put(id));
  };

  // 샘플담기 버튼 이벤트
  const sampleAdd = (
    id,
    price,
    name,
    imgUrl,
    deliveryCharge,
    isExtraCharge,
    extraCharge,
  ) => {
    let sampleAddIndex = toggleSamplePut.findIndex((item) => item.id === id);

    if (toggleSamplePut[sampleAddIndex].state === true) {
      toastRef.current.show(
        <Image width={100} height={100} source={toastDelete} />,
      );
      dispatch(recommendActions.change_sample_delete(id));
    } else {
      toastRef.current.show(
        <Image width={100} height={100} source={toastCart} />,
      );
      dispatch(
        recommendActions.change_sample_put([
          id,
          price,
          name,
          imgUrl,
          deliveryCharge,
          isExtraCharge,
          extraCharge,
        ]),
      );
      bottomOpen();
    }
    onPressToggleSamplePut(id);
  };

  // page Back Button
  const onPressBack = () => {
    Actions.pop();
  };
  // refresh Button
  const onPressRefresh = () => {
    dispatch(recommendActions.request_recommend_product(jwtToken));
  };

  // 담은 샘플 수량 증가 이벤트
  const onPressIncrease = (id) => {
    dispatch(recommendActions.change_sample_amount_increase(id));
  };
  // 담은 샘플 수량 감소 이벤트
  const onPressDecrease = (id) => {
    dispatch(recommendActions.change_sample_amount_decrease(id));
  };
  // 담은 샘플 취소 이벤트
  const onPressCanCel = (id) => {
    dispatch(recommendActions.change_sample_delete(id));
    onPressToggleSamplePut(id);
  };

  // 추천상품페이지 우측하단 카트에 담긴 상품 갯수
  const cartPutCount = () => {
    return putSampleItems.length <= 0 ? null : (
      <ViewBorderRadius
        justifyContent={'center'}
        width={'100%'}
        height={'100%'}
        alignItems={'center'}
        style={{backgroundColor: 'red'}}
        borderRadius={100}>
        <Text bold fontSize={13} ftWhite>
          {putSampleItems.length}
        </Text>
      </ViewBorderRadius>
    );
  };

  // onPressCart BottomModal Open
  const onPressCartOpen = () => {
    return putSampleItems.length <= 0 ? null : bottomOpen();
  };

  // 카테고리 토글
  const categoryListToggle = () => {
    return !toggleCategoryList ? (
      <Button
        marginBottom={50}
        onPress={onPressToggleCategoryList}
        paddingTop={30}
        paddingBottom={30}
        justifyContent={'center'}
        alignItems={'center'}>
        <Text ftLarge marginRight={5}>
          카테고리별 Item List 보기
        </Text>
        <Image width={8} height={6} source={pinkTriangleArrow} />
      </Button>
    ) : (
      <View marginBottom={50}>
        <View
          paddingTop={30}
          paddingBottom={10}
          paddingLeft={15}
          paddingRight={15}
          bgDarkWhite>
          <Text bold ftLarge>
            카테고리별 Item
          </Text>
          <ViewRow justifyContent={'space-between'} marginTop={15}>
            <Text ftGray>카테고리별 TOP5 상품들은 어떠신가요?</Text>
            <Button
              onPress={onPressToggleCategoryList}
              width={'auto'}
              height={'auto'}
              alignItems={'center'}>
              <Image width={9} height={6} source={navyTriangleArrow} />
              <Text bold marginLeft={10} ftNavy>
                카테고리
              </Text>
            </Button>
          </ViewRow>
        </View>
      </View>
    );
  };

  // 샘플버튼 활성화 표시
  const toggleActive = (item) => {
    let toggleActiveIndex = toggleSamplePut.findIndex(
      (value) => value.id === item._id,
    );

    return toggleSamplePut[toggleActiveIndex].state;
  };

  // 샘플 신청하기 버튼
  const onPressSampleRequest = (data) => {
    if (data.length === 0) {
      dispatch(
        customModalActions.change_modal_message(
          '샘플을 최소 1개 이상 담아주세요.',
        ),
      );
    } else {
      Actions.myInfoPurchaseFormScreen();
    }
  };

  // 추천상품 이미지 클릭 시 상세화면 진입 기능
  const onPressDetail = (productId) => {
    let param = {
      jwtToken: jwtToken,
      productId: productId,
    };
    dispatch(recommendActions.request_recommend_product_detail(param));
    Actions.recommendDetailScreen();
  };

  // 추천상품아이템 렌더링
  const recommendItemsRender = () =>
    recommendItems.map((item, index) => {
      return (
        <View key={index}>
          <RecommendProduct
            key={index}
            productId={item._id}
            productName={item.productName}
            isLend={item.isLend}
            samplePrice={item.samplePrice}
            normalPrice={item.normalPrice}
            productImages={item.productImages[0].path}
            textLine={1}
            onPressDetail={onPressDetail}
            onPressAdd={() =>
              sampleAdd(
                item._id,
                item.samplePrice,
                item.productName,
                item.productImages[0].path,
                item.sampleDeliveryCharge,
                item.isExtraCharge,
                item.extraCharge,
              )
            }
            active={toggleActive(item)}
          />
          <View bgDarkWhite height={1} />
        </View>
      );
    });

  //todo 추천상품아이템 없을 시 - 추후 이미지 추가할 것
  const RecommendItemsRenderFailure = () => (
    <View marginTop={15} paddingLeft={15} paddingRight={15}>
      <Text ftNavy bold fontSize={17}>
        추천상품이 없습니다.
      </Text>
    </View>
  );

  // 추천 상품 페이지 - 해쉬태그
  const renderAdditionalInfo = useMemo(() => {
    const ret = [];
    if (additionalInfo) {
      for (let i = 0; i < additionalInfo.length; i++) {
        if (interestItems[additionalInfo[i]].indexOf('(') === -1) {
          ret.push('#' + interestItems[additionalInfo[i]].replace(/\n/g, ''));
        } else {
          let string = interestItems[additionalInfo[i]].substring(
            0,
            interestItems[additionalInfo[i]].indexOf('('),
          );

          ret.push('#' + string.replace(/\n/g, ''));
        }
      }
    }
    return ret;
  }, [additionalInfo]);

  // 바텀시트 헤더
  const bottomSheetHeader = () => {
    return (
      <ViewRadiusCustom
        bgDarkWhite
        justifyContent={'center'}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        marginBottom={-1}
        width={'100%'}
        height={50}>
        <Button
          marginRight={15}
          alignSelf={'flex-end'}
          width={25}
          height={25}
          activeOpacity={1}
          onPress={bottomClosed}>
          <Image width={25} height={25} source={modalCancel} />
        </Button>
      </ViewRadiusCustom>
    );
  };

  // 바텀시트 내용
  const bottomSheetContent = () => {
    return (
      <View bgDarkWhite height={'100%'} paddingLeft={15} paddingRight={15}>
        <Text ftLarge bold paddingBottom={10}>
          샘플 신청하기
        </Text>
        <ScrollView>
          {putSampleItems.map((item, index) => {
            return (
              <ViewBorderRadius
                bgWhite
                key={index}
                marginTop={10}
                paddingTop={15}
                paddingLeft={15}
                paddingRight={15}
                paddingBottom={15}
                brIceBlue>
                <PutProduct
                  productId={item.productId}
                  onPressIncrease={() => onPressIncrease(item.productId)}
                  onPressDecrease={() => onPressDecrease(item.productId)}
                  onPressCanCel={() => onPressCanCel(item.productId)}
                  textLine={1}
                  productName={item.productName}
                  productAmount={item.productAmount}
                  productPrice={item.productPrice * item.productAmount}
                />
              </ViewBorderRadius>
            );
          })}
        </ScrollView>
        <ViewRow
          justifyContent={'flex-end'}
          alignItems={'center'}
          marginTop={15}
          marginBottom={20}>
          <Text>총 샘플 금액</Text>
          <Text ftBigLarge bold marginLeft={15} marginRight={5}>
            {LocaleString(totalPrice)}
          </Text>
          <Text ftLarge>원</Text>
        </ViewRow>
        <ButtonRadius
          bgTheme
          paddingTop={25}
          paddingBottom={25}
          marginBottom={15}
          onPress={() => onPressSampleRequest(putSampleItems)}>
          <Text bold ftWhite ftLarge>
            샘플 신청하기
          </Text>
        </ButtonRadius>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Topbar
        isLine
        title={'라이브방송 추천 상품'}
        isLeftButton
        onPressLeft={onPressBack}
      />
      <Toast
        style={{backgroundColor: 'transparent'}}
        positionValue={screenWidth * 0.4}
        ref={toastRef}
        position="top"
      />
      {loading ? (
        <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
        </View>
      ) : (
        <>
          <ScrollView>
            <View
              paddingTop={30}
              paddingBottom={10}
              paddingLeft={15}
              paddingRight={15}
              bgDarkWhite>
              <Text bold ftLarge>
                나만의 맞춤 추천 상품
              </Text>
              <ViewRow justifyContent={'space-between'} marginTop={15}>
                <Text ftTheme width={'auto'} style={{flex: 1}}>
                  {renderAdditionalInfo.map((item, index) => item + ' ')}
                </Text>
                <Button
                  width={'auto'}
                  height={'auto'}
                  alignItems={'center'}
                  onPress={onPressRefresh}>
                  <Image width={12} height={12} source={refreshIcon} />
                  <Text bold marginLeft={10} ftNavy>
                    새로고침
                  </Text>
                </Button>
              </ViewRow>
            </View>
            {recommendItems.length !== 0
              ? recommendItemsRender()
              : RecommendItemsRenderFailure()}
            {/*{categoryListToggle()}*/}
          </ScrollView>
          <BottomModal
            headerGesture={false}
            contentGesture={false}
            initialSnap={0}
            snapPoints={snapPoints}
            header={bottomSheetHeader()}
            view={bottomSheetContent()}
          />
          <ViewAbsoluteRadius
            bgWhite
            brTheme
            borderRadius={33}
            width={66}
            height={66}
            bottom={15}
            right={15}
            style={{borderColor: '#e6427a', borderWidth: 2}}>
            <Button width={'100%'} height={'100%'} onPress={onPressCartOpen}>
              <Entypo
                name="shopping-cart"
                style={{color: '#e6427a', fontSize: 25}}
              />
            </Button>
            <ViewAbsolute width={23} height={23} right={5}>
              {cartPutCount()}
            </ViewAbsolute>
          </ViewAbsoluteRadius>
          {/*<CustomModal*/}
          {/*  isVisible={isVisible}*/}
          {/*  isOneButton={isOneButton}*/}
          {/*  message={message}*/}
          {/*  onPressOK={onPressOK}*/}
          {/*  size={size}*/}
          {/*  currentScene={'MyInfo'}*/}
          {/*/>*/}
        </>
      )}
    </SafeAreaView>
  );
};

export default RecommendScreen;
