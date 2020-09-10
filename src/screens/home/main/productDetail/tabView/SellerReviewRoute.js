import React from 'react';
// Styled Component
import {View} from '../../../../../components/styled/View';
import SellerReview from '../../../../../components/review/SellerReview';
// redux
import {shallowEqual, useSelector} from 'react-redux';

// 셀러리뷰 탭뷰
const SellerReviewRoute = () => {
  const {
    productSellerInfo,
    productName,
    productSellerReview,
    productSellerReviewImages,
    productSellerReviewVideos,
  } = useSelector(
    (state) => ({
      productSellerInfo: state.productDetail.productSellerInfo,
      productName: state.productDetail.productName,
      productSellerReview: state.productDetail.productSellerReview,
      productSellerReviewImages: state.productDetail.productSellerReviewImages,
      productSellerReviewVideos: state.productDetail.productSellerReviewVideos,
    }),
    shallowEqual,
  );

  return (
    <View>
      <View paddingLeft={15} paddingRight={15}>
        <SellerReview
          profilePath={productSellerInfo.profileImageUrl}
          nickName={productSellerInfo.nickName}
          productName={productName}
          videoPath={productSellerReviewVideos}
          productImgPath={productSellerReviewImages}
          content={productSellerReview}
        />
      </View>
      <View bgDarkWhite height={1} />
    </View>
  );
};

export default SellerReviewRoute;
