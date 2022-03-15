import { Descriptions, Input, Tag } from 'antd';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectTabP2P } from '../slice/selectors';
import { TabP2PState } from '../slice/type';
import { useForm } from 'react-hook-form';

const HandleOrder = (props: any) => {
  const TabP2PState: TabP2PState = useSelector(selectTabP2P);

  const { listP2POrders, text, record, index, hanldeCloseOrder, timeLimit } =
    props;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit = data => {
    console.log(data);
  };

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

  const handleChangeRecive = e => {
    // trigger('inputPay');
  };

  const handleChangePay = value => {
    setValue('inputPay', Number(Math.abs(parseFloat(value)).toFixed(2)), {
      shouldValidate: true,
    });

    setValue(
      'inputReceive',
      Number((Math.abs(parseFloat(value)) / record.price).toFixed(2)),
      {
        shouldValidate: true,
      },
    );

    console.log(typeof getValues('inputReceive'));
  };

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
                {
                  <div className="colPayments">
                    {record.payments.length === 0 ? (
                      <h6>Unknow payment!</h6>
                    ) : (
                      record.payments.map(payment => {
                        if (payment) {
                          return (
                            <Tag key={record.id} className="paymentTag">
                              <img src={payment.paymentMethodIcon} alt="#" />{' '}
                              <span
                                style={{
                                  color: `${payment.paymentMethodColor}`,
                                }}
                              >
                                {payment.paymentMethodName}
                              </span>
                            </Tag>
                          );
                        } else return null;
                      })
                    )}
                  </div>
                }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 inputBuy">
            <label htmlFor="disabledTextInput" className="form-label labelText">
              I want to pay
            </label>
            <input
              {...register('inputPay', {
                min: record.orderLowerBound,
                max: record.orderLowerBound * record.price,
                onChange: e => handleChangePay(e.target.value),
              })}
              step={0.01}
              type="number"
              id="disabledTextInput"
              className="form-control bargain"
              placeholder={`${record.orderLowerBound.toFixed(2)} - ${(
                record.orderLowerBound * record.price
              ).toFixed(2)}`}
              style={{ borderColor: errors.inputPay && 'red' }}
            />
            {errors.inputPay && (
              <p className="validateMessage">
                Buy limit: {record.orderLowerBound.toFixed(2)} -{' '}
                {(record.orderLowerBound * record.price).toFixed(2)}{' '}
                {record.fiatName}
              </p>
            )}
            <div className="apponAfter">
              <button className="btnChooseAll">All</button>
              <span className="fiatNameInput">{fiatName}</span>
            </div>
          </div>

          <div className="mb-3 inputBuy">
            <label htmlFor="disabledTextInput" className="form-label">
              I will receive
            </label>
            <input
              {...register('inputReceive')}
              style={{ borderColor: errors.inputPay && 'red' }}
              type="number"
              id="disabledTextInput"
              className="form-control bargain"
              step="0.01"
              placeholder="0.00"
              onChange={e => handleChangeRecive(e)}
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
              type="submit"
              className="btn btn-lg btn-primary btn-buy"
              onClick={() => {}}
            >
              Buy {crypto}
            </Button>
          </div>
          <div className="desc">
            <span>T+1:</span>
            <span>
              {' '}
              T+1 withdrawal limit will be imposed on the purchased asset to
              enhance fund safety.
            </span>
            <span>
              {' '}
              <a>Learn more {'>'}</a>
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

      span:first-child {
        font-weight: bold;
        border-bottom: 2px dotted black;
      }

      span:last-child {
        color: ${({ theme }) => theme.primary};
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
