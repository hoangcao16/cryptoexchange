import styled from 'styled-components';
import { Steps, Button, message } from 'antd';
import { useState } from 'react';
import { Tabs, Radio, Space } from 'antd';
import { Nav } from 'react-bootstrap';

const ContentOrderDetail = () => {
  const [current, setCurrent] = useState(0);
  const [visiableNote, setVisiableNote] = useState(true);

  const { Step } = Steps;
  const { TabPane } = Tabs;

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onChange = current => {
    console.log('onChange:', current);
    setCurrent(current);
  };
  const steps = [
    {
      title: 'Transfer money to the seller',
      content: 'First-content',
    },
    {
      title: 'Waiting for the seller to unlock the cryptocurrency',
      content: 'Second-content',
    },
    {
      title: 'Completed',
      content: 'Last-content',
    },
  ];

  return (
    <Wrapper>
      <div className="orderStep">
        <div className="firstStep">
          <Steps className="st1Step" current={current} onChange={onChange}>
            {steps.map((step, index) => (
              <Step
                key={index}
                title={`Step ${index + 1}`}
                description={step.title}
              />
            ))}
          </Steps>
          {visiableNote && (
            <div className="note">
              <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore
                excepturi quo, eius fugit necessitatibus accusamus iusto dicta
                qui, eaque repudiandae unde praesentium inventore, aliquam
                quidem doloribus? Ullam sequi quis obcaecati?
              </span>
              <span
                className="closeNote"
                onClick={() => {
                  setVisiableNote(false);
                }}
              >
                X
              </span>
            </div>
          )}
        </div>
        <div className="secondStep">
          <Steps progressDot current={0} direction="vertical">
            <Step
              title="Confirm order information"
              description={
                <div className="descriptionStep1">
                  <div className="amount">
                    <p>Amount</p>
                    <h5>150,000</h5>
                  </div>
                  <div className="price">
                    <p>Price</p>
                    <h5>14000</h5>
                  </div>
                  <div className="count">
                    <p>Price</p>
                    <h5>10.2</h5>
                  </div>
                </div>
              }
            />
            <Step
              title="Transfer funds to the account provided below"
              description={
                <div>
                  <Tabs tabPosition="left" className="paymentTab">
                    <TabPane tab="Tab 1" key="1">
                      Content of Tab 1
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                      Content of Tab 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                      Content of Tab 3
                    </TabPane>
                  </Tabs>
                </div>
              }
            />
            <Step
              title="In Progress"
              description="This is a description. This is a description."
            />
          </Steps>
        </div>
      </div>
      <div className="chat"></div>
    </Wrapper>
  );
};

export default ContentOrderDetail;

const Wrapper = styled.div`
  display: flex;

  .orderStep {
    padding-top: 30px;
    flex: 7;

    .firstStep {
      padding-bottom: 20px;
      border-bottom: 2px solid ${({ theme }) => theme.p2pGrayLight};
      .st1Step {
        width: 80%;
      }

      .note {
        margin-top: 20px;
        background-color: ${({ theme }) => theme.p2pGrayLight};
        color: ${({ theme }) => theme.graySmokeColor};
        padding: 12px;
        padding-right: 35px;
        text-align: justify;
        border-radius: 5px;
        position: relative;

        span {
          line-height: 2;
        }

        .closeNote {
          display: inline-block;
          position: absolute;
          top: 0;
          right: 0;
          color: ${({ theme }) => theme.grayColor};
          cursor: pointer;
          margin-right: 10px;
          margin-top: 3px;
        }
      }
    }

    .secondStep {
      .descriptionStep1 {
        display: flex;
        div {
          margin-right: 70px;

          h5 {
            margin-top: 0px;
          }
          &:first-child h5 {
            color: ${({ theme }) => theme.greenColor};
          }
        }
      }

      .paymentTab {
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }
  }
  .chat {
    flex: 3;
  }
`;
