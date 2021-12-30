import styled from 'styled-components';
export const Container = styled.div`
  padding: 12px 16px 16px;
`;
export const Tabs = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  font-size: 14px;
  line-height: 12px;
  border-bottom-color: rgb(37, 41, 48);
  .item {
    margin-right: 16px;
    padding-top: 8px;
    padding-bottom: 10px;
    font-weight: 500;
    color: rgb(132, 142, 156);
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colors?.secondary};
    }
  }
  .active {
    color: ${({ theme }) => theme.colors?.secondary};
  }
  .information {
    cursor: pointer;
    .information-icon {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      color: rgb(132, 142, 156);
      font-size: 16px;
      fill: rgb(132, 142, 156);
      width: 1em;
      height: 1em;
      &:hover {
        color: ${({ theme }) => theme.text};
      }
    }
  }
`;
export const StyledDropdown = styled.div`
  .btn-primary {
    background-color: transparent;
    border: none;
    font-size: 14px;
    line-height: 12px;
    color: rgb(132, 142, 156);
    padding: 0px 0px 2px 0px;
    &:hover {
      color: ${({ theme }) => theme.colors?.secondary};
    }
    &:focus {
      box-shadow: none;
    }
  }
  #dropdown-button-drop-down {
    margin-left: 8px;
    background-color: transparent;
    &:focus {
      box-shadow: none;
    }
  }
  .dropdown-menu {
    background-color: ${({ theme }) => theme.background};
    min-width: 120px;
    .dropdown-item {
      color: ${({ theme }) => theme.text};
      padding: 0.7rem 1rem;
      &:hover {
        background-color: rgba(233, 236, 239, 0.3);
      }
    }
  }
`;
