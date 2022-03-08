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
  .react-select-dropdown {
    background-color: ${({ theme }) => theme.body};
    border: ${({ theme }) => theme.borderGray};
    border-radius: 8px;
    font-size: 12px;
    text-align: center;
    .ant-select-item-option-content {
    color: ${({ theme }) => theme.text};
  }
  .ant-select-item-option-selected {
    background-color: ${({ theme }) => theme.darkGrayColor} !important;
    color: ${({ theme }) => theme.primary} !important;
    .ant-select-item-option-content {
    color: ${({ theme }) => theme.primary} !important;
    }
  }
  }


  .container {  
    @media (min-width: 1200px) {
      max-width: 1190px;
    }
    @media (min-width: 1400px) {
      max-width: 1320px;
    }
  }
  `;
