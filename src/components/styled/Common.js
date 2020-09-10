export const colors = {
  THEME: '#e6427a',
  BLUE_THEME: '#6387e3',
  WHITE: '#ffffff',
  DARK_WHITE: '#f8f8fa',
  DARK_NAVY: '#162037',
  NAVY: '#435576',
  FUN_NAVY: '#142a54',
  LIGHT_BLUE_GRAY: '#cbced5',
  LIGHT_NAVY_GRAY: '#6b778f',
  RED: '#ff6262',
  GRAY: '#767b80',
  LIGHT_WHITE_GRAY: '#8f9499',
  DARK_GRAY: '#646973',
  DARK_GRAY_BLUE: '#2c3957',
  LIGHT_NAVY: '#24314f',
  LIGHT_GRAY: '#aeb9d3',
  ICE_BLUE: '#edeff2',
  DARK_CERULEA: '#46649f',
  LIGHT_RED: '#ff8373',
  BLACK: '#000000',
  SOFT_GRAY: '#e8eaf0',
  LIGHT_PINK: '#f8d6e2',
  YELLOW: '#ffcd00',
  GOLD: '#ffdb89',
  BROWN: '#3c1e1f',
  BLACK_ALPHA: '#000000AA',
};

//color
export const BACKGROUND_COLOR = (props) => {
  if (props.bgTheme) {
    return colors.THEME;
  } else if (props.bgWhite) {
    return colors.WHITE;
  } else if (props.bgDarkNavy) {
    return colors.DARK_NAVY;
  } else if (props.bgLightBlueGray) {
    return colors.LIGHT_BLUE_GRAY;
  } else if (props.bgGray) {
    return colors.GRAY;
  } else if (props.bgDarkGray) {
    return colors.DARK_GRAY;
  } else if (props.bgLightNavy) {
    return colors.LIGHT_NAVY;
  } else if (props.bgLightWhiteGray) {
    return colors.LIGHT_WHITE_GRAY;
  } else if (props.bgNavy) {
    return colors.NAVY;
  } else if (props.bgIceBlue) {
    return colors.ICE_BLUE;
  } else if (props.bgCerulean) {
    return colors.DARK_CERULEA;
  } else if (props.bgDarkWhite) {
    return colors.DARK_WHITE;
  } else if (props.bgLightRed) {
    return colors.LIGHT_RED;
  } else if (props.bgFunNavy) {
    return colors.FUN_NAVY;
  } else if (props.bgLightNavyGray) {
    return colors.LIGHT_NAVY_GRAY;
  } else if (props.bgBlack) {
    return colors.BLACK;
  } else if (props.bgSoftGray) {
    return colors.SOFT_GRAY;
  } else if (props.bgLightPink) {
    return colors.LIGHT_PINK;
  } else if (props.bgYellow) {
    return colors.YELLOW;
  } else if (props.bgBlackAlpha) {
    return colors.BLACK_ALPHA;
  } else if (props.bgDarkGrayBlue) {
    return colors.DARK_GRAY_BLUE;
  } else if (props.bgGold) {
    return colors.GOLD;
  } else {
    return 'transparent';
  }
};
export const BORDER_COLOR = (props) => {
  if (props.brTheme) {
    return colors.THEME;
  } else if (props.brWhite) {
    return colors.WHITE;
  } else if (props.brDarkNavy) {
    return colors.DARK_NAVY;
  } else if (props.brLightGray) {
    return colors.LIGHT_BLUE_GRAY;
  } else if (props.brGray) {
    return colors.GRAY;
  } else if (props.brDarkGray) {
    return colors.DARK_GRAY;
  } else if (props.brLightNavy) {
    return colors.LIGHT_NAVY;
  } else if (props.brLightWhiteGray) {
    return colors.LIGHT_WHITE_GRAY;
  } else if (props.brNavy) {
    return colors.NAVY;
  } else if (props.brIceBlue) {
    return colors.ICE_BLUE;
  } else if (props.brCerulean) {
    return colors.DARK_CERULEA;
  } else if (props.brDarkWhite) {
    return colors.DARK_WHITE;
  } else if (props.brLightRed) {
    return colors.LIGHT_RED;
  } else if (props.brFunNavy) {
    return colors.FUN_NAVY;
  } else if (props.brLightNavyGray) {
    return colors.LIGHT_NAVY_GRAY;
  } else if (props.brDarkGrayBlue) {
    return colors.DARK_GRAY_BLUE;
  } else if (props.brGold) {
    return colors.GOLD;
  } else {
    return 'transparent';
  }
};
export const FONT_COLOR = (props) => {
  if (props.ftTheme) {
    return colors.THEME;
  } else if (props.ftWhite) {
    return colors.WHITE;
  } else if (props.ftDarkNavy) {
    return colors.DARK_NAVY;
  } else if (props.ftLightGray) {
    return colors.LIGHT_BLUE_GRAY;
  } else if (props.ftGray) {
    return colors.GRAY;
  } else if (props.ftDarkGray) {
    return colors.DARK_GRAY;
  } else if (props.ftRed) {
    return colors.RED;
  } else if (props.ftLightNavy) {
    return colors.LIGHT_NAVY;
  } else if (props.ftLightWhiteGray) {
    return colors.LIGHT_WHITE_GRAY;
  } else if (props.ftNavy) {
    return colors.NAVY;
  } else if (props.ftIceBlue) {
    return colors.ICE_BLUE;
  } else if (props.ftCerulean) {
    return colors.DARK_CERULEA;
  } else if (props.ftLightRed) {
    return colors.LIGHT_RED;
  } else if (props.ftFunNavy) {
    return colors.FUN_NAVY;
  } else if (props.ftLightNavyGray) {
    return colors.LIGHT_NAVY_GRAY;
  } else if (props.ftBROWN) {
    return colors.BROWN;
  } else if (props.ftDarkGrayBlue) {
    return colors.DARK_GRAY_BLUE;
  } else if (props.ftLightGray) {
    return colors.LIGHTGRAY;
  } else if (props.ftGold) {
    return colors.GOLD;
  } else if (props.ftLightPink) {
    return colors.LIGHT_PINK;
  } else if (props.ftBlueTheme) {
    return colors.BLUE_THEME;
  } else {
    return '#000000';
  }
};

//margin
export const MARGIN_TOP = (props) => {
  return props.marginTop || '0';
};
export const MARGIN_LEFT = (props) => {
  return props.marginLeft || '0';
};
export const MARGIN_RIGHT = (props) => {
  return props.marginRight || '0';
};
export const MARGIN_BOTTOM = (props) => {
  return props.marginBottom || '0';
};

//padding
export const PADDING_TOP = (props) => {
  return props.paddingTop || '0';
};
export const PADDING_LEFT = (props) => {
  return props.paddingLeft || '0';
};
export const PADDING_RIGHT = (props) => {
  return props.paddingRight || '0';
};
export const PADDING_BOTTOM = (props) => {
  return props.paddingBottom || '0';
};

//border width
export const BORDER_LEFT_WIDTH = (props) => {
  return props.borderLeftWidth || '1px';
};
export const BORDER_RIGHT_WIDTH = (props) => {
  return props.borderRightWidth || '1px';
};
export const BORDER_BOTTOM_WIDTH = (props) => {
  return props.borderBottomWidth || '1px';
};
export const BORDER_TOP_WIDTH = (props) => {
  return props.borderTopWidth || '1px';
};

//font
export const FONT_SIZE = (props) => {
  if (props.ftVerySmall) {
    return '9px';
  } else if (props.ftSmall) {
    return '12px';
  } else if (props.ftLarge) {
    return '18px';
  } else if (props.ftBigLarge) {
    return '28px';
  } else if (props.fontSize) {
    return props.fontSize;
  } else {
    return '14px';
  }
};
export const FONT_WEIGHT = (props) => {
  if (props.bold) {
    return 'bold';
  } else {
    return 'normal';
  }
};
