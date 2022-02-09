import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all .5s linear;
    box-sizing: border-box;
  }
  .navbar-dark .navbar-nav .nav-link {
    color: ${({ theme }) => theme.text};
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
  .container {  
    @media (min-width: 1200px) {
      max-width: 1190px;
    }
    @media (min-width: 1400px) {
      max-width: 1400px;
    }
  }
  `;
