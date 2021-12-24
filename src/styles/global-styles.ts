import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  .navbar-dark .navbar-nav .nav-link {
    color: ${({ theme }) => theme.text};
    &:hover {
      color: ${({ theme }) => theme.colors?.secondary};
    }
}
  `;
