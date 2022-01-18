import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { selectBuyspotlimit } from 'app/components/OrderForm/components/LimitForm/components/BuyForm/slice/selectors';
import { selectSellspotlimit } from 'app/components/OrderForm/components/LimitForm/components/SellForm/slice/selectors';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { isEmpty } from 'app/components/common/common';
import moment from 'moment';
import numeral from 'numeral';
import { Div, StyledButtion } from './style';
const OpenOrderList = () => {
  const dataBuy: any = useSelector(selectBuyspotlimit);
  const dataSell: any = useSelector(selectSellspotlimit);
  const [dataSource, setDataSource]: any[] = useState([]);
  useEffect(() => {
    if (
      !isEmpty(dataBuy.data) &&
      dataSource.find(
        (item: any) => item.order_id === dataBuy.data.order_id,
      ) === undefined
    ) {
      setDataSource((prev: any) => [dataBuy.data, ...prev]);
    }
    if (
      !isEmpty(dataSell.data) &&
      dataSource.find(
        (item: any) => item.order_id === dataSell.data.order_id,
      ) === undefined
    ) {
      setDataSource((prev: any) => [dataSell.data, ...prev]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataBuy.data, dataSell.data]);

  const columns: ColumnsType<any> = [
    {
      title: 'Date',
      dataIndex: 'ts',
      align: 'center',
      key: 'ts',
      render: (text: any) => moment(text).format('MM-DD HH:mm:ss'),
    },
    {
      title: 'Pair',
      dataIndex: 'pair',
      align: 'center',
      key: 'pair',
      render: (text: any) => {
        return <span className="white-color">{text.toUpperCase()}</span>;
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      align: 'center',
      key: 'type',
      render: (text: any) => {
        return <span className="white-color">{text.toUpperCase()}</span>;
      },
    },
    {
      title: 'Side',
      dataIndex: 'side',
      align: 'center',
      key: 'side',
      render: (text: any) => {
        return (
          <span
            className="typeof-side"
            data-type={text === 'SELL' ? 'sell' : 'buy'}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'center',
      key: 'price',
      render: (text: any) => {
        return (
          <span className="white-color">
            {numeral(text).format('0,0.0000')}
          </span>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      align: 'center',
      key: 'amount',
      render: (text: any) => {
        return (
          <span className="white-color">{numeral(text).format('0,0.00')}</span>
        );
      },
    },
    {
      title: 'Filled',
      dataIndex: 'filled',
      align: 'center',
      key: 'filled',
      render: (text: any) => {
        return (
          <span className="white-color">{numeral(text).format('0,0.00')}%</span>
        );
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      align: 'center',
      key: 'total',
      render: (text: any, record: any) => {
        return (
          <span className="white-color">
            {numeral(text).format('0,0.0000')} {record.quoteSymbol}
          </span>
        );
      },
    },
    {
      title: 'Trigger Condition',
      dataIndex: 'triggerCondition',
      align: 'center',
      key: 'triggerConditions',
      render: (text: any) => {
        return <span className="white-color">{text}</span>;
      },
    },
    {
      title: 'Cancel All',
      dataIndex: 'cancel',
      align: 'center',
      key: 'cancel',
      render: (text: any) => {
        return <StyledButtion>Cancel</StyledButtion>;
      },
    },
  ];
  return (
    <Div>
      <Table dataSource={dataSource} columns={columns} rowKey="order_id" />
    </Div>
  );
};
export default OpenOrderList;
