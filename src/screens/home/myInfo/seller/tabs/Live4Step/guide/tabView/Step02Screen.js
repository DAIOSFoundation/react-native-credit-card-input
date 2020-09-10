import React from 'react';
// Styled Component
import {View, ScrollView} from '../../../../../../../../components/styled/View';
import {Text} from '../../../../../../../../components/styled/Text';
import {Image} from '../../../../../../../../components/styled/Image';
// assets Image
const liveGuideImage04 = require('../../../../../../../../assets/live4Step/liveguide_img_04.png');

const Step02Screen = () => {
  return (
    <ScrollView height={'100%'}>
      <View paddingLeft={15} paddingRight={15} marginBottom={50}>
        <Text marginTop={50} ftDarkGrayBlue ftLarge bold>
          Step 02 방송 계약서 서명
        </Text>
        <Text ftDarkGrayBlue marginTop={25}>
          라이브 방송 정보 설정을 완료하면 방송 계약을 진행합니다.
        </Text>
        <Text ftDarkGrayBlue marginTop={5}>
          셀러의 e-mail로 방송 계약서를 전달해드립니다.
        </Text>
        <Image
          marginTop={25}
          alignSelf={'center'}
          width={264}
          height={548}
          source={liveGuideImage04}
        />
        <Text ftDarkGrayBlue marginTop={25}>
          계약서에는 정해진 방송일과 셀러님이 라이브방송에서 판매하실 상품에
          대한 방송 판매가, 수익금 등이 명시되어 있습니다. 꼼꼼히 확인하시고{' '}
          <Text ftDarkGrayBlue bold>
            ‘모두싸인’을 통해 전자서명을 부탁드립니다.
          </Text>
        </Text>
        <Text ftDarkGrayBlue marginTop={15}>
          셀러비전 앱 내에서 전자 서명하기 기능은 구현 중이며,{' '}
          <Text ftDarkGrayBlue bold>
            메일로 보내드리는 계약서에 직접 서명
          </Text>
          을 진행하셔야 하는 점을 양해 부탁드립니다.
        </Text>
        <Text ftDarkGrayBlue marginTop={15}>
          반드시 계약서에 전자서명을 하셔야 다음 단계로 진행하실 수 있습니다.
          수익금과 직결되는 중요한 절차이므로 안내에 따라 차질 없도록
          서명해주세요.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Step02Screen;
