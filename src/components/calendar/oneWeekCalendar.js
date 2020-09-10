import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import * as Common from '../styled/Common';
import {formatDate} from '../../utils/functions';
import {View, ViewRow, ViewBorderRadius} from '../styled/View';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

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

  dayNames: [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'kr';

//onDayPress : 선택된 날짜
const oneWeekCalendar = (props) => {
  const dispatch = useDispatch();

  const weekendColorCheck = (day, state) => {
    let result = {};
    // 토,일요일 폰트 색 변경
    if (day === '일') {
      result.color = Common.colors.THEME;
    } else if (day === '토') {
      result.color = Common.colors.BLUE_THEME;
    } else {
      result.color = Common.colors.DARK_GRAY_BLUE;
    }
    //오늘 날짜 표시
    if (state) {
      result.backgroundColor = Common.colors.THEME;
      result.width = 22;
      result.height = 22;
      result.borderRadius = 11;
      result.textAlign = 'center';
      result.color = Common.colors.WHITE;
    }
    return result;
  };
  //특정일 도트
  const liveCheck = (dot, dotColor) => {
    // console.log("dot : ", dot)
    // console.log("dotColor : ", dotColor)
    if (dot) {
      if (dotColor) {
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
    } else {
      return (
        <ViewBorderRadius
          alignSelf={'center'}
          width={6}
          height={6}
          borderRadius={3}
        />
      );
    }
  };

  let year = props.year;
  let month = props.month;
  let day = props.day;
  let date = props.date;

  if (month - 1 === 0) {
    year--;
  }
  let lastMonthLastDate = new Date(year, month - 1, 0).getDate();
  let thisMonthLastDate = new Date(year, month, 0).getDate();

  //today : 오늘인지에 대한 속성값 true일 경우 해당일자에 색깔 동그라미 표시
  //dot : 서버 통신 후 특정일에 방송이 있는지 없는 지 표시(true)

  let dayArray = [
    {day: '일', today: false, dot: false, dotColor: false},
    {day: '월', today: false, dot: false, dotColor: false},
    {day: '화', today: false, dot: false, dotColor: false},
    {day: '수', today: false, dot: false, dotColor: false},
    {day: '목', today: false, dot: false, dotColor: false},
    {day: '금', today: false, dot: false, dotColor: false},
    {day: '토', today: false, dot: false, dotColor: false},
  ];
  dayArray[day].today = true;
  dayArray[day].date = date;

  let temp = 0;
  for (let i = 1; i <= day; i++) {
    if (date - i > 0) {
      dayArray[day - i].date = date - i;
    } else {
      //1일보다 적을 경우 이전달 표시
      dayArray[day - i].date = lastMonthLastDate - temp;
      temp++;
    }
  }

  for (let j = 1; j <= 6 - day; j++) {
    if (date + j <= thisMonthLastDate) {
      dayArray[day + j].date = date + j;
    } else {
      //마지막날이 넘어가면 달이 넘어감
      dayArray[day + j].date = date + j - thisMonthLastDate;
    }
  }
  //서버 통신 후 dot값 할당
  props.data.map((item, index) => {
    let test = item.day;
    dayArray.map((item, index) => {
      if (item.date === test) dayArray[index].dot = true;
    });
  });

  return (
    <View marginTop={10} marginBottom={5}>
      <ViewRow marginRight={10} marginLeft={10}>
        {dayArray.map((item, index) => {
          return (
            <View
              key={index}
              flex={1}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text marginTop={7} ftGray>
                {item.day}
              </Text>
              <Text
                marginTop={7}
                marginBottom={7}
                style={weekendColorCheck(item.day, item.today)}>
                {item.date}
              </Text>
              {liveCheck(item.dot, item.dotColor)}
            </View>
          );
        })}
      </ViewRow>
    </View>
  );
};

export default oneWeekCalendar;
