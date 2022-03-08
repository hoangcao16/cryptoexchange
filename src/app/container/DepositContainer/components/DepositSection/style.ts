import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledSelect = styled.div`
  margin: 0px;
  min-width: 0px;
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  &[data-type='network'] {
    margin: 24px 0px 0px;
  }
  @media screen and (min-width: 767px) {
    flex-direction: row;
  }
  @media screen and (min-width: 1023px) {
    flex-direction: row;
  }
  .select-title {
    margin: 0px 24px 0px 0px;
    min-width: 0px;
    width: 100%;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.darkBrightGrayColor};
    @media screen and (min-width: 767px) {
      width: 160px;
    }
    @media screen and (min-width: 1023px) {
      width: 180px;
    }
  }
  .select {
    margin: 0px;
    min-width: 0px;
    width: 100%;
    &--label {
      margin: 0px 0px 4px;
      min-width: 0px;
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }) => theme.darkBrightGrayColor};
    }
  }
  .select--input {
    margin: 0px;
    min-width: 0px;
    display: flex;
    width: 100%;
    height: 48px;
    background-color: ${({ theme }) => theme.text};
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    border-color: ${({ theme }) => theme.matteWhiteColor};
    justify-content: space-between;
    align-items: center;
    cursor: auto;
    &:hover {
      border-color: ${({ theme }) => theme.primary};
    }
    .selected--wrapper {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      display: flex;
      flex: 1 1 0%;
      justify-content: space-between;
      align-items: center;
      padding-top: 14px;
      padding-bottom: 14px;
      cursor: pointer;
      .selected {
        box-sizing: border-box;
        margin: 0px 4px 0px 0px;
        min-width: 0px;
        display: flex;
        align-items: center;
        width: auto;
        flex-shrink: 0;
        &-information {
          margin: 0px 0px 0px 8px;
          min-width: 0px;
          display: flex;
          flex: 1 1 0%;
          flex-direction: row;
          align-items: center;
          .selected-name {
            margin: 0px;
            min-width: 0px;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: ${({ theme }) => theme.background};
          }
          .selected-desc {
            margin: 0px 0px 0px 8px;
            min-width: 0px;
            color: ${({ theme }) => theme.darkBrightGrayColor};
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }
    .down-icon {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      font-size: 16px;
      fill: currentcolor;
      transform: rotate(0deg);
      color: ${({ theme }) => theme.slateGrayColor};
      width: 1em;
      height: 1em;
    }
  }
`;
export const CoinModal = styled(Modal)`
  .search-coin {
    box-sizing: border-box;
    margin: 4px 0px 0px;
    min-width: 0px;
    display: inline-flex;
    position: relative;
    height: 40px;
    align-items: center;
    line-height: 1.6;
    border: 1px solid ${({ theme }) => theme.matteWhiteColor};
    border-radius: 4px;
    width: 100%;
    .search-icon {
      margin: 0px;
      min-width: 0px;
      font-size: 14px;
      .icon-search {
        box-sizing: border-box;
        margin: 0px 0px 0px 8px;
        min-width: 0px;
        color: ${({ theme }) => theme.colorDescription};
        font-size: 16px;
        fill: ${({ theme }) => theme.colorDescription};
        width: 1em;
        height: 1em;
      }
    }
    .search-input {
      margin: 0px;
      min-width: 0px;
      width: 100%;
      height: 100%;
      padding: 0 12px;
      outline: none;
      border: none;
      background-color: inherit;
      opacity: 1;
      color: ${({ theme }) => theme.background};
      font-size: 14px;
    }
  }
`;
export const NetworkModal = styled(Modal)`
  .content-header {
    box-sizing: border-box;
    margin: 0px 0px 16px;
    min-width: 0px;
    font-size: 14px;
    color: ${({ theme }) => theme.background};
    line-height: 20px;
    padding-left: 16px;
    padding-right: 16px;
    @media screen and (min-width: 767px) {
      margin-top: 16px;
      padding-left: 24px;
      padding-right: 24px;
    }
    @media screen and (min-width: 1023px) {
      margin-top: 16px;
    }
  }
`;
