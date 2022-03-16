import styled from 'styled-components';
import { Steps, Button, Radio } from 'antd';
import { useState } from 'react';
import { Tabs } from 'antd';
import { Collapse } from 'antd';
import { HiPlusCircle } from 'react-icons/hi';

const ContentOrderDetail = () => {
  const [current, setCurrent] = useState(0);
  const [visiableNote, setVisiableNote] = useState(true);

  const { Panel } = Collapse;
  const { Step } = Steps;
  const { TabPane } = Tabs;

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
          <Steps className="st1Step" size="small">
            {steps.map((step, index) => (
              <Step key={index} description={step.title} />
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
                  <Tabs type="card" tabPosition="left" className="paymentTab">
                    <TabPane
                      tab={
                        <Radio>
                          <span className="tabIcon">| </span> Chuyển khoản ngân
                          hàng
                        </Radio>
                      }
                      key="1"
                    >
                      <p>Content of Tab Pane 1</p>
                      <p>Content of Tab Pane 1</p>
                      <p>Content of Tab Pane 1</p>
                    </TabPane>
                    <TabPane
                      tab={
                        <Radio>
                          {' '}
                          <span className="tabIcon">| </span> Momo
                        </Radio>
                      }
                      key="2"
                    >
                      <p>Content of Tab Pane 2</p>
                      <p>Content of Tab Pane 2</p>
                      <p>Content of Tab Pane 2</p>
                    </TabPane>
                    <TabPane
                      tab={
                        <Radio>
                          {' '}
                          <span className="tabIcon">| </span> Zalo Pay
                        </Radio>
                      }
                      key="3"
                    >
                      <p>Content of Tab Pane 3</p>
                      <p>Content of Tab Pane 3</p>
                      <p>Content of Tab Pane 3</p>
                    </TabPane>
                  </Tabs>
                </div>
              }
            />
            <Step title='After transferring the money, click the button "Transferred, notify the seller"' />
          </Steps>
        </div>

        <Button className="btnTransferred" type="primary">
          Transferred, notify the seller
        </Button>
        <Button className="btnCancelOrder">Cancel order</Button>
        <div className="faq">
          <h5 className="faq-title">FAQ</h5>
          <Collapse
            defaultActiveKey={['1']}
            expandIcon={() => <HiPlusCircle className="plusIcon" />}
          >
            <Panel header="This is panel header 1" key="1">
              <p>{123}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>{123}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>{123}</p>
            </Panel>
          </Collapse>
          ,
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

      .ant-steps-item-container {
        display: flex;
        flex-direction: column;
      }
      .ant-steps-item-description {
        margin-top: 10px;
        width: 120%;
      }

      .ant-steps-item-title {
        &::after {
          top: 0;
          transform: translate(20px, -10px);
        }
      }
      .st1Step {
        width: 80%;
      }
      .anticon {
        transform: translateY(-3px);
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
      padding-top: 20px;
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
        border-radius: 3px;
        transition: all 0.25s linear;
        padding-top: 15px;

        .tabIcon {
          font-weight: bold;
          color: ${({ theme }) => theme.primary};
          font-size: 18px;
        }
        .ant-tabs-tab {
          border-right: 1px solid transparent !important;
          transition: all 0.25s linear;
          margin: 0;
          border: none;
        }

        .ant-tabs-tab-active {
          transition: all 0.25s linear;
          border-right: 1px solid ${({ theme }) => theme.primary} !important;
        }

        .ant-tabs-content-left {
          padding-top: 15px;
          padding-right: 15px;
          border-left: 1px solid ${({ theme }) => theme.p2pBorder};
          text-align: justify;
          height: 300px;
          overflow: scroll;
          &::-webkit-scrollbar {
            height: 100%;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 0px;
            background-color: ${({ theme }) => theme.primary};
          }
        }
      }
    }

    .btnCancelOrder {
      margin-left: 20px;
      color: ${({ theme }) => theme.primary};
      font-weight: bold;
    }

    .btnTransferred {
      font-weight: bold;
    }

    .faq {
      margin-top: 60px;

      &-title {
        margin-bottom: 20px;
      }

      .plusIcon {
        color: ${({ theme }) => theme.primary};
        font-size: 16px;
        transform: translateY(3px);
      }

      .ant-collapse {
        border: none;
      }

      .ant-collapse-item {
        border: none;
      }

      .ant-collapse-content {
        border: none;
      }
    }
  }
  .chat {
    flex: 3;
  }
`;
