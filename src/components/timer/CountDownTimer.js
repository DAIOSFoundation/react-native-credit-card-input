import React from 'react'
import CountDown from 'react-native-countdown-component';
import Moment from 'moment'
import {Actions} from 'react-native-router-flux'

const CountDownTimer = (props) => {
  // 라이브 방송 남은 시간 계산 
  var until = null
  // expectedEndtime으로 끝나는 시간 계산
  const endTimeHour = Number(Moment(props.expectedEndTime).format('HH'))
  const endTimeMin = Number(Moment(props.expectedEndTime).format('MM'))
  const endTimeSec = Number(Moment(props.expectedEndTime).format('SS'))

  // 현재 시간
  const current = new Date
  
  // 끝나는 시간
  const endTime = new Date(
    current.getFullYear(), 
    current.getMonth(), 
    current.getDate(),
    endTimeHour, 
    endTimeMin, 
    endTimeSec
  )

  // 방송 시간 종료
  const onFinish = (() => {
    alert('라이브 방송 시간이 종료 되었습니다')
    Actions.pop()
  })

  // 라이브 방송 남은 시간 ((끝나는 시간 - 현재시간) / 1000) : milisecond 1000 나눠줌
  until = parseInt((endTime - current) / 1000)

  return (
    <CountDown
        size={13}
        until={until}
        onFinish={onFinish}
        digitStyle={{}}
        digitTxtStyle={{color: 'white'}}
        timeLabelStyle={{}}
        separatorStyle={{color: 'white'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
     );
};

export default CountDownTimer 
