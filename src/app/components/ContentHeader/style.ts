import styled from 'styled-components';
export const Container = styled.div`
  padding: 10px 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none;
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
export const Content = styled.div`
  display: flex;
  box-sizing: border-box;
  margin: 0px;
  flex: 1 1 0%;
`;
export const SpotTutorial = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  color: rgb(132, 142, 156);
  font-size: 12px;
  cursor: pointer;
  svg {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    color: rgb(132, 142, 156);
    font-size: 16px;
    fill: rgb(132, 142, 156);
    width: 1em;
    height: 1em;
  }
`;
export const ContentLeft = styled.div`
  display: flex;
  margin-right: 24px;
  margin-left: 4px;
  height: 48px;
  border-right: 1px solid rgb(37 41 48);
  padding-right: 16px;
  .contentLeft-coin {
    display: flex;
    flex-direction: column;
    .coin {
      font-size: 20px;
      font-weight: 500;
    }
    .InfomationCoin {
      svg {
        margin: 0px 4px 0px 0px;
        min-width: 0px;
        color: rgb(132, 142, 156);
        font-size: 16px;
        fill: rgb(132, 142, 156);
        width: 1em;
        height: 1em;
      }
      a {
        color: rgb(132, 142, 156);
        text-decoration: underline;
      }
      &:hover {
        svg {
          color: rgb(234, 236, 239);
          fill: rgb(234, 236, 239);
        }
      }
    }
  }
  .showPrice {
    color: rgb(255, 255, 255);
  }
  .subPrice {
    color: rgb(255, 255, 255);
  }
`;
export const ContentRight = styled.div`
  display: flex;
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
      color: #848e9c;
      line-height: 16px;
      font-weight: 400;
    }
    .tickerPriceText {
      color: #ffffff;
    }
  }
`;
