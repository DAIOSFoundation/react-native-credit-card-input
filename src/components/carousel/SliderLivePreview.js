import React, {useState} from 'react';
// NPM Module
import Carousel, {Pagination} from 'react-native-snap-carousel';
// Component Import
import SliderLivePreviewEntry from '../../screens/home/main/SliderLivePreviewEntry';

// *** 라이브 예고 슬라이드 효과 ***
// data : 각 슬라이드 화면에 들어갈 데이터 ( Type Array )
// renderItem : 렌더링되는 자식 컴포넌트
// sliderWidth : 슬라이드 크기
// itemWidth : 슬라이드 안쪽 아이템 크기
// onSnapToItem : 화면 슬라이드 시 현재 위치의 Index 값 설정
// pagination : 하단 pagination dot 표시 - on off
// dotsLength : 데이터 개수
// activeDotIndex : 현재 Index 값

const SliderLivePreview = (props) => {
  // SliderView Index 구하기
  const [sliderActiveSlide, setSliderActiveSlide] = useState(0);

  const _renderImageWithParallax = ({item, index}) => (
    <SliderLivePreviewEntry
      data={item}
      index={index}
      target={sliderActiveSlide}
      onPress={() =>
        props.onPress({broadcastId: item._id, productId: item.productInfo._id})
      }
    />
  );

  return (
    <>
      <Carousel
        data={props.data}
        renderItem={_renderImageWithParallax}
        sliderWidth={props.sliderWidth || '100%'}
        itemWidth={props.itemWidth || '100%'}
        hasParallaxImages={true}
        firstItem={sliderActiveSlide}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        containerCustomStyle={{
          overflow: 'visible',
        }}
        contentContainerCustomStyle={{
          paddingVertical: 10,
        }}
        onSnapToItem={(index) => {
          setSliderActiveSlide(index);
        }}
      />
      {props.pagination ? (
        <Pagination
          dotsLength={props.data.length}
          activeDotIndex={sliderActiveSlide}
          containerStyle={{
            paddingVertical: 8,
          }}
          dotColor={'#e6427a'}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 8,
          }}
          inactiveDotColor={'#46649f'}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      ) : null}
    </>
  );
};

export default SliderLivePreview;
