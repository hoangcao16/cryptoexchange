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
`;
export const StyledDropdown = styled.div`
  .active {
    .btn-primary {
      color: ${({ theme }) => theme.colors?.secondary};
    }
  }
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
export const Tooltip = styled.div`
  cursor: pointer;
  position: relative;
  padding-bottom: 4px;
  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  .tooltiptext {
    visibility: hidden;
    width: max-content;
    word-break: normal;
    background-color: black;
    color: #fff;
    text-align: center;
    z-index: 1400;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: rgb(255, 255, 255);
    background-color: rgb(94, 102, 115);
    border-radius: 4px;
    filter: drop-shadow(rgba(20, 21, 26, 0.08) 0px 3px 6px)
      drop-shadow(rgba(71, 77, 87, 0.08) 0px 7px 14px)
      drop-shadow(rgba(20, 21, 26, 0.1) 0px 0px 1px);
    max-width: 240px;
    text-align: left;
    box-shadow: rgb(20 21 26 / 4%) 0px 1px 2px, rgb(71 77 87 / 4%) 0px 3px 6px,
      rgb(20 21 26 / 10%) 0px 0px 1px;
    transition: opacity 1s ease-in-out 0s, transform 1s ease-in-out 0s;
    opacity: 0;
    transform: translate3d(0px, 6px, 0px);
    /* Position the tooltip */
    position: absolute;
    left: -220px;
    top: 24px;
    .tooltip-content {
      padding: 8px 12px;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        top: -7px;
        right: 4px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid rgb(94, 102, 115);
      }
    }
  }
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
`;