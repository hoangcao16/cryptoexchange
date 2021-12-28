import styled from 'styled-components';

export const Container = styled.div`
  border: ${props => props.theme.borderOrderBook};
  padding: 16px;
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
