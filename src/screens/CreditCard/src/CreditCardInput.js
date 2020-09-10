import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactNative, {
  NativeModules,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  ViewPropTypes,
} from "react-native";

import CreditCard from "./CardView";
import CCInput from "./CCInput";
import { InjectedProps } from "./connectToState";
import { ViewRow } from '../../../components/styled/View'

const s = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  form: {
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  inputLabel: {
    fontWeight: "bold",
  },
  input: {
    height: 40,
  },
});

const FULL_WIDTH = Dimensions.get("window").width - 110
const HALF_WIDTH = FULL_WIDTH / 2 - 10

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CreditCardInput extends Component {
  static propTypes = {
    ...InjectedProps,
    labels: PropTypes.object,
    placeholders: PropTypes.object,

    labelStyle: Text.propTypes.style,
    inputStyle: Text.propTypes.style,
    inputContainerStyle: ViewPropTypes.style,

    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    cardImageFront: PropTypes.number,
    cardImageBack: PropTypes.number,
    cardScale: PropTypes.number,
    cardFontFamily: PropTypes.string,
    cardBrandIcons: PropTypes.object,

    allowScroll: PropTypes.bool,

    additionalInputsProps: PropTypes.objectOf(PropTypes.shape(TextInput.propTypes)),
  };

  static defaultProps = {
    cardViewSize: {},
    labels: {
      name: "이름",
      number: "카드번호",
      expiry: "월/년도",
      cvc: "CVC/CCV",
      birth: "생년월일 6자리",
      password: "비밀번호 앞 2자리",
      postalCode: "POSTAL CODE",
    },
    placeholders: {
      name: "사용자 이름",
      number: "- 를 제외한 카드번호 16자리",
      expiry: "MM/YY",
      cvc: "CVC",
      birth: "ex) 901111",
      password: "**",
      postalCode: "34567",
    },
    inputContainerStyle: {
      // borderBottomWidth: 1,
      // borderBottomColor: "black",
    },
    validColor: "",
    invalidColor: "",
    placeholderColor: "gray",
    allowScroll: false,
    additionalInputsProps: {},
  };

  componentDidMount = () => this._focus(this.props.focused);

  componentWillReceiveProps = newProps => {
    if (this.props.focused !== newProps.focused) this._focus(newProps.focused);
  };

  _focus = field => {
    if (!field) return;

    const scrollResponder = this.refs.Form.getScrollResponder();
    const nodeHandle = ReactNative.findNodeHandle(this.refs[field]);

    NativeModules.UIManager.measureLayoutRelativeToParent(nodeHandle,
      e => { throw e; },
      x => {
        scrollResponder.scrollTo({ x: Math.max(x - 40, 0), animated: true });
        this.refs[field].focus();
      });
  }

  _inputProps = field => {
    const {
      inputStyle, labelStyle, validColor, invalidColor, placeholderColor,
      placeholders, labels, values, status,
      onFocus, onChange, onBecomeEmpty, onBecomeValid,
      additionalInputsProps,
    } = this.props;

    return {
      inputStyle: [s.input, inputStyle],
      labelStyle: [s.inputLabel, labelStyle],
      validColor, invalidColor, placeholderColor,
      ref: field, field,

      label: labels[field],
      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

      onFocus, onChange, onBecomeEmpty, onBecomeValid,

      additionalInputProps: additionalInputsProps[field],
    };
  };

  render() {
    const {
      cardImageFront, cardImageBack, inputContainerStyle,
      values: { number, expiry, cvc, name, birth, password, type }, focused,
      allowScroll, requiresName, requiresCVC, requiresPostalCode,
      cardScale, cardFontFamily, cardBrandIcons,
    } = this.props;

    return (
      <View style={s.container}>
        <CreditCard focused={focused}
          brand={type}
          scale={cardScale}
          fontFamily={cardFontFamily}
          imageFront={cardImageFront}
          imageBack={cardImageBack}
          customIcons={cardBrandIcons}
          name={requiresName ? name : " "}
          number={number}
          expiry={expiry}
          birth={birth}
          password={password}
          cvc={cvc} />
        <ScrollView ref="Form"
          // horizontal
          keyboardShouldPersistTaps="always"
          scrollEnabled={allowScroll}
          showsHorizontalScrollIndicator={false}
          style={s.form}>
          <CCInput {...this._inputProps("number")}
            keyboardType="numeric"
            containerStyle={[s.inputContainer, inputContainerStyle]} />
          <ViewRow width={FULL_WIDTH} justifyContent={'space-between'}>
            {/*<CCInput {...this._inputProps("name")}*/}
            {/*  containerStyle={[s.inputContainer, inputContainerStyle, { width: HALF_WIDTH }]} /> */}
            <CCInput {...this._inputProps("expiry")}
              keyboardType="numeric"
              containerStyle={[s.inputContainer, inputContainerStyle, { width: HALF_WIDTH }]} />
            <CCInput {...this._inputProps("birth")}
              keyboardType="numeric"
              containerStyle={[s.inputContainer, inputContainerStyle, { width: HALF_WIDTH}]} />
          </ViewRow>
          <ViewRow width={FULL_WIDTH} justifyContent={'space-between'}>
            <CCInput {...this._inputProps("password")}
              keyboardType="numeric"
              containerStyle={[s.inputContainer, inputContainerStyle, { width: HALF_WIDTH}]} /> 
          </ViewRow>
          { requiresCVC &&
            <CCInput {...this._inputProps("cvc")}
              keyboardType="numeric"
              containerStyle={[s.inputContainer, inputContainerStyle, { width: HALF_WIDTH}]} /> }
          { requiresPostalCode &&
            <CCInput {...this._inputProps("postalCode")}
              keyboardType="numeric"
              containerStyle={[s.inputContainer, inputContainerStyle, { width: HALF_WIDTH}]} /> }
        </ScrollView>
      </View>
    );
  }
}
