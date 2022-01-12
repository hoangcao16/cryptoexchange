import { Table } from 'antd';
import styled from 'styled-components';
const TradeOrderList = () => {
  const dataSource = [
    // {
    //   key: 1,
    //   date: '17:22:39',
    //   pair: 'BNB/BUSD',
    //   type: 'Stop Loss Limit',
    //   side: 'Buy',
    //   price: '502.000',
    //   amount: '1.00',
    //   filled: '0.00',
    //   total: '502.0000',
    //   triggerCondition: '>=500.000',
    // },
  ];

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Pair',
      dataIndex: 'pair',
      key: 'pair',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Side',
      dataIndex: 'side',
      key: 'side',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Filled',
      dataIndex: 'filled',
      key: 'filled',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Trigger Condition',
      dataIndex: 'triggerCondition',
      key: 'triggerCondition',
    },
    {
      title: 'Cancel All',
      dataIndex: 'cancel',
      key: 'cancel',
    },
  ];

  return (
    <Div>
      <Table dataSource={dataSource} columns={columns} />
    </Div>
  );
};
export default TradeOrderList;
export const Div = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  margin-top: 8px;
  .ant-table {
    color: ${({ theme }) => theme.grayColor};
    background-color: transparent;
    font-size: 12px;
    font-weight: 400;
    .ant-table-container {
      border: none;
      .ant-table-thead > tr > th {
        position: relative;
        color: inherit;
        font-weight: 500;
        text-align: left;
        background: transparent;
        padding: 0;
        border-bottom: 1px solid ${({ theme }) => theme.darkBrightGrayColor};
      }
      .ant-table-tbody > tr.ant-table-row:hover > td,
      .ant-table-tbody > tr > td.ant-table-cell-row-hover {
        background: ${({ theme }) => theme.darkBrightGrayColor};
      }
      .ant-table-tbody > tr > td {
        border-bottom: none;
        padding: 4px 0px;
      }
      .ant-table-tbody {
        .ant-table-placeholder {
          .ant-empty-normal {
            color: ${({ theme }) => theme.text};
          }
          &:hover {
            .ant-table-cell {
              background: ${({ theme }) => theme.darkBrightGrayColor};
            }
          }
        }
      }
    }
  }
  .ant-pagination {
    .ant-pagination-prev,
    .ant-pagination-next,
    .ant-pagination-item {
      height: 24px;
      line-height: 24px;
      min-width: 24px;
    }
    .ant-pagination-prev > button,
    .ant-pagination-next > button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: ${({ theme }) => theme.text};
    }
  }
`;
