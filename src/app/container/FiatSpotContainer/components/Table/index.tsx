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
import { data } from './data';
import { Table, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';

export interface NameProps {
  coin: string;
  description: string;
  url: string;
}
export interface Dataprops {
  key: number;
  name: NameProps;
  total: number;
  available: number;
  inOrder: number;
  btcValue: number;
  action: Array<string>;
}
const columns: ColumnsType<Dataprops> = [
  {
    title: 'Coin',
    dataIndex: 'name',
    sorter: (a, b) => a.name.coin.localeCompare(b.name.coin),
    render: (record: any) => {
      return (
        <Space size="middle">
          <div className="d-flex flex-column">
            <div>{record.coin}</div>
            <a className="coin-url" href={record.url}>
              {record.description}
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
  },
  {
    title: 'Available',
    dataIndex: 'available',
    sorter: {
      compare: (a, b) => a.available - b.available,
      multiple: 2,
    },
  },
  {
    title: 'In Order',
    dataIndex: 'inOrder',
    sorter: {
      compare: (a, b) => a.inOrder - b.inOrder,
      multiple: 1,
    },
  },
  {
    title: 'BTC Value',
    dataIndex: 'btcValue',
    sorter: {
      compare: (a, b) => a.btcValue - b.btcValue,
      multiple: 1,
    },
  },
  {
    key: 'action',
    title: 'Action',
    dataIndex: 'action',
    render: (record: any) => {
      return (
        <Space size="middle">
          {record.map((item: any, index) => (
            <span className="coin-action" key={index}>
              {item}
            </span>
          ))}
        </Space>
      );
    },
  },
];

const FiatSpotTable = () => {
  const onChange = (filters, sorter, extra) => {
    console.log('params', filters, sorter, extra);
  };
  return (
    <App>
      <Container>
        <Header />
        <Table columns={columns} dataSource={data} onChange={onChange} />
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
