import { Checkbox, Col, Input, Row, Select } from 'antd';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useTabP2PSlice } from '../slice';
import { selectTabP2P } from '../slice/selectors';
import { TabP2PState } from '../slice/type';
const { Search } = Input;
const { Option } = Select;

const fiats = [
  {
    name: 'FIAT1',
    icon: 'https://phongvunghean.com/wp-content/uploads/2020/07/safety-icon-with-png-and-vector-format-f-178900-png-images-pngio-safety-icon-png-512_512.png',
  },
  {
    name: 'FIAT2',
    icon: 'https://phongvunghean.com/wp-content/uploads/2020/07/safety-icon-with-png-and-vector-format-f-178900-png-images-pngio-safety-icon-png-512_512.png',
  },
  {
    name: 'FIAT3',
    icon: 'https://phongvunghean.com/wp-content/uploads/2020/07/safety-icon-with-png-and-vector-format-f-178900-png-images-pngio-safety-icon-png-512_512.png',
  },
  {
    name: 'FIAT4',
    icon: 'https://phongvunghean.com/wp-content/uploads/2020/07/safety-icon-with-png-and-vector-format-f-178900-png-images-pngio-safety-icon-png-512_512.png',
  },
];

const payments = [
  {
    name: 'Momo',
    icon: 'https://business.momo.vn/assets/landingpage/img/931b119cf710fb54746d5be0e258ac89-logo-momo.png',
  },
  {
    name: 'Momo2',
    icon: 'https://business.momo.vn/assets/landingpage/img/931b119cf710fb54746d5be0e258ac89-logo-momo.png',
  },
  {
    name: 'Momo3',
    icon: 'https://business.momo.vn/assets/landingpage/img/931b119cf710fb54746d5be0e258ac89-logo-momo.png',
  },
  {
    name: 'Momo4',
    icon: 'https://business.momo.vn/assets/landingpage/img/931b119cf710fb54746d5be0e258ac89-logo-momo.png',
  },
  {
    name: 'Momo5',
    icon: 'https://business.momo.vn/assets/landingpage/img/931b119cf710fb54746d5be0e258ac89-logo-momo.png',
  },
  {
    name: 'Momo6',
    icon: 'https://business.momo.vn/assets/landingpage/img/931b119cf710fb54746d5be0e258ac89-logo-momo.png',
  },
];

function P2PFilter() {
  const { actions } = useTabP2PSlice();
  const dispatch = useDispatch();
  const TabP2PState: TabP2PState = useSelector(selectTabP2P);

  const handleFiat = (value: any) => {
    dispatch(actions.fiatTabP2P(value));
  };

  const handlePaymentMethod = (value: any) => {
    dispatch(actions.paymentTabP2P(value));
  };

  return (
    <Wrapper>
      <Row gutter={[8, 8]} align="bottom">
        <Col lg={6}>
          <div className="title">Amount</div>
          <SearchStyled
            placeholder="Enter amount"
            enterButton="Search"
            size="large"
            suffix={TabP2PState.searchParam.fiat || ' '}
          />
        </Col>

        <Col lg={3}>
          <div className="title">Fiat</div>

          <SelectStyled
            showSearch
            onChange={handleFiat}
            value={TabP2PState.searchParam.fiat}
          >
            {fiats.map((f, i) => (
              <Option value={f.name} key={i}>
                <img
                  style={{ maxWidth: '12px', marginRight: '8px' }}
                  src={f.icon}
                  alt={f.name}
                />
                {f.name}
              </Option>
            ))}
          </SelectStyled>
        </Col>

        <Col lg={4}>
          <div className="title">Payment</div>

          <SelectStyled
            showSearch
            onChange={handlePaymentMethod}
            value={TabP2PState.searchParam.payment}
          >
            {payments.map((p, i) => (
              <Option value={p.name} key={i}>
                <img
                  style={{ maxWidth: '12px', marginRight: '8px' }}
                  src={p.icon}
                  alt={p.name}
                />
                {p.name}
              </Option>
            ))}
          </SelectStyled>
        </Col>

        <Col lg={7}>
          <div className="title"></div>
          <Checkbox>Only show merchant ads</Checkbox>
        </Col>

        <Col lg={4}>
          <SelectRefreshStyled loading={true} placeholder="Refesh">
            <Option value="Not now">Not now</Option>
            <Option value="5s">5s to refresh</Option>
            <Option value="10s">10s to refresh</Option>
            <Option value="20s">20s to refresh</Option>
          </SelectRefreshStyled>
        </Col>
      </Row>
    </Wrapper>
  );
}

export default P2PFilter;

const Wrapper = styled(Container)`
  margin-top: 16px;

  .ant-select:hover .ant-select-selector,
  .ant-selected-focus .ant-select-selector,
  .ant-selected-focused.ant-select .ant-select-selector {
    border-color: ${({ theme }) => theme.primary} !important;
    box-shadow: none !important;
  }

  .ant-select-focused.ant-select .ant-select-selector {
    border-color: ${({ theme }) => theme.primary} !important;
    box-shadow: none !important;
  }

  /* checkbox */

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${({ theme }) => theme.primary};
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SearchStyled = styled(Search)`
  .ant-input-affix-wrapper-lg {
    padding: 0px 10px;
    font-size: 12px;
    height: 32px;
  }

  .ant-input-affix-wrapper-lg:hover,
  .ant-input-affix-wrapper-lg:focus,
  .ant-input-affix-wrapper-focused {
    border: 1px solid ${({ theme }) => theme.primary};
    box-shadow: none;
  }

  span.ant-input-group-addon {
    left: 0px !important;
  }

  button.ant-btn.ant-btn-primary.ant-btn-lg.ant-input-search-button {
    height: 32px;
    margin-bottom: -1px;
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.primary};
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.p2pBorder};
    font-weight: bold;

    &:hover {
      border-color: ${({ theme }) => theme.primary};
    }
  }

  .ant-input-suffix {
    color: ${({ theme }) => theme.p2pGray};
  }
`;

const SelectStyled = styled(Select)`
  width: 100%;
`;

const SelectRefreshStyled = styled(Select)`
  width: 100%;

  .ant-select-selector {
    text-align: center;
  }

  span.ant-select-arrow.ant-select-arrow-loading {
    color: red;
    font-size: 20px;
    top: 38%;
    right: 18px;
  }

  span.ant-select-selection-placeholder,
  span.ant-select-selection-item {
    color: ${({ theme }) => theme.primary} !important;
    font-weight: bold;
  }
`;
