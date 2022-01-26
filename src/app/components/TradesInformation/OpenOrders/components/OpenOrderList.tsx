import { Table, Space, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import numeral from 'numeral';
import { Div, StyledButtion } from './style';
import { useDispatch } from 'react-redux';
import { useGetopenOrderSlice } from '../slice';

const OpenOrderList = ({ dataSource }: any) => {
  const dispatch = useDispatch();
  const { actions } = useGetopenOrderSlice();
  const confirm = (e: any, record: any) => {
    dispatch(actions.cancelOrderRequest(record.order_id));
  };
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
      align: 'center',
      key: 'cancel',
      render: (record: any) => {
        return (
          <Space>
            <Popconfirm
              placement="topRight"
              title={`Are you sure to cancel this order?`}
              onConfirm={e => confirm(e, record)}
              okText="Yes"
              cancelText="No"
            >
              <StyledButtion>Cancel</StyledButtion>
            </Popconfirm>
          </Space>
        );
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
