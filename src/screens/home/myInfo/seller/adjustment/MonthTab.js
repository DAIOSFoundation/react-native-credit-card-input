import React from 'react';
// Styled Component
import {
  View,
  ViewBorderRadius,
  ViewRow,
} from '../../../../../components/styled/View';
import {Text} from '../../../../../components/styled/Text';
// NPM Module
import Moment from 'moment';
// utils Import
import {LocaleString} from '../../../../../utils/functions';

const MonthTab = (props) => {
  console.log('MonthTab props => ', props.monthAdjustmentInfo);

  return (
    <View>
      {props.monthAdjustmentInfo ? (
        <>
          {props.monthAdjustmentInfo.adjustmentInfo.length !== 0 ? (
            <View>
              <View bgWhite paddingLeft={20} paddingRight={20}>
                <ViewRow
                  paddingTop={20}
                  paddingBottom={20}
                  alignItems={'center'}
                  justifyContent={'space-between'}>
                  <ViewBorderRadius>
                    <Text ftGray>
                      {Moment(
                        props.monthAdjustmentInfo.adjustmentInfo[0].assignedAt,
                      ).format('YYYY.MM.DD(dd)')}
                    </Text>
                    <Text ftDarkNavy bold fontSize={15}>
                      방송 정산 완료 금액
                    </Text>
                  </ViewBorderRadius>
                  <Text ftDarkNavy bold fontSize={20}>
                    {LocaleString(
                      props.monthAdjustmentInfo.adjustmentInfo[0].profit,
                    )}
                    원
                  </Text>
                </ViewRow>
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
                  수익 정보
                </Text>
                <View bgIceBlue height={2} />
                <ViewRow
                  justifyContent={'space-between'}
                  paddingTop={10}
                  paddingBottom={10}>
                  <Text ftDarkNavy fontSize={15}>
                    {props.broadcastRevenue}
                  </Text>
                  <ViewRow alignItems={'center'}>
                    <Text ftDarkNavy fontSize={15} bold>
                      {LocaleString(
                        props.monthAdjustmentInfo.adjustmentInfo[0].revenue,
                      )}
                      원
                    </Text>
                  </ViewRow>
                </ViewRow>
                <View>
                  {/*{profitButton ? <AdjustmentGraph /> : <></>}*/}
                  <View bgIceBlue height={2} />
                  {/*<ViewRow*/}
                  {/*  justifyContent={'space-between'}*/}
                  {/*  paddingTop={10}*/}
                  {/*  paddingBottom={10}>*/}
                  {/*  <Text ftDarkNavy fontSize={15}>*/}
                  {/*    {props.broadcastNumber}*/}
                  {/*  </Text>*/}
                  {/*  <ViewRow alignItems={'center'}>*/}
                  {/*    <Text ftDarkNavy fontSize={15} bold>*/}
                  {/*      1회*/}
                  {/*    </Text>*/}
                  {/*  </ViewRow>*/}
                  {/*</ViewRow>*/}
                  {/*<View bgIceBlue height={2} />*/}
                  {/*<ViewRow*/}
                  {/*  justifyContent={'space-between'}*/}
                  {/*  paddingTop={10}*/}
                  {/*  paddingBottom={10}>*/}
                  {/*  <Text ftDarkNavy fontSize={15}>*/}
                  {/*    {props.broadcastTime}*/}
                  {/*  </Text>*/}
                  {/*  <Text ftDarkNavy fontSize={15} bold>*/}
                  {/*    60분*/}
                  {/*  </Text>*/}
                  {/*</ViewRow>*/}
                  {/*<View bgIceBlue height={2} />*/}
                  <ViewRow
                    justifyContent={'space-between'}
                    paddingTop={10}
                    paddingBottom={10}>
                    <Text ftTheme fontSize={15}>
                      {props.adjustmentProfit}
                    </Text>
                    <View alignItems={'flex-end'}>
                      <Text ftTheme fontSize={15} bold>
                        {LocaleString(
                          props.monthAdjustmentInfo.adjustmentInfo[0].profit,
                        )}
                        원
                      </Text>
                      <Text ftTheme fontSize={11}>
                        세금 3.3% 포함
                      </Text>
                    </View>
                  </ViewRow>
                </View>
              </View>
            </View>
          ) : (
            <View paddingLeft={15}>
              <Text ftDarkNavy ftLarge marginTop={20}>
                한달 정산 데이터가 없습니다.
              </Text>
            </View>
          )}
        </>
      ) : null}
    </View>
  );
};

export default MonthTab;
