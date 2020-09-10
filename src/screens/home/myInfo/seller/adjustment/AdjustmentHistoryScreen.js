import Moment from 'moment';
import React, {useState, useEffect} from 'react';
import Topbar from '../../../../../components/bar/Topbar';
import {Actions} from 'react-native-router-flux';
import {
  SafeAreaView,
  ScrollView,
  View,
  ViewBorderRadius,
  ViewRadiusCustom,
  ViewRow,
} from '../../../../../components/styled/View';
import {Text} from '../../../../../components/styled/Text';
import {
  ButtonBorderRadius,
  ButtonBottomBorder,
  GestureButtonBorderRadius,
} from '../../../../../components/styled/Button';
import BasicCalendar from '../../../../../components/calendar/BasicCalendar';
import * as Common from '../../../../../components/styled/Common';
import BottomModal from '../../../../../components/modal/BottomModal';
import {Image} from '../../../../../components/styled/Image';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as adjustmentAction from '../../../../../store/modules/adjustment/actions';
import {LocaleString} from '../../../../../utils/functions';

const AdjustmentHistoryScreen = () => {
  const dispatch = useDispatch();
  const {
    jwtToken,
    userId,
    startDate,
    specificDateAdjustmentInfo,
    endDate,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      startDate: state.adjustment.startDate,
      endDate: state.adjustment.endDate,
      specificDateAdjustmentInfo: state.adjustment.specificDateAdjustmentInfo,
    }),
    shallowEqual,
  );

  useEffect(() => {
    // setTestDate(null);
    testTwo();
  }, [specificDateAdjustmentInfo]);
  const [snapPoints, setSnapPoints] = useState([0]);
  const [modalIndex, setModalIndex] = useState(0);
  const [testDate, setTestDate] = useState(null);
  const [testArray, setTestArray] = useState([]);
  //하단 모달 열기
  const onPressBottomModalOpen = (size, dateType) => {
    setSnapPoints([size]);
    if (dateType === 'startDate') {
      setModalIndex(0);
    } else if (dateType === 'endDate') {
      setModalIndex(1);
    }
  };

  const onPressCalendarOK = () => {
    setSnapPoints([0]);
  };

  const onPressDate = (date) => {
    if (modalIndex === 0) {
      dispatch(adjustmentAction.change_adjustment_start_date(date));
    } else {
      dispatch(adjustmentAction.change_adjustment_end_date(date));
    }
  };

  const onPressLeftBack = () => {
    Actions.pop();
    dispatch(adjustmentAction.changE_date_state());
  };

  const onPressSearch = () => {
    setTestDate(null);

    if (startDate === null || endDate === null) {
      console.log('날짜를 입력해주세요');
    } else if (startDate > endDate) {
      console.log('날짜를 다시 입력해 주세요');
    } else {
      const params = {
        userId,
        jwtToken,
        startDate,
        endDate,
      };
      dispatch(adjustmentAction.get_specific_date_adjustment(params));
    }
  };

  const adjustmentType = (type) => {
    if (type === 'live') {
      return '라이브';
    } else if (type === 'feed') {
      return '피드';
    }
  };

  // 정산내역 오후 오전
  const adjustmentAmPm = (date) => {
    // if (date!==undefined) {
    let hour = new Date(date);
    if (hour.getHours() >= 0 && hour.getHours() < 12) {
      return '오전';
    } else {
      return '오후';
    }
  };

  const testTwo = () => {
    let arr = [];
    let total = 0;
    if (specificDateAdjustmentInfo?.length > 0) {
      for (let i = 0; i < specificDateAdjustmentInfo.length; i++) {
        for (let j = 0; j < specificDateAdjustmentInfo[i].data.length; j++) {
          total += specificDateAdjustmentInfo[i].data[j].profit;
        }
        if (specificDateAdjustmentInfo[i].data.length !== 0) {
          arr.push(
            <View>
              <View bgDarkWhite height={13}/>
              <View paddingLeft={20} paddingRight={20} paddingTop={13}>
                <ViewRow justifyContent="space-between">
                  <Text bold ftGray>
                    {specificDateAdjustmentInfo[i].date}
                  </Text>
                  <Text ftGray>총액 {LocaleString(total)}원</Text>
                </ViewRow>
              </View>
            </View>,
          );
        }
        for (let j = 0; j < specificDateAdjustmentInfo[i].data.length; j++) {
          arr.push(
            <View marginBottom={10}>
              <View paddingLeft={20} paddingRight={20}>
                <View bgDarkWhite height={2}/>
                <ViewRow
                  justifyContent="space-between"
                  alignItems={'center'}
                  paddingTop={15}>
                  <ViewBorderRadius>
                    <Text bold fontSize={15}>
                      {adjustmentType(
                        specificDateAdjustmentInfo[i].data[j].type,
                      )}
                      방송 수익금 정산
                    </Text>
                    <ViewRow>
                      <Text ftLightWhiteGray fontSize={13} paddingRight={3}>
                        {Moment(
                          specificDateAdjustmentInfo[i].data[j].assignedAt,
                        ).format('MM.DD ')}
                      </Text>
                      <Text ftLightWhiteGray fontSize={13} paddingRight={4}>
                        {adjustmentAmPm(
                          specificDateAdjustmentInfo[i].data[j].assignedAt,
                        )}
                      </Text>
                      <Text ftLightWhiteGray fontSize={13}>
                        {Moment(
                          specificDateAdjustmentInfo[i].data[j].assignedAt,
                        ).format('hh:MM ')}
                      </Text>
                    </ViewRow>
                  </ViewBorderRadius>
                  <Text ftTheme bold fontSize={15}>
                    {LocaleString(specificDateAdjustmentInfo[i].data[j].profit)}
                    원
                  </Text>
                </ViewRow>
              </View>
            </View>,
          );
        }
      }
    }
    setTestArray(arr);
  };

  const renderView = () => {
    return (
      <ViewRadiusCustom
        height={'100%'}
        borderWidth={1}
        borderTopLeftRadius={15}
        borderTopRightRadius={15}
        brLightGray
        bgWhite>
        <View flex={5}>
          <BasicCalendar
            height={25}
            backgroundColor={Common.colors.WHITE}
            monthTextColor={Common.colors.DARK_GRAY_BLUE}
            dayTextColor={Common.colors.DARK_GRAY_BLUE}
            dateTextColor={Common.colors.DARK_GRAY_BLUE}
            arrowColor={Common.colors.NAVY}
            todayCircleColor={Common.colors.THEME}
            todayTextColor={Common.colors.WHITE}
            onPress={onPressDate}
          />
        </View>
        <View flex={1} marginTop={'auto'}>
          <View marginLeft={20} marginRight={20}>
            <GestureButtonBorderRadius
              bgTheme
              height={50}
              onPress={() => onPressCalendarOK()}>
              <Text ftWhite>확인</Text>
            </GestureButtonBorderRadius>
          </View>
        </View>
      </ViewRadiusCustom>
    );
  };

  return (
    <SafeAreaView>
      <Topbar
        isLine
        title={'정산 내역'}
        isLeftButton
        onPressLeft={() => onPressLeftBack()}
      />
      <ScrollView>
        <View>
          <View height={150} paddingLeft={20} paddingRight={20} paddingTop={20}>
            <Text bold fontSize={15}>
              조회 기간 설정
            </Text>
            <ViewRow
              width={'100%'}
              marginTop={5}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <ButtonBottomBorder
                paddingRight={5}
                justifyContent={'space-between'}
                width={160}
                borderBottomColor={'#cbced5'}
                onPress={() => onPressBottomModalOpen(400, 'startDate')}>
                <Text ftDarkNavy>{startDate}</Text>
                <Image
                  width={17}
                  height={17}
                  source={require('../../../../../assets/myinfo/icon_calendar_grey.png')}
                />
              </ButtonBottomBorder>
              <View bgDarkNavy width={8} height={2}/>
              <ButtonBottomBorder
                paddingRight={5}
                justifyContent={'space-between'}
                width={160}
                borderBottomColor={'#cbced5'}
                onPress={() => onPressBottomModalOpen(400, 'endDate')}>
                <Text ftDarkNavy>{endDate}</Text>
                <Image
                  width={17}
                  height={17}
                  source={require('../../../../../assets/myinfo/icon_calendar_grey.png')}
                />
              </ButtonBottomBorder>
            </ViewRow>
            <ButtonBorderRadius
              bgNavy
              marginTop={10}
              onPress={() => onPressSearch()}>
              <Text ftWhite>조회</Text>
            </ButtonBorderRadius>
          </View>
          {testArray}
        </View>
      </ScrollView>
      <BottomModal
        headerGesture={false}
        contentGesture={false}
        initialSnap={0}
        snapPoints={snapPoints}
        view={renderView()}
      />
    </SafeAreaView>
  );
};

export default AdjustmentHistoryScreen;
