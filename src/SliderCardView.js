import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

import defaultIcons from "./Icons";
import FlipCard from "react-native-flip-card";

// custom button
import {Button} from './components/styled/Button';
import {ImageBorder} from './components/styled/Image';
import {ViewRow} from './components/styled/View';

const deleteCard = require('../images/icon_cancel_white.png')

const BASE_SIZE = { width: 300, height: 190 };

const s = StyleSheet.create({
  cardContainer: {},
  cardFace: {},
  icon: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 60,
    height: 40,
    resizeMode: "contain",
  },
  baseText: {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
  },
  placeholder: {
    color: "rgba(255, 255, 255, 0.5)",
  },
  focused: {
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 1)",
  },
  cardName: {
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    top: 20,
    left: 20,
  },
  number: {
    fontSize: 19,
    position: "absolute",
    top: 95,
    left: 28,
  },
  name: {
    fontSize: 16,
    position: "absolute",
    bottom: 20,
    left: 25,
    right: 100,
  },
  expiryLabel: {
    fontSize: 14,
    position: "absolute",
    bottom: 40,
    left: 218,
  },
  expiry: {
    fontSize: 16,
    position: "absolute",
    bottom: 20,
    left: 220,
  },
  amexCVC: {
    fontSize: 16,
    position: "absolute",
    top: 73,
    right: 30,
  },
  cvc: {
    fontSize: 16,
    position: "absolute",
    top: 80,
    right: 30,
  },
});

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class SliderCardView extends Component {
  static propTypes = {
    focused: PropTypes.string,

    brand: PropTypes.string,
    cardName: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
    expiry: PropTypes.string,
    cvc: PropTypes.string,
    placeholder: PropTypes.object,

    scale: PropTypes.number,
    fontFamily: PropTypes.string,
    imageFront: PropTypes.number,
    imageBack: PropTypes.number,
    customIcons: PropTypes.object,

    onPressDeleteCreditCard: PropTypes.object,
  };

  static defaultProps = {
    name: "",
    placeholder: {
      cardName: "카드사",
      number: "•••• •••• •••• ••••",
      name: "FULL NAME",
      expiry: "••/••",
      cvc: "•••",
    },

    scale: 1,
    fontFamily: Platform.select({ ios: "Courier", android: "monospace" }),
    imageFront: require("../images/card-front.png"),
    imageBack: require("../images/card-back.png"),
  };

  
  render() {
    const { focused,
      brand, name, cardName, number, expiry, cvc, customIcons,
      placeholder, imageFront, imageBack, scale, fontFamily, onPressDeleteCreditCard} = this.props;
      
      const Icons = { ...defaultIcons, ...customIcons };
      const isAmex = brand === "american-express";
      const shouldFlip = !isAmex && focused === "cvc";
      
      const containerSize = { ...BASE_SIZE, height: BASE_SIZE.height * scale };
      const transform = { transform: [
        { scale },
        { translateY: ((BASE_SIZE.height * (scale - 1) / 2)) },
      ] };

      return (
      <View style={[s.cardContainer, containerSize]}>
        <FlipCard style={{ borderWidth: 0 }}
          flipHorizontal
          flipVertical={false}
          friction={10}
          perspective={2000}
          clickable={false}
          flip={shouldFlip}>
          <ImageBackground style={[BASE_SIZE, s.cardFace, transform]}
            source={imageFront}>
              <Image style={[s.icon]}
                source={Icons[brand]} />
              <Text style={[s.baseText, { fontFamily }, s.cardName, !cardName && s.placeholder, focused === "cardName" && s.focused]}>
                { !cardName ? placeholder.cardName : cardName }
              </Text>
              <Button 
                marginTop={15}
                marginLeft={250} 
                width={'10%'} 
                onPress={() => onPressDeleteCreditCard()}>
                <ImageBorder
                  width={20}
                  height={20}
                  source={deleteCard}
                />
              </Button>
              <Text style={[s.baseText, { fontFamily }, s.number, !number && s.placeholder, focused === "number" && s.focused]}>
                { !number ? placeholder.number : number }
              </Text>
              {/* <Text style={[s.baseText, { fontFamily }, s.name, !name && s.placeholder, focused === "name" && s.focused]}
                numberOfLines={1}> 
                { !name ? placeholder.name : name.toUpperCase() }
              </Text>
              <Text style={[s.baseText, { fontFamily }, s.expiryLabel, s.placeholder, focused === "expiry" && s.focused]}>
                등록일
              </Text>
              <Text style={[s.baseText, { fontFamily }, s.expiry, !expiry && s.placeholder, focused === "expiry" && s.focused]}>
                { !expiry ? placeholder.expiry : expiry }
              </Text> */}
              { isAmex &&
                  <Text style={[s.baseText, { fontFamily }, s.amexCVC, !cvc && s.placeholder, focused === "cvc" && s.focused]}>
                    { !cvc ? placeholder.cvc : cvc }
                  </Text> }
          </ImageBackground>
          <ImageBackground style={[BASE_SIZE, s.cardFace, transform]}
            source={imageBack}>
              <Text style={[s.baseText, s.cvc, !cvc && s.placeholder, focused === "cvc" && s.focused]}>
                { !cvc ? placeholder.cvc : cvc }
              </Text>
          </ImageBackground>
        </FlipCard>
      </View>
    );
  }
}
