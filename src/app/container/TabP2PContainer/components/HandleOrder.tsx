import { Descriptions, Tag } from 'antd';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectTabP2P } from '../slice/selectors';
import { TabP2PState } from '../slice/type';
import { useForm } from 'react-hook-form';
import CurrencyInput from 'app/components/CurrencyInput/index';
import { tabOrderDetailService } from 'services/orderDetailService';
import { useNavigate } from 'react-router-dom';
import openNotification from 'app/components/NotificationAntd';

const HandleOrder = (props: any) => {
  const TabP2PState: TabP2PState = useSelector(selectTabP2P);
  const navigate = useNavigate();
  const [validateState, setValidateState] = useState(false);
  const [pricePay, setPricePay] = useState('');
  const [receive, setReceive] = useState('');
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
  } = props;

  const maxPrice = available * record.price;

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

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

  const handleChangeReceive = value => {
    setValue(
      'inputReceive',
      Number(Math.floor(parseFloat(value) * 100) / 100).toString(),
    );
    if (value) {
      setReceive(
        Number(getValues('inputReceive').replace(/,/g, '')).toString(),
      );
      setPricePay(
        (
          Number(getValues('inputReceive').replace(/,/g, '')) * record.price
        ).toString(),
      );
    } else {
      setReceive('');
      setPricePay('');
    }
    if (
      Number(getValues('inputReceive').replace(/,/g, '')) * record.price <
        record.orderLowerBound ||
      Number(getValues('inputReceive').replace(/,/g, '')) * record.price >
        maxPrice
    ) {
      setValidateState(true);
    } else {
      setValidateState(false);
    }
  };

  const handleChangePay = value => {
    setValue(
      'inputPay',
      Number(Math.floor(parseFloat(value) * 100) / 100).toString(),
    );
    if (
      Number(parseFloat(getValues('inputPay').replace(/,/g, ''))) <
        record.orderLowerBound ||
      Number(parseFloat(getValues('inputPay').replace(/,/g, ''))) > maxPrice
    ) {
      setValidateState(true);
    } else {
      setValidateState(false);
    }
    if (value) {
      setPricePay(
        (
          Math.floor(
            Number(parseFloat(getValues('inputPay').replace(/,/g, ''))) * 100,
          ) / 100
        ).toString(),
      );
      setReceive(
        (
          Math.floor(
            Number(
              parseFloat(getValues('inputPay').replace(/,/g, '')) /
                record.price,
            ) * 100,
          ) / 100
        ).toString(),
      );
    } else {
      setPricePay('');
      setReceive('');
    }
  };

  const handleBuy = () => {
    if (receive && pricePay) {
      setLoading(true);
      let newValue = {
        amount: Number(receive),
        fiatId: record.fiatId,
        orderId: record.id,
        paymentId: record.payments[0].id,
        price: record.price,
        tokenId: record.tokenId,
        total: Number(pricePay),
      };
      createTrade(newValue)
        .then(res => {
          if (res.data.rc === 0) {
            console.log(res.data);
            openNotification('Success', 'Created your order');
            setTimeout(() => {
              setLoading(false);
              localStorage.setItem('timeLimit', JSON.stringify(null));
              navigate(`/order/orderDetail/${res.data?.item?.id}`);
            }, 2000);
          } else openNotification('Error', res.data.rd);
        })
        .catch(res => console.log('Error', res));
    } else setValidateState(true);
  };

  const handelChooseAll = e => {
    e.preventDefault();
    setPricePay(maxPrice.toString());
    setReceive((maxPrice / record.price).toString());
    setValidateState(false);
  };

  return (
    <ColHandleOrder>
      <div className="orderInfo">
        <ColOrderAdvertisers>
          <div className="row1">
            <div className="firstCharacter">
              {record.account.email.charAt(0).toUpperCase()}
            </div>
            <div className="advertisers">{record.account.email}</div>
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
                {record.fiatSymbol} {record.price}
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
            <Descriptions.Item span={1} label="Buyer's payment method">
              <span className="orderDescriptionSpan">
                <div className="colPayments">
                  {record.payments.length === 0 ? (
                    <h6>Unknow payment!</h6>
                  ) : (
                    record.payments.map((payment, index) => {
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
      <div className="formOrder">
        <form>
          <div className="mb-3 inputBuy">
            <label htmlFor="disabledTextInput" className="form-label labelText">
              I want to pay
            </label>
            <CurrencyInput
              {...register('inputPay', {
                required: true,
                onChange: e => handleChangePay(e.target.value),
              })}
              type="text"
              id="disabledTextInput"
              autoComplete="off"
              className="form-control bargain"
              placeholder={`${record.orderLowerBound.toFixed(
                2,
              )} - ${maxPrice.toFixed(2)}`}
              style={{ borderColor: validateState && 'red' }}
              value={pricePay}
            />
            {validateState && (
              <p className="validateMessage">
                Buy limit: {record.orderLowerBound.toFixed(2)} -{' '}
                {(record.orderLowerBound * record.price).toFixed(2)}{' '}
                {record.fiatName}
              </p>
            )}
            <div className="apponAfter">
              <button
                className="btnChooseAll"
                onClick={e => handelChooseAll(e)}
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
            <CurrencyInput
              {...register('inputReceive', {
                required: true,
                onChange: e => handleChangeReceive(e.target.value),
                value: '',
              })}
              style={{ borderColor: validateState && 'red' }}
              type="text"
              id="disabledTextInput"
              className="form-control bargain"
              placeholder="0.00"
              value={receive}
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
              disabled={validateState || loading}
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
        </form>
      </div>
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
    border-right: 1px solid #ccc;
    overflow: scroll;
    ::-webkit-scrollbar {
      height: 100%;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 0;
      background-color: ${({ theme }) => theme.grayColor};
    }
  }
  .formOrder {
    padding-left: 20px;
    flex: 4;

    .bargain {
      transition: all 0.25s linear;
      font-size: 14px;
      width: 100%;
      height: 40px;

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
