// import original module declaration
import 'styled-components';

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius?: string;
    theme?: string;
    body?: any;
    text?: any;
    background?: any;
    toggleBorder?: any;
    backgroundDropdown?: any;
    colorDescription?: any;
    colors?: {
      main?: string;
      secondary?: string;
    };
  }
}
