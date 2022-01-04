import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';
export const Container = styled.div`
  flex: 1;
  background-color: rgb(30, 32, 38);
`;
export const Header = styled.div`
  display: flex;
  height: 48px;
  cursor: pointer;
  .tradeItemSwitchWrap {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    font-size: 14px;
    color: rgb(132, 142, 156);
    text-align: center;
    background-color: rgb(22, 26, 30);
    border-top: 2px solid transparent;
    border-bottom: 1px solid rgb(43, 49, 58);
  }
  .spotTab {
    width: 120px;
  }
  .active {
    border-top: 2px solid rgb(240, 185, 11);
    border-right: 1px solid rgb(43, 49, 58);
    border-bottom: 1px solid transparent;
    color: rgb(234, 236, 239);
    background-color: rgb(30, 32, 38);
  }
`;
export const A = styled.a`
  margin: 0px 16px;
  min-width: 0px;
  display: flex;
  color: rgb(132, 142, 156);
  font-size: 12px;
  height: 16px;
  text-decoration: none;
  &:hover {
    color: rgb(132, 142, 156);
  }
  .hrefText {
    text-decoration: underline;
    &:hover {
      color: rgb(234, 236, 239);
    }
  }
  .marginRatio {
    height: 16px;
    margin-left: 4px;
    padding: 0px 4px;
    color: rgb(240, 185, 11);
    font-size: 12px;
    border-radius: 2px;
    background-color: rgb(60, 46, 16);
  }
`;
export const StyledDropdown = styled(Dropdown)`
  margin: 0px 8px 0px 0px;
  .dropdown-toggle {
    padding: 0px;
    margin: 0px;
    min-width: 0px;
    &::after {
      display: none;
    }
    &:active:focus {
      box-shadow: none;
    }
  }
  .more-icon {
    margin: 0px;
    min-width: 0px;
    fill: currentcolor;
    font-size: 20px;
    cursor: pointer;
    color: rgb(61, 70, 83);
    width: 1em;
    height: 1em;
    &:hover {
      color: rgb(132, 142, 156);
    }
  }
  .btn-success {
    background-color: transparent !important;
    border: none;
    &:hover {
      background-color: transparent;
      border: none;
    }
  }
  .dropdown-menu {
    background-color: #1e2026;
    padding: 0px;
    min-width: 160px;
    font-size: 14px;
    .dropdown-item {
      color: ${({ theme }) => theme.text};
      padding: 0.5rem 1rem;
      &:hover {
        background-color: rgba(233, 236, 239, 0.3);
      }
    }
  }
`;
