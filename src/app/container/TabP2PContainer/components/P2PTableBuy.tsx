import { Descriptions, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { tabP2PService } from '../../../../services/tabP2PServices';
import { useSelector } from 'react-redux';
import { selectTabP2P } from '../slice/selectors';
import { TabP2PState } from '../slice/type';
import { useDispatch } from 'react-redux';
import { useTabP2PSlice } from '../slice';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import HandleOrder from './HandleOrder';

function P2PTableBuy() {
  const [listP2POrdersBuy, setListP2POrdersBuy] = useState<any>([]);
  const [listP2POrders, setListP2POrders] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [openOrders, setOpenOrders] = useState<any>([]);
  const [listTimeLimit, setListTimeLimit] = useState<any>([]);
  const dispatch = useDispatch();
  const findTokens = useTabP2PSlice().actions;
  const findFiats = useTabP2PSlice().actions;
  const findPayments = useTabP2PSlice().actions;

  const TabP2PState: TabP2PState = useSelector(selectTabP2P);
  const {
    getListFiat,
    getListToken,
    getListOrderBy,
    getListPayments,
    getListOrder,
    getListTimeLimit,
  } = tabP2PService;

  const token = TabP2PState.searchParam.crypto;
  const columns: ColumnsType<any> = [
    {
      title: 'Advertisers',
      key: 'Advertisers',
      dataIndex: 'accountEmail',
      width: 400,
      render: (text: any, record: any, index: any) => {
        if (!openOrders.includes(index)) {
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

          return (
            <ColAdvertisers>
              <div className="row1">
                <div className="firstCharacter">
                  {record.accountEmail.charAt(0).toUpperCase()}
                </div>
                <div className="advertisers">{record.accountEmail}</div>
                <div className="checked">
                  {<BsFillCheckCircleFill color="#10afff" />}
                </div>
              </div>

              <div className="row2">
                {''}
                <span>{orders} Orders</span>
                <span className="numberOrderComplete">
                  {((numberOrderDone / orders) * 100).toFixed(2)} % completed
                </span>
              </div>
            </ColAdvertisers>
          );
        } else {
          let timeLimit = listTimeLimit.find(
            time => time.id === record.paymentTimeId,
          ).timeLimit;
          return (
            <HandleOrder
              listP2POrders={listP2POrders}
              text={text}
              record={record}
              index={index}
              hanldeCloseOrder={hanldeCloseOrder}
              timeLimit={timeLimit}
            />
          );
        }
      },

      onCell: (_, index) => {
        return {
          colSpan: openOrders.includes(index) ? 5 : 1,
        };
      },
    },
    {
      title: 'Price',
      key: 'Price',
      dataIndex: 'price',
      width: 200,
      render: (text: any, record: any) => {
        return (
          <ColPrice>
            {record.price} <span> {record.fiatName}</span>
          </ColPrice>
        );
      },
      onCell: (_, index) => ({
        colSpan: openOrders.includes(index) ? 0 : 1,
      }),
    },
    {
      title: 'Limit/Available',
      key: 'Limit/Available',
      // dataIndex: 'limit',
      width: 300,
      render: (text: any, record: any) => (
        <ColLimitAvailable>
          <div className="rowLimitAvailable">
            <div className="col1">
              <span>Available</span>
            </div>
            <div className="col2">
              {record.amount - record.executed}{' '}
              <span>{TabP2PState.searchParam.crypto}</span>
            </div>
          </div>
          <div className="rowLimitAvailable">
            <div className="col1">Limit</div>
            <div className="col2">
              {record.orderLowerBound} <span>{record.fiatName} - </span>
            </div>
            <div className="col3">
              {record.orderUpperBound} <span>{record.fiatName}</span>
            </div>
          </div>
        </ColLimitAvailable>
      ),
      onCell: (_, index) => ({
        colSpan: openOrders.includes(index) ? 0 : 1,
      }),
    },
    {
      title: 'Payments',
      key: 'Payments',
      dataIndex: 'payments',

      render: (text: any, record: any) => (
        <ColPayment>
          {text.length === 0 ? (
            <h6>Unknow payment!</h6>
          ) : (
            text.map(payment => {
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
              }
            })
          )}
        </ColPayment>
      ),
      onCell: (_, index) => ({
        colSpan: openOrders.includes(index) ? 0 : 1,
      }),
    },
    {
      title: (
        <ColumnsTrade>
          <div className="title">Trade</div>
          <div className="fee">0 Fee</div>
        </ColumnsTrade>
      ),
      key: 'trade',
      width: 200,
      render: (_, record, index: any) => {
        return (
          <ButtonSell
            onClick={() => {
              setOpenOrders([...openOrders, index]);
            }}
          >
            Buy {token}
          </ButtonSell>
        );
      },
      onCell: (_, index) => ({
        colSpan: openOrders.includes(index) ? 0 : 1,
      }),
    },
  ];

  const hanldeCloseOrder = value => {
    setOpenOrders(value);
  };

  const findAllOrdersBuy = () => {
    setLoading(true);
    const listFiat = TabP2PState.listFiat;
    const listToken = TabP2PState.listToken;
    const listPaymet = TabP2PState.listPayment;

    let payment = TabP2PState.searchParam.payment;
    let fiat = TabP2PState.searchParam.fiat;
    let crypto = TabP2PState.searchParam.crypto;
    let amount = TabP2PState.amount;

    let paymentId = 0;
    let fiatId = 0;
    let cryptoId = 0;

    if (listToken.length !== 0 && crypto) {
      cryptoId = listToken.find(token => token.assetName === crypto).id;
    }

    if (listFiat.length !== 0 && fiat) {
      fiatId = listFiat.find(x => x.name === fiat).id;
    }

    if (listPaymet.length !== 0 && payment !== 'All payments' && payment) {
      paymentId = listPaymet.find(x => x.name === payment).id;
    }

    getListOrderBy({
      fiat: fiatId,
      payments: paymentId || -1,
      tokenId: cryptoId,
      orderType: 0,
      amount: amount,
    })
      .then((res: any) => {
        if (res.data.rc === 0) {
          setListP2POrdersBuy(res.data.rows);
          setLoading(false);
        } else {
          console.log(res.rd);
          setLoading(false);
        }
      })
      .catch(res => {
        console.log(res);
        setLoading(false);
      });
  };

  const findAllOrders = () => {
    getListOrder()
      .then(res => {
        if (res.data.rc === 0) {
          setListP2POrders(res.data.rows);
        } else {
          console.log(res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };

  const findAllFiat = () => {
    getListFiat()
      .then(res => {
        if (res.data.rc === 0) {
          dispatch(findFiats.getListFiat(res.data.rows));
        } else {
          console.log(res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };

  const findAllToken = () => {
    getListToken()
      .then(res => {
        if (res.data.rc === 0) {
          dispatch(findTokens.getListToken(res.data.rows));
        } else {
          console.log(res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };

  const findAllPayment = () => {
    getListPayments()
      .then(res => {
        if (res.data.rc === 0) {
          dispatch(findPayments.getListPayment(res.data.rows));
        } else {
          console.log(res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };

  const findAllPaymentTime = () => {
    getListTimeLimit()
      .then(res => {
        if (res.data.rc === 0) {
          setListTimeLimit(res.data.rows);
        } else {
          console.log(res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };
  useEffect(() => {
    findAllFiat();
    findAllToken();
    findAllPayment();
    findAllOrdersBuy();
    findAllOrders();
    findAllPaymentTime();
  }, []);

  useEffect(() => {
    findAllOrdersBuy();
  }, [TabP2PState]);

  return (
    <Wrapper>
      <Table
        rowKey={'id'}
        loading={{
          spinning: loading,
          indicator: <AiOutlineLoading3Quarters className="loadingIcon" />,
        }}
        columns={columns}
        dataSource={listP2POrdersBuy}
      />
    </Wrapper>
  );
}

export default P2PTableBuy;

const Wrapper = styled.div`
  @keyframes spining {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .loadingIcon {
    -webkit-animation: spining 1.1s infinite linear;
    animation: spining 1.1s infinite linear;
  }
`;

const ColHandleOrder = styled.div`
  display: flex;
  .orderInfo {
    flex: 6;
    border-right: 1px solid #ccc;
  }
  .formOrder {
    padding-left: 20px;
    flex: 4;
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

const ColAdvertisers = styled.div`
  display: flex;
  flex-direction: column;

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

const ColPrice = styled.div`
  font-size: 20px;

  span {
    font-size: 12px;
  }
`;

const ColLimitAvailable = styled.div`
  .rowLimitAvailable {
    display: flex;
    align-items: baseline;

    .col1 {
      min-width: 50px;
      margin-right: 8px;

      font-size: 12px;
      color: ${({ theme }) => theme.primary};
    }

    .col3 {
      margin-left: 2px;
    }
  }
`;

const ColPayment = styled.div`
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
    color: #e72258;
  }
`;

const ColumnsTrade = styled.div`
  display: flex;
  justify-content: space-between;

  .fee {
    padding: 0px 10px;
    color: rgb(0, 192, 135);
    background-color: rgb(226, 253, 244);
  }
`;

const ButtonSell = styled(Button)`
  height: 30px;
  padding: 0px 30px;
  background-color: ${({ theme }) => theme.p2pBuy};
  border: none;
  width: 80%;
  display: block;
  margin: 0 auto;

  &:hover,
  &:focus,
  &:active,
  &:active:focus {
    background-color: ${({ theme }) => theme.p2pBuy};
    border: none;
    box-shadow: none;
  }

  &:hover,
  &:focus {
    opacity: 0.6;
  }
`;
