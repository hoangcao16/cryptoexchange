import { createGlobalStyle } from 'styled-components';
import BinancePlexRegular from '../app/assets/fonts/BinancePlex-Regular.otf';
import BinancePlexMedium from '../app/assets/fonts/BinancePlex-Medium.woff2';
import BinancePlexSemiBold from '../app/assets/fonts/BinancePlex-SemiBold.otf';
export const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'BinancePlex';
  src: url(${BinancePlexRegular}) format('opentype');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'BinancePlex';
  src: url(${BinancePlexMedium}) format('woff2');
  font-weight: 500;
  font-display: swap;
}
@font-face {
  font-family: 'BinancePlex';
  src: url(${BinancePlexSemiBold}) format('opentype');
  font-weight: 600;
  font-display: swap;
}
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: BinancePlex;
    transition: all 0.50s linear;
    font-size: 14px;
  }
  .navbar-dark .navbar-nav .nav-link {
    color: ${({ theme }) => theme.text};
    &:hover {
      color: ${({ theme }) => theme.colors?.secondary};
    }
}
  `;
