import styled from 'styled-components';

export const Container = styled.div`
  position: sticky;
  z-index: 10;
  bottom: 0px;
  background-color: rgb(22, 26, 30);
  padding: 0px 0px 0px 10px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  border: 1px solid rgb(37, 41, 48);
  .connect-title {
    margin: 0px 0px 0px 10px;
    min-width: 0px;
    color: rgb(14, 203, 129);
    font-size: 12px;
  }
`;
export const SupportSection = styled.div`
  display: flex;
  span {
    color: rgb(183, 189, 198);
    font-size: 12px;
  }
  .download-section {
    border-left: 1px solid rgb(35, 40, 45);
    padding: 0px 16px;
    .download-icon {
      margin: 0px 10px 0px 0px;
      min-width: 0px;
      color: currentcolor;
      font-size: 14px;
      fill: currentcolor;
      width: 1em;
      height: 1em;
    }
  }
  .online-section {
    border-left: 1px solid rgb(35, 40, 45);
    padding: 0px 16px;
    .docs-icon {
      box-sizing: border-box;
      margin: 0px 10px 0px 0px;
      min-width: 0px;
      color: currentcolor;
      font-size: 14px;
      fill: currentcolor;
      width: 1em;
      height: 1em;
    }
  }
`;
