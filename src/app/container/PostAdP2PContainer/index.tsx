import { Button, message, Steps } from 'antd';
import NavMenu from 'app/components/Navbar';
import NavbarTradeP2P from 'app/components/NavbarTradeP2P';
import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from 'styled-components';
import HelpGuide from './components/HelpGuide';
import PostAdTitle from './components/PostAdTitle';
import StepRemarksAndResponse from './components/StepRemarksAndResponse';
import StepTotalAndPayment from './components/StepTotalAndPayment';
import StepTypeAndPrice from './components/StepTypeAndPrice';

const { Step } = Steps;

const steps = [
  {
    title: 'Set Type & Price',
    content: <StepTypeAndPrice />,
  },
  {
    title: 'Set Total Amount & Payment Method',
    content: <StepTotalAndPayment />,
  },
  {
    title: 'Set Remarks & Automatic Response',
    content: <StepRemarksAndResponse />,
  },
];

function PostAdP2PContainer() {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Wrapper>
      <NavMenu />
      <NavbarTradeP2P defaultActiveKey="none" />
      <PostAdTitle />
      <div className="container container-steps-content mt-3">
        <Steps current={current} size="small">
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <div className="steps-content">{steps[current].content}</div>

        <HelpGuide />
      </div>

      <div className="steps-action">
        <div className="steps-action__buttons container">
          <div>
            {current > 0 && (
              <>
                <span className="reserved">Reserved Fee</span>
                <AiOutlineInfoCircle className="reserved-icon" />
                0.03 USDT
              </>
            )}
          </div>
          <div>
            {current > 0 && (
              <Button
                className="btnPostAd btnPostAd--prev"
                type="link"
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button
                className="btnPostAd btnPostAd--next"
                type="link"
                onClick={() => next()}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                className="btnPostAd btnPostAd--next"
                type="link"
                onClick={() => message.success('Processing complete!')}
              >
                Post
              </Button>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default PostAdP2PContainer;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.p2pGrayLight};

  .container-steps-content {
    margin-bottom: 80px;
    min-height: 70vh;
  }

  .steps-content {
    margin-top: 16px;
  }

  .steps-action {
    margin: 0px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    box-shadow: rgb(0 0 0 / 8%) 0px -1px 2px;
    background-color: ${({ theme }) => theme.p2pBackground};

    &__buttons {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .btnPostAd {
        min-width: 60px;
        width: 200px;
        height: 42px;
        font-weight: 500;
        font-size: 14px;

        margin-left: 10px;

        &--next {
          color: ${({ theme }) => theme.p2pTextLight};
          background: ${({ theme }) => theme.powColor};

          &:hover {
            opacity: 0.8;
          }
        }

        &--prev {
          color: ${({ theme }) => theme.powColor};
          border: 1px solid ${({ theme }) => theme.p2pBorder};

          &:hover {
            border: 1px solid ${({ theme }) => theme.powColor};
          }
        }
      }
    }

    .reserved {
      color: ${({ theme }) => theme.p2pGray};
    }

    .reserved-icon {
      font-size: 16px;
      margin: 0px 4px;
    }
  }
`;
