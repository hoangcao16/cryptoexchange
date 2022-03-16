import Countdown from 'antd/lib/statistic/Countdown';
import styled from 'styled-components';

const HeaderOrderDetail = () => {
  const deadline = Date.now() + 1000 * 10;
  return (
    <Wrapper>
      <div className="container">
        <div className="sellInfo">
          <h4>Buy USDT from WF Nguyễn</h4>
          <div className="countdown">
            Created order. Please wait for the system to confirm{' '}
            <Countdown
              onFinish={() => console.log(123)}
              value={deadline}
              className="countdownTimer"
            ></Countdown>
            <span className="bg"></span>
          </div>
        </div>
        <div className="orderInfo">
          <p>
            <span className="clgray">Order number</span>: 12312321632
          </p>
          <p>
            <span className="clgray">Create at</span>: 12/10/2022
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default HeaderOrderDetail;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.p2pGrayLight};
  padding-top: 20px;
  padding-bottom: 10px;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .countdown {
      display: flex;
      align-items: center;
      position: relative;

      .bg {
        position: absolute;
        height: 100%;
        width: 10%;
        top: 0;
        right: 12.8%;
        border-radius: 5px;
        display: inline-block;
        background-color: ${({ theme }) => theme.primary};
        transform: translateY(-3%);
      }
      .countdownTimer {
        font-size: 40px !important;
        font-weight: bold;
        margin-left: 20px;
        letter-spacing: 10px;
        padding-bottom: 5px;
        position: relative;
        z-index: 1;

        &::before {
          position: absolute;
          content: '';
          height: 100%;
          width: 30%;
          background-color: ${({ theme }) => theme.primary};
          z-index: -1;
          opacity: 1;
          left: 0;
          top: 0;
          transform: translate(-14%, -3%);
          border-radius: 5px;
        }

        &::after {
          position: absolute;
          content: '';
          height: 100%;
          width: 30%;
          background-color: ${({ theme }) => theme.primary};
          z-index: -1;
          opacity: 1;
          right: 0;
          top: 0;
          transform: translate(-4%, -3%);
          border-radius: 5px;
        }
      }
    }

    .orderInfo {
      text-align: right;

      .clgray {
        color: ${({ theme }) => theme.grayColor};
      }
    }
  }
`;
