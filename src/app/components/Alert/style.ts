import styled from 'styled-components';
import { Alert } from 'react-bootstrap';

export const StyledAlert = styled(Alert)`
  background-color: rgb(59, 38, 1);
  color: rgb(234, 236, 239);
  padding: 0 28px;
  line-height: 36px;
  height: 36px;
  border: none;
  margin-bottom: 0;
  svg {
    box-sizing: border-box;
    margin: 0 12px 0 0;
    min-width: 0px;
    color: rgb(240, 185, 11);
    font-size: 20px;
    fill: rgb(240, 185, 11);
    width: 1em;
    height: 1em;
  }
  .btn-close {
    padding: 11px 28px;
    outline: none;
    color: #ffffff;
    &:hover {
      color: #ffffff;
    }
    &:focus {
      box-shadow: none;
    }
  }
`;
export const StyledAlertLink = styled(Alert.Link)`
  margin-left: 8px;
  color: rgb(240, 185, 11) !important;
  text-decoration: none;
  cursor: pointer;
  font-weight: 400;
`;
