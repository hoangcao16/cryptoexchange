import { Container } from 'react-bootstrap';
import {
  App,
  Head,
  SearchBox,
  StyledCheckbox,
  Subfilter,
  ConvertButton,
} from './style';
import { ReactComponent as SearchIcon } from 'app/assets/img/search.svg';
import { Table, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import numeral from 'numeral';

export interface Dataprops {
  key: number;
  assetName: string;
  total: number;
  available: number;
  inOrder: number;
  btcValue: number;
  action: Array<string>;
}
const columns: ColumnsType<Dataprops> = [
  {
    title: 'Coin',
    dataIndex: 'assetName',
    sorter: (a, b) => a.assetName.localeCompare(b.assetName),
    render: (text: any, record: any) => {
      return (
        <Space size="middle">
          <div>
            <img className="coin-icon" src={record.icon} alt="coin" />
          </div>
          <div className="d-flex flex-column">
            <div>{text}</div>
            <a className="coin-url" href={record.url}>
              {record.tokenName}
            </a>
          </div>
        </Space>
      );
    },
  },
  {
    title: 'Total',
    dataIndex: 'total',
    sorter: {
      compare: (a, b) => a.total - b.total,
      multiple: 3,
    },
    render: (text: any, record: any) => {
      return <Space size="middle">{numeral(text).format('0,0.000000')}</Space>;
    },
  },
  {
    title: 'Available',
    dataIndex: 'available',
    sorter: {
      compare: (a, b) => a.available - b.available,
      multiple: 2,
    },
    render: (text: any, record: any) => {
      return <Space size="middle">{numeral(text).format('0,0.000000')}</Space>;
    },
  },
  {
    title: 'In Order',
    dataIndex: 'inOrder',
    sorter: {
      compare: (a, b) => a.inOrder - b.inOrder,
      multiple: 1,
    },
    render: (text: any, record: any) => {
      return <Space size="middle">{numeral(text).format('0,0.000000')}</Space>;
    },
  },
  {
    key: 'action',
    title: 'Action',
    dataIndex: 'action',
    render: (record: any) => {
      return (
        <Space size="middle">
          <span className="coin-action">Deposit</span>
          <span className="coin-action">Withdraw</span>
          <span className="coin-action">Convert</span>
        </Space>
      );
    },
  },
];

const FiatSpotTable = ({ dataSource }) => {
  const onChange = (filters, sorter, extra) => {
    console.log('params', filters, sorter, extra);
  };
  return (
    <App>
      <Container>
        <Header />
        <Table columns={columns} dataSource={dataSource} onChange={onChange} />
      </Container>
    </App>
  );
};
export default FiatSpotTable;
const Header = () => {
  return (
    <Head>
      <SearchBox>
        <label htmlFor="search-input" className="bn-input-prefix">
          <div className="prefix-icon">
            <SearchIcon className="search-icon" />
          </div>
        </label>
        <input
          id="search-input"
          placeholder="Search Coin"
          className="search-input"
        />
      </SearchBox>
      <Subfilter>
        <StyledCheckbox>
          <label htmlFor="hideSmallBalances" className="labelView">
            <input id="hideSmallBalances" type="checkbox" />
            <span className="checkmark"></span>
            <span className="label-text">Hide Small Balances</span>
          </label>
        </StyledCheckbox>
        <ConvertButton href="#" rel="noopener noreferrer">
          Convert Small Balance to BNB
        </ConvertButton>
      </Subfilter>
    </Head>
  );
};
