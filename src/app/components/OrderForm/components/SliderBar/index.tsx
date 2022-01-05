import styled from 'styled-components';
export const Container = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  min-width: 0px;
  display: flex;
  .content {
    box-sizing: border-box;
    margin: 4px 0px 10px;
    min-width: 0px;
    display: flex;
    padding-left: 0px;
    padding-right: 0px;
    width: 100%;
  }
`;
export const SliderContainer = styled.div`
  position: relative;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  width: calc(100% - 14px);
  margin-left: 7px;
  height: 25px;
  display: flex;
  .bn-slider-available-bar {
    position: absolute;
    background-color: ${({ theme }) => theme.darkBrightGrayColor};
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    background-clip: padding-box;
    width: 100%;
    .bn-slider-progress-bar {
      background-color: ${({ theme }) => theme.colorDescription};
      height: 4px;
      width: 0%;
    }
  }
  .slider-radio-btn {
    position: absolute;
    width: 16px;
    height: 16px;
    transform: translateX(-50%) rotate(45deg);
    background-color: ${({ theme }) => theme.backgroundDropdown};
    border-radius: 4px;
    border: 4px solid ${({ theme }) => theme.colorDescription};
    z-index: 20;
    cursor: grab;
    transition: box-shadow 0.2s ease 0s;
    &::after {
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      border: 2px solid ${({ theme }) => theme.background};
      border-radius: 4px;
      background: transparent;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .bn-slider-radio-tooltip {
    background-color: transparent;
    color: ${({ theme }) => theme.colorDescription};
    font-size: 14px;
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 0px;
    margin-top: -24px;
    padding: 2px 4px;
    border-radius: 2px;
    vertical-align: top;
    transform: translateX(-50%);
    z-index: 10;
    user-select: none;
    transition: visibility 0.2s ease 0s, opacity 0.2s ease 0s;
  }
  .bn-slider-stepper {
    box-sizing: content-box;
    position: absolute;
    transform: translateX(-50%) rotate(45deg);
    background-color: ${({ theme }) => theme.backgroundFooter};
    color: ${({ theme }) => theme.grayColor};
    width: 6px;
    height: 6px;
    border-radius: 2px;
    border: 2px solid ${({ theme }) => theme.darkBrightGrayColor};
    z-index: 10;
    overflow: visible;
    cursor: pointer;
    &:hover {
      border-color: ${({ theme }) => theme.background};
      background-color: ${({ theme }) => theme.darkBrightGrayColor};
    }
  }
  .first-step {
    margin: 0px 0px 0px 0px;
  }
  .second-step {
    margin: 0px 0px 0px 25%;
  }
  .third-step {
    margin: 0px 0px 0px 50%;
  }
  .fourth-step {
    margin: 0px 0px 0px 75%;
  }
  .fifth-step {
    margin: 0px 0px 0px 100%;
  }
`;
const SliderBar = () => {
  return (
    <Container>
      <div className="content">
        <SliderContainer>
          <div className="bn-slider-available-bar">
            <div className="bn-slider-progress-bar"></div>
          </div>
          <div className="slider-radio-btn"></div>
          <label className="bn-slider-radio-tooltip">0%</label>
          <div className="bn-slider-stepper first-step"></div>
          <div className="bn-slider-stepper second-step"></div>
          <div className="bn-slider-stepper third-step"></div>
          <div className="bn-slider-stepper fourth-step"></div>
          <div className="bn-slider-stepper fifth-step"></div>
        </SliderContainer>
      </div>
    </Container>
  );
};
export default SliderBar;
