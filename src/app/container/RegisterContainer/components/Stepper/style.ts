import styled from 'styled-components';
export const Container = styled.div`
  @media screen and (min-width: 767px) {
    margin-left: 0px;
  }
  @media screen and (min-width: 1023px) {
    margin-left: 228px;
  }
`;
export const Step = styled.div`
  display: flex;
  .step_marker_column {
    position: relative;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 100%;
    background-color: rgb(39, 42, 46);
    user-select: none;
    .step-counter {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      font-size: 16px;
    }
  }
  .step-title {
    margin: 0px 0px 0px 8px;
    min-width: 0px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: rgb(132, 142, 156);
    white-space: nowrap;
  }
`;
export const Steps = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 264px;
  .line {
    margin: 0px;
    min-width: 0px;
    width: 4px;
    left: 18px;
    flex: 1 1 0%;
    position: relative;
    background-color: rgb(39, 42, 46);
    &::after {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      width: 4px;
      background-color: inherit;
    }
  }
  .bn-steps-step {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    position: static;
    color: rgb(132, 142, 156);
    padding: 8px;
    -webkit-box-flex: 0;
    flex-grow: 0;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
    &[data-status='process'] {
      .step_marker_column {
        background-color: ${({ theme }) => theme?.colors?.secondary};
        color: rgb(24, 26, 32);
      }
      .step-title {
        color: rgb(234, 236, 239);
      }
    }
  }
`;
