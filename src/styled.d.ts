// import original module declaration
import 'styled-components';

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
    primary?: string;
    secondary?: string;
    borderRadius?: string;
    theme?: string;
    body?: string;
    text?: string;
    background?: string;
    toggleBorder?: string;
    backgroundDropdown?: string;
    colorDescription?: string;
    borderGray?: string;
    borderBlack?: string;
    backgroundAccordion?: string;
    grayColor?: string;
    earthBrownColor?: string;
    matteWhiteColor?: string;
    brightGreenColor?: string;
    brightGrayColor?: string;
    brightBlackColor?: string;
    darkGrayColor?: string;
    darkerGrayColor?: string;
    darkBrightGrayColor?: string;
    greenColor?: string;
    darkPinkColor?: string;
    backgroundFooter?: string;
    backgroundWallet?: string;
    borderSectionFooter?: string;
    errorColor?: string;
    whiteSmokeColor?: string;
    slateGrayColor?: string;
    graySmokeColor?: string;
    redColor?: string;
    darkWashedGreen?: string;
    middleWashedRose?: string;
  }
}
