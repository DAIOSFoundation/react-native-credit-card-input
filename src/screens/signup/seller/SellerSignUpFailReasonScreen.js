import React from 'react';
import {ScrollView, View, Container} from '../../../components/styled/View';
import {Text} from '../../../components/styled/Text';
import {Image} from '../../../components/styled/Image';
import SellerProfile from '../../../components/profiles/SellerProfile';
import {Button} from '../../../components/styled/Button';
import SelectCheckBoxes from '../../../components/checkboxes/SelectCheckBoxes';
import {interestItems} from '../../../utils/constants';
import Topbar from '../../../components/bar/Topbar';
import {Actions} from 'react-native-router-flux';

//셀러 회원가입 실패 이유
const SellerSignUpFailReasonScreen = () => {
  // 뒤로가기 버튼
  const onPressClose = () => {
    Actions.pop();
  };

  return (
    <>
      <Topbar
        onPressLeft={onPressClose}
        isLeftButton={true}
        titleColor={{ftWhite: true}}
        bgColor={{bgDarkNavy: true}}
        lineColor={{brLightNavyGray: true}}
        leftButtonImage={require('../../../assets/common/icon_back_white.png')}
        title={'승인 보류 사유'}
        isLine={true}
      />
      <ScrollView>
        <Container bgDarkNavy justifyContent={'space-between'}>
          <View
            width={'100%'}
            marginTop={40}
            paddingLeft={20}
            paddingRight={20}
            marginBottom={40}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}>
            <Text ftWhite fontSize={20} bold>
              1. 부적절한 닉네임
            </Text>
            <Text ftIceBlue marginTop={15}>
              - 기업, 기관, 종교, 연예인 등 오해의 소지가 있는 명칭의 닉네임
              사용을 금지합니다.
            </Text>
            <Text ftIceBlue marginTop={10}>
              - 욕설, 비방 또는 불건전한 내용의 닉네임 사용을 금지합니다.
            </Text>

            <Text ftWhite fontSize={20} marginTop={40} bold>
              2. 개인 SNS 채널 라이브방송 부적절
            </Text>
            <Text ftIceBlue marginTop={10} marginBottom={10}>
              - 연동한 SNS 계정이 종교, 인종, 성적지향성, 성별, 민족/인종 또는
              기타 특정 단체에 대한 채널일 경우 승인하지 않습니다.
            </Text>

            <Text ftWhite fontSize={20} marginTop={40} bold>
              3. 리허설 방송
            </Text>
            <Text ftIceBlue marginTop={15} marginBottom={10}>
              - 리허설 방송 영상 카메라테스트 화면이 부적절한 경우
            </Text>
            <Text ftIceBlue>
              (너무 밝거나 어두운 경우, 화면상 얼굴이 보이지 않거나 너무 가까운
              경우, 탈의, 부적절한 의상을 입고 촬영한 경우)
            </Text>
            <Text ftIceBlue marginTop={10}>
              - 제품 설명시 정보 전달성이 부족한 경우
            </Text>
            <Text ftIceBlue marginTop={10}>
              - 내용 구성력이 기준상 미달하는 경우
            </Text>
            <Text ftIceBlue marginTop={10}>
              - 모욕적, 성적 등 사람들의 기분을 무시하거나 불쾌감을 주고,
              의도적으로 혐오감을 주거나 매우 저급하거나 지나치게 공포스러울
              경우
            </Text>
            <Text ftIceBlue marginTop={10}>
              - 게스트와 함께 촬영하는 경우
            </Text>
            <Text ftIceBlue marginTop={10}>
              - 타 유명 캐릭터 및 프로그램을 모방하는 경우
            </Text>
            <Text ftIceBlue marginTop={10}>
              - 범죄 및 법령 저촉되는 모든 내용
            </Text>

            <Text ftIceBlue marginTop={30}>
              승인거절 사유는 현재 크게 3가지로 나뉩니다.
            </Text>
            <Text ftWhite bold marginTop={10}>
              닉네임 / 개인SNS채널 / 리허설 방송
            </Text>
            <Text ftIceBlue marginTop={10}>
              이에 대한 거절 사유를 알려드리며, 신청시 나머지 사항은 설문 조사의
              형태이기 때문에 제외하였습니다.
            </Text>
          </View>
          <View width={'100%'} bgWhite>
            <Button bgTheme height={55}>
              <Text ftWhite>재신청 하기</Text>
            </Button>
          </View>
        </Container>
      </ScrollView>
    </>
  );
};

export default SellerSignUpFailReasonScreen;
