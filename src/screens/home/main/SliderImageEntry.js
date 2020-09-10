import React from 'react';
import {Actions} from "react-native-router-flux";
import {useDispatch} from "react-redux";
import {Button} from "../../../components/styled/Button";
// Styled Component
import {View} from '../../../components/styled/View';
import {ImageBorder} from '../../../components/styled/Image';
import * as productDetailActions from "../../../store/modules/productDetail/actions";
// assets Images
const sample_1 = require('../../../assets/sample/sample2.jpeg');
const sample_2 = require('../../../assets/sample/sample1.jpeg');
const sample_3 = require('../../../assets/sample/sample3.jpeg');
// const sample_4 = require('../../../assets/sample/blu.jpg');

const SliderImageEntry = (props) => {

  const dispatch = useDispatch();
  // 샘플 이미지 렌더링 테스트 //todo 추후 수정 예정
  const imageRendering = (data) => {
    if (data === 1) {
      return sample_1;
    } else if (data === 2) {
      return sample_2;
    } else {
      return sample_3;
    }
  };

  const clickImage = (data) => {
    // console.log('data---',data);
    if (data === 1) {
      let param = {
        broadcastId: "5f4618c9e133d3605928fd37",
        productId: "5f337c334db07b5148b0ad44",
      };

      dispatch(productDetailActions.request_product_detail(param));
      Actions.productDetailScreen([param.broadcastId, param.productId, 'main']);

    } else if (data === 2) {
      let param = {
        broadcastId: "5f4619a6e133d3605928fd39",
        productId: "5f337d994db07b5148b0ad6d",
      };

      dispatch(productDetailActions.request_product_detail(param));
      Actions.productDetailScreen([param.broadcastId, param.productId, 'main']);

    } else {
      let param = {
        broadcastId: "5f461c16efeda169e3404b6f",
        productId: "5f337b674db07b5148b0ad39",
      };

      dispatch(productDetailActions.request_product_detail(param));
      Actions.productDetailScreen([param.broadcastId, param.productId, 'main']);
    }

  }
  return (
    <View height={200}>
      {/*<Button height={200} onPress={() => Actions.addCardScreen()}>*/}
      {/*  <ImageBorder*/}
      {/*    borderRadius={10}*/}
      {/*    source={creditCardSample_1}*/}
      {/*  />*/}
      {/*</Button>*/}
      <Button
        height={200}
        onPress={() => clickImage(props.data.image)}
      >
        <ImageBorder
          borderRadius={10}
          source={imageRendering(props.data.image)}
        />
      </Button>
    </View>
  );
};

export default SliderImageEntry;
