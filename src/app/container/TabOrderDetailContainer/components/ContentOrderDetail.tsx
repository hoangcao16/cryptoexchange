import styled from 'styled-components';
import { Steps, Button, Radio, Tooltip, Input } from 'antd';
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { Collapse } from 'antd';
import { HiPlusCircle } from 'react-icons/hi';
import { FaCopy } from 'react-icons/fa';
import openNotification from 'app/components/NotificationAntd';
import { tabOrderDetailService } from 'services/orderDetailService';
import { RiErrorWarningFill } from 'react-icons/ri';
import { TabOrderDetailState } from '../slice/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectTabOrderDetail } from '../slice/selectors';
import { useTabOrderDetailSlice } from '../slice';
import ChatBox from 'app/components/ChatBox';

const ContentOrderDetail = ({ trade, reload }) => {
  const [visiableNote, setVisiableNote] = useState(true);
  const [visiableModalCancel, setVisiableModalCancel] = useState(false);
  const [listAppeal, setListAppeal] = useState([]);
  const [inputAnother, setInputAnother] = useState(false);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [currentFirstSteps, setCurrentFirstSteps] = useState<number>(0);

  const TabOrderDetailState: TabOrderDetailState =
    useSelector(selectTabOrderDetail);
  const tradaType = TabOrderDetailState.tradeType;

  const { updateTradeById, getListAppealReason } = tabOrderDetailService;
  const dispatch = useDispatch();
  const setBuyerStatus = useTabOrderDetailSlice().actions;
  const setSellerStatus = useTabOrderDetailSlice().actions;

  const { Panel } = Collapse;
  const { Step } = Steps;
  const { TabPane } = Tabs;

  const stepBuy = [
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

  const stepSell = [
    {
      title: 'Pending Payment',
      content: 'First-content',
    },
    {
      title: 'Release crypto to the buyer',
      content: 'Second-content',
    },
    {
      title: 'Completed',
      content: 'Last-content',
    },
  ];

  const handleChangeTabPayment = value => {
    if (Number(value) !== trade.paymentId) {
      setCurrentTab(Number(value));
    } else setCurrentTab(0);
  };

  const handelTransfer = () => {
    updateTradeById({
      id: trade?.id,
      paymentId: currentTab !== 0 ? currentTab : -1,
      status: 'PAID',
    })
      .then(res => {
        if (res.data.rc === 0) {
          openNotification('Success', 'Notified to the seller!');
          dispatch(setBuyerStatus.setBuyerStatus('PAID'));
          reload();
        } else openNotification('Error', res.data.rd);
      })
      .catch(() => openNotification('Error', 'Some thing went wrong!'));
  };

  const handleCopy = value => {
    navigator.clipboard.writeText(value);
  };

  const handelChaneReason = e => {
    if (e.target.value === 0) {
      setInputAnother(true);
    } else setInputAnother(false);
  };

  const handleCancelOrder = () => {
    updateTradeById({
      id: trade.id,
      status: 'CANCEL',
      paymentId: -1,
    })
      .then(res => {
        if (res.data.rc === 0) {
          openNotification('Success', 'Canceled this order!');
          localStorage.setItem('timeLimit', JSON.stringify(null));
          dispatch(setBuyerStatus.setSellerStatus('CANCEL'));
          reload();
        } else {
          openNotification('Error', res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };

  const findAllAppealReason = () => {
    getListAppealReason().then(res => {
      if (res.data.rc === 0) {
        setListAppeal(res.data.rows);
      } else openNotification('Error', res.data.rd);
    });
  };

  useEffect(() => {
    findAllAppealReason();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    switch (trade?.buyerStatus) {
      case 'NOT_PAID':
        setCurrentFirstSteps(0);
        break;
      case 'PAID':
        setCurrentFirstSteps(1);
        break;
      default:
        setCurrentFirstSteps(-1);
    }
    console.log(currentFirstSteps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trade?.buyerStatus]);

  // eslint-disable-next-line prettier/prettier
  useEffect(() => {
    if (TabOrderDetailState?.tradeType === 'Buy') {
      switch (TabOrderDetailState?.buyerStatus) {
        case 'NOT_PAID':
          setCurrentFirstSteps(0);
          break;
        case 'PAID':
          setCurrentFirstSteps(1);
          break;
        case 'COMPLETE':
          setCurrentFirstSteps(2);
          break;
        default:
          setCurrentFirstSteps(-1);
      }
    } else {
      switch (TabOrderDetailState?.sellerStatus) {
        case 'HOLD':
          setCurrentFirstSteps(0);
          break;
        case 'RELEASE':
          setCurrentFirstSteps(1);
          break;
        case 'COMPLETE':
          setCurrentFirstSteps(2);
          break;
        default:
          setCurrentFirstSteps(-1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TabOrderDetailState.buyerStatus, TabOrderDetailState.sellerStatus]);

  return (
    <Wrapper>
      <div className="mainContent">
        {trade?.status === 'PROCESSING' && (
          <div className="col-8 orderStep">
            <div className="firstStep">
              <Steps
                className="st1Step"
                size="small"
                current={currentFirstSteps}
              >
                {tradaType === 'Buy' &&
                  stepBuy.map((step, index) => (
                    <Step key={index} description={step.title} />
                  ))}
                {tradaType === 'Sell' &&
                  stepSell.map((step, index) => (
                    <Step key={index} description={step.title} />
                  ))}
              </Steps>
              {visiableNote && tradaType === 'Buy' && (
                <div className="note">
                  <span>
                    <span>
                      You need to leave the POW website to make a payment. In
                      the meantime, POW will keep the crypto in custody.
                    </span>
                    <br />
                    <span>
                      Upon successful payment tothe seller, go back to the POW
                      website and click the "Transferred, notify seller" button.
                    </span>
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
              <Steps progressDot current={2} direction="vertical">
                <Step
                  title="Confirm order information"
                  description={
                    <div className="descriptionStep1">
                      <div className="amount">
                        <p>Amount</p>
                        <h5>
                          {trade?.order?.fiat?.symbol} {trade?.total}
                        </h5>
                      </div>
                      <div className="price">
                        <p>Price</p>
                        <h5>
                          {trade?.order?.fiat?.symbol} {trade?.order?.price}
                        </h5>
                      </div>
                      <div className="count">
                        <p>Quantity</p>
                        <h5>
                          {trade?.amount} {trade?.order?.token?.assetName}
                        </h5>
                      </div>
                    </div>
                  }
                />
                <Step
                  title="Transfer funds to the account provided below"
                  description={
                    <div>
                      <Tabs
                        type="card"
                        tabPosition="left"
                        className="paymentTab"
                        defaultActiveKey={trade?.paymentId}
                        onChange={handleChangeTabPayment}
                      >
                        {trade?.order?.payments?.map(payment => {
                          return (
                            <TabPane
                              key={payment?.id}
                              tab={
                                <div>
                                  <span
                                    className="tabIcon"
                                    style={{
                                      color: payment?.paymentMethod?.colorCode,
                                    }}
                                  >
                                    |{' '}
                                  </span>{' '}
                                  {payment?.paymentMethod?.name}
                                </div>
                              }
                            >
                              <p className="paymentTitle">Name</p>
                              <span className="paymentDesc">
                                <span>{payment?.fullName}</span>
                                <Tooltip
                                  title="Copied"
                                  trigger="click"
                                  placement="right"
                                >
                                  <FaCopy
                                    className="copyIcon"
                                    onClick={() =>
                                      handleCopy(payment?.fullName)
                                    }
                                  />
                                </Tooltip>
                              </span>
                              <p className="paymentTitle">
                                Bank account number
                              </p>
                              <span className="paymentDesc">
                                <span>{payment?.accountNumber}</span>
                                <Tooltip
                                  title="Copied"
                                  trigger="click"
                                  placement="right"
                                >
                                  <FaCopy
                                    className="copyIcon"
                                    onClick={() =>
                                      handleCopy(payment?.accountNumber)
                                    }
                                  />
                                </Tooltip>
                              </span>
                              <p className="paymentTitle">Bank name</p>
                              <span className="paymentDesc">
                                <span>{payment?.bankName}</span>
                                <Tooltip
                                  title="Copied"
                                  trigger="click"
                                  placement="right"
                                >
                                  <FaCopy
                                    className="copyIcon"
                                    onClick={() =>
                                      handleCopy(payment?.bankName)
                                    }
                                  />
                                </Tooltip>
                              </span>
                              <p className="paymentTitle">
                                Account opening branch
                              </p>
                              <span className="paymentDesc">
                                <span>{payment?.bankBranch}</span>
                                <Tooltip
                                  title="Copied"
                                  trigger="click"
                                  placement="right"
                                >
                                  <FaCopy
                                    className="copyIcon"
                                    onClick={() =>
                                      handleCopy(payment?.bankBranch)
                                    }
                                  />
                                </Tooltip>
                              </span>
                            </TabPane>
                          );
                        })}
                      </Tabs>
                    </div>
                  }
                />
                {tradaType === 'Buy' && (
                  <Step title='After transferring the money, click the button "Transferred, notify the seller"' />
                )}
              </Steps>
            </div>

            {tradaType === 'Buy' && (
              <div>
                <Button
                  className="btnTransferred"
                  type="primary"
                  onClick={() => handelTransfer()}
                >
                  Transferred, notify the seller
                </Button>
                <Button
                  className="btnCancelOrder"
                  onClick={() => setVisiableModalCancel(true)}
                >
                  Cancel order
                </Button>
              </div>
            )}
          </div>
        )}
        {trade?.status === 'CANCEL' && (
          <div className="col-8 cancelOrderContent">
            <h6 className="orderInfoTitle">Order info</h6>
            <div className="descriptionStep1">
              <div className="amount">
                <p>Amount</p>
                <h5>
                  {trade?.order?.fiat?.symbol} {trade?.total}
                </h5>
              </div>
              <div className="price">
                <p>Price</p>
                <h5>
                  {trade?.order?.fiat?.symbol} {trade?.order?.price}
                </h5>
              </div>
              <div className="count">
                <p>Quantity</p>
                <h5>
                  {trade?.amount} {trade?.order?.token?.assetName}
                </h5>
              </div>
            </div>
            <h6 className="paymentMethodTitle">Payment method</h6>
            <p className="paymentMethodDetail">
              Payment method can't be displayed for this order
            </p>
            <h6 className="haq">Have A Question</h6>
          </div>
        )}
        <div className="chat">
          <ChatBox email={trade?.sellEmail} data={trade} />
        </div>
      </div>
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
      </div>
      <ModalCancel
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setVisiableModalCancel(false)}
        show={visiableModalCancel}
      >
        <Modal.Body>
          <div className="tips">
            <h6>
              <RiErrorWarningFill className="warningIcon" /> Tips
            </h6>
            <p>1. If you already paid the seller, don't cancel the order</p>
            <p>
              2. If you cancel your order 3 times in a day, you will lose the
              right to trade for the whole day.
            </p>
          </div>
          <div className="reasonCancel">
            <h6>Why do you want to cancel this order?</h6>
            <Radio.Group onChange={handelChaneReason}>
              {listAppeal.map((appeal: any, index) => {
                if (appeal.reasonType === 'FOR_BUY') {
                  return (
                    <Radio value={appeal.id} key={index}>
                      {appeal.appealReason}
                    </Radio>
                  );
                } else return null;
              })}
              <Radio value={0} key={0}>
                Khác
              </Radio>
            </Radio.Group>
            {inputAnother && <Input />}
          </div>
          <div className="btnModal">
            <Button onClick={() => setVisiableModalCancel(false)}>
              Cancel
            </Button>
            <Button type="primary" onClick={() => handleCancelOrder()}>
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </ModalCancel>
    </Wrapper>
  );
};

export default ContentOrderDetail;

const Wrapper = styled.div`
  .mainContent {
    display: flex;
  }
  .orderStep {
    padding-top: 30px;
    /* flex: 7; */

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
        padding-left: 25px;

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
      .ant-steps-icon-dot {
        background-color: ${({ theme }) => theme.p2pBackground};
        border: 1px solid ${({ theme }) => theme.primary};
      }

      .ant-steps-item-tail {
        &::after {
          background-color: ${({ theme }) => theme.primary};
        }
      }
      padding-top: 20px;

      .paymentTab {
        border-radius: 3px;
        transition: all 0.25s linear;
        border: 1px solid ${({ theme }) => theme.brightGrayColor};

        .paymentTitle {
          color: ${({ theme }) => theme.darkGrayColor};
          margin-bottom: 5px;
          font-size: 16px;
        }
        .paymentDesc {
          display: inline-block;
          margin-bottom: 15px;
          display: flex;
          align-items: center;

          .copyIcon {
            margin-left: 20px;
            cursor: pointer;
            color: ${({ theme }) => theme.primary};
          }
        }
        .tabIcon {
          font-weight: bold;
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
  }
  .chat {
    flex: 3;
  }

  .faq {
    margin-top: 60px;
    width: 70%;

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

  .cancelOrderContent {
    padding-top: 45px;
    flex: 7;
    border-bottom: 2px solid ${({ theme }) => theme.p2pGrayLight};
    padding-bottom: 40px;

    .orderInfoTitle {
      margin-bottom: 20px;
    }

    .paymentMethodTitle {
      margin-top: 30px;
      margin-bottom: 20px;
    }

    .paymentMethodDetail {
      padding: 20px 20px;
      background-color: ${({ theme }) => theme.p2pGrayLight};
      color: ${({ theme }) => theme.graySmokeColor};
      width: 100%;
      border-radius: 5px;
    }

    .haq {
      color: ${({ theme }) => theme.primary};
      font-weight: bold;
      cursor: pointer;
      margin-top: 50px;
    }
  }
`;

const ModalCancel = styled(Modal)`
  color: ${({ theme }) => theme.p2pText};

  .tips {
    background-color: rgba(24, 144, 255, 0.3);
    padding: 15px;
    padding-left: 30px;
    border-radius: 5px;
    h6 {
      margin-left: -20px;
    }

    .warningIcon {
      color: #1890ff;
      font-size: 18px;
    }

    .tips p {
      margin: 0;
    }
  }

  .reasonCancel {
    margin-top: 30px;

    .ant-radio-group {
      display: flex;
      flex-direction: column;
    }

    .ant-radio-wrapper {
      padding: 5px 0;
    }

    .ant-input {
      margin-top: 10px;
      &:focus {
        box-shadow: none;
      }
    }
  }

  .btnModal {
    display: block;
    margin: 0 auto;
    width: 40%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
`;
