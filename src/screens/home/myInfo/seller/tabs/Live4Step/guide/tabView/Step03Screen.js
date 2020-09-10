import React from 'react';
// Styled Component
import {ScrollView, View} from '../../../../../../../../components/styled/View';
import {Text} from '../../../../../../../../components/styled/Text';
import {Image} from '../../../../../../../../components/styled/Image';
// assets Image
const liveGuideImage05 = require('../../../../../../../../assets/live4Step/liveguide_img_05.png');
const liveGuideImage06 = require('../../../../../../../../assets/live4Step/liveguide_img_06.png');
const liveGuideImage07 = require('../../../../../../../../assets/live4Step/liveguide_img_07.png');

const Step03Screen = () => {
  return (
    <ScrollView height={'100%'}>
      <View paddingLeft={15} paddingRight={15} marginBottom={50}>
        <Text marginTop={50} ftDarkGrayBlue ftLarge bold>
          Step 03 라방 구매 URL 게시
        </Text>
        <Image
          marginTop={25}
          alignSelf={'center'}
          width={264}
          height={307}
          source={liveGuideImage05}
        />
        <Text marginTop={25} ftDarkGrayBlue>
          계약서 승인을 받으신 후엔 셀러님의 리뷰와 셀러비전 팀이 스토리를 담아
          작성한 웹 기술서 등록 URL이 생성됩니다. '방송 구매 코드 URL 복사’
          버튼을 눌러 링크를 복사하세요.
        </Text>
        <Image
          marginTop={25}
          alignSelf={'center'}
          width={264}
          height={361}
          source={liveGuideImage06}
        />
        <Text ftDarkGrayBlue marginTop={25}>
          <Text ftDarkGrayBlue bold>
            인스타그램으로 이동하셔서{' '}
          </Text>
          ‘프로필 수정’ 버튼을 누르고Website 항목에 복사한 URL을 붙여넣기
          해주세요. 그리고 Bio 항목에 홍보 글을 함께 작성해주시면 됩니다.
        </Text>
        <Image
          marginTop={25}
          alignSelf={'center'}
          width={264}
          height={331}
          source={liveGuideImage07}
        />
        <Text ftDarkGrayBlue marginTop={25}>
          인스타그램에 URL을 노출해야 구매자들이 라이브방송을 앱 내에서 셀러님의
          라이브 방송을 시청하며 이탈하지 않고 상품을 구매할 수 있으니 URL을
          프로필에 꼭 기입하시고 구매 링크가 제대로 활성화되어 있는지 한 번 더
          확인해 주세요.
        </Text>
        <Text ftDarkGrayBlue marginTop={15}>
          인스타그램에 게시를 완료 하셨다면, 셀러비전 앱의 라방 Step 03에서
          ‘다음’ 버튼을 눌러 Step 04로 이동하세요.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Step03Screen;
