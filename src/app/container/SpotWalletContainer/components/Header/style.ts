import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
export const Title = styled.div`
  margin: 0px;
  min-width: 0px;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) => theme.background};
  @media screen and (min-width: 767px) {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
  }
  @media screen and (min-width: 1023px) {
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
  }
`;
export const GroupButton = styled.div`
  margin: 0px;
  min-width: 0px;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow-y: scroll;
  padding-top: 16px;
  padding-bottom: 16px;
  @media screen and (min-width: 767px) {
    display: block;
    width: 100%;
    flex-direction: column;
    overflow: scroll;
  }
  @media screen and (min-width: 1023px) {
    display: flex;
    width: auto;
    flex-direction: row;
    overflow: auto;
  }
`;
export const DepositButton = styled.div`
  margin-right: 4px;
  a {
    margin: 0px;
    appearance: none;
    user-select: none;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-family: inherit;
    text-align: center;
    text-decoration: none;
    outline: none;
    padding: 10px 16px;
    min-width: 60px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    word-break: keep-all;
    color: ${({ theme }) => theme.brightBlackColor};
    border-radius: 4px;
    min-height: 24px;
    border: none;
    background-image: none;
    background-color: ${({ theme }) => theme.primary};
    padding-left: 12px;
    padding-right: 12px;
    @media screen and (min-width: 767px) {
      padding-left: 16px;
      padding-right: 16px;
    }
    &:hover {
      opacity: 0.9;
    }
  }
`;
export const NormalButton = styled.a`
  box-sizing: border-box;
  margin: 0px 8px;
  min-width: 0px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.primary};
  display: inline-block;
  text-decoration: none !important;
  background-color: transparent !important;
  button {
    margin: 0px;
    appearance: none;
    user-select: none;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-family: inherit;
    text-align: center;
    text-decoration: none;
    outline: none;
    padding: 10px 12px;
    min-width: 60px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    word-break: keep-all;
    color: ${({ theme }) => theme.background};
    border-radius: 4px;
    min-height: 24px;
    border: none;
    background-image: none;
    background-color: ${({ theme }) => theme.matteWhiteColor};
    @media screen and (min-width: 767px) {
      padding-left: 16px;
      padding-right: 16px;
    }
    &:hover {
      box-shadow: none;
      background-image: none;
      background-color: ${({ theme }) => theme.whiteSmokeColor};
    }
    .wallet-icon {
      margin: 0px 8px 0px 0px;
      min-width: 0px;
      color: ${({ theme }) => theme.background};
      font-size: 16px;
      fill: ${({ theme }) => theme.background};
      width: 1em;
      height: 1em;
    }
  }
`;
export const WalletDirect = styled.div`
  margin: 0px;
  &:hover {
    .bn-tooltip-box {
      opacity: 1;
      visibility: visible;
    }
  }
  .bn-tooltip-box {
    box-sizing: content-box;
    position: absolute;
    right: 10px;
    top: 110px;
    transition: opacity 120ms ease-in-out 0s, transform 120ms ease-in-out 0s;
    opacity: 0;
    visibility: hidden;
    margin: 0px;
    width: max-content;
    min-width: 0px;
    max-width: 296px;
    word-break: normal;
    z-index: 1400;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.darkGrayColor};
    border-radius: 4px;
    padding: 8px 12px;
    filter: drop-shadow(rgba(20, 21, 26, 0.08) 0px 3px 6px)
      drop-shadow(rgba(71, 77, 87, 0.08) 0px 7px 14px)
      drop-shadow(rgba(20, 21, 26, 0.1) 0px 0px 1px);
    .gap-fill {
      top: -8px;
      left: 0px;
      width: 100%;
      height: 8px;
    }
  }
  .bn-tooltip-arrow {
    position: absolute;
    right: 60px;
    top: -3px;
    width: 6px;
    height: 6px;
    &::before {
      content: '';
      display: block;
      transform: rotate(225deg);
      position: absolute;
      width: 6px;
      height: 6px;
      background-color: ${({ theme }) => theme.darkGrayColor};
    }
  }
  .gap-fill {
    position: absolute;
  }
`;
export const StyledLink = styled(Link)`
  box-sizing: border-box;
  margin: 0px 8px;
  min-width: 0px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.primary};
  display: inline-block;
  text-decoration: none !important;
  background-color: transparent !important;
  button {
    margin: 0px;
    appearance: none;
    user-select: none;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-family: inherit;
    text-align: center;
    text-decoration: none;
    outline: none;
    padding: 10px 12px;
    min-width: 60px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    word-break: keep-all;
    color: ${({ theme }) => theme.background};
    border-radius: 4px;
    min-height: 24px;
    border: none;
    background-image: none;
    background-color: ${({ theme }) => theme.matteWhiteColor};
    @media screen and (min-width: 767px) {
      padding-left: 16px;
      padding-right: 16px;
    }
    &:hover {
      box-shadow: none;
      background-image: none;
      background-color: ${({ theme }) => theme.whiteSmokeColor};
    }
    .wallet-icon {
      margin: 0px 8px 0px 0px;
      min-width: 0px;
      color: ${({ theme }) => theme.background};
      font-size: 16px;
      fill: ${({ theme }) => theme.background};
      width: 1em;
      height: 1em;
    }
  }
`;

export const ModalTransfer = styled(Modal)`
  color: ${({ theme }) => theme.p2pText};

  .modal-header {
    span {
      font-size: 20px;
    }

    .btn-close {
      box-shadow: none;
    }
  }
`;
