import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { tabP2PService } from '../../../../services/tabP2PServices';
import { useSelector } from 'react-redux';
import { selectTabP2P } from '../slice/selectors';
import { TabP2PState } from '../slice/type';

function P2PTableBuy() {
  const [listP2POrdersBuy, setListP2POrdersBuy] = useState<any>([]);
  const [listFiat, setListFiat] = useState<any>([]);
  const [listToken, setListToken] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const TabP2PState: TabP2PState = useSelector(selectTabP2P);
  const { getListOrderBuy, getListFiat, getListToken } = tabP2PService;
  const token = listToken.find(
    x => x.assetName === TabP2PState.searchParam.crypto,
  );
  const fiat = listFiat.find(x => x.name === TabP2PState.searchParam.fiat);
  console.log(111, fiat);
  const columns: ColumnsType<any> = [
    {
      title: 'Advertisers',
      key: 'Advertisers',
      dataIndex: 'accountEmail',
      width: 400,
      render: (text: any, record: any) => (
        <ColAdvertisers>
          <div className="row1">
            <div className="firstCharacter">
              {record.accountEmail.charAt(0)}
            </div>
            <div className="advertisers">{record.accountEmail}</div>
            <div className="checked">
              {<BsFillCheckCircleFill color="#10afff" />}
            </div>
          </div>

          <div className="row2">
            {/* {record.orders} orders | {record.completion}% completion */}
          </div>
        </ColAdvertisers>
      ),
    },
    {
      title: 'Price',
      key: 'Price',
      dataIndex: 'price',
      width: 200,
      render: (text: any, record: any) => {
        return (
          <ColPrice>
            {record.price}{' '}
            {listFiat.map(fiat => {
              if (fiat.id === record.fiatId) {
                return <span>{fiat.name}</span>;
              } else return null;
            })}
          </ColPrice>
        );
      },
    },
    {
      title: 'Limit/Available',
      key: 'Limit/Available',
      // dataIndex: 'limit',
      width: 300,
      render: (text: any, record: any) => (
        <ColLimitAvailable>
          <div className="rowLimitAvailable">
            <div className="col1">Available</div>
            <div className="col2">{record.amount - record.executed}</div>
          </div>
          <div className="rowLimitAvailable">
            <div className="col1">Limit</div>
            <div className="col2">{record.amount * record.total}</div>
          </div>
        </ColLimitAvailable>
      ),
    },
    {
      title: 'Payment',
      key: 'Payment',
      // dataIndex: 'payment',
      // width: 280,

      // render: (text: any, record: any) => (
      //   <ColPayment>
      //     {text.map((t, i) => (
      //       <div className="payment" key={i}>
      //         {t}
      //       </div>
      //     ))}
      //   </ColPayment>
      // ),
    },
    {
      title: (
        <ColumnsTrade>
          <div className="title">Trade</div>
          <div className="fee">0 Fee</div>
        </ColumnsTrade>
      ),
      key: 'trade',
      // dataIndex: 'trade',
      width: 200,
      render: (text: any, record: any) => {
        return <ButtonSell>Buy {TabP2PState.searchParam.crypto}</ButtonSell>;
      },
    },
  ];

  const findAllOrderBuy = () => {
    setLoading(true);
    getListOrderBuy()
      .then(res => {
        if (res.data.rc === 0) {
          console.log(res.data.rows.filter(order => order.orderType === 0));
          setListP2POrdersBuy(
            res.data.rows.filter(
              order => order.orderType === 0 && order.tokenId === token.id,
            ),
          );
          setLoading(false);
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
          setListFiat(res.data.rows);
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
          setListToken(res.data.rows);
        } else {
          console.log(res.data.rd);
        }
      })
      .catch(res => console.log(res));
  };
  useEffect(() => {
    findAllOrderBuy();
    findAllFiat();
    findAllToken();
  }, []);

  useEffect(() => {
    findAllOrderBuy();
    console.log(token);
  }, [token]);

  return (
    <Wrapper>
      <Table
        rowKey={'id'}
        loading={loading}
        columns={columns}
        dataSource={listP2POrdersBuy}
      />
    </Wrapper>
  );
}

export default P2PTableBuy;

const Wrapper = styled.div``;

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

    .col1 {
      min-width: 50px;
      margin-right: 8px;

      font-size: 12px;
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const ColPayment = styled.div`
  display: flex;
  flex-wrap: wrap;

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
