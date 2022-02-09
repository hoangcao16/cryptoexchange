import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import numeral from 'numeral';
import { Div } from './style';

const TradeHistoryList = ({ dataSource }: any) => {
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
      title: 'Executed',
      dataIndex: 'executed',
      align: 'center',
      key: 'executed',
      render: (text: any) => {
        return (
          <span className="white-color">{numeral(text).format('0,0.000')}</span>
        );
      },
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      align: 'center',
      key: 'fee',
      render: (text: any) => {
        return (
          <span className="white-color">
            {numeral(text).format('0,0.0000')}
          </span>
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
  ];
  return (
    <Div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="order_id"
        pagination={false}
        scroll={{ y: 260 }}
      />
    </Div>
  );
};
export default TradeHistoryList;
