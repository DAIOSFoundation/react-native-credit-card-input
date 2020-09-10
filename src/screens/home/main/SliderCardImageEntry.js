import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native'
import {SliderCardView} from '../../CreditCard'
// Styled Component
import {Button} from '../../../components/styled/Button';
import {ImageBorder} from '../../../components/styled/Image';
// actions
import {Actions} from 'react-native-router-flux';
// utils
import {addSpace} from '../../../utils/functions'
// react redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux'
// actions
import * as regularPaymentActions from '../../../store/modules/regularPayment/actions';

const creditCardSample_1 = require('../../../assets/creditCardSample/creditCardSample_1.jpg');

const SliderCardImageEntry = (props) => {
  const dispatch = useDispatch();

  const {target} = useSelector(
    (state) => ({
      target: state.regularPayment.target
    }),
  shallowEqual
  );

  useEffect(() => {
    dispatch(regularPaymentActions.change_target(props.target))
  }, [props.target])

  return (
    <TouchableOpacity style={{height: 200}}>
      {!props.data._id ? (
        <Button height={200} onPress={() => Actions.addCardScreen()}>
          <ImageBorder
            borderRadius={10}
            source={creditCardSample_1}
          />
        </Button>
      ) : (
        <SliderCardView 
          cardName={props.data.cardName}
          number={addSpace(props.data.cardNumber)}
          onPressDeleteCreditCard={() => props.onPressDeleteCreditCard(props.data._id)}
        />
      )}
    </TouchableOpacity>
  );
};

export default SliderCardImageEntry;
