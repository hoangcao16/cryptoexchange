import styled from 'styled-components';
export const ColLeft = styled.div`
  flex: 1 1 0%;
  padding-right: 32px;
  .balance {
    box-sizing: border-box;
    margin: 0px 0px 8px 0px;
    min-width: 0px;
    padding-top: 10px;
    display: flex;
    font-size: 14px;
    &-name {
      margin: 0px 8px 0px 0px;
      min-width: 0px;
      color: ${({ theme }) => theme.grayColor};
      font-size: 12px;
      height: 16px;
    }
    &-coin {
      margin: 0px;
      min-width: 0px;
      flex: 1 1 0%;
      text-align: right;
      display: flex;
      -webkit-box-pack: end;
      justify-content: flex-end;
      font-size: 12px;
      height: 16px;
    }
  }
`;
export const ColRight = styled.div`
  flex: 1 1 0%;
  .balance {
    box-sizing: border-box;
    margin: 0px 0px 8px 0px;
    min-width: 0px;
    padding-top: 10px;
    display: flex;
    font-size: 14px;
    &-name {
      margin: 0px 8px 0px 0px;
      min-width: 0px;
      color: ${({ theme }) => theme.grayColor};
      font-size: 12px;
      height: 16px;
    }
    &-coin {
      margin: 0px;
      min-width: 0px;
      flex: 1 1 0%;
      text-align: right;
      display: flex;
      -webkit-box-pack: end;
      justify-content: flex-end;
      font-size: 12px;
      height: 16px;
    }
  }
`;
export const Button = styled.button`
  margin: 8px 0px 0px;
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
  padding: 6px 12px;
  min-width: 52px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  word-break: keep-all;
  min-height: 24px;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  color: white;
  &[data-type='buyButton'] {
    background-color: ${({ theme }) => theme.brightGreenColor};
    &:hover {
      box-shadow: none;
      background-color: ${({ theme }) => theme.darkWashedGreen};
    }
  }
  &[data-type='sellButton'] {
    background-color: ${({ theme }) => theme.redColor};
    &:hover {
      box-shadow: none;
      background-color: ${({ theme }) => theme.middleWashedRose};
    }
  }
`;
