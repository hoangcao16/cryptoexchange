import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { tabP2PService } from '../../../../services/tabP2PServices';

const gen_uuid = (): string => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const gen_string = (length = 10) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const random = (min = 1, max = 10) =>
  Math.floor(Math.random() * (max - min)) + min;

const data = [
  {
    id: gen_uuid(),
    checked: true,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
  {
    id: gen_uuid(),
    checked: true,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
  {
    id: gen_uuid(),
    checked: false,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
  {
    id: gen_uuid(),
    checked: false,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
  {
    id: gen_uuid(),
    checked: true,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
  {
    id: gen_uuid(),
    checked: false,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
  {
    id: gen_uuid(),
    checked: false,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
  {
    id: gen_uuid(),
    checked: true,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
  {
    id: gen_uuid(),
    checked: false,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
  {
    id: gen_uuid(),
    checked: false,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
  {
    id: gen_uuid(),
    checked: false,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
  {
    id: gen_uuid(),
    checked: true,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
  {
    id: gen_uuid(),
    checked: true,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
  {
    id: gen_uuid(),
    checked: true,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
  {
    id: gen_uuid(),
    checked: true,
    advertisers: gen_string(),
    orders: random(0, 999),
    completion: random(0, 100),

    price: random(0, 1000),
    fiat: 'FIAT',

    available: random(0, 1000),
    limit: random(0, 10000000),
    preLimit: 'pre',
    crypto: 'USDT',

    payment: ['Momo', 'Momo', 'Momo', ' Banking'],
  },
];

function P2PTableBuy() {
  const [listP2POrdersBuy, setListP2POrdersBuy] = useState<any>([]);

  const { getListOrderBuy } = tabP2PService;

  const columns: ColumnsType<any> = [
    {
      title: 'Advertisers',
      key: 'Advertisers',
      dataIndex: 'advertisers',
      width: 400,
      render: (text: any, record: any) => (
        <ColAdvertisers>
          <div className="row1">
            <div className="firstCharacter">{record.advertisers.charAt(0)}</div>
            <div className="advertisers">{record.advertisers}</div>
            <div className="checked">
              {record.checked && <BsFillCheckCircleFill color="#10afff" />}
            </div>
          </div>

          <div className="row2">
            {record.orders} orders | {record.completion}% completion
          </div>
        </ColAdvertisers>
      ),
    },
    {
      title: 'Price',
      key: 'Price',
      dataIndex: 'price',
      width: 200,
      render: (text: any, record: any) => (
        <ColPrice>
          {record.price} <span>{record.crypto}</span>
        </ColPrice>
      ),
    },
    {
      title: 'Limit/Available',
      key: 'Limit/Available',
      dataIndex: 'limit',
      width: 300,
      render: (text: any, record: any) => (
        <ColLimitAvailable>
          <div className="rowLimitAvailable">
            <div className="col1">Available</div>
            <div className="col2">
              {record.available} {record.crypto}
            </div>
          </div>
          <div className="rowLimitAvailable">
            <div className="col1">Limit</div>
            <div className="col2">
              {record.preLimit}.{record.limit} - {record.preLimit}.
              {record.limit}
            </div>
          </div>
        </ColLimitAvailable>
      ),
    },
    {
      title: 'Payment',
      key: 'Payment',
      dataIndex: 'payment',
      width: 280,

      render: (text: any, record: any) => (
        <ColPayment>
          {text.map((t, i) => (
            <div className="payment" key={i}>
              {t}
            </div>
          ))}
        </ColPayment>
      ),
    },
    {
      title: (
        <ColumnsTrade>
          <div className="title">Trade</div>
          <div className="fee">0Fee</div>
        </ColumnsTrade>
      ),
      key: 'trade',
      dataIndex: 'trade',
      width: 200,
      render: (text: any, record: any) => {
        return <ButtonSell>Buy {record.crypto}</ButtonSell>;
      },
    },
  ];

  useEffect(() => {
    getListOrderBuy()
      .then(res => {
        if (res.data.rc === 0) {
          setListP2POrdersBuy(res.data.rows);
        } else {
          console.log(res.data.rd);
        }
      })
      .catch(res => console.log(res));
  }, []);

  return (
    <Wrapper>
      <Table rowKey={'id'} columns={columns} dataSource={data} />
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
