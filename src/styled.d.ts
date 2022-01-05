// import original module declaration
import 'styled-components';

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
    main?: string;
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
    borderSectionFooter?: string;
    errorColor?: string;
  }
}
