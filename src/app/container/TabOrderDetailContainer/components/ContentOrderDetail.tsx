import styled from 'styled-components';
import {
  Steps,
  Button,
  Radio,
  Tooltip,
  Input,
  Tag,
  Checkbox,
  message,
} from 'antd';
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
import QRCode from 'react-qr-code';
import ReconnectingWebSocket from 'reconnecting-websocket';
const baseURLWs = process.env.REACT_APP_BASE_WEBSOCKET_URL;

const ContentOrderDetail = ({ trade, reload }) => {
  const [visibleNote, setVisibleNote] = useState(true);
  const [visibleModalCancel, setVisibleModalCancel] = useState(false);
  const [visibleModalVerification, setVisibleModalVerification] =
    useState(false);
  const [loadingBtnSubmit, setLoadingBtnSubmit] = useState(false);
  const [listAppeal, setListAppeal] = useState([]);
  const [inputAnother, setInputAnother] = useState(false);
  const [visibleBtnConfirmPayment, setVisibleBtnConfirmPayment] =
    useState(true);

  const [paymentSeller, setPaymentSeller] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [currentFirstSteps, setCurrentFirstSteps] = useState<number>(0);
  const [qrCode, setQrCode] = useState('');
  const [qr, setQR] = useState('');
  const [visibleModalConfirmPayment, setVisibleModalConfirmPayment] =
    useState(false);
  const [webSocket, setWebSocket]: any = useState();

  const TabOrderDetailState: TabOrderDetailState =
    useSelector(selectTabOrderDetail);
  const tradaType = TabOrderDetailState.tradeType;

  const {
    updateTradeById,
    getListAppealReason,
    getQRCode,
    verifyDigitCode,
    getPayment,
  } = tabOrderDetailService;
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

  const handelConfirmTransfer = () => {
    setVisibleModalConfirmPayment(true);
  };

  const handelConfirmPayment = () => {
    setVisibleModalVerification(true);
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

  const findPaymentByPaymentId = () => {
    getPayment().then(res => {
      if (res.data.rc === 0) {
        setPaymentSeller(res.data.rows);
      } else console.log(res.data.rd);
    });
  };

  const handleCheckedConfirmPayment = value => {
    if (value) {
      setVisibleBtnConfirmPayment(false);
    } else setVisibleBtnConfirmPayment(true);
  };

  const handleChangQRCode = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setQrCode(e.target.value);

      if (e.target.value.length === 6) {
        handleSecurityCode({
          code: e.target.value,
        });
      }
    }
  };

  const getCodeQRSecurity = () => {
    getQRCode().then(res => {
      if (res.status === 200) {
        setQR(res.data);
      }
    });
  };

  const handleSecurityCode = qrCode => {
    setLoadingBtnSubmit(true);
    if (trade?.tradeId) {
      verifyDigitCode({
        ...qrCode,
        tradeId: trade?.tradeId,
      }).then(res => {
        if (res.status === 200 && res.data) {
          updateTradeById({
            id: trade?.id,
            paymentId: -1,
            status: 'CONFIRMED',
          })
            .then(res => {
              if (res.data.rc === 0) {
                openNotification('Success', 'Completed order!');
                dispatch(setBuyerStatus.setTradeStatus('DONE'));
                reload();
              } else openNotification('Error', res.data.rd);
            })
            .catch(() => openNotification('Error', 'Some thing went wrong!'));
        } else {
          openNotification('Error', 'Digital Code invalid!');
        }

        setLoadingBtnSubmit(false);
      });
    }
  };

  useEffect(() => {
    if (trade?.tradeId) {
      var socket = new ReconnectingWebSocket(`${baseURLWs}/ws`, [], {
        connectionTimeout: 5000,
      });
      setWebSocket(socket);

      socket.onopen = () => {
        console.log(`Websocket connected`);

        socket.send(
          JSON.stringify({
            type: 'SUBSCRIBE',
            tradeId: trade?.tradeId,
          }),
        );

        setInterval(
          () => socket.send(JSON.stringify('Keep socket connection')),
          5000,
        );
      };

      socket.onmessage = message => {
        const res = JSON.parse(message.data);
        if ([1, 2, 3, 4].includes(res?.key)) {
          reload();
        }
      };

      socket.onclose = () => {
        console.log('WebSocket Closed!');
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (visibleModalVerification) {
      getCodeQRSecurity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleModalVerification]);

  useEffect(() => {
    findAllAppealReason();
    findPaymentByPaymentId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line prettier/prettier
  useEffect(() => {
    switch (TabOrderDetailState?.tradeStatus) {
      case 'PROCESSING':
        if (TabOrderDetailState?.tradeType === 'Buy') {
          switch (TabOrderDetailState?.buyerStatus) {
            case 'NOT_PAID':
              setCurrentFirstSteps(0);
              break;
            case 'PAID':
              setCurrentFirstSteps(1);
              break;
            default:
              setCurrentFirstSteps(-1);
              break;
          }
        } else {
          switch (TabOrderDetailState?.sellerStatus) {
            case 'HOLD':
              if (TabOrderDetailState?.buyerStatus === 'NOT_PAID') {
                setCurrentFirstSteps(0);
              }
              if (TabOrderDetailState?.buyerStatus === 'PAID') {
                setCurrentFirstSteps(1);
              }
              break;
            case 'COMFIRM':
              setCurrentFirstSteps(2);
              break;
            default:
              setCurrentFirstSteps(-1);
              break;
          }
        }
        break;
      case 'DONE':
        break;
      case 'CANCEL':
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TabOrderDetailState]);
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
              {visibleNote && tradaType === 'Buy' && (
                <div className="note">
                  <span>
                    <span>
                      You need to leave the Byte Buffer website to make a
                      payment. In the meantime, Byte Buffer will keep the crypto
                      in custody.
                    </span>
                    <br />
                    <span>
                      Upon successful payment tothe seller, go back to the Byte
                      Buffer website and click the "Transferred, notify seller"
                      button.
                    </span>
                  </span>
                  <span
                    className="closeNote"
                    onClick={() => {
                      setVisibleNote(false);
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
                        {TabOrderDetailState.tradeType === 'Buy'
                          ? trade?.order?.payments?.map(payment => {
                              return (
                                <TabPane
                                  key={payment?.id}
                                  tab={
                                    <div>
                                      <span
                                        className="tabIcon"
                                        style={{
                                          color:
                                            payment?.paymentMethod?.colorCode,
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
                            })
                          : paymentSeller
                              .filter(x => {
                                return x.id === trade?.paymentId;
                              })
                              .map(payment => {
                                return (
                                  <TabPane
                                    key={payment?.id}
                                    tab={
                                      <div>
                                        <span
                                          className="tabIcon"
                                          style={{
                                            color:
                                              payment?.paymentMethod?.colorCode,
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
                {TabOrderDetailState.buyerStatus === 'PAID' &&
                  tradaType === 'Sell' && (
                    <Step title='After transferring the payment, be sure to click the "Payment received" button.' />
                  )}
              </Steps>
            </div>

            {tradaType === 'Buy' && (
              <div>
                {TabOrderDetailState.buyerStatus === 'PAID' ? (
                  <Button type="primary">Appeal</Button>
                ) : (
                  <Button
                    className="btnTransferred"
                    type="primary"
                    onClick={() => handelTransfer()}
                  >
                    Transferred, notify the seller
                  </Button>
                )}
                <Button
                  className="btnCancelOrder"
                  onClick={() => setVisibleModalCancel(true)}
                >
                  Cancel order
                </Button>
              </div>
            )}

            {tradaType === 'Sell' &&
              TabOrderDetailState.buyerStatus === 'PAID' && (
                <div>
                  <Button
                    className="btnTransferred"
                    type="primary"
                    onClick={() => handelConfirmTransfer()}
                  >
                    Payment received
                  </Button>
                  <Button className="btnCancelOrder">Transaction issue</Button>
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

        {trade?.status === 'DONE' && (
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
              {trade?.order?.payments
                ?.filter(payment => payment.id === trade.paymentId)
                .map(payment => {
                  return (
                    <Tag
                      color={payment.paymentMethod.colorCode}
                      className="paymentTag"
                    >
                      {payment?.paymentMethod?.name}
                    </Tag>
                  );
                })}
            </p>
            <h6 className="haq">Have A Question</h6>
          </div>
        )}
        <div className="chat">
          <ChatBox email={trade?.partner?.email} data={trade} />
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
        onHide={() => setVisibleModalCancel(false)}
        show={visibleModalCancel}
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
            <Button onClick={() => setVisibleModalCancel(false)}>Cancel</Button>
            <Button type="primary" onClick={() => handleCancelOrder()}>
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </ModalCancel>
      <ModalConfirmPayment
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setVisibleModalConfirmPayment(false)}
        show={visibleModalConfirmPayment}
      >
        <Modal.Body>
          <RiErrorWarningFill className="warningIcon" />
          <h5>Confirm release</h5>
          <p>
            ATTENTION! Please be sure to LOG IN THE RECEVING(e.g.Banks/ eWallet)
            ACCOUNT to confirm that the money has arrived in the "Available
            Balance"
          </p>
          <Checkbox
            onChange={e => handleCheckedConfirmPayment(e.target.checked)}
          >
            I confirm that the payment is successful received with correct
            amount and sender information
          </Checkbox>
          <div className="btnModal">
            <Button onClick={() => setVisibleModalConfirmPayment(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              disabled={visibleBtnConfirmPayment}
              onClick={() => handelConfirmPayment()}
            >
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </ModalConfirmPayment>
      <ModalVerification
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setVisibleModalVerification(false)}
        show={visibleModalVerification}
      >
        <Modal.Header closeButton>
          <h5>Security verification</h5>
        </Modal.Header>
        <Modal.Body>
          <p>
            To secure your account, please complete the following verification.
          </p>
          <p>
            You can also use{' '}
            <b>
              <u>ByteBuffer/Google Authenticator</u>
            </b>
          </p>
          <p className="labelQRcode">Your QR code here</p>
          <QRCode value={qr} height="300" width="300" className="qrCode" />
          <Input value={qrCode} maxLength={6} onChange={handleChangQRCode} />
          <span>Enter the 6 digit code</span>
          <p className="linkSecurityUnavailable">
            Security verification unavailable ?
          </p>
          <Button
            htmlType="submit"
            type="primary"
            className="btnSubmit"
            onClick={() =>
              handleSecurityCode({
                code: qrCode,
              })
            }
            disabled={loadingBtnSubmit}
          >
            {loadingBtnSubmit ? <div className="loader"></div> : 'Submit'}
          </Button>
        </Modal.Body>
      </ModalVerification>
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
    margin-top: 30px;
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

      .paymentTag {
        padding: 5px 10px;
        opacity: 0.9;
      }
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
      color: ${({ theme }) => theme.primary};
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

const ModalConfirmPayment = styled(Modal)`
  .modal-content {
    width: 90%;
    margin: 0 auto;
  }
  text-align: center;
  .modal-body {
    padding: 20px 20px;
  }

  .warningIcon {
    display: block;
    margin: 0 auto;
    color: ${({ theme }) => theme.primary};
    font-size: 100px;
    padding: 0;
    border-radius: 50%;
    z-index: 1;
    padding: 3px;
    border: 1px solid ${({ theme }) => theme.primary};
    margin-bottom: 30px;
  }

  p {
    color: ${({ theme }) => theme.grayColor};
  }

  .ant-checkbox-wrapper {
    margin-left: 22px;
    text-align: left;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .ant-btn {
    margin: 0 10px;
  }
`;

const ModalVerification = styled(Modal)`
  margin: 0 auto;
  color: ${({ theme }) => theme.p2pText};

  .modal-header {
    border: none;
    h5 {
      margin: 0;
    }
    .btn-close {
      &:focus {
        box-shadow: none;
      }
    }
  }

  .modal-body {
    padding-top: 5px;
    p {
      margin: 2px 0;
    }

    .labelQRcode {
      margin-top: 20px;
      font-weight: bold;
    }

    .qrCode {
      display: block;
      margin: 0 auto;
      border: 1px solid ${({ theme }) => theme.whiteSmokeColor};
      border-radius: 5px;
      margin-bottom: 20px;
      margin-top: 10px;
    }

    .ant-input {
      width: 100%;
      height: 50px;
      font-size: 30px;

      &:focus {
        box-shadow: none;
      }
    }

    .ant-row {
      margin-bottom: 0;
    }

    .linkSecurityUnavailable {
      font-weight: bold;
      color: ${({ theme }) => theme.primary};
      cursor: pointer;
      margin-top: 20px;
    }

    .btnSubmit {
      width: 100%;
      margin-top: 20px;
      height: 40px;
      font-weight: bold;
    }
  }

  //loading
  .loader,
  .loader:before,
  .loader:after {
    background: ${({ theme }) => theme.p2pBackground};
    -webkit-animation: load1 1s infinite ease-in-out;
    animation: load1 1s infinite ease-in-out;
    width: 6px;
    height: 3px;
  }
  .loader {
    color: ${({ theme }) => theme.p2pBackground};
    text-indent: -9999em;
    margin: 0 auto;
    position: relative;
    font-size: 9px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
    margin-top: 8px;
  }
  .loader:before,
  .loader:after {
    position: absolute;
    top: 0;
    content: '';
  }
  .loader:before {
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .loader:after {
    left: 1.5em;
  }
  @-webkit-keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 0.8em;
    }
    40% {
      box-shadow: 0 -1em;
      height: 1.6em;
    }
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 0.8em;
    }
    40% {
      box-shadow: 0 -1em;
      height: 1.6em;
    }
  }
`;
