import React from 'react';
// Styled Component
import {
  View,
  ViewBorder,
  ViewBorderRadius,
  ViewRow,
} from '../../../../../components/styled/View';
import {Text} from '../../../../../components/styled/Text';
import {Image, ImageBorder} from '../../../../../components/styled/Image';
// NPM Module
import Moment from 'moment';
import {LocaleString} from '../../../../../utils/functions';
// assets Image
const goalIcon = require('../../../../../assets/adjustment/icon_goal.png');

const LiveBroadcastTab = (props) => {
  // 퍼센트 구하기
  const percentCalculation = (numerator, denominator) => {
    let result = 0;
    result = 100 * (numerator / denominator);
    return result;
  };

  return (
    <>
      {props.liveAdjustmentInfo ? (
        <View>
          <ViewRow
            height={100}
            paddingLeft={20}
            paddingRight={20}
            alignItems={'center'}
            justifyContent={'space-between'}
            bgWhite>
            <ViewBorderRadius>
              <Text ftGray>
                {props.liveAdjustmentInfo.broadcastInfo
                  ? Moment(
                      props.liveAdjustmentInfo.broadcastInfo.expectedStartTime,
                    ).format('YYYY.MM.DD(dd)')
                  : '최근 날짜 없음'}
              </Text>
              <Text ftDarkNavy bold fontSize={15}>
                방송 정산 예정 금액
              </Text>
            </ViewBorderRadius>
            <Text ftDarkNavy bold fontSize={20}>
              {props.liveAdjustmentInfo.adjustmentInfo
                ? LocaleString(props.liveAdjustmentInfo.adjustmentInfo.profit)
                : 0}
              원
            </Text>
          </ViewRow>
          <View
            height={'auto'}
            bgWhite
            paddingLeft={20}
            paddingRight={20}
            marginTop={5}>
            <Text
              ftDarkNavy
              fontSize={15}
              bold
              paddingTop={10}
              paddingBottom={10}>
              라이브방송 정보
            </Text>
            <View bgIceBlue height={2} />
            {props.liveAdjustmentInfo.broadcastInfo ? (
              <View>
                <ViewRow marginTop={20} marginBottom={20}>
                  <ImageBorder
                    borderRadius={10}
                    width={80}
                    height={80}
                    source={{
                      uri:
                        props.liveAdjustmentInfo.broadcastInfo.productImageUrl,
                    }}
                  />
                  <ViewBorderRadius paddingLeft={10}>
                    <ViewRow alignItems={'center'}>
                      <Image width={14} height={14} source={goalIcon} />
                      <Text ftGray bold fontSize={14}>
                        목표 달성률
                      </Text>
                      {props.liveAdjustmentInfo.adjustmentInfo ? (
                        <Text ftTheme bold fontSize={14} paddingLeft={5}>
                          {Math.round(
                            percentCalculation(
                              props.liveAdjustmentInfo.adjustmentInfo
                                .sellingAmount,
                              props.liveAdjustmentInfo.broadcastInfo.goalAmount,
                            ),
                          )}
                          % (
                          {
                            props.liveAdjustmentInfo.adjustmentInfo
                              .sellingAmount
                          }
                          개/{props.liveAdjustmentInfo.broadcastInfo.goalAmount}
                          개)
                        </Text>
                      ) : (
                        <Text ftTheme bold fontSize={14} paddingLeft={5}>
                          정보가 없습니다.
                        </Text>
                      )}
                    </ViewRow>
                    <View width={'90%'}>
                      <Text ftDarkNavy fontSize={16}>
                        {props.liveAdjustmentInfo.broadcastInfo.productName}
                      </Text>
                    </View>
                  </ViewBorderRadius>
                </ViewRow>
                <View bgIceBlue height={2} />
                <ViewRow
                  marginTop={20}
                  marginBottom={20}
                  marginLeft={20}
                  marginRight={20}>
                  <ViewBorderRadius alignItems={'center'} marginRight={40}>
                    <Text fontSize={13} ftGray>
                      {Moment(
                        props.liveAdjustmentInfo.broadcastInfo
                          .expectedStartTime,
                      ).format('MM월DD일')}
                    </Text>
                    <Text fontSize={19} ftDarkNavy>
                      {Moment(
                        props.liveAdjustmentInfo.broadcastInfo
                          .expectedStartTime,
                      ).format('hh:mm')}
                    </Text>
                    <ViewBorder
                      borderRadius={5}
                      bgNavy
                      width={80}
                      height={25}
                      alignItems={'center'}>
                      <Text ftWhite paddingBottom={5}>
                        방송 시작
                      </Text>
                    </ViewBorder>
                  </ViewBorderRadius>
                  <ViewBorderRadius alignItems={'center'} marginRight={40}>
                    <Text fontSize={13} ftGray>
                      {Moment(
                        props.liveAdjustmentInfo.broadcastInfo.expectedEndTime,
                      ).format('MM월DD일')}
                    </Text>
                    <Text fontSize={19}>
                      {Moment(
                        props.liveAdjustmentInfo.broadcastInfo.expectedEndTime,
                      ).format('hh:mm')}
                    </Text>
                    <ViewBorder
                      borderRadius={5}
                      bgNavy
                      width={80}
                      height={25}
                      alignItems={'center'}>
                      <Text ftWhite paddingBottom={5}>
                        방송 종료
                      </Text>
                    </ViewBorder>
                  </ViewBorderRadius>
                  <ViewBorderRadius alignItems={'center'}>
                    <Text fontSize={13} ftTheme>
                      Live
                    </Text>
                    <Text fontSize={19} ftTheme>
                      {props.liveAdjustmentInfo.broadcastInfo.expectedPeriod}분
                    </Text>
                    <ViewBorder
                      borderRadius={5}
                      bgTheme
                      width={80}
                      height={25}
                      alignItems={'center'}>
                      <Text ftWhite paddingBottom={5}>
                        방송 시간
                      </Text>
                    </ViewBorder>
                  </ViewBorderRadius>
                </ViewRow>
              </View>
            ) : (
              <View>
                <Text marginTop={20} marginBottom={20}>
                  최근 방송 정보가 없습니다.
                </Text>
              </View>
            )}
          </View>
          <View
            height={'auto'}
            bgWhite
            paddingLeft={20}
            paddingRight={20}
            marginTop={15}>
            <Text
              ftDarkNavy
              bold
              fontSize={15}
              paddingTop={10}
              paddingBottom={10}>
              방송 수익 정보
            </Text>
            <View bgIceBlue height={2} />
            <ViewRow
              justifyContent={'space-between'}
              paddingTop={10}
              paddingBottom={10}>
              <Text ftDarkNavy fontSize={15}>
                라방 판매 갯수
              </Text>
              <Text ftDarkNavy fontSize={15} bold>
                {props.liveAdjustmentInfo.adjustmentInfo
                  ? props.liveAdjustmentInfo.adjustmentInfo.sellingAmount
                  : 0}
                개
              </Text>
            </ViewRow>
            <View bgIceBlue height={2} />
            <ViewRow
              justifyContent={'space-between'}
              paddingTop={10}
              paddingBottom={10}>
              <Text ftDarkNavy fontSize={15}>
                라방 수익
              </Text>
              <Text ftDarkNavy fontSize={15} bold>
                {props.liveAdjustmentInfo.adjustmentInfo
                  ? LocaleString(
                      props.liveAdjustmentInfo.adjustmentInfo.revenue,
                    )
                  : 0}
                원
              </Text>
            </ViewRow>
            <View bgIceBlue height={2} />
            <ViewRow
              justifyContent={'space-between'}
              paddingTop={10}
              paddingBottom={10}>
              <Text ftTheme fontSize={15}>
                라방 셀러 정산 수익
              </Text>
              <Text ftTheme fontSize={15} bold>
                {props.liveAdjustmentInfo.adjustmentInfo
                  ? LocaleString(props.liveAdjustmentInfo.adjustmentInfo.profit)
                  : 0}
                원
              </Text>
            </ViewRow>
            <View bgIceBlue height={2} />
            {/*<ViewRow*/}
            {/*  justifyContent={'space-between'}*/}
            {/*  paddingTop={10}*/}
            {/*  paddingBottom={10}>*/}
            {/*  <Text ftDarkNavy fontSize={15}>*/}
            {/*    입금 예정일*/}
            {/*  </Text>*/}
            {/*  <Text ftDarkNavy fontSize={15} bold>*/}
            {/*    5월 20일 (월)*/}
            {/*  </Text>*/}
            {/*</ViewRow>*/}
          </View>
        </View>
      ) : null}
    </>
  );
};
export default LiveBroadcastTab;
