// import original module declaration
import 'styled-components';

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius?: string;
    theme?: string;
    body?: string;
    text?: string;
    background?: string;
    toggleBorder?: string;
    backgroundDropdown?: string;
    colorDescription?: string;
    borderGray?: string;
    colors?: {
      main?: string;
      secondary?: string;
    };
  }
}
