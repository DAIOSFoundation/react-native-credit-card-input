import React from 'react';
// Styled Component
import {ScrollView, View} from '../../../../../../../../components/styled/View';
import {Text} from '../../../../../../../../components/styled/Text';
import {Image} from '../../../../../../../../components/styled/Image';
// assets Image
const liveGuideImage01 = require('../../../../../../../../assets/live4Step/liveguide_img_01.png');
const liveGuideImage02 = require('../../../../../../../../assets/live4Step/liveguide_img_02.png');
const liveGuideImage03 = require('../../../../../../../../assets/live4Step/liveguide_img_03.png');

const Step01Screen = () => {
  return (
    <ScrollView height={'100%'}>
      <View paddingLeft={15} paddingRight={15} marginBottom={50}>
        <Text marginTop={50} ftDarkGrayBlue ftLarge bold>
          Step 01 방송 시나리오 및 일정 등록
        </Text>
        <Text ftDarkGrayBlue marginTop={25} style={{lineHeight: 20}}>
          이 단계에서는 방송할 제품에 대해 소개할 내용과 방송일정을 등록합니다.
          아무런 준비 없이 라이브 방송을 시작한다면 막막 할 수 있습니다. 방송할
          제품에 대해 나만의 시나리오를 작성해보세요.
        </Text>
        <Text ftDarkGrayBlue marginTop={5}>
          ‘방송 시나리오 및 일정 등록하기’ 버튼을 누르세요.
        </Text>
        <Image
          marginTop={25}
          alignSelf={'center'}
          width={264}
          height={548}
          source={liveGuideImage01}
        />
        <Text marginTop={25} ftDarkGrayBlue style={{lineHeight: 20}}>
          사용해보신 샘플(제품)에 대해 시청자에게 소개할 사진과 동영상을
          등록해주세요.{' '}
          <Text ftDarkGrayBlue bold style={{lineHeight: 20}}>
            기재한 내용은 셀러 리뷰와 판매 정보로 노출됩니다.
          </Text>{' '}
          셀러님의 방송 예고나 매력도 홍보되니 꼭 등록해주세요.
        </Text>
        <Image
          marginTop={25}
          alignSelf={'center'}
          width={264}
          height={391}
          source={liveGuideImage02}
        />
        <Text ftDarkGrayBlue marginTop={25}>
          <Text ftDarkGrayBlue bold>
            판매 목표 수량을 정해주세요.
          </Text>{' '}
          미지정 시 재고 수급이나 품절 등의 문제가 발생합니다.
        </Text>
        <Text ftDarkGrayBlue marginTop={15}>
          방송 시간에 맞춰 진행할 내용에 대해 시나리오를 만드세요. 예를 들어
          오프닝 브랜드 히스토리나 배경, 제품의 탄생 배경 제품 시연 또는 DP
          라이브 방송 구성, 가격 리뷰 순서로 이야기해볼 수 있겠죠.
        </Text>
        <Text ftDarkGrayBlue marginTop={15}>
          방송에서 나만의 라이브 방송 스타일, 제품의 소구점, 좋은 가격과 구성
          등을 짜임새 있게 이야기하고 연습하시다 보면 어느새 SNS 쇼호스트처럼
          전문 셀러가 되어 있으실 거예요.
        </Text>
        <Image
          marginTop={25}
          alignSelf={'center'}
          width={264}
          height={368}
          source={liveGuideImage03}
        />
        <Text ftDarkGrayBlue marginTop={25}>
          원하는 방송일, 방송 시간(분수)을 설정해주세요.{' '}
          <Text ftDarkGrayBlue bold>
            인스타그램 라이브 방송은 최대 60분(1시간)까지 가능
          </Text>
          하오니 이 시간을 넘지 않도록 해주세요.
        </Text>
        <Text ftDarkGrayBlue marginTop={15}>
          방송 시간을 엄수하지 않을 시 라이브 방송 녹화 파일이 남지 않거나
          오류로 인해 정산 처리가 되지 않습니다. 또한 셀러비전에서 홍보해드리는
          여러 가지 혜택을 누릴 수 없습니다.
        </Text>
        <Text
          ftDarkGrayBlue
          bold
          marginTop={15}
          textDecorationLine={'underline'}>
          부득이한 사정으로 방송일을 변경해야 한다면?
        </Text>
        <Text ftDarkGrayBlue>
          계약서 서명 전에는 방송일 3일 전까지 변경이 가능합니다.{'\n'}
          계약서 서명 후에는 셀러비전 본사로 전화해주세요.{'\n'}
          Tel. 070-7731-9153 (AM 09:00 ~ PM 05:00)
        </Text>
      </View>
    </ScrollView>
  );
};

export default Step01Screen;
