import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';

export const Container = styled.div`
  border: ${props => props.theme.borderGray};
  padding: 16px;
  border-top: none;
  /* height: 840px; */
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  button {
    background: transparent !important;
    margin: 0 4px 0 0;
    appearance: none;
    user-select: none;
    outline: none;
    border: none;
    padding: 0 4px;
    border-radius: 4px;
    min-width: 52px;
    svg {
      color: rgb(132, 142, 156);
    }
  }

  //css select
  .react-select-container {
    outline: none;
  }
  .react-select__control {
    background: transparent;
    border: none;
    outline: none;
    width: 50px;
    font-size: 12px;
    min-height: 30px;
    &:hover {
      box-shadow: none;
    }
  }
  .react-select__value-container {
    cursor: pointer;

    padding: 0;
  }
  .react-select__indicator-separator {
    display: none;
  }
  .react-select__dropdown-indicator {
    padding: 0;
    svg {
      width: 12px;
      height: 12px;
    }
  }
  .react-select__single-value {
    text-align: center;
    color: ${({ theme }) => theme.text};
  }
  .react-select__input {
    /* display: none; */
  }
  .react-select__menu {
    background: transparent;
  }
  .react-select__menu-list {
    background-color: ${({ theme }) => theme.body};
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    font-size: 12px;
    text-align: center;
  }
  .react-select__option--is-selected {
    background-color: transparent;
    color: ${({ theme }) => theme.colors?.secondary};
  }
  .react-select__option--is-focused {
    background-color: rgb(43, 49, 57);
  }
`;
export const GroupButton = styled.div``;
export const MoreButton = styled.div`
  position: relative;
  .more-icon {
    box-sizing: border-box;
    margin-right: -8px;
    margin-left: 8px;
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
`;
export const StyledDropdown = styled(Dropdown)`
  .dropdown-toggle {
    padding: 0px;
    margin: 0px;
    min-width: 0px;
    box-shadow: none;

    &::after {
      display: none;
    }
    &:active:focus {
      box-shadow: none;
    }
  }
  .dropdown-menu {
    background-color: #1e2026;
    padding: 0px;
    min-width: 160px;
    inset: -4px auto auto -140px !important;
    .label {
      padding: 14px;
      .checkmark:after {
        content: '';
        position: absolute;
        display: none;
      }
      .labelView {
        font-size: 12px;
        position: relative;
        padding-left: 24px;
        color: ${({ theme }) => theme.text};
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        &:hover input ~ .checkmark {
          background-color: #ccc;
        }
        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
          &:checked ~ .checkmark {
            background-color: ${({ theme }) => theme.colors?.secondary};
          }
          :checked ~ .checkmark:after {
            display: block;
          }
        }
        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 17px;
          width: 17px;
          background-color: #eee;
          &:after {
            left: 6px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid black;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        }
      }
    }
  }
`;
