import React from 'react';
// Styled Component
import {ScrollView, View} from '../../../../../../../../components/styled/View';
import {Text} from '../../../../../../../../components/styled/Text';
import {Image} from '../../../../../../../../components/styled/Image';
// assets Image
const liveGuideImage08 = require('../../../../../../../../assets/live4Step/liveguide_img_08.png');
const liveGuideImage09 = require('../../../../../../../../assets/live4Step/liveguide_09.png');

const Step04Screen = () => {
  return (
    <ScrollView height={'100%'}>
      <View paddingLeft={15} paddingRight={15} marginBottom={50}>
        <Text marginTop={50} ftDarkGrayBlue ftLarge bold>
          Step 04 라이브 방송 시작하기
        </Text>
        <Image
          marginTop={25}
          alignSelf={'center'}
          width={264}
          height={279}
          source={liveGuideImage08}
        />
        <Text ftDarkGrayBlue marginTop={25}>
          라이브 방송 준비를 위한 모든 Step을 마치셨습니다.{' '}
          <Text ftDarkGrayBlue bold>
            등록한 방송일시
          </Text>
          에 ‘라이브 방송 시작하기’ 버튼을 누르시면 셀러님의 인스타그램 라이브
          방송 화면과 셀러비전 앱을 연동하기 위한 화면으로 이동합니다.
        </Text>
        <Text ftDarkGrayBlue marginTop={15}>
          주의사항을 꼼꼼히 읽어보시고 지시대로 인스타그램 라이브 방송 연동을
          하시면, 셀러님의 인스타그램 라이브 방송 화면과 연동되어 셀러비전 앱
          내에서 스트리밍된 화면을 보실 수 있습니다.
        </Text>
        <Image
          marginTop={25}
          alignSelf={'center'}
          width={264}
          height={286}
          source={liveGuideImage09}
        />
        <Text ftDarkGrayBlue marginTop={25}>
          방송 이후에도 추가 수익을 원하신다면 (단, 가능한 상품에 한함) 녹화된
          방송의{' '}
          <Text ftDarkGrayBlue bold>
            IGTV 링크를 셀러비전에 공유해 주셔야 유튜브에 방송이 업로드
          </Text>
          되어, 롱테일 법칙에 의해 추가 수익이 발생합니다.
        </Text>
        <Text ftDarkGrayBlue marginTop={15}>
          재미있고 유익한 콘텐츠 많이 부탁드리며, 매주, 매일 꾸준히 셀러 방송
          활동을 하셔야 라이브 방송의 탑 셀러가 되실 수 있으니 도전해 보세요.
          셀러비전이 열심히 하시는 멋진 셀러님을 지원, 응원하겠습니다!
        </Text>
      </View>
    </ScrollView>
  );
};

export default Step04Screen;
