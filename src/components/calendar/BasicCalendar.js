import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import * as Common from '../styled/Common';
import {View, ViewBorderRadius} from '../styled/View';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';
import {useDispatch} from 'react-redux';
import {formatDate} from '../../utils/functions';

LocaleConfig.locales.kr = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],

  일: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'kr';

//onDayPress : 선택된 날짜
const BasicCalendar = (props) => {
  const weekendColorCheck = (date, state) => {
    let day = new Date(date).getDay();
    let result = {};

    // 토,일요일 폰트 색 변경
    if (day === 0) {
      result.color = Common.colors.THEME;
    } else if (day === 6) {
      result.color = Common.colors.BLUE_THEME;
    } else {
      result.color = props.dateTextColor || Common.colors.BLACK;
    }

    // 오늘 날짜 표시
    if (state === 'today') {
      result.backgroundColor = props.todayCircleColor || Common.colors.THEME;
      result.width = 22;
      result.height = 22;
      result.borderRadius = 11;
      result.textAlign = 'center';
      result.color = props.todayTextColor || Common.colors.WHITE;
    }

    return result;
  };

  //특정일 도트
  const liveCheck = (marking, date) => {
    if (marking.length !== 0) {
      if (formatDate() <= date.dateString) {
        return (
          <ViewBorderRadius
            alignSelf={'center'}
            bgTheme
            width={6}
            height={6}
            borderRadius={3}
          />
        );
      } else {
        return (
          <ViewBorderRadius
            alignSelf={'center'}
            bgLightBlueGray
            width={6}
            height={6}
            borderRadius={3}
          />
        );
      }
    }
  };

  const onPressDate = (date) => {
    props.onPress(date);
  };

  const changeTimeStampData = (date) => {
    if (props.onPressTimeStamp) {
      props.onPressTimeStamp(date);
    }
  };

  return (
    <Calendar
      current={props.currentCalendar ? props.currentCalendar : null}
      style={{marginVertical: 10}}
      minDate={new Date()}
      monthFormat={'yyyy년 MMMM'}
      hideArrows={false}
      markingType={'multi-dot'}
      formatMonth={'3'}
      markedDates={props.markDate || {}}
      hideExtraDays={true}
      onMonthChange={(month) => changeTimeStampData(month)}
      firstDay={0}
      theme={{
        calendarBackground: props.backgroundColor || Common.colors.WHITE,
        textSectionTitleColor: props.monthTextColor || Common.colors.BLACK,
        monthTextColor: props.dayTextColor || Common.colors.BLACK,
        arrowColor: props.arrowColor,
      }}
      dayComponent={({date, state, marking}) => {
        // console.log("date : ", date)
        // console.log("state : ", state)
        // console.log("marking : ", marking)
        return (
          <View>
            <Button
              width={30}
              height={props.height || 30}
              alignSelf={'center'}
              onPress={() => onPressDate(date)}>
              <Text
                ftWhite
                fontSize={15}
                marginTop={3}
                marginBottom={3}
                style={weekendColorCheck(date.dateString, state, marking)}>
                {date.day}
              </Text>
            </Button>
            {liveCheck(marking, date)}
          </View>
        );
      }}
    />
  );
};

export default BasicCalendar;
