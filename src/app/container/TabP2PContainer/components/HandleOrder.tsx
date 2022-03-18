import { Descriptions, InputNumber, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import styled from 'styled-components';
import { selectTabP2P } from '../slice/selectors';
import { TabP2PState } from '../slice/type';
import { tabOrderDetailService } from 'services/orderDetailService';
import { useNavigate } from 'react-router-dom';
import openNotification from 'app/components/NotificationAntd';
import { darkTheme } from 'theme/theme';
import { tabP2PService } from 'services/tabP2PServices';

const HandleOrder = (props: any) => {
  const TabP2PState: TabP2PState = useSelector(selectTabP2P);
  const navigate = useNavigate();
  const { getUserPayments } = tabP2PService;

  //BUY
  const [validateStateBuy, setValidateStateBuy] = useState(false);
  const [pricePayBuy, setPricePayBuy] = useState<number>();
  const [receiveBuy, setReceiveBuy] = useState<number>();

  //SELL
  const [validateStateSell, setValidateStateSell] = useState(false);
  const [cryptoSell, setCryptoSell] = useState<number>();
  const [receivePriceSell, setReceivePriceSell] = useState<number>();
  const [sellerPayments, setSellerPayments] = useState([]);

  const [loading, setLoading] = useState(false);
  const { createTrade } = tabOrderDetailService;
  const {
    listP2POrders,
    text,
    record,
    index,
    hanldeCloseOrder,
    timeLimit,
    available,
    type,
  } = props;

  const options = sellerPayments.map((payment: any) => {
    return {
      key: payment.id,
      value: payment.id,
      label: (
        <p>
          <span>{payment?.paymentMethod.name}</span>
          <span>{payment?.fullName}</span>
        </p>
      ),
    };
  });

  const maxPrice = available * record.price;

  let fiatName = TabP2PState.searchParam.fiat;
  let crypto = TabP2PState.searchParam.crypto;
  let orders = 0;
  let numberOrderDone = 0;
  listP2POrders.forEach(order => {
    if (order.accountEmail === text && order.orderType === 0) {
      orders += 1;
      if (order.status === 'DONE') {
        numberOrderDone += 1;
      }
    }
  });

  const handleChangeReceiveBuy = value => {
    if (value >= 0) {
      setReceiveBuy(Number(value));
      setPricePayBuy(Number(Math.floor(value * record?.price * 100) / 100));
    }

    if (value < record?.orderLowerBound / record?.price || value > available) {
      setValidateStateBuy(true);
    } else {
      setValidateStateBuy(false);
    }
  };

  const handleChangePayBuy = value => {
    if (value >= 0) {
      setPricePayBuy(Number(value));
      setReceiveBuy(Number(Math.floor((value / record?.price) * 100) / 100));
    }

    if (value < record?.orderLowerBound || value > record?.price * available) {
      setValidateStateBuy(true);
    } else {
      setValidateStateBuy(false);
    }
  };

  const handleBuy = () => {
    if (receiveBuy && pricePayBuy) {
      setLoading(true);
      let newValue = {
        amount: Number(receiveBuy),
        fiatId: record.fiatId,
        orderId: record.id,
        paymentId: record.payments[0].id,
        price: record.price,
        tokenId: record.tokenId,
        total: Number(pricePayBuy),
      };
      createTrade(newValue)
        .then(res => {
          if (res.data.rc === 0) {
            openNotification('Success', 'Created your order');
            setTimeout(() => {
              setLoading(false);
              localStorage.setItem('timeLimit', JSON.stringify(null));
              navigate(`/order/orderDetail/${res.data?.item?.id}`);
            }, 2000);
          } else openNotification('Error', res.data.rd);
        })
        .catch(res => console.log('Error', res));
    } else setValidateStateBuy(true);
  };

  const handelChooseAll = () => {
    setPricePayBuy(record?.price * available);
    setReceiveBuy(available);
    setValidateStateBuy(false);
  };

  //SELL
  const handleSell = () => {};

  const handleChangeCryptoSell = value => {
    setCryptoSell(Number(value?.toFixed(2)));
    setReceivePriceSell(
      Number(Math.floor(value?.toFixed(2) * record?.price * 100) / 100),
    );

    if (
      Number(value?.toFixed(2)) < record?.orderLowerBound / record?.price ||
      Number(value?.toFixed(2)) > available
    ) {
      setValidateStateSell(true);
    } else setValidateStateSell(false);
  };

  const handleChangeRecieve = value => {
    setCryptoSell(
      Number(Math.floor((value?.toFixed(2) / record?.price) * 100) / 100),
    );
    setReceivePriceSell(Number(value?.toFixed(2)));
    if (
      Number(value?.toFixed(2)) < record?.orderLowerBound ||
      Number(value?.toFixed(2)) > record?.price * available
    ) {
      setValidateStateSell(true);
    } else setValidateStateSell(false);
  };

  useEffect(() => {
    if (type === 'Sell') {
      getUserPayments().then(res => {
        if (res.data.rc === 0) {
          setSellerPayments(res.data.rows);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ColHandleOrder>
      <div className="orderInfo">
        <ColOrderAdvertisers>
          <div className="row1">
            <div className="firstCharacter">
              {record.accountEmail.charAt(0).toUpperCase()}
            </div>
            <div className="advertisers">{record.accountEmail}</div>
          </div>

          <div className="row2">
            {''}
            <span>{orders} Orders</span>
            <span className="numberOrderComplete">
              {((numberOrderDone / orders) * 100).toFixed(2)} % completed
            </span>
          </div>
        </ColOrderAdvertisers>
        <div className="orderDescription">
          <Descriptions size="small">
            <Descriptions.Item span={1} label="Price">
              <span className="orderDescriptionSpan orderPrice">
                {record?.fiat?.symbol} {record?.price}
              </span>
            </Descriptions.Item>
            <Descriptions.Item span={1} label="Available">
              <span className="orderDescriptionSpan">
                {record.amount - record.executed}{' '}
                <span>{TabP2PState.searchParam.crypto}</span>
              </span>
            </Descriptions.Item>
          </Descriptions>
          <Descriptions size="small">
            <Descriptions.Item span={1} label="Payment time limit">
              <span className="orderDescriptionSpan">
                {timeLimit > 60 ? (
                  <span>
                    {Math.floor(timeLimit / 60)} hours {timeLimit % 60} minutes
                  </span>
                ) : (
                  <span>{timeLimit % 60} minutes</span>
                )}
              </span>
            </Descriptions.Item>
            <Descriptions.Item span={1} label={`${type}er's payment method`}>
              <span className="orderDescriptionSpan">
                <div className="colPayments">
                  {record?.payments?.length === 0 ? (
                    <h6>Unknow payment!</h6>
                  ) : (
                    record?.payments?.map((payment, index) => {
                      if (payment) {
                        return (
                          <Tag key={index} className="paymentTag">
                            <img src={payment.paymentMethod.icon} alt="#" />{' '}
                            <span
                              style={{
                                color: `${payment.paymentMethod.colorCode}`,
                              }}
                            >
                              {payment.paymentMethod.name}
                            </span>
                          </Tag>
                        );
                      } else return null;
                    })
                  )}
                </div>
              </span>
            </Descriptions.Item>
          </Descriptions>
          <div className="termsAndCondition">
            <h6>Terms and condition</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eum
              molestiae quasi voluptate minus eos illo possimus? Temporibus
              voluptatem sit dolorem eligendi mollitia magni fugit. Odit eum
              esse necessitatibus neque?
            </p>
          </div>
        </div>
        ,
      </div>
      {type === 'Buy' && (
        <div className="formOrderBuy">
          <div className="mb-3 inputBuy">
            <label htmlFor="disabledTextInput" className="form-label labelText">
              I want to pay
            </label>
            <InputNumber
              onChange={handleChangePayBuy}
              value={pricePayBuy}
              autoComplete="off"
              min={0}
              className="form-control bargain"
              placeholder={`${record.orderLowerBound.toFixed(
                2,
              )} - ${maxPrice.toFixed(2)}`}
              style={{ borderColor: validateStateBuy ? 'red' : '' }}
            />
            {validateStateBuy && (
              <p className="validateMessage">
                Buy limit: {record.orderLowerBound.toFixed(2)} -{' '}
                {(record.orderLowerBound * record.price).toFixed(2)}{' '}
                {record.fiatName}
              </p>
            )}
            <div className="apponAfter">
              <button
                className="btnChooseAll"
                onClick={() => handelChooseAll()}
              >
                All
              </button>
              <span className="fiatNameInput">{fiatName}</span>
            </div>
          </div>

          <div className="mb-3 inputBuy">
            <label htmlFor="disabledTextInput" className="form-label">
              I will receive
            </label>
            <InputNumber
              style={{
                borderColor: validateStateBuy ? darkTheme.redColor : '',
              }}
              id="disabledTextInput"
              className="form-control bargain"
              placeholder="0.00"
              min={0}
              value={receiveBuy}
              onChange={handleChangeReceiveBuy}
            />
            <div className="apponAfter">
              <span className="fiatNameInput">{crypto}</span>
            </div>
          </div>

          <div className="btn-control">
            <Button
              className="btn btn-secondary btn-lg btn-cancel"
              onClick={() => {
                hanldeCloseOrder(prev => prev.filter(order => order !== index));
              }}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-lg btn-primary btn-buy"
              onClick={() => {
                handleBuy();
              }}
              disabled={validateStateBuy || loading}
            >
              {loading ? <div className="loader"></div> : `Buy ${crypto}`}
            </Button>
          </div>
          <div className="desc">
            <span className="underDot">T+1:</span>
            <span>
              {' '}
              T+1 withdrawal limit will be imposed on the purchased asset to
              enhance fund safety.
            </span>
            <span>
              {' '}
              <span>Learn more {'>'}</span>
            </span>
          </div>
        </div>
      )}

      {/* {SELL} */}
      {type === 'Sell' && (
        <div className="formOrderSell">
          <div className="mb-3 inputBuy">
            <label htmlFor="disabledTextInput" className="form-label">
              I want to sell
            </label>
            <InputNumber
              style={{
                borderColor: validateStateSell ? darkTheme.redColor : '',
              }}
              id="disabledTextInput"
              className="form-control bargain"
              placeholder="0.00"
              min={0}
              value={cryptoSell}
              onChange={handleChangeCryptoSell}
            />
            <div className="apponAfter">
              <button
                className="btnChooseAll"
                onClick={() => handelChooseAll()}
              >
                All
              </button>
              <span className="fiatNameInput">{crypto}</span>
            </div>
            {validateStateSell && (
              <p className="validateMessage">
                Buy limit: {record.orderLowerBound.toFixed(2)} -{' '}
                {(record.orderLowerBound * record.price).toFixed(2)}{' '}
                {record.fiatName}
              </p>
            )}
          </div>

          <div className="mb-3 inputBuy">
            <label htmlFor="disabledTextInput" className="form-label labelText">
              I will receive
            </label>
            <InputNumber
              onChange={handleChangeRecieve}
              value={receivePriceSell}
              autoComplete="off"
              min={0}
              className="form-control bargain"
              placeholder={`${record.orderLowerBound.toFixed(
                2,
              )} - ${maxPrice.toFixed(2)}`}
              style={{
                borderColor: validateStateSell ? darkTheme.redColor : '',
              }}
            />
            <div className="apponAfter">
              <span className="fiatNameInput">{fiatName}</span>
            </div>
          </div>
          <p className="paymentTitle">Payments method</p>
          <Select options={options} />
          <div className="btn-control">
            <Button
              className="btn btn-secondary btn-lg btn-cancel"
              onClick={() => {
                hanldeCloseOrder(prev => prev.filter(order => order !== index));
              }}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-lg btn-primary btn-sell"
              onClick={() => {
                handleSell();
              }}
              disabled={validateStateSell || loading}
            >
              {loading ? <div className="loader"></div> : `Sell ${crypto}`}
            </Button>
          </div>
        </div>
      )}
    </ColHandleOrder>
  );
};

export default HandleOrder;

const ColHandleOrder = styled.div`
  height: 350px;
  display: flex;

  .colPayments {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    img {
      width: 30px;
    }
    .payment {
      font-size: 12px;
      padding: 0px 4px;
      border-radius: 4px;
      margin-right: 4px;
      margin-bottom: 4px;
      min-width: 70px;
      text-align: center;

      background-color: ${({ theme }) => theme.p2pBorder};
      color: ${({ theme }) => theme.redColor};
    }
  }
  .orderDescription {
    margin-left: 25px;
    margin-top: 10px;
    padding-right: 20px;

    .paymentTag {
      margin-bottom: 2px;
      padding-right: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 25px;
        padding: 2px;
        margin-left: 2px;
      }
    }
    .orderPrice {
      color: ${({ theme }) => theme.redColor};
    }

    .orderDescriptionSpan {
      font-weight: bold;
    }

    .termsAndCondition {
      margin-top: 40px;
    }
  }
  .orderInfo {
    flex: 6;
    border-right: 1px solid ${({ theme }) => theme.grayColor};
    overflow: scroll;
    ::-webkit-scrollbar {
      height: 100%;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 0;
      background-color: ${({ theme }) => theme.grayColor};
    }
  }
  .formOrderSell {
    padding-left: 20px;
    flex: 4;

    .labelText {
      width: 100%;
    }

    .inputBuy {
      position: relative !important;
      margin-bottom: 30px !important;
    }

    .validateMessage {
      position: absolute;
      bottom: -100;
      color: ${({ theme }) => theme.redColor};
    }

    .apponAfter {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(10%);
      transition: all 0.25s linear;
      margin-right: 10px;
      color: ${({ theme }) => theme.brightGrayColor};

      .btnChooseAll {
        margin-right: 15px;
        border: none;
        color: ${({ theme }) => theme.primary} !important;
        background-color: ${({ theme }) => theme.p2pBackground};
        border-radius: 5px;
        transition: all 0.25s linear;
        margin-bottom: 2px;

        &:hover {
          background-color: ${({ theme }) => theme.brightGrayColor};
        }
      }
    }

    .ant-input-number-handler-wrap {
      display: none;
    }

    .bargain {
      transition: all 0.25s linear;
      font-size: 14px;
      width: 100% !important;
      height: 40px;
      box-shadow: none;
      padding: 4px 10px;

      input {
        padding: 0;
      }
      &:hover {
        border: 1px solid ${({ theme }) => theme.primary};
      }

      &:focus {
        border: 1px solid ${({ theme }) => theme.primary};
        box-shadow: none;
      }
    }

    .paymentTitle {
      margin-top: 0;
      margin-bottom: 10px;
    }
    .ant-select {
      width: 100% !important;

      .ant-select-selector {
        border-radius: 5px !important;
        height: 40px;
        padding-top: 3px;
      }
    }

    .btn-control {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;

      .btn {
        height: 40px;
        font-size: 16px;
        padding-bottom: 20px;
      }
      .btn-cancel {
        flex: 3;
        margin-right: 10px;
        background-color: ${({ theme }) => theme.grayColor};
        border-color: ${({ theme }) => theme.grayColor};
        transition: all 0.25s linear;

        &:hover {
          opacity: 0.8;
        }

        &:focus {
          box-shadow: none;
        }
      }

      .btn-sell {
        flex: 7;
        background-color: ${({ theme }) => theme.redColor};
        border: ${({ theme }) => theme.redColor};
        transition: all 0.25s linear;
        &:hover {
          opacity: 0.8;
        }

        &:focus {
          box-shadow: none;
        }
      }
    }
  }
  .formOrderBuy {
    padding-left: 20px;
    flex: 4;

    .ant-input-number-handler-wrap {
      display: none;
    }

    .bargain {
      transition: all 0.25s linear;
      font-size: 14px;
      width: 100%;
      height: 40px;
      box-shadow: none;
      padding: 4px 10px;

      input {
        padding: 0;
      }

      &:hover {
        border: 1px solid ${({ theme }) => theme.primary};
      }

      &:focus {
        border: 1px solid ${({ theme }) => theme.primary};
        box-shadow: none;
      }
    }

    .btn-control {
      display: flex;
      justify-content: space-between;
      margin-top: 35px;

      .btn {
        height: 40px;
        font-size: 16px;
        padding-bottom: 20px;
      }
      .btn-cancel {
        flex: 3;
        margin-right: 10px;
        background-color: ${({ theme }) => theme.grayColor};
        border-color: ${({ theme }) => theme.grayColor};
        transition: all 0.25s linear;

        &:hover {
          opacity: 0.8;
        }

        &:focus {
          box-shadow: none;
        }
      }

      .btn-buy {
        flex: 7;
        background-color: ${({ theme }) => theme.greenColor};
        border: ${({ theme }) => theme.greenColor};
        transition: all 0.25s linear;
        &:hover {
          opacity: 0.8;
        }

        &:focus {
          box-shadow: none;
        }

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
          font-size: 11px;
          -webkit-transform: translateZ(0);
          -ms-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-animation-delay: -0.16s;
          animation-delay: -0.16s;
          margin-top: 6px;
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
            height: 1em;
          }
          40% {
            box-shadow: 0 -1em;
            height: 2em;
          }
        }
        @keyframes load1 {
          0%,
          80%,
          100% {
            box-shadow: 0 0;
            height: 1em;
          }
          40% {
            box-shadow: 0 -1em;
            height: 2em;
          }
        }
      }
    }

    .labelText {
      width: 100%;
    }

    .inputBuy {
      position: relative !important;
      margin-bottom: 35px !important;
    }
    .validateMessage {
      position: absolute;
      bottom: -100;
      color: ${({ theme }) => theme.redColor};
    }

    .apponAfter {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(10%);
      transition: all 0.25s linear;
      margin-right: 10px;
      color: ${({ theme }) => theme.brightGrayColor};

      .btnChooseAll {
        margin-right: 15px;
        border: none;
        color: ${({ theme }) => theme.primary} !important;
        background-color: ${({ theme }) => theme.p2pBackground};
        border-radius: 5px;
        transition: all 0.25s linear;
        margin-bottom: 2px;

        &:hover {
          background-color: ${({ theme }) => theme.brightGrayColor};
        }
      }
    }

    .desc {
      margin-top: 20px;
      text-align: center;

      .underDot {
        font-weight: bold;
        border-bottom: 2px dotted black;
      }

      span:last-child {
        color: ${({ theme }) => theme.primary};
        cursor: pointer;
      }
    }
  }
`;

const ColOrderAdvertisers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  .row1 {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .firstCharacter {
      text-align: center;
      font-size: 12px;
      color: ${({ theme }) => theme.text};
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
      background-color: ${({ theme }) => theme.primary};
    }

    .advertisers {
      margin: 0px 8px;
    }
  }
  .row2 {
    margin-left: 28px;
    font-size: 12px;
    color: ${({ theme }) => theme.primary};
    .numberOrderComplete {
      margin-left: 10px;
      padding-left: 5px;
      border-left: 1px solid #ccc;
    }
  }
`;
