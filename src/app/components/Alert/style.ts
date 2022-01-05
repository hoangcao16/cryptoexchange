import styled from 'styled-components';
import { Alert } from 'react-bootstrap';

export const StyledAlert = styled(Alert)`
  background-color: ${({ theme }) => theme.earthBrownColor};
  color: ${({ theme }) => theme.text};
  padding: 0 28px;
  line-height: 36px;
  height: 36px;
  border: none;
  margin-bottom: 0;
  svg {
    box-sizing: border-box;
    margin: 0 12px 0 0;
    min-width: 0px;
    color: ${({ theme }) => theme.secondary};
    font-size: 20px;
    fill: ${({ theme }) => theme.secondary};
    width: 1em;
    height: 1em;
  }
  .btn-close {
    padding: 11px 28px;
    outline: none;
    color: ${({ theme }) => theme.text};
    &:hover {
      color: ${({ theme }) => theme.text};
    }
    &:focus {
      box-shadow: none;
    }
  }
`;
export const StyledAlertLink = styled(Alert.Link)`
  margin-left: 8px;
  color: ${({ theme }) => theme.secondary} !important;
  text-decoration: none;
  cursor: pointer;
  font-weight: 400;
`;
