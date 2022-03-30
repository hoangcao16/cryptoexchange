import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
export const Container = styled.div`
  padding: 10px 0;
  border: ${({ theme }) => theme.borderGray};
  border-top: none;
  border-right: none;
`;
export const Div = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  position: relative;
  padding-left: 16px;
  padding-right: 16px;
  height: 100%;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-wrap: wrap;
  display: flex;
`;
export const Content = styled(Row)`
  box-sizing: border-box;
  margin: 0px;
  flex: 1 1 0%;
  .showPrice {
    color: ${({ theme }) => theme.text};
    &[data-type='up'] {
      color: ${({ theme }) => theme.greenColor};
    }
    &[data-type='down'] {
      color: ${({ theme }) => theme.darkPinkColor};
    }
  }
  .subPrice {
    color: ${({ theme }) => theme.text};
  }

  .nowPrice {
    padding: 0;
    margin: 0;
    padding-top: 3px;
    padding-left: 25px;
  }
`;
export const SpotTutorial = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  color: ${({ theme }) => theme.grayColor};
  font-size: 12px;
  cursor: pointer;
  svg {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    color: ${({ theme }) => theme.grayColor};
    font-size: 16px;
    fill: ${({ theme }) => theme.grayColor};
    width: 1em;
    height: 1em;
  }
`;
export const ContentLeft = styled(Col)`
  display: flex;
  height: 48px;
  border-right: ${({ theme }) => theme.borderBlack};
  padding: 0px;
  margin: 0px;
  padding-right: 10px;

  .contentLeft-coin {
    display: flex;
    flex-direction: column;
    .coin {
      font-size: 20px;
      font-weight: 500;
    }
    .InformationCoin {
      svg {
        margin: 0px 4px 0px 0px;
        min-width: 0px;
        color: ${({ theme }) => theme.grayColor};
        font-size: 16px;
        fill: ${({ theme }) => theme.grayColor};
        width: 1em;
        height: 1em;
      }
      a {
        color: ${({ theme }) => theme.grayColor};
        text-decoration: underline;
      }
      &:hover {
        svg {
          color: ${({ theme }) => theme.matteWhiteColor};
          fill: ${({ theme }) => theme.matteWhiteColor};
        }
      }
    }
  }
`;
export const ContentRight = styled(Col)`
  display: flex;
  .ticketList {
    display: flex;
    flex-wrap: wrap;
  }

  .contentRightContainer {
    flex-flow: row nowrap;
    box-sizing: border-box;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    margin-left: 32px;
    margin-right: 8px;
    font-size: 12px;
    overflow: hidden;
    .ticketItem {
      padding-right: 32px;
    }
    .tickerItemLabel {
      margin-bottom: 2px;
      color: ${({ theme }) => theme.grayColor};
      line-height: 16px;
      font-weight: 400;
    }
    .tickerPriceText {
      .tickerPriceText-value {
        color: ${({ theme }) => theme.text};
        &[data-type='up'] {
          color: ${({ theme }) => theme.greenColor};
        }
        &[data-type='down'] {
          color: ${({ theme }) => theme.darkPinkColor};
        }
      }
    }
  }
`;
