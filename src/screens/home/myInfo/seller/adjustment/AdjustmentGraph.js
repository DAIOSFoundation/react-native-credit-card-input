import React from 'react';
// Styled Component
import {ScrollView, View} from '../../../../../components/styled/View';
import {screenWidth} from '../../../../../components/styled/ScreenSize';
// MPM Module
import {Text} from 'react-native-svg';
import {BarChart, XAxis} from 'react-native-svg-charts';

const AdjustmentGraph = () => {
  const data = {
    date: [
      '3월1일',
      '3월2일',
      '3월3일',
      '3월4일',
      '3월5일',
      '3월6일',
      '3월7일',
    ],

    value: [3041431, 4519312, 1230431, 5695045, 9642412, 6594341, 2435291],
  };

  const Labels = (props) => {
    let value1 = 0;
    return data.map((value, index) => {
      if (index !== 0) value1 += 77;

      return (
        <Text key={index} x={value1} y={15} fontSize={10} fill="#162037">
          {' '}
          {value.value}원
        </Text>
      );
    });
  };

  return (
    <ScrollView horizontal={true}>
      <View width={screenWidth} height={200}>
        <BarChart
          style={{flex: 1}}
          data={data.value}
          svg={{fill: '#cbced5'}}
          gridMin={0}
          contentInset={{top: 10, bottom: 10}}>
          {/*<Labels />*/}
        </BarChart>
        <XAxis
          style={{marginHorizontal: -10}}
          data={data.date}
          formatLabel={(item, index) => data.date[index]}
          contentInset={{left: 40, right: 35}}
          svg={{fontSize: 15, fill: 'grey', fontWeight: 'bold'}}
        />
      </View>
    </ScrollView>
  );
};

export default AdjustmentGraph;
